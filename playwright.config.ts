import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

/**
 * Run against a production server: `npm run build && npm start`, then `npm run test:e2e`.
 * Set BASE_URL to test a deployment.
 */
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  // One local `next start` serves every browser; more workers just starve it.
  workers: 2,
  // One retry absorbs a local server or renderer dropping a page under parallel load.
  retries: 1,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: { baseURL, trace: "off" },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "webkit", use: { ...devices["Desktop Safari"], viewport: { width: 1440, height: 900 } } },
    { name: "pixel", use: { ...devices["Pixel 7"] } },
    { name: "iphone", use: { ...devices["iPhone 13"] } },
  ],
});
