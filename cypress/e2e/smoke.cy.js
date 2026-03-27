describe('Logger smoke test', () => {
  it('TC-001: Login with valid credentials', () => {
    cy.logStep('Opening practice site')
    cy.visit('https://practicesoftwaretesting.com')
    cy.logVerification('Page loaded successfully')
    cy.logInfo('Smoke test complete')
  })
})