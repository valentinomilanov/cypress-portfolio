import { test, expect } from '@playwright/test';
import { logEvent } from '../../src/utils/logging.js';

test.describe('Smoke', () => {
  test('TC-001: Practice site is reachable', async ({ page }) => {
    await test.step('Open the Practice Software Testing home page', async () => {
      await page.goto('/');
    });

    await expect(page.locator('[data-test^="category-"]').first()).toBeVisible();
    logEvent(test.info(), 'VERIFICATION', 'Home page and category navigation loaded');
    logEvent(test.info(), 'INFO', 'Smoke test completed successfully');
  });
});
