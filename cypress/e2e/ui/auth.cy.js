import LoginPage from '../../pages/LoginPage.js'
import NavigationBar from '../../pages/NavigationBar.js'

describe('Authentication', () => {

    beforeEach(() => {
        cy.visitPage('/auth/login')
    })

    it('TC-2: Login with valid credentials', () => {
        cy.fixture('users').then((users) => {
            cy.logStep('Fill in login form with valid credentials')
            LoginPage.login(users.validUser.email, users.validUser.password)
            NavigationBar.assertLoggedIn()
        })
    })

    it('TC-3: Login with invalid password', () => {
        cy.fixture('users').then((users) => {
            cy.logStep('Fill in login form with invalid password')
            LoginPage.fillEmail(users.invalidUser.email)
            LoginPage.fillPassword(users.invalidUser.password)
            LoginPage.submit()
            LoginPage.assertErrorVisible()
        })
    })

    it('TC-4: Login with empty fields', () => {
        cy.logStep('Submit login form without filling any fields')
        LoginPage.submit()
        LoginPage.assertEmptyFieldErrors()
    })

    it('TC-5: Logout successfully', () => {
        cy.fixture('users').then((users) => {
            NavigationBar.clickSignIn()
            LoginPage.login(users.validUser.email, users.validUser.password)
            NavigationBar.assertLoggedIn()
            NavigationBar.logout()
            NavigationBar.assertLoggedOut()
        })
    })

})