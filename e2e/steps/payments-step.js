import { Given, When, Then } from '@cucumber/cucumber';
import { PaymentsPage } from '../pages/payments-page';
import { LandingPage } from '../pages/landing-page';

const accounts = {
  EVERYDAY: 'Everyday',
  BILLS: 'Bills',
};

const tabs = {
  PAYEES: 'Payees',
  ACCOUNTS: 'Accounts',
  TAX: 'Tax',
};

Given('I navigate to Payments via navigation menu', async () => {
  await LandingPage.navigateToLandingPage();
  await LandingPage.navigateToMenu('Pay or transfer');
});

// eslint-disable-next-line no-template-curly-in-string
When('I transfer ${int} from Everyday account to Bills account', async (amount) => {
  this.everydayBalance = PaymentsPage.getAvailableBalance(accounts.EVERYDAY);
  await PaymentsPage.selectFromAccount(accounts.EVERYDAY);
  // this.billsBalance = PaymentsPage.getAvailableBalance(accounts.BILLS);
  await PaymentsPage.selectToAccount(tabs.ACCOUNTS, accounts.BILLS);
  await PaymentsPage.enterAmount(amount.toString());
  await PaymentsPage.submitTransfer();
});

Then('Transfer successful message is displayed', async () => {
  await PaymentsPage.verifySuccessfulTransfer();
});

Then('The current balance of Everyday account and Bills account are correct', async (table) => {
  const everyDayBalance = table.rowsHash().Everyday;
  const billsBalance = table.rowsHash().Bills;
  const everyDayBalanceActual = await PaymentsPage.getActualBalance(accounts.EVERYDAY);
  const billsBalanceActual = await PaymentsPage.getActualBalance(accounts.BILLS);
  expect(everyDayBalanceActual).to.equal(everyDayBalance);
  expect(billsBalanceActual).to.equal(billsBalance);
});
