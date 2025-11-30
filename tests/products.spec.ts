import { test, expect } from '@playwright/test'

test('load products', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card')
    await expect(page.locator('.product-card')).toHaveCount(20)
})

test('category filter updates URL', async ({ page }) => {
  await page.goto('/products');

  const electronics = page.locator("input[value='electronics']");
  await expect(electronics).toBeVisible();
  await electronics.check();

  await page.waitForURL(/category=electronics/);
});

test("can select multiple categories", async ({ page }) => {
  await page.goto("/products");

  const electronics = page.locator("input[value='electronics']");
  const jewelery = page.locator("input[value='jewelery']");

  await expect(electronics).toBeVisible();
  await electronics.check();

  await expect(jewelery).toBeVisible();
  await jewelery.check();

  await page.waitForURL(/electronics/);
  await page.waitForURL(/jewelery/);

  const url = page.url();
  expect(url).toContain("electronics");
  expect(url).toContain("jewelery");
});

test('sort updates URL', async ({ page }) => {
    await page.goto('/products')
    await page.selectOption('#sort', 'price_asc')
    await expect(page).toHaveURL(/sort=price_asc/)
})

test('filters persist after refresh', async ({ page }) => {
  await page.goto('/products?category=electronics&sort=price_desc');

  const electronics = page.locator('input[value="electronics"]');
  await expect(electronics).toBeVisible();

  await page.reload({ waitUntil: 'networkidle' });

  await expect(electronics).toBeChecked();
  await expect(page.locator('#sort')).toHaveValue('price_desc');
});

