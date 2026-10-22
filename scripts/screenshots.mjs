import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
await fs.mkdir("docs/screenshots", { recursive: true });
const browser = await chromium.launch({ channel: "msedge" });
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  deviceScaleFactor: 1,
});
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.screenshot({
  path: "docs/screenshots/home-desktop.png",
  fullPage: true,
});
await page.goto("http://localhost:3000/lektioner/linux-filrettigheder", {
  waitUntil: "networkidle",
});
await page.screenshot({
  path: "docs/screenshots/lesson-desktop.png",
  fullPage: true,
});
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.screenshot({
  path: "docs/screenshots/home-mobile.png",
  fullPage: true,
});
await browser.close();
