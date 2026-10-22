import { test, expect } from "@playwright/test";
import { allLessons } from "../../src/content/courses";
test("alle pensumlektioner har tekst, quiz og ingen serverfejl", async ({
  page,
}) => {
  test.setTimeout(180000);
  for (const lesson of allLessons) {
    const response = await page.goto("/lektioner/" + lesson.id);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText(lesson.title);
    await expect(page.locator(".prose")).not.toBeEmpty();
    await expect(
      page.getByRole("button", { name: "Tjek mine svar" }),
    ).toBeDisabled();
  }
});
test("quizfremgang overlever reload og kan nulstilles", async ({ page }) => {
  await page.goto("/lektioner/linux-filrettigheder");
  await page
    .getByLabel("Ejeren kan læse og skrive; gruppe og andre har ingen adgang", {
      exact: true,
    })
    .check();
  await page.getByLabel("Falsk", { exact: true }).check();
  await page.getByRole("button", { name: "Tjek mine svar" }).click();
  await expect(
    page.getByText("Dit resultat er gemt i denne browser."),
  ).toBeVisible();
  await page.goto("/dashboard");
  await page.reload();
  await expect(page.getByText("100 %", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Hvem må læse din fil?" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Nulstil lokal fremgang" }).click();
  await page.getByRole("button", { name: "Ja, nulstil fremgang" }).click();
  await expect(page.getByText("Din lokale fremgang er slettet.")).toBeVisible();
  await page.reload();
  await expect(
    page.getByText(
      "Tag en quiz i slutningen af en lektion. Dit resultat vises her.",
    ),
  ).toBeVisible();
});
test("defekt lokal lagring blokerer ikke læseoversigten", async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem("secademy.study.v1", "broken"),
  );
  await page.goto("/dashboard");
  await expect(
    page.getByRole("heading", { name: "Min læsning" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /Åbn første lektion/ }),
  ).toBeVisible();
});
test("blokeret lagring tillader quiz og viser ærlig besked", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Storage.prototype.setItem = function () {
      throw new Error("blocked");
    };
  });
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
    page.getByText(
      "Resultatet kunne ikke gemmes lokalt. Du kan fortsætte uden lagring.",
    ),
  ).toBeVisible();
});
test("VLAN-modellen skelner mellem tag og PVID, og lab kan gemmes", async ({
  page,
}) => {
  await page.goto("/labs/vlan-observation");
  await expect(page.locator(".vlan-path")).toContainText("B · VLAN 30");
  await page.getByLabel("A sender rammen med tag 20").check();
  await expect(page.locator(".vlan-path")).toContainText("B · VLAN 20");
  await page.getByLabel(/Jeg har gennemført øvelsen/).check();
  await page
    .getByRole("button", { name: "Markér som manuelt gennemført" })
    .click();
  await expect(
    page.getByText("Gennemførelse gemt i denne browser."),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Gennemført · gem igen" }),
  ).toBeVisible();
});

test("rettighedsøvelsen opdaterer chmod og kan betjenes med tastatur", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".permission-command")).toContainText("chmod 640");
  await page.getByRole("button", { name: "Ejer: udføre" }).focus();
  await page.keyboard.press("Space");
  await expect(page.locator(".permission-command")).toContainText("chmod 740");
  await page.getByRole("button", { name: "Andre: læse" }).click();
  await expect(page.locator(".permission-command")).toContainText("chmod 744");
});
test("lektionens quiz nulstilles ved navigation til næste emne", async ({
  page,
}) => {
  await page.goto("/lektioner/linux-filrettigheder");
  await page
    .getByLabel("Ejeren kan læse og skrive; gruppe og andre har ingen adgang", {
      exact: true,
    })
    .check();
  await page.getByLabel("Falsk", { exact: true }).check();
  await page.getByRole("button", { name: "Tjek mine svar" }).click();
  await expect(page.getByText("100 % rigtigt · Godt arbejde!")).toBeVisible();
  await page.getByRole("link", { name: "Næste lektion →" }).click();
  await expect(page.locator("h1")).toHaveText(
    "Roller, ACL og den skjulte mask",
  );
  await expect(
    page.getByRole("button", { name: "Tjek mine svar" }),
  ).toBeDisabled();
  await expect(page.locator('input[type="radio"]:checked')).toHaveCount(0);
});
