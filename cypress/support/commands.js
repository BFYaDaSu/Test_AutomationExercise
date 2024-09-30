// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("clickByText", (text) => {
  cy.contains(text).click();
});

Cypress.Commands.add("CheckURL", (URL) => {
  cy.url().should("eq", URL);
});

Cypress.Commands.add("clickByButton", (button) => {
  cy.get(button).click();
});

Cypress.Commands.add("AddData", (box, data) => {
  cy.get(box).type(data);
});

Cypress.Commands.add("SelectDropdown", (choice, select) => {
  cy.get(choice).select(select);
});

Cypress.Commands.add("SelectBirthday", () => {
  cy.SelectDropdown('[data-qa="days"]', "11");
  cy.SelectDropdown('[data-qa="months"]', "March");
  cy.SelectDropdown('[data-qa="years"]', "2003");
});

Cypress.Commands.add("FillAddress", () => {
  cy.AddData('[data-qa="company"]', "TestCompany");
  cy.AddData('[data-qa="address"]', "405 Bank St");
  cy.SelectDropdown('[data-qa="country"]', "Canada");
  cy.AddData('[data-qa="state"]', "Ontario");
  cy.AddData('[data-qa="city"]', "Ottawa");
  cy.AddData('[data-qa="zipcode"]', "K1H 7Z1");
});
