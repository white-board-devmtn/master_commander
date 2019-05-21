Cypress.Cookies.defaults({
  whitelist: "session_username"
})

describe("Tanner's Test", () => {
  it('Can type into login fields', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').eq(0).type('q');
    cy.get('input').eq(1).type('q');
    cy.get('button').eq(0).click();
  })
  it('Can load dashboard page', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').eq(0).type('q');
    cy.get('input').eq(1).type('q');
    cy.get('button').eq(0).click();
    cy.get('.Navbar-icon-container').eq(1).click()
  })
  it('Can load class', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').eq(0).type('q');
    cy.get('input').eq(1).type('q');
    cy.get('button').eq(0).click();
    cy.get('.Navbar-icon-container').eq(1).click()
    cy.get('.class-tiles').eq(0).click()
  })
  it('Can view assignments', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').eq(0).type('q');
    cy.get('input').eq(1).type('q');
    cy.get('button').eq(0).click();
    cy.get('.Navbar-icon-container').eq(1).click()
    cy.get('.class-tiles').eq(0).click()
    cy.get('.option > button').eq(1).click()
  })
  it('Can view forum', () => {
    cy.visit('http://localhost:3000');
    cy.get('input').eq(0).type('q');
    cy.get('input').eq(1).type('q');
    cy.get('button').eq(0).click();
    cy.get('.Navbar-icon-container').eq(1).click()
    cy.get('.class-tiles').eq(0).click()
    cy.get('.option > button').eq(2).click()
  })
})