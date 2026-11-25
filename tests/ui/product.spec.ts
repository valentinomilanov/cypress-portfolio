import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { NavigationBar } from '../../src/pages/NavigationBar.js';
import { ProductPage } from '../../src/pages/ProductPage.js';
import { CheckoutPage } from '../../src/pages/CheckoutPage.js';
import { products, users } from '../fixtures/testData.js';
import { logEvent } from '../../src/utils/logging.js';

test.describe('Products and cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-6: Filter products by category', async ({ page }) => {
    const productPage = new ProductPage(page);

    await test.step(`Filter by category: ${products.category}`, async () => {
      await productPage.filterByCategory(products.category);
    });
    await productPage.assertProductVisible(products.productName);
    logEvent(test.info(), 'VERIFICATION', `Product "${products.productName}" is visible`);
  });

  test('TC-7: Add product to cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationBar = new NavigationBar(page);
    const productPage = new ProductPage(page);

    await test.step('Sign in and add a product to the cart', async () => {
      await navigationBar.clickSignIn();
      await loginPage.login(users.validUser.email, users.validUser.password);
      await navigationBar.clickHome();
      await productPage.filterByCategory(products.category);
      await productPage.selectProduct(products.productName);
      await productPage.addToCart();
    });
    await productPage.assertCartQuantity(products.quantity);
    logEvent(test.info(), 'VERIFICATION', `Cart quantity is ${products.quantity}`);
  });

  test('TC-8: Remove product from cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationBar = new NavigationBar(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('Sign in, add a product, and open the cart', async () => {
      await navigationBar.clickSignIn();
      await loginPage.login(users.validUser.email, users.validUser.password);
      await navigationBar.clickHome();
      await productPage.filterByCategory(products.category);
      await productPage.selectProduct(products.productName);
      await productPage.addToCart();
      await productPage.assertCartQuantity(products.quantity);
      await navigationBar.clickCart();
    });
    await checkoutPage.assertCartNotEmpty();
    await checkoutPage.removeItemFromCart();
    await checkoutPage.assertCartEmpty();
    logEvent(test.info(), 'VERIFICATION', 'Cart is empty after removing the product');
  });
});
