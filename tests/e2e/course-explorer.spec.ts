import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { courses } from "../../src/content/courses";
for (const course of courses) {
  test(`kompakt kursusoversigt ${course.id}`, async ({ page, isMobile }) => {
    if (!isMobile) await page.setViewportSize({ width: 1366, height: 768 });
    await page.goto("/kurser/" + course.slug);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      course.title,
    );
    for (let i = 0; i < course.modules.length; i++) {
      if (isMobile)
        await page
          .getByRole("combobox", { name: "Vælg kapitel", exact: true })
          .selectOption(String(i));
      else
        await page
          .getByRole("navigation", { name: "Vælg kapitel" })
          .getByRole("button")
          .nth(i)
          .click();
      await expect(page.locator("#chapter-title")).toHaveText(
        course.modules[i].title,
      );
      await expect(page.locator(".chapter-lesson")).toHaveCount(
        course.modules[i].lessons.length,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        await page
          .locator(".chapter-lesson strong")
          .first()
          .evaluate((el) => parseFloat(getComputedStyle(el).fontSize)),
      ).toBeGreaterThanOrEqual(16);
    }
    await expect(
      page.getByRole("button", { name: "Næste kapitel", exact: true }),
    ).toBeDisabled();
    await page.getByRole("button", { name: "Forrige", exact: true }).click();
    await expect(page.locator("#chapter-title")).toHaveText(
      course.modules.at(-2)!.title,
    );
    await page.locator(".chapter-glossary summary").click();
    await expect(page.locator(".chapter-glossary dd").first()).toBeVisible();
    await page.locator(".chapter-lesson").first().click();
    await expect(page).toHaveURL(/\/lektioner\//);
  });
  test(`kursusoversigt tilgængelighed ${course.id}`, async ({
    page,
    isMobile,
  }) => {
    await page.goto("/kurser/" + course.slug);
    for (const theme of ["light", "dark"]) {
      await page.evaluate((t) => {
        document.documentElement.dataset.theme = t;
      }, theme);
      const result = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(result.violations).toEqual([]);
    }
    if (!isMobile) {
      await page.evaluate(() => {
        document.documentElement.dataset.theme = "light";
      });
      await page.screenshot({
        path: `docs/screenshots/${course.id}-overview.png`,
        fullPage: true,
      });
    }
  });
}
