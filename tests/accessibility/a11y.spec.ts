import AxeBuilder from '@axe-core/playwright';
import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { NavigationBar } from '../../src/pages/NavigationBar.js';
import { ProductPage } from '../../src/pages/ProductPage.js';
import { products, users } from '../fixtures/testData.js';
import { logEvent } from '../../src/utils/logging.js';

async function scanAccessibility(page: Page, pageName: string): Promise<void> {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();

  logEvent(
    test.info(),
    'INFO',
    `Axe WCAG 2.0 A/AA scan on ${pageName}: ${results.violations.length} violation(s)`
  );

  for (const violation of results.violations) {
    logEvent(
      test.info(),
      'VIOLATION',
      `[${violation.impact ?? 'unknown'}] ${violation.id}: ${violation.help} (nodes: ${violation.nodes.length})`
    );
  }

  const criticalViolations = results.violations.filter(
    (violation) => violation.impact === 'critical'
  );
  expect(
    criticalViolations,
    `Critical accessibility violations on ${pageName}`
  ).toEqual([]);
  logEvent(
    test.info(),
    'VERIFICATION',
    `No critical accessibility violations on ${pageName}`
  );
}

test.describe('Accessibility', () => {
  test('TC-16: Home page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-test^="category-"]').first()).toBeVisible();
    await scanAccessibility(page, 'Home page');
  });

  test('TC-17: Login page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('[data-test="login-submit"]')).toBeVisible();
    await scanAccessibility(page, 'Login page');
  });

  test('TC-18: Product listing page has no critical accessibility violations', async ({ page }) => {
    const productPage = new ProductPage(page);
    await page.goto('/');
    await productPage.filterByCategory(products.category);
    await expect(page.locator('[data-test="product-name"]').first()).toBeVisible();
    await scanAccessibility(page, 'Product listing page');
  });

  test('TC-19: Product detail page has no critical accessibility violations', async ({ page }) => {
    const productPage = new ProductPage(page);
    await page.goto('/');
    await productPage.filterByCategory(products.category);
    await productPage.selectProduct(products.productName);
    await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
    await scanAccessibility(page, 'Product detail page');
  });

  test('TC-20: Cart page has no critical accessibility violations', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationBar = new NavigationBar(page);
    const productPage = new ProductPage(page);

    await page.goto('/');
    await navigationBar.clickSignIn();
    await loginPage.login(users.validUser.email, users.validUser.password);
    await navigationBar.assertLoggedIn();
    await navigationBar.clickHome();
    await productPage.filterByCategory(products.category);
    await productPage.selectProduct(products.productName);
    await productPage.addToCart();
    await navigationBar.clickCart();
    await expect(page.locator('[data-test="product-title"]').first()).toBeVisible();
    await scanAccessibility(page, 'Cart page');
  });
});
