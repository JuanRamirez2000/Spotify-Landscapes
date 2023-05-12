// @ts-check

import { test, expect } from "@playwright/test";

test("Results page without user cookie signed in", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.click("text=Lets Get Started");

  await expect(page).toHaveURL("http://localhost:3000/result");
});
