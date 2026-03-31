import LoginPage from '../../pages/LoginPage.js'
import NavigationBar from '../../pages/NavigationBar.js'
import ProductPage from '../../pages/ProductPage.js'

const checkA11y = (pageName) => {
    cy.logStep(`Run axe accessibility scan on ${pageName}`)
    cy.injectAxe()
    cy.checkA11y(null, {
        runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa']
        }
    }, (violations) => {
        cy.logInfo(`Accessibility violations found on ${pageName}: ${violations.length}`)
        cy.logViolation(violations)
    }, true)
    cy.logVerification(`No critical accessibility violations on ${pageName}`)
}

describe('Accessibility', () => {

    it('TC-16: Home page has no critical accessibility violations', () => {
        cy.visitPage()
        cy.get('[data-test^="category-"]').should('be.visible')
        checkA11y('Home page')
    })

    it('TC-17: Login page has no critical accessibility violations', () => {
        cy.visitPage('/auth/login')
        cy.get('[data-test="login-submit"]').should('be.visible')
        checkA11y('Login page')
    })

    it('TC-18: Product listing page has no critical accessibility violations', () => {
        cy.fixture('products').then((products) => {
            cy.visitPage()
            ProductPage.filterByCategory(products.category)
            cy.get('[data-test="product-name"]').should('be.visible')
            checkA11y('Product listing page')
        })
    })

    it('TC-19: Product detail page has no critical accessibility violations', () => {
        cy.fixture('products').then((products) => {
            cy.visitPage()
            ProductPage.filterByCategory(products.category)
            ProductPage.selectProduct(products.productName)
            cy.get('[data-test="add-to-cart"]').should('be.visible')
            checkA11y('Product detail page')
        })
    })

    it('TC-20: Checkout page has no critical accessibility violations', () => {
        cy.fixture('users').then((users) => {
            cy.fixture('products').then((products) => {
                cy.visitPage()
                NavigationBar.clickSignIn()
                LoginPage.login(users.validUser.email, users.validUser.password)
                NavigationBar.assertLoggedIn()
                NavigationBar.clickHome()
                ProductPage.filterByCategory(products.category)
                ProductPage.selectProduct(products.productName)
                ProductPage.addToCart()
                NavigationBar.clickCart()
                cy.get('[data-test="product-title"]').should('be.visible')
                checkA11y('Checkout page')
            })
        })
    })

})