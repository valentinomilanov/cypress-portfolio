import { expect, type Locator, type Page } from '@playwright/test';

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
}

export interface BankDetails {
  bank_name: string;
  account_name: string;
  account_number: string;
}

export class CheckoutPage {
  readonly paymentMethodSelect: Locator;
  readonly paymentConfirmation: Locator;
  readonly orderConfirmation: Locator;
  readonly cartItems: Locator;

  constructor(private readonly page: Page) {
    this.paymentMethodSelect = page.locator('[data-test="payment-method"]');
    this.paymentConfirmation = page.locator('[data-test="payment-success-message"]');
    this.orderConfirmation = page.locator('#order-confirmation');
    this.cartItems = page.locator('[data-test="product-title"]');
  }

  async proceedToSignIn(): Promise<void> {
    await this.page.locator('[data-test="proceed-1"]').click();
  }

  async proceedToAddress(): Promise<void> {
    await this.page.locator('[data-test="proceed-2"]').click();
  }

  async proceedToPayment(): Promise<void> {
    await this.page.locator('[data-test="proceed-3"]').click();
  }

  async fillAddress(address: Address): Promise<void> {
    await this.page.locator('[data-test="street"]').fill(address.street);
    await this.page.locator('[data-test="city"]').fill(address.city);
    await this.page.locator('[data-test="state"]').fill(address.state);
    await this.page.locator('[data-test="country"]').fill(address.country);
    await this.page.locator('[data-test="postal_code"]').fill(address.postal_code);
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.paymentMethodSelect.selectOption(method);
  }

  async fillBankDetails(details: BankDetails): Promise<void> {
    await this.page.locator('[data-test="bank_name"]').fill(details.bank_name);
    await this.page.locator('[data-test="account_name"]').fill(details.account_name);
    await this.page.locator('[data-test="account_number"]').fill(details.account_number);
  }

  async confirmBankPayment(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
  }

  async confirmOrder(): Promise<void> {
    await this.page.locator('[data-test="finish"]').click();
  }

  async removeItemFromCart(): Promise<void> {
    await this.page.locator('.btn-danger').first().click();
  }

  async assertPaymentMethodSelected(method: string): Promise<void> {
    await expect(this.paymentMethodSelect).toHaveValue(method);
  }

  async assertPaymentConfirmation(): Promise<void> {
    await expect(this.paymentConfirmation).toBeVisible();
  }

  async assertOrderConfirmed(): Promise<void> {
    await expect(this.orderConfirmation).toBeVisible();
  }

  async assertCartNotEmpty(): Promise<void> {
    await expect(this.cartItems.first()).toBeVisible();
  }

  async assertCartEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}
