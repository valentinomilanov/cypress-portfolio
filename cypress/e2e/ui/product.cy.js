import ProductPage from '../../pages/ProductPage.js'
import NavigationBar from '../../pages/NavigationBar.js'
import LoginPage from '../../pages/LoginPage.js'
import CheckoutPage from '../../pages/CheckoutPage.js'

describe('Product', () => {

    beforeEach(() => {
        ProductPage.visit()
    })

    it('TC-6: Filter products by category', () => {
        cy.fixture('products').then((products) => {
            ProductPage.filterByCategory(products.category)
            ProductPage.assertProductVisible(products.productName)
        })
    })

    it('TC-7: Add product to cart', () => {
        cy.fixture('users').then((users) => {
            cy.fixture('products').then((products) => {
                NavigationBar.clickSignIn()
                LoginPage.login(users.validUser.email, users.validUser.password)
                NavigationBar.clickHome()
                ProductPage.filterByCategory(products.category)
                ProductPage.selectProduct(products.productName)
                ProductPage.addToCart()
                ProductPage.assertCartQuantity(products.quantity)
            })
        })
    })

    it('TC-8: Remove product from cart', () => {
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
                CheckoutPage.assertCartNotEmpty()
                CheckoutPage.removeItemFromCart()
                CheckoutPage.assertCartEmpty()
            })
        })
    })

})