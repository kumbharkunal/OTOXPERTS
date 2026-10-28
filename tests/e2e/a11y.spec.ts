import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("no serious or critical axe violations (WCAG 2.2 AA)", async ({ page }) => {
  await page.goto("/");
  await page.waitForTimeout(1500);
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
  const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
  for (const v of serious) console.log(`${v.id}: ${v.help}\n  ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join("\n  ")}`);
  expect(serious).toEqual([]);
});
