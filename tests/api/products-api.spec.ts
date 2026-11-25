import { test, expect } from '@playwright/test';
import { apiUrl, products } from '../fixtures/testData.js';
import { ProductPage } from '../../src/pages/ProductPage.js';
import { logEvent } from '../../src/utils/logging.js';

test.describe('API - Products and categories', () => {
  test('TC-12: GET all products returns 200 and a populated data array', async ({ request }) => {
    const response = await request.get(`${apiUrl}/products`);
    expect(response.status()).toBe(200);

    const body = await response.json() as {
      current_page: number;
      data: unknown[];
      total: number;
    };
    expect(body).toHaveProperty('current_page');
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body).toHaveProperty('total');
    logEvent(test.info(), 'INFO', `Total products: ${body.total}`);
    logEvent(test.info(), 'VERIFICATION', 'Products endpoint returns a populated data array');
  });

  test('TC-13: GET single product returns correct data', async ({ page, request }) => {
    const productPage = new ProductPage(page);
    await page.goto('/');
    await expect(page.locator('[data-test^="category-"]').first()).toBeVisible();
    await productPage.filterByCategory(products.category);
    await productPage.selectProduct(products.productName);

    const productId = page.url().split('/product/')[1]?.split(/[/?#]/)[0];
    expect(productId, 'Product ID should be present in the product URL').toBeTruthy();

    const response = await request.get(`${apiUrl}/products/${productId}`);
    expect(response.status()).toBe(200);
    const body = await response.json() as Record<string, unknown>;
    expect(body.id).toBe(productId);
    for (const property of ['name', 'price', 'category', 'brand']) {
      expect(body).toHaveProperty(property);
    }
    logEvent(test.info(), 'INFO', `Product retrieved: ${String(body.name)}`);
    logEvent(test.info(), 'VERIFICATION', 'Single-product response contains the expected fields');
  });

  test('TC-14: GET categories returns a valid list', async ({ request }) => {
    const response = await request.get(`${apiUrl}/categories/tree`);
    expect(response.status()).toBe(200);
    const body = await response.json() as Array<{
      id: string | number;
      name: string;
      sub_categories: unknown[];
    }>;
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('name');
    expect(body[0]).toHaveProperty('sub_categories');
    logEvent(test.info(), 'INFO', `Categories returned: ${body.length}`);
    logEvent(test.info(), 'VERIFICATION', 'Categories endpoint returns a populated category tree');
  });
});
