# Danish's Technical Assessment
I am using Cypress to automate all the test cases. You may see the list of all the test scenarios [here](https://docs.google.com/document/d/1sjs0ypiCsYrryxQTU1OowKlPEMzhRmncHTVD1e9udrQ/edit?usp=sharing)

# Pre-Requisites
- Ensure you have [Node.js](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed. This will help with installing Cypress
- Ensure you have the latest version of [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress) installed
- Delete any existing staff records in the Staff Management page before running the test cases

# Folder Structure
Ideally Cypress should be installed in the root folder of the project but since I do not have access to the source code of the website I simply installed Cypress in an empty git repository

- `/cypress` - The main folder for Cypress which hosts all the related files/folders and should be located in the root of the project
- `/cypress/downloads` - Contains any downloaded files from running the script. This folder is ignored by git since it's not necessary to be included in the repository
- `/cypress/e2e` - Contains all the Cypress scripts for End to End testing
- `/cypress/fixtures` - Contains a set of data that can be used by the script
- `/cypress/screenshots` - Contains the screenshot for when a test case fails. This folder is ignored by git since it's not necessary to be included in the repository
- `/cypress/support` - Contains custom command files for the end to end scripts. Reusable functions are put in here for more readable & manageable code

# How to Run
> Execution through CMD
- Open CMD or Terminal of your choice and navigate to the project folder
- Enter in the command `npx cypress run --headed`
- Cypress runs on the Electron browser by default, if you would like to run with Chrome you can use this command `npx cypress run -b chrome --headed`
- At the end of the execution, you will see a table with all the passed, failed & skipped test cases in the terminal

> Execution through UI
- Open CMD or Terminal of your choice and navigate to the project folder
- Enter in the command `npx cypress open`
- Click on E2E Testing
- Select which browser you would like to test one and click on the Start E2E Testing button 
- Click on the staffmanagement.cy.js to run the scripts
- You can see the results of the test execution at the top left of the page

# Details & Explanation
- I have set the viewport height and width to 1920x1080 in the config file to better match the majority of monitor resolutions
- I have set the number of retries to 1 to prevent any flaky tests. This saves us from rerunning the test execution command again due to invalid issues
- I have tried my best to make the code reusable by creating custom commands in the `support/e2e.js` file
- There are 3 json files in the `fixtures/` folder:
  1. `accounts.json` is where the login credentials are stored. Ideally this should be in the cypress.env.json as a local variable since the best practice is to not upload any user credentials into the repository. But for the purposes of this assessment I have included my login credentials. You may change this to your credentials if you'd like.
  2. `elements.json` is where some of the object selectors are stored. I did this to make the code more readable since some of the CSS selectors are quite long. This also makes it easier to change selectors for certain elements that are used multiple times since we only need to change them in this file.
  3. `staff.json` is where the values for different types of staff are stored. Again this makes it easier to change the data since these values are reused many times.
- In the script, there are 3 separate `describe` blocks. One for Add, Edit & Delete staff which makes it easier to manage & maintain.
- I have used the `beforeEach` function where possible to run certain functions every time before each test case which helps reduce the lines of code make the code cleaner & more readable
