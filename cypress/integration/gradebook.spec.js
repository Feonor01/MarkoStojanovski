const locators = require("../fixtures/locators.json")
const data = require("../fixtures/data.json")


describe("gradebook", () => {
    before(() => {
        cy.visit('https://gradebook.vivifyideas.com/login#')
        //cy.get("a[href='/login']").click()
    })
    it('login', () => {
        cy.get(locators.login.email).type(data.login.email)
        cy.get(locators.login.password).type(data.login.dataPassword)
        cy.get(locators.login.submit).click()
        cy.url().should('eq', 'https://gradebook.vivifyideas.com/gradebooks')
        //cy.get(locators.login.submit).should("not.exist")
    })
    
    it('create a profesor', () => {
        cy.get(locators.createProfesor.create).click()
        cy.get(locators.createProfesor.create2).click() 
        //cy.visit('https://gradebook.vivifyideas.com/create-professor')
        cy.get(locators.createProfesor.firstName).type(data.create.firstName)
        cy.get(locators.createProfesor.lastName).type(data.create.lastName)
        cy.get(locators.createProfesor.image).click()
        cy.get(locators.createProfesor.imageUrl).type(data.create.url)
        cy.get(locators.createProfesor.button).click()
        cy.get(locators.login.button).should("not.exist")

    })
    it('create a gradebook', () => {
        cy.intercept('POST', 'https://gradebook-api.vivifyideas.com/api/diaries', (req) => {
        }).as('succesfullCreate')
        cy.get(locators.createGradebook.createGrad).click()
        //cy.visit('https://gradebook.vivifyideas.com/create-professor')
        cy.get(locators.createGradebook.titleGradebook).type(data.createGradebook.gradebookTitle)
        cy.get(locators.createGradebook.profesforGradebook).select("Mare9 stoj9")
        //cy.get(locators.createGradebook.profesforGradebook).type(data.createGradebook.gradebookProfesor)
        cy.get(locators.createGradebook.button).click()
        cy.get(locators.login.button).should("not.exist")
        cy.wait('@succesfullCreate').then((interception) => {
            expect(interception.response.statusCode).to.equal(201)
            //galleryId = interception.response.body.id;
        })
    })
    it('create a student', () => {
        cy.get(locators.createStudent.myGradbook).click()
        //cy.visit('https://gradebook.vivifyideas.com/create-professor')
        //cy.get(locators.createStudent.addStudent).click()
        // cy.get(locators.createStudent.profesforGradebook).select("Mare3 stoj3")
        // cy.get(locators.createStudent.button).click()
        //cy.get(locators.login.submit).should("not.exist")
    })
})
