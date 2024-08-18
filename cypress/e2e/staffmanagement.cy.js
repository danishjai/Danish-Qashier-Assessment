import staff from '../fixtures/staff.json'
import accounts from '../fixtures/accounts.json'
import elements from '../fixtures/elements.json'

describe('Staff Management', () => {
  beforeEach(() => {
    //Navigate to Qashier website and login to account
    cy.loginToAccount(accounts.username, accounts.password);

    //Navigate to the Staff Management Dashboard
    cy.navigateToStaffManagement();
  });
  
  describe('Add Staff Feature', () => {
    it('User is able to add a new staff successfully', () => {
      //Create a new staff with valid details
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Verify created staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Delete the newly created staff
      cy.deleteStaff();
    });

    it('User is shown an error when creating a new staff without staff name', () => {
      //Create a new staff with empty name
      cy.createNewStaff(staff.invalidStaffName, staff.newStaffRate, staff.newStaffPIN);

      //Verify error popup is shown
      cy.get('div').contains('Please type something');
    });
  
    it('User is not able to create a new staff with hourly rate less than 0.01', () => {
      //Create a new staff with invalid staff hourly rate
      cy.createNewStaff(staff.newStaffName, staff.invalidStaffRate, staff.newStaffPIN);

      //Close the staff form popup
      cy.get('i').contains('close').click();

      //Verify the staff was not created with an invalid hourly rate
      cy.get('div').contains('No data available');
    });

    it('User is shown an error when creating a new staff with invalid staff pin', () => {
      //Create a new staff with invalid staff PIN
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.invalidStaffPIN);

      //Verify error popup is shown
      cy.get('div').contains('PIN must contain exactly 4 digits');
    });

    it('User is able to cancel the action to create a new staff', () => {
      //Click on Add Staff button
      cy.get(elements.addStaffButton).click();

      //Close the staff form popup
      cy.get('i').contains('close').click();
    });
  });

  describe('Edit Staff Feature', () => {
    afterEach(() => {
      //Delete the updated staff
      cy.deleteStaff();
    });
    it('User is able to update an existing staff successfully', () => {
      //Create a new staff with valid details
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Verify created staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Update newly created staff details
      cy.updateExistingStaff(staff.updatedStaffName, staff.updatedStaffRate, staff.updatedStaffPIN);

      //Verify updated staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.updatedStaffName, staff.updatedStaffRate, staff.updatedStaffPIN);
    });

    it('User is shown an error when updating an existing staff without staff name', () => {
      //Create a new staff with valid details
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Verify created staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);

      //Update newly created staff details with empty name
      cy.updateExistingStaff(staff.invalidStaffName, staff.updatedStaffRate, staff.updatedStaffPIN);

      //Verify error popup is shown
      cy.get('div').contains('Please type something');

      //Close staff form popup
      cy.get('i').contains('close').click();
    });

    it('User is not able to update an existing staff with hourly rate less than 0.01', () => {
      //Create a new staff with valid details
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Verify created staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);

      //Update newly created staff details with invalid hourly rate
      cy.updateExistingStaff(staff.updatedStaffName, staff.invalidStaffRate, staff.updatedStaffPIN);

      //Close staff form popup
      cy.get('i').contains('close').click();

      //Verify staff details are NOT updated
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
    });

    it('User is shown an error when updating an existing staff with invalid staff pin', () => {
      //Create a new staff with valid details
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Verify created staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);

      //Update newly created staff details with invalid staff PIN
      cy.updateExistingStaff(staff.updatedStaffName, staff.updatedStaffRate, staff.invalidStaffPIN);

      //Verify error popup is shown
      cy.get('div').contains('PIN must contain exactly 4 digits');

      //Close staff form popup
      cy.get('i').contains('close').click();
    });

    it('User is able to cancel the action to update an existing staff', () => {
      //Create a new staff with valid details
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
    
      //Verify created staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);

      //Click on listed staff on dashboard
      cy.get('tbody').click();

      //Close the staff form popup
      cy.get('i').contains('close').click();
    });
  });

  describe('Delete Staff Feature', () => {
    it('User is able to delete an existing staff successfully', () => {
      //Create a new staff with valid details
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Verify created staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Delete created staff
      cy.deleteStaff();
    });

    it('User is able to cancel the action to delete an existing staff', () => {
      //Create a new staff with valid details
      cy.createNewStaff(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);
      
      //Verify created staff details on Staff Management Dashboard
      cy.verifyStaffDetails(staff.newStaffName, staff.newStaffRate, staff.newStaffPIN);

      //Click on existing staff and delete
      cy.get('tbody').click();
      cy.get('span').contains('Delete').click();

      //Click on Cancel button in confirmation popup
      cy.get('span').contains('Cancel').click();
    });
  });
});
