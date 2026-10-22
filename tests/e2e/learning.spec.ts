import { test, expect } from "@playwright/test";
test("forside, kursussøgning og navigation", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /IT-sikkerhed, der giver mening/ }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: /Find dit næste emne/ })
    .first()
    .click();
  await page
    .getByRole("textbox", { name: "Søg kurser, lektioner og begreber" })
    .fill("chmod");
  await page.getByRole("button", { name: "Søg", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: /System Security/ }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Network & Communications Security" }),
  ).toHaveCount(0);
  await page.getByRole("link", { name: /Hvem må læse din fil/ }).click();
  await expect(
    page.getByRole("heading", { name: "Hvem må læse din fil?" }),
  ).toBeVisible();
});
test("quiz giver feedback og kan prøves igen", async ({ page }) => {
  await page.goto("/lektioner/linux-filrettigheder");
  await page
    .getByLabel("Ejeren kan læse og skrive; gruppe og andre har ingen adgang", {
      exact: true,
    })
    .check();
  await page.getByLabel("Falsk", { exact: true }).check();
  await page.getByRole("button", { name: "Tjek mine svar" }).click();
  await expect(page.getByText("100 % rigtigt · Godt arbejde!")).toBeVisible();
  await expect(
    page.getByText(/Dit resultat er gemt i denne browser/),
  ).toBeVisible();
  await page.getByRole("button", { name: "Prøv igen", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Tjek mine svar" }),
  ).toBeDisabled();
});
test("tidligere login åbner den lokale læseoversigt", async ({ page }) => {
  await page.goto("/login");
  await expect(page).toHaveURL(/\/dashboard/);
  await expect(
    page.getByRole("heading", { name: "Min læsning" }),
  ).toBeVisible();
});
test("lab og layout fungerer uden vandret overflow", async ({ page }) => {
  await page.goto("/labs/linux-permissions");
  await expect(
    page.getByRole("heading", { name: "Tag kontrollen over dine filer." }),
  ).toBeVisible();
  await expect(
    page.getByText("Din bekræftelse er ikke en automatisk teknisk validering."),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
test("tema gemmes efter genindlæsning", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Brug mørkt tema" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
});
