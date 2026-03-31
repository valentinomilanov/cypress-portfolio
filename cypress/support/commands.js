Cypress.Commands.add('visitPage', (path = '/') => {
  cy.logStep(`Navigate to ${path}`)
  cy.visit(path)
})