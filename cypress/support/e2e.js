import './commands'
import elements from '../fixtures/elements.json'

Cypress.Commands.add('loginToAccount', (username, password) => {
  //Open Qashier website
  cy.visit('https://hq.qashier.com/#/login');

  //Enter username & password
  cy.get('input[type="text"]').type(username);
  cy.get('input[type="password"]').type(password);
  
  //Log into account
  cy.get('span').contains('Login').click();
});

Cypress.Commands.add('navigateToStaffManagement', () => {
  //Navigate to the Staff Management page
  cy.get(elements.staffManagementTab).contains('Staff Management').click();
  cy.get(elements.staffManagementOption).click();
});

Cypress.Commands.add('createNewStaff', (staffName, staffRate, staffPIN) => {
  //Click on Add Staff button
  cy.get(elements.addStaffButton).click();
  
  //Fill in staff details
  cy.fillInDetails(staffName, staffRate, staffPIN)
});

Cypress.Commands.add('updateExistingStaff', (staffName, staffRate, staffPIN) => {
  //Click on listed staff on dashboard
  cy.get('tbody').click();
  
  //Fill in staff details
  cy.fillInDetails(staffName, staffRate, staffPIN);
});

Cypress.Commands.add('fillInDetails', (staffName, staffRate, staffPIN) => {
  //Enter staff name
  cy.contains(elements.staffDetailsInput, "Name")
    .parent()
    .find('input')
    .clear()
    .type(staffName, { force: true });
  
  //Enter staff hourly rate
  cy.contains(elements.staffDetailsInput, "Hourly Rate ()")
    .parent()
    .find('input')
    .clear()
    .type(staffRate, { force: true });

  //Enter staff PIN
  cy.contains(elements.staffDetailsInput, "Staff PIN")
    .parent()
    .find('input')
    .clear()
    .type(staffPIN, { force: true });
  
  //Create/Update staff
  cy.get('span').contains('Confirm').click();
});

Cypress.Commands.add('verifyStaffDetails', (staffName, staffRate, staffPIN) => {
  //Verify staff name, rate & PIN on management dashboard
  cy.get('td').contains(staffName);
  cy.get('td').contains(staffRate);
  cy.get('td').contains(staffPIN);
});

Cypress.Commands.add('deleteStaff', () => {
  //Click on existing staff and delete
  cy.get('tbody').click();
  cy.get('span').contains('Delete').click();
  cy.get(elements.deleteConfirmationButton).last().click();

  //Verify staff has been deleted
  cy.get('div').contains('No data available');
});