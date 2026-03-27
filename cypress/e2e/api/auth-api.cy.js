describe('API - Authentication', () => {

    it('TC-10: POST login with valid credentials returns token', () => {
        cy.fixture('users').then((users) => {
            cy.fixture('api').then((api) => {
                cy.logStep('Send POST request to /users/login with valid credentials')
                cy.logInfo(`Email used: ${users.validUser.email}`)
                cy.request({
                    method: 'POST',
                    url: `${api.baseUrl}/users/login`,
                    body: {
                        email: users.validUser.email,
                        password: users.validUser.password
                    }
                }).then((response) => {
                    cy.logVerification('Response status is 200')
                    expect(response.status).to.eq(200)
                    cy.logVerification('Response body contains access_token')
                    expect(response.body).to.have.property('access_token')
                    cy.logVerification('Response body contains token_type: bearer')
                    expect(response.body).to.have.property('token_type', 'bearer')
                    cy.logVerification('Response body contains expires_in')
                    expect(response.body).to.have.property('expires_in')
                    cy.logVerification('Access token is a non-empty string')
                    expect(response.body.access_token).to.be.a('string').and.not.be.empty
                })
            })
        })
    })

    it('TC-11: POST login with invalid credentials returns 401', () => {
        cy.fixture('users').then((users) => {
            cy.fixture('api').then((api) => {
                cy.logStep('Send POST request to /users/login with invalid credentials')
                cy.logInfo(`Email used: ${users.invalidUser.email}`)
                cy.request({
                    method: 'POST',
                    url: `${api.baseUrl}/users/login`,
                    body: {
                        email: users.invalidUser.email,
                        password: users.invalidUser.password
                    },
                    failOnStatusCode: false
                }).then((response) => {
                    cy.logVerification('Response status is 401')
                    expect(response.status).to.eq(401)
                })
            })
        })
    })

})