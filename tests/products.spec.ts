import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.waitForSelector(".product-card", { timeout: 30000 });

  await expect(page.locator(".product-card").first()).toBeVisible();
});

test("open product detail page", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.waitForSelector(".product-card", { timeout: 30000 });

  await page.locator(".product-card").first().click();

  await expect(page).toHaveURL(/product/);
});

test("add product to cart", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await page.waitForSelector(".product-card", { timeout: 30000 });

  await page.locator(".product-card").first().click();

  await page.waitForSelector("#add-to-cart", { timeout: 15000 });
  await page.locator("#add-to-cart").click();

  await page.goto("/cart");

  await page.waitForSelector(".cart-item", { timeout: 15000 });
  await expect(page.locator(".cart-item")).toHaveCount(1);
});
