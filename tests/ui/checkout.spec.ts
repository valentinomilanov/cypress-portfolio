import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { NavigationBar } from '../../src/pages/NavigationBar.js';
import { ProductPage } from '../../src/pages/ProductPage.js';
import { CheckoutPage } from '../../src/pages/CheckoutPage.js';
import { products, users } from '../fixtures/testData.js';
import { logEvent } from '../../src/utils/logging.js';

test.describe('Checkout', () => {
  test('TC-9: Complete checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationBar = new NavigationBar(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/');
    await test.step('Sign in and add a product to the cart', async () => {
      await navigationBar.clickSignIn();
      await loginPage.login(users.validUser.email, users.validUser.password);
      await navigationBar.assertLoggedIn();
      await navigationBar.clickHome();
      await productPage.filterByCategory(products.category);
      await productPage.selectProduct(products.productName);
      await productPage.addToCart();
      await productPage.assertCartQuantity(products.quantity);
      await navigationBar.clickCart();
    });

    await test.step('Complete checkout address and payment details', async () => {
      await checkoutPage.proceedToSignIn();
      await checkoutPage.proceedToAddress();
      await checkoutPage.fillAddress(users.validUser.address);
      await checkoutPage.proceedToPayment();
      await checkoutPage.selectPaymentMethod('bank-transfer');
      await checkoutPage.assertPaymentMethodSelected('bank-transfer');
      await checkoutPage.fillBankDetails(users.validUser.bankDetails);
      await checkoutPage.confirmBankPayment();
    });

    await checkoutPage.assertPaymentConfirmation();
    await checkoutPage.confirmOrder();
    await checkoutPage.assertOrderConfirmed();
    logEvent(test.info(), 'VERIFICATION', 'Order confirmation is visible');
  });
});
