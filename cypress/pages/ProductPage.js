class ProductPage {
    // Selectors
    categoryFilter = 'input[data-test^="category-"]'
    productCard = '[data-test="product-name"]'
    addToCartButton = '[data-test="add-to-cart"]'
    cartQuantity = '[data-test="cart-quantity"]'

    // Actions
    visit() {
        cy.logStep('Navigate to home page URL')
        cy.visit('https://practicesoftwaretesting.com')
    }

    filterByCategory(category) {
        cy.logStep(`Click on a category filter`)
        cy.logInfo(`Click on category filter: ${category}`)
        cy.contains('label', category).click()
        cy.logInfo(`Category filter applied: ${category}`)
    }

    selectProduct(productName) {
        cy.logStep(`Click on a product card`)
        cy.logInfo(`Click on product card: ${productName}`)
        cy.get(this.productCard).contains(productName).click()
        cy.logInfo(`Product selected: ${productName}`)
    }

    addToCart() {
        cy.logClickButton('add to cart')
        cy.get(this.addToCartButton).click()
    }

    // Assertions
    assertProductVisible(productName) {
        cy.logVerification(`Product "${productName}" is visible in the listing`)
        cy.get(this.productCard).contains(productName).should('be.visible')
    }

    assertCartQuantity(quantity) {
        cy.logVerification(`Cart quantity badge shows: ${quantity}`)
        cy.get(this.cartQuantity).should('contain', quantity)
    }
}

export default new ProductPage()