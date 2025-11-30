import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".product-card").first()).toBeVisible();
});

test("open product detail page", async ({ page }) => {
  await page.goto("/");
  await page.locator(".product-card").first().click();
  await expect(page).toHaveURL(/product/);
});

test("add product to cart", async ({ page }) => {
  await page.goto("/");
  await page.locator(".product-card").first().click();
  await page.locator("#add-to-cart").click();
  await page.goto("/cart");
  await expect(page.locator(".cart-item")).toHaveCount(1);
});



