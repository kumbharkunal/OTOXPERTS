// Visual QA: viewport screenshots at each section, desktop and phone.
// Usage: node scripts/shots.mjs [url] [desktop|mobile|both] [--reduce] [--only=id,id]
// Output: .shots/<preset>-<nn>-<section>.png (gitignored)
import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith("http")) ?? "http://localhost:3000/";
const which = args.find((a) => ["desktop", "mobile", "both"].includes(a)) ?? "both";
const reduce = args.includes("--reduce");
const only = args.find((a) => a.startsWith("--only="))?.slice(7).split(",");

const presets = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  mobile: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const sections = only ?? ["top", "problem", "checks", "process", "report", "services", "why", "cities", "days", "proof", "faq", "book", "footer"];

await mkdir(".shots", { recursive: true });
const browser = await chromium.launch();
const errors = [];

for (const name of which === "both" ? ["desktop", "mobile"] : [which]) {
  const ctx = await browser.newContext({ ...presets[name], reducedMotion: reduce ? "reduce" : "no-preference" });
  const page = await ctx.newPage();
  page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(`[${name}] ${m.type()}: ${m.text()}`));
  page.on("pageerror", (e) => errors.push(`[${name}] pageerror: ${e.message}`));
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(2200);
  let i = 0;
  for (const id of sections) {
    const found = await page.evaluate((id) => {
      const el = id === "footer" ? document.querySelector("footer") : document.getElementById(id);
      if (!el) return false;
      const y = id === "top" ? 0 : el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: "instant" });
      return true;
    }, id);
    if (!found) continue;
    await page.waitForTimeout(1400);
    const file = `.shots/${name}${reduce ? "-reduce" : ""}-${String(i++).padStart(2, "0")}-${id}.png`;
    await page.screenshot({ path: file });
    console.log(file);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`[${name}] horizontal overflow: ${overflow}px`);
  await ctx.close();
}
await browser.close();
if (errors.length) console.log("CONSOLE:\n" + [...new Set(errors)].join("\n"));
