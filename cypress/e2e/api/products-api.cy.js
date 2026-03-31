describe('API - Products', () => {

    let apiUrl

    before(() => {
        cy.task('getApiUrl').then((url) => {
            apiUrl = url
        })
    })

    it('TC-12: GET all products returns 200', () => {
        cy.logStep('Send GET request to /products')
        cy.request({
            method: 'GET',
            url: `${apiUrl}/products`
        }).then((response) => {
            cy.logVerification('Response status is 200')
            expect(response.status).to.eq(200)
            cy.logVerification('Response body contains current_page')
            expect(response.body).to.have.property('current_page')
            cy.logVerification('Response body contains data array')
            expect(response.body).to.have.property('data')
            cy.logVerification('Data is an array')
            expect(response.body.data).to.be.an('array')
            cy.logVerification('Data array is not empty')
            expect(response.body.data).to.have.length.greaterThan(0)
            cy.logVerification('Response body contains total')
            expect(response.body).to.have.property('total')
            cy.logInfo(`Total products returned: ${response.body.total}`)
        })
    })

    it('TC-13: GET single product returns correct data', () => {
        cy.fixture('products').then((products) => {
            cy.logStep('Navigate to home page and select a product to get a real ID')
            cy.visitPage()
            cy.get('[data-test^="category-"]').should('be.visible')
            cy.contains('label', products.category).click()
            cy.get('[data-test="product-name"]').contains(products.productName).click()
            cy.logStep('Extract product ID from URL')
            cy.url().then((url) => {
                const productId = url.split('/product/')[1]
                cy.logInfo(`Product ID extracted from URL: ${productId}`)
                cy.logStep(`Send GET request to /products/${productId}`)
                cy.request({
                    method: 'GET',
                    url: `${apiUrl}/products/${productId}`
                }).then((response) => {
                    cy.logVerification('Response status is 200')
                    expect(response.status).to.eq(200)
                    cy.logVerification('Response body contains id')
                    expect(response.body).to.have.property('id', productId)
                    cy.logVerification('Response body contains name')
                    expect(response.body).to.have.property('name')
                    cy.logVerification('Response body contains price')
                    expect(response.body).to.have.property('price')
                    cy.logVerification('Response body contains category')
                    expect(response.body).to.have.property('category')
                    cy.logVerification('Response body contains brand')
                    expect(response.body).to.have.property('brand')
                    cy.logInfo(`Product name: ${response.body.name}`)
                    cy.logInfo(`Product price: ${response.body.price}`)
                })
            })
        })
    })

    it('TC-14: GET categories returns valid list', () => {
        cy.logStep('Send GET request to /categories/tree')
        cy.request({
            method: 'GET',
            url: `${apiUrl}/categories/tree`
        }).then((response) => {
            cy.logVerification('Response status is 200')
            expect(response.status).to.eq(200)
            cy.logVerification('Response body is an array')
            expect(response.body).to.be.an('array')
            cy.logVerification('Categories array is not empty')
            expect(response.body).to.have.length.greaterThan(0)
            cy.logVerification('First category contains id')
            expect(response.body[0]).to.have.property('id')
            cy.logVerification('First category contains name')
            expect(response.body[0]).to.have.property('name')
            cy.logVerification('First category contains sub_categories')
            expect(response.body[0]).to.have.property('sub_categories')
            cy.logInfo(`Total categories returned: ${response.body.length}`)
        })
    })

})