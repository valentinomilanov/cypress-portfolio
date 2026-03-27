class NavigationBar {
    // Selectors
    navUserMenu = '[data-test="nav-menu"]'
    navSignOut = '[data-test="nav-sign-out"]'
    navSignIn = '[data-test="nav-sign-in"]'
    navCart = '[data-test="nav-cart"]'
    navSignIn = '[data-test="nav-sign-in"]'
    navHome = '[data-test="nav-home"]'

    // Actions
    clickSignIn() {
        cy.logClickButton('sign in')
        cy.get(this.navSignIn).click()
    }

    clickHome() {
        cy.logClickButton('home')
        cy.get(this.navHome).click()
    }
    openUserMenu() {
        cy.logClickButton('user menu')
        cy.get(this.navUserMenu).click()
    }

    clickLogout() {
        cy.logClickButton('logout')
        cy.get(this.navSignOut).click()
    }

    logout() {
        this.openUserMenu()
        this.clickLogout()
    }

    clickCart() {
        cy.logClickButton('cart')
        cy.get(this.navCart).click()
    }

    // Assertions
    assertLoggedOut() {
        cy.logVerification('User is logged out — sign in link is visible')
        cy.get(this.navSignIn).should('be.visible')
    }

    assertLoggedIn() {
        cy.logVerification('User is logged in — user menu is visible')
        cy.get(this.navUserMenu).should('be.visible')
    }

}

export default new NavigationBar()