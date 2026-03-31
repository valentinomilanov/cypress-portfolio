import LoginPage from '../../pages/LoginPage.js'
import ProductPage from '../../pages/ProductPage.js'
import CheckoutPage from '../../pages/CheckoutPage.js'
import NavigationBar from '../../pages/NavigationBar.js'

describe('Checkout', () => {

    beforeEach(() => {
        cy.visitPage()
    })

    it('TC-9: Complete checkout flow', () => {
        cy.fixture('users').then((users) => {
            cy.fixture('products').then((products) => {
                NavigationBar.clickSignIn()
                LoginPage.login(users.validUser.email, users.validUser.password)
                NavigationBar.assertLoggedIn()
                NavigationBar.clickHome()
                ProductPage.filterByCategory(products.category)
                ProductPage.selectProduct(products.productName)
                ProductPage.addToCart()
                ProductPage.assertCartQuantity(products.quantity)
                NavigationBar.clickCart()
                CheckoutPage.proceedToSignIn()
                CheckoutPage.proceedToAddress()
                CheckoutPage.fillAddress(users.validUser.address)
                CheckoutPage.proceedToPayment()
                CheckoutPage.selectPaymentMethod('bank-transfer')
                CheckoutPage.assertPaymentMethodSelected('bank-transfer')
                CheckoutPage.fillBankDetails(users.validUser.bankDetails)
                CheckoutPage.confirmBankPayment()
                CheckoutPage.assertPaymentConfirmation()
                CheckoutPage.confirmOrder()
                CheckoutPage.assertOrderConfirmed()
            })
        })
    })

})