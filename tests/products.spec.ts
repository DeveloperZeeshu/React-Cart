import { test, expect } from '@playwright/test'

test('load products', async ({ page }) => {
    await page.goto('/products')
    await page.waitForSelector('.product-card')
    await expect(page.locator('.product-card')).toHaveCount(20)
})

test('category filter updates URL', async ({ page }) => {
    await page.goto('/products')
    await page.check("input[value='electronics']")
    await expect(page).toHaveURL(/category=electronics/)
})

test("can select multiple categories", async ({ page }) => {
    await page.goto("/products");

    await page.check("input[value='electronics']");
    await page.check("input[value='jewelery']");

    const url = await page.url();

    expect(url).toContain("electronics");
    expect(url).toContain("jewelery");
});

test('sort updates URL', async ({ page }) => {
    await page.goto('/products')
    await page.selectOption('#sort', 'price_aesc')
    await expect(page).toHaveURL(/sort=price_aesc/)
})

test('filters persist after refresh', async ({ page }) => {
    await page.goto('/products?category=electronics&sort=price_desc');

    await page.waitForSelector('input[value="electronics"]')

    await page.reload()

    await expect(page.locator('input[value="electronics"]')).toBeChecked();
    await expect(page.locator('#sort')).toHaveValue('price_desc');
});

