import { expect } from 'chai';
import { Utils } from '../helpers/utils';

const locators = {
  PAYEES_LABEL: '//nav[@class="MainMenu-nav"]//span[text()="Payees"]',
  SEARCH_PAYEES_INPUT: '[placeholder="Search payees"]',
  SUBMIT_BUTTON: '.Icon.SearchBoxIcon-1-1-5',
  ADD_BUTTON: '.CustomSection button.js-add-payee',
  PAYEE_NAME_BUTTON: '.js-payee-name-column',
  PAYEE_NAME_TEXT: '.js-payee-name',
  LAST_PAID_COLUMN: '.js-payee-last-paid-column',
  PAYEE_MODAL: '.js-modal-inner.Modal-content',
  PAYEE_NAME_INPUT: '#ComboboxInput-apm-name',
  NEW_PAYEE_BUTTON: '[data-cb-type="new-payee"]',
  PARTICULARS_INPUT: '#apm-this-particulars',
  FOR_YOU_CODE_INPUT: '#apm-this-code',
  FOR_YOU_REFERENCE_INPUT: '#apm-this-reference',
  FOR_PAYEE_CODE_INPUT: '#apm-that-code',
  FOR_PAYEE_REFERENCE_INPUT: '#apm-that-reference',
  ADD_PAYEE_BUTTON: '.js-submit.Button.Button--primary',
  BANK_INPUT: '#apm-bank',
  BRANCH_INPUT: '#apm-branch',
  ACCOUNT_INPUT: '#apm-account',
  SUFFIX_INPUT: '#apm-suffix',
  ERROR_MESSAGE: '.error-header',
};

export class PayeesPage {
  static async verifyPageesPage() {
    expect(await page.isVisible(locators.SEARCH_PAYEES_INPUT));
    expect(await page.isVisible(locators.ADD_BUTTON));
    expect(await page.isVisible(locators.PAYEE_NAME_BUTTON));
    expect(await page.isVisible(locators.LAST_PAID_COLUMN));
  }

  static async addPayeeDetails(payeeName, bank, branch, account, suffix) {
    this.addPayee();
    this.enterNewPayeeName(payeeName);
    await page.fill(locators.BANK_INPUT, bank);
    await page.fill(locators.BRANCH_INPUT, branch);
    await page.fill(locators.ACCOUNT_INPUT, account);
    await page.fill(locators.SUFFIX_INPUT, suffix);
    await this.submitPayeeDetails();
  }

  static async verifyPayeeDetails(payeeName, payeeAccount) {
    expect(await page.isVisible('span', { hasText: 'Payee added' }));
    expect(await page.isVisible(`//span[@class="js-payee-name"][text()="${payeeName}}"]`));
    expect(
      await page.isVisible(`//p[contains(@class, "js-payee-account")][text()="${payeeAccount}"]`),
    );
  }

  static async enterNewPayeeName(payeeName) {
    await page.click(locators.PAYEE_NAME_INPUT);
    await page.keyboard.type(payeeName);
    await page.click(locators.NEW_PAYEE_BUTTON);
  }

  static async addPayee() {
    await page.waitForSelector('.CustomSection');
    await page.click(locators.ADD_BUTTON);
  }

  static async submitPayeeDetails() {
    await page.click(locators.ADD_PAYEE_BUTTON);
  }

  static async verifyMandatoryErrorMessage() {
    const visible = await page.isVisible(locators.ERROR_MESSAGE);
    return expect(visible).to.equal(true);
  }

  static async verifyMandatoryErrorMessageIsNotDisplayed() {
    const visible = await page.isVisible(locators.ERROR_MESSAGE);
    return expect(visible).to.equal(false);
  }

  static async verifyListIsSortedByAscendingOrder() {
    expect(await this.getSortOrder()).to.equal('ascending');
  }

  static async verifyListIsSortedByDescendingOrder() {
    expect(await this.getSortOrder()).to.equal('descending');
  }

  static async sortByName() {
    await page.click(locators.PAYEE_NAME_BUTTON);
  }

  static async getSortOrder() {
    const rows = page.locator(locators.PAYEE_NAME_TEXT);
    const texts = await rows.allTextContents();
    const sortValue = Utils.getSortDirection(texts);
    return sortValue;
  }
}
