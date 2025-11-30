import { test, expect } from "@playwright/test";

test("app loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/React/i);
});

test("products page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Products")).toBeVisible();
});

test("cart page loads", async ({ page }) => {
  await page.goto("/cart");
  await expect(page.getByText(/cart/i)).toBeVisible();
});
