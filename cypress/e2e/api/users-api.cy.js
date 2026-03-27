describe('API - Users', () => {

  it('TC-15: GET user profile with valid token returns 200', () => {
    cy.fixture('users').then((users) => {
      cy.fixture('api').then((api) => {
        cy.logStep('Send POST request to /users/login to get auth token')
        cy.logInfo(`Email used: ${users.validUser.email}`)
        cy.request({
          method: 'POST',
          url: `${api.baseUrl}/users/login`,
          body: {
            email: users.validUser.email,
            password: users.validUser.password
          }
        }).then((loginResponse) => {
          cy.logVerification('Login response status is 200')
          expect(loginResponse.status).to.eq(200)
          const token = loginResponse.body.access_token
          cy.logInfo('Access token retrieved successfully')
          cy.logStep('Send GET request to /users/me with Bearer token')
          cy.request({
            method: 'GET',
            url: `${api.baseUrl}/users/me`,
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            cy.logVerification('Response status is 200')
            expect(response.status).to.eq(200)
            cy.logVerification('Response body contains first_name')
            expect(response.body).to.have.property('first_name')
            cy.logVerification('Response body contains last_name')
            expect(response.body).to.have.property('last_name')
            cy.logVerification('Response body contains email')
            expect(response.body).to.have.property('email', users.validUser.email)
            cy.logVerification('Response body contains address')
            expect(response.body).to.have.property('address')
            cy.logVerification('Response body contains id')
            expect(response.body).to.have.property('id')
            cy.logInfo(`User profile retrieved for: ${response.body.first_name} ${response.body.last_name}`)
          })
        })
      })
    })
  })

})