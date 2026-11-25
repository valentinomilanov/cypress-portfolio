import { test } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPage.js';
import { NavigationBar } from '../../src/pages/NavigationBar.js';
import { users } from '../fixtures/testData.js';
import { logEvent } from '../../src/utils/logging.js';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login');
  });

  test('TC-2: Login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationBar = new NavigationBar(page);

    await test.step('Submit valid account credentials', async () => {
      await loginPage.login(users.validUser.email, users.validUser.password);
    });
    await navigationBar.assertLoggedIn();
    logEvent(test.info(), 'VERIFICATION', 'Authenticated user menu is visible');
  });

  test('TC-3: Login with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Submit an invalid password', async () => {
      await loginPage.fillEmail(users.invalidUser.email);
      await loginPage.fillPassword(users.invalidUser.password);
      await loginPage.submit();
    });
    await loginPage.assertErrorVisible();
    logEvent(test.info(), 'VERIFICATION', 'Invalid-credentials error is visible');
  });

  test('TC-4: Login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Submit the login form without values', async () => {
      await loginPage.submit();
    });
    await loginPage.assertEmptyFieldErrors();
    logEvent(test.info(), 'VERIFICATION', 'Required-field validation messages are visible');
  });

  test('TC-5: Logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationBar = new NavigationBar(page);

    await test.step('Log in and sign out', async () => {
      await loginPage.login(users.validUser.email, users.validUser.password);
      await navigationBar.assertLoggedIn();
      await navigationBar.logout();
    });
    await navigationBar.assertLoggedOut();
    logEvent(test.info(), 'VERIFICATION', 'Sign-in link is visible after logout');
  });
});
