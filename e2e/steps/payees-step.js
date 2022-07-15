import { Given, When, Then } from '@cucumber/cucumber';
import { LandingPage } from '../pages/landing-page';
import { PayeesPage } from '../pages/payees-page';

Given('I am on the Payees page', async () => {
  await LandingPage.navigateToLandingPage();
  await LandingPage.navigateToMenu('Payees');
});

When('I add new payee details:', async (table) => {
  const name = table.rowsHash().Name;
  const bank = table.rowsHash().Bank;
  const branch = table.rowsHash().Branch;
  const account = table.rowsHash().Account;
  const suffix = table.rowsHash().Suffix;
  await PayeesPage.addPayeeDetails(name, bank, branch, account, suffix);
});

Then('Payee added message is displayed, and payee details is added', async (table) => {
  const payeeName = table.rowsHash().Name;
  const payeeAccount = table.rowsHash().Details;
  await PayeesPage.verifyPayeeDetails(payeeName, payeeAccount);
});

When('Payee name is not populated', async () => {
  await PayeesPage.addPayee();
  await PayeesPage.submitPayeeDetails();
});

Then('Mandatory field error is displayed', async () => {
  await PayeesPage.verifyMandatoryErrorMessage();
});

When('Mandatory fields are populated', async (table) => {
  const name = table.rowsHash().Name;
  await PayeesPage.enterNewPayeeName(name);
});

Then('Mandatory field error is not displayed', async () => {
  await PayeesPage.verifyMandatoryErrorMessageIsNotDisplayed();
});

Then('list is sorted in ascending order by default', async () => {
  await PayeesPage.verifyListIsSortedByAscendingOrder();
});

When('I sort order by name', async () => {
  await PayeesPage.sortByName();
});

Then('list is sorted in descending order', async () => {
  await PayeesPage.verifyListIsSortedByDescendingOrder();
});
