import { test, expect, type Page } from "@playwright/test";

const IGNORED_CONSOLE = [/Download the React DevTools/i, /\[Fast Refresh\]/i, /\[HMR\]/i, /vercel-scripts|_vercel\/(insights|speed-insights)/i];

/** Client islands are interactive once the nav has hydrated (it marks its logo as drawn). */
async function hydrated(page: Page) {
  await page.waitForSelector('[data-logo="nav-logo"][data-drawn]', { state: "attached" });
}

function trackConsole(page: Page) {
  const problems: string[] = [];
  page.on("console", (m) => {
    if (m.type() !== "error" && m.type() !== "warning") return;
    // Vercel Analytics and Speed Insights scripts only exist on a Vercel deployment.
    if (m.location().url.includes("/_vercel/")) return;
    if (!IGNORED_CONSOLE.some((r) => r.test(m.text()))) problems.push(`${m.text()} ${m.location().url}`);
  });
  page.on("pageerror", (e) => problems.push(e.message));
  return problems;
}

test("renders the hero from HTML with no console errors or hydration warnings", async ({ page }) => {
  const problems = trackConsole(page);
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Don't buy blind." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Book a PDI on WhatsApp/ }).first()).toHaveAttribute("href", /^https:\/\/wa\.me\/919217049330\?text=/);
  await page.waitForTimeout(1500);
  expect(problems).toEqual([]);
});

test("the hero paints torch-ready and the light comes on without a layout shift", async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== "chromium" || !isMobile, "layout-shift entries are Chromium-only; the readout is the phone layout");
  type ShiftWindow = Window & { __cls?: number };
  await page.addInitScript(() => {
    const w = window as ShiftWindow;
    w.__cls = 0;
    new PerformanceObserver((list) => {
      for (const e of list.getEntries() as unknown as Array<{ value: number; hadRecentInput: boolean }>) {
        if (!e.hadRecentInput) w.__cls = (w.__cls ?? 0) + e.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  await page.goto("/");
  await expect(page.locator(".hero-readoutItem:visible")).toHaveCount(1);
  await expect(page.locator("[data-hero-stage]")).toHaveAttribute("data-torch", "on", { timeout: 8000 });
  await page.waitForTimeout(2500); // the intro sweep across the callouts
  await expect(page.locator(".hero-readoutItem:visible")).toHaveCount(1);
  expect(await page.evaluate(() => (window as ShiftWindow).__cls ?? 0)).toBeLessThan(0.01);
});

test("if the light never starts, the hero lights itself and shows every reading", async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== "chromium" || !isMobile, "the readout is the phone layout");
  await page.route(/\/_next\/static\/.*\.js/, (r) => r.abort());
  await page.goto("/");
  await expect(page.locator(".hero-readoutItem:visible")).toHaveCount(1);
  await expect(page.locator(".hero-readoutItem:visible")).toHaveCount(3, { timeout: 10_000 });
  await expect(page.locator(".hero-dim")).toHaveCSS("opacity", "0");
});

test("every section has its heading and the page has exactly one h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  for (const id of ["problem", "checks", "process", "report", "services", "why", "cities", "days", "proof", "faq", "book"]) {
    await expect(page.locator(`#${id} h2`).first()).toBeVisible();
  }
});

test("no horizontal overflow from 320 to 1920px", async ({ page, browserName, isMobile }) => {
  test.skip(browserName !== "chromium" || isMobile, "width sweep runs once, in desktop Chromium");
  for (const width of [320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(0);
  }
});

test("desktop nav scrolls to sections and marks the active link", async ({ page, isMobile }) => {
  test.skip(isMobile, "desktop nav");
  await page.goto("/");
  await hydrated(page);
  await page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "FAQ" }).click();
  await expect(page.locator("#faq")).toBeInViewport({ ratio: 0.2 });
  await expect(page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "FAQ" })).toHaveAttribute("aria-current", "location");
});

test("mobile menu traps focus, closes on Escape and returns focus", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu");
  await page.goto("/");
  await hydrated(page);
  const toggle = page.getByRole("button", { name: "Open menu" });
  await toggle.click();
  await expect(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Close menu" })).toHaveAttribute("aria-expanded", "true");
  await expect.poll(() => page.evaluate(() => document.getElementById("mobile-menu")?.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();
  await expect.poll(() => page.evaluate(() => document.body.style.position)).toBe("");
});

test("mobile menu link closes the sheet and lands on the section", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile menu");
  await page.goto("/");
  await hydrated(page);
  await page.getByRole("button", { name: "Open menu" }).click();
  await page.getByRole("dialog", { name: "Menu" }).getByRole("link", { name: "Report" }).click();
  await expect(page.locator("#report")).toBeInViewport({ ratio: 0.2 });
});

test("explorer tabs work with the keyboard", async ({ page }) => {
  await page.goto("/");
  await hydrated(page);
  const tabs = page.locator("#checks").getByRole("tab");
  await tabs.first().focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  // On desktop the page also scrolls to that step; read focus directly rather than re-querying roles mid-scroll.
  await expect
    .poll(() => page.evaluate(() => ({ role: document.activeElement?.getAttribute("role"), selected: document.activeElement?.getAttribute("aria-selected") })))
    .toEqual({ role: "tab", selected: "true" });
});

test("FAQ answers open natively", async ({ page }) => {
  await page.goto("/");
  const first = page.locator("#faq details").first();
  await first.locator("summary").click();
  await expect(first).toHaveAttribute("open", "");
});

test("booking form validates and builds the WhatsApp message", async ({ page }) => {
  await page.goto("/");
  await hydrated(page);
  const form = page.locator("#book form");
  await form.getByRole("button", { name: "Send on WhatsApp" }).click();
  await expect(form.getByText("Enter your name.")).toBeVisible();
  await expect(form.getByLabel("Your name")).toBeFocused();

  await page.evaluate(() => {
    (window as unknown as { __opened: string[] }).__opened = [];
    window.open = ((u: string) => {
      (window as unknown as { __opened: string[] }).__opened.push(String(u));
      return {} as Window;
    }) as typeof window.open;
  });
  const d = new Date(Date.now() + 5 * 86400000);
  const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  await form.getByLabel("Your name").fill("Riya");
  await form.getByLabel("Phone number").fill("98765 43210");
  await form.getByLabel("City").selectOption("Bengaluru");
  await form.getByLabel("Car model").fill("Tata Nexon EV");
  await form.getByLabel("Delivery date").fill(iso);
  await form.getByRole("button", { name: "Send on WhatsApp" }).click();
  const opened = await page.evaluate(() => (window as unknown as { __opened: string[] }).__opened);
  expect(opened).toHaveLength(1);
  const text = decodeURIComponent(opened[0].split("text=")[1]);
  expect(text).toContain("Name: Riya");
  expect(text).toContain("Phone: +91 98765 43210");
  expect(text).toContain("City: Bengaluru");
  expect(text).toContain("Car: Tata Nexon EV");
  await expect(page.getByRole("status")).toHaveText(/WhatsApp opened/);
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("hero is fully lit with every callout showing; nothing is pinned", async ({ page }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    expect(await page.locator("[data-hero-stage]").getAttribute("data-torch")).toBeNull();
    expect(await page.locator("[data-hero-stage]").evaluate((el) => getComputedStyle(el).position)).not.toBe("sticky");
  });
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });
  test("all content is present", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const visiblePanels = await page.locator('[role="tabpanel"]').evaluateAll((els) => els.filter((e) => getComputedStyle(e).visibility === "visible").length);
    expect(visiblePanels).toBe(8);
    await expect(page.locator("#faq details")).toHaveCount(11);
  });
});
