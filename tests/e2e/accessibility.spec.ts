import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const route of [
  "/",
  "/kurser",
  "/lektioner/linux-filrettigheder",
  "/dashboard",
  "/labs/linux-permissions",
  "/labs/vlan-observation",
]) {
  for (const theme of ["light", "dark"])
    test(`tilgængelighed ${theme} ${route}`, async ({ page }) => {
      await page.addInitScript(
        (value) => localStorage.setItem("theme", value),
        theme,
      );
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
}
