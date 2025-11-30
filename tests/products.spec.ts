import { test, expect } from "@playwright/test";


test("app loads successfully", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toContainText("Products");
});

test("product section renders", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByTestId("product-card").first()
  ).toBeVisible({ timeout: 60000 });
});

test("clicking product navigates to detail page", async ({ page }) => {
  await page.goto("/");

  const product = page.getByTestId("product-card").first();
  await expect(product).toBeVisible({ timeout: 60000 });

  await product.click();
  await expect(page).toHaveURL(/product\/\d+/);
});

test("cart page loads", async ({ page }) => {
  await page.goto("/cart");
  await expect(page).toHaveURL(/cart/);
});
