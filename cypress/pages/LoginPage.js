class LoginPage {
    // Selectors
    emailInput = '[data-test="email"]'
    passwordInput = '[data-test="password"]'
    loginButton = '[data-test="login-submit"]'
    errorMessage = '[data-test="login-error"]'
    navUserMenu = '[data-test="nav-menu"]'
    emailError = '[data-test="email-error"]'
    passwordError = '[data-test="password-error"]'

    // Actions
    visit() {
        cy.logStep('Navigate to login page URL')
        cy.visit('https://practicesoftwaretesting.com/auth/login')
    }

    fillEmail(email) {
        cy.get(this.emailInput).clear()
        cy.logEnterValueToField('email', 'email')
        cy.get(this.emailInput).type(email)
        cy.logInfo(`Email entered: ${email}`)
    }

    fillPassword(password) {
        cy.get(this.passwordInput).clear()
        cy.logEnterValueToField('password', 'password')
        cy.get(this.passwordInput).type(password)
        cy.logInfo(`Password entered: ${password}`)
    }

    submit() {
        cy.logClickButton('login submit')
        cy.get(this.loginButton).click()
    }

    submitAndWait() {
        cy.logClickButton('login submit')
        cy.get(this.loginButton).click()
        cy.url().should('not.include', '/auth/login')
    }

    login(email, password) {
        this.fillEmail(email)
        this.fillPassword(password)
        this.submitAndWait()
    }

    // Assertions
    assertLoggedIn() {
        cy.logVerification('User navigation menu is visible — user is logged in')
        cy.get(this.navUserMenu).should('be.visible')
    }

    assertErrorVisible() {
        cy.logVerification('Error message element is visible on the page')
        cy.get(this.errorMessage).should('be.visible')
    }

    assertEmptyFieldErrors() {
        cy.logVerification('Email required error is visible')
        cy.get(this.emailError).should('be.visible')
        cy.logVerification('Password required error is visible')
        cy.get(this.passwordError).should('be.visible')
    }
}

export default new LoginPage()