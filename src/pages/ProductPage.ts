import { expect, type Locator, type Page } from '@playwright/test';

export class ProductPage {
  readonly productCards: Locator;
  readonly addToCartButton: Locator;
  readonly cartQuantity: Locator;

  constructor(private readonly page: Page) {
    this.productCards = page.locator('[data-test="product-name"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.cartQuantity = page.locator('[data-test="cart-quantity"]');
  }

  async filterByCategory(category: string): Promise<void> {
    await this.page.locator('label').filter({ hasText: category }).click();
  }

  async selectProduct(productName: string): Promise<void> {
    await this.productCards.filter({ hasText: productName }).first().click();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async assertProductVisible(productName: string): Promise<void> {
    await expect(this.productCards.filter({ hasText: productName }).first()).toBeVisible();
  }

  async assertCartQuantity(quantity: number): Promise<void> {
    await expect(this.cartQuantity).toContainText(String(quantity));
  }
}
