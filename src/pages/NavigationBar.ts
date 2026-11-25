import { expect, type Page } from '@playwright/test';

export class NavigationBar {
  constructor(private readonly page: Page) {}

  async clickSignIn(): Promise<void> {
    await this.page.locator('[data-test="nav-sign-in"]').click();
  }

  async clickHome(): Promise<void> {
    await this.page.locator('[data-test="nav-home"]').click();
  }

  async openUserMenu(): Promise<void> {
    await this.page.locator('[data-test="nav-menu"]').click();
  }

  async clickLogout(): Promise<void> {
    await this.page.locator('[data-test="nav-sign-out"]').click();
  }

  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.clickLogout();
  }

  async clickCart(): Promise<void> {
    await this.page.locator('[data-test="nav-cart"]').click();
  }

  async assertLoggedOut(): Promise<void> {
    await expect(this.page.locator('[data-test="nav-sign-in"]')).toBeVisible();
  }

  async assertLoggedIn(): Promise<void> {
    await expect(this.page.locator('[data-test="nav-menu"]')).toBeVisible();
  }
}
