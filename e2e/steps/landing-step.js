const { Given, When, Then } = require('@cucumber/cucumber');
const { LandingPage } = require('../pages/landing-page');
const { PayeesPage } = require('../pages/payees-page');

Given('I am on the landing page', async () => {
  await LandingPage.navigateToLandingPage();
  await LandingPage.verifyLandingPageIsDisplayed();
});

When('I navigate to Payees via navigation menu', async () => {
  await LandingPage.navigateToMenu('Payees');
});

Then('I should be able to see the Payees screen', async () => {
  await PayeesPage.verifyPageesPage();
});
