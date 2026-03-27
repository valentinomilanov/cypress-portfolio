class CheckoutPage {
    // Selectors
    cartIcon = '[data-test="nav-cart"]'
    proceedToCheckoutButton = '[data-test="proceed-1"]'
    proceedToCheckoutButton2 = '[data-test="proceed-2"]'
    proceedToCheckoutButton3 = '[data-test="proceed-3"]'
    paymentMethodSelect = '[data-test="payment-method"]'
    confirmPaymentButton = '[data-test="finish"]'
    paymentConfirmation = '[data-test="payment-success-message"]'
    orderConfirmation = '#order-confirmation'
    cartItem = '[data-test="product-title"]'
    removeCartItem = '.btn-danger'
    streetInput = '[data-test="street"]'
    cityInput = '[data-test="city"]'
    stateInput = '[data-test="state"]'
    countryInput = '[data-test="country"]'
    postalCodeInput = '[data-test="postal_code"]'
    bankName = '[data-test="bank_name"]'
    accountName = '[data-test="account_name"]'
    accountNumber = '[data-test="account_number"]'

    // Actions
    openCart() {
        cy.logClickButton('cart icon')
        cy.get(this.cartIcon).click()
    }

    proceedToSignIn() {
        cy.logClickButton('Proceed to checkout (step 1)')
        cy.get(this.proceedToCheckoutButton).click()
    }

    proceedToAddress() {
        cy.logClickButton('Proceed to checkout  button (step 2)')
        cy.get(this.proceedToCheckoutButton2).click()
    }

    proceedToPayment() {
        cy.logClickButton('Proceed to checkout  button (step 3)')
        cy.get(this.proceedToCheckoutButton3).click()
    }

    fillAddress(address) {
        cy.logEnterValueToField('Street', 'Street')
        cy.get(this.streetInput).clear().type(address.street)
        cy.logInfo(`Street entered: ${address.street}`)
        cy.logEnterValueToField('City', 'City')
        cy.get(this.cityInput).clear().type(address.city)
        cy.logInfo(`City entered: ${address.city}`)
        cy.logEnterValueToField('State', 'State')
        cy.get(this.stateInput).clear().type(address.state)
        cy.logInfo(`State entered: ${address.state}`)
        cy.logEnterValueToField('Coutry', 'Country')
        cy.get(this.countryInput).clear().type(address.country)
        cy.logInfo(`Country entered: ${address.country}`)
        cy.logEnterValueToField('Postal code', 'Postal code')
        cy.get(this.postalCodeInput).clear().type(address.postal_code)
        cy.logInfo(`Postal code entered: ${address.postal_code}`)
    }

    selectPaymentMethod(method) {
        cy.logStep('Select payment method from dropdown')
        cy.get(this.paymentMethodSelect).select(method)
        cy.logInfo(`Payment method selected: ${method}`)
    }

    fillBankDetails(bankDetails) {
        cy.logStep('Fill in bank name input field')
        cy.logEnterValueToField('Bank name', 'Bank name')
        cy.get(this.bankName).clear().type(bankDetails.bank_name)
        cy.logInfo(`Bank name entered: ${bankDetails.bank_name}`)
        cy.logEnterValueToField('Account name', 'Account name')
        cy.get(this.accountName).clear().type(bankDetails.account_name)
        cy.logInfo(`Account name entered: ${bankDetails.account_name}`)
        cy.logEnterValueToField('Account number', 'Account number')
        cy.get(this.accountNumber).clear().type(bankDetails.account_number)
        cy.logInfo(`Account number entered: ${bankDetails.account_number}`)
    }

    confirmBankPayment() {
        cy.logClickButton('Confirm bank payment')
        cy.get(this.confirmPaymentButton).click()
    }

    confirmOrder() {
        cy.logClickButton('Confirm order')
        cy.get(this.confirmPaymentButton).click()
    }

    removeItemFromCart() {
        cy.logClickButton('delete product')
        cy.get(this.removeCartItem).first().click()
    }

    // Assertions
    assertPaymentMethodSelected(method) {
        cy.logVerification(`Correct Payment method is selected`)
        cy.logInfo(`Payment method is set to: ${method}`)
        cy.get(this.paymentMethodSelect).should('have.value', method)
    }

    assertPaymentConfirmation() {
        cy.logVerification('Payment confirmation message is visible on the page')
        cy.get(this.paymentConfirmation).should('be.visible')
    }

    assertOrderConfirmed() {
        cy.logVerification('Order confirmation message is visible on the page')
        cy.get(this.orderConfirmation).should('be.visible')
    }

    assertCartNotEmpty() {
        cy.logVerification('Cart is not empty — cart items are present')
        cy.get(this.cartItem).should('be.visible')
    }

    assertCartEmpty() {
        cy.logVerification('Cart is empty — no cart items are present')
        cy.get(this.cartItem).should('not.exist')
    }
}

export default new CheckoutPage()