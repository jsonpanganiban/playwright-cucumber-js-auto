// import { expect } from '@playwright/test';

const locators = {
  AMOUNT_INPUT: '[name="amount"]',
  PAY_SUBMIT_BUTTON: '[data-monitoring-label="Bill Payment Form Submit"]',
  CONFIRM_BUTTON: '[data-testid="confirm-button"]',
  FROM_ACCOUNT_OPTION: '[data-testid="from-account-chooser"]',
  TO_ACCOUNT_OPTION: '[data-testid="to-account-chooser"]',
  TRANSFER_BUTTON: 'button[data-monitoring-label="Transfer Form Submit"]',
  TRANSFER_SUCCESSFUL_MESSAGE: '//span[text()="Transfer successful"]',
};

export class PaymentsPage {
  static async selectFromAccount(accountName) {
    await page.click(locators.FROM_ACCOUNT_OPTION);
    await this.selectAccount(accountName);
  }

  static async selectToAccount(tabName, accountName) {
    await page.click(locators.TO_ACCOUNT_OPTION);
    await page.locator('span', { hasText: `${tabName}` }).click();
    await this.selectAccount(accountName);
  }

  static async selectAccount(accountName) {
    await page.locator('p', { hasText: `${accountName}` }).click();
  }

  static async enterAmount(amount) {
    await page.waitForSelector(locators.AMOUNT_INPUT);
    await page.fill(locators.AMOUNT_INPUT, amount);
  }

  static async getAvailableBalance(accountName) {
    const availableBalance = await page
      .locator(
        `//button[@data-monitoring-label="Transfer Form Account Card"]//p[text()="${accountName}"]/following-sibling::p[1]`,
      )
      .innerText();
    const lastIndex = availableBalance.lastIndexOf(' ');
    availableBalance.substring(0, lastIndex);
    return availableBalance;
  }

  static async submitTransfer() {
    await page.click(locators.TRANSFER_BUTTON);
  }

  static async verifySuccessfulTransfer() {
    await page.waitForSelector(locators.TRANSFER_SUCCESSFUL_MESSAGE);
    const result = await page.locator(locators.TRANSFER_SUCCESSFUL_MESSAGE).isVisible();
    await expect(result).to.be.true;
  }

  static async getActualBalance(accountName) {
    const actualAccountBalance = await page
      .locator(
        `//h3[contains(@title,"${accountName}")]/parent::span/following-sibling::span[@class="account-balance"]`,
      )
      .innerText();
    return actualAccountBalance;
    // expect(actualEverydayBalance).to.equal(expectedBalance);
    // await expect(
    //   page.locator(`//h3[@title="${accountName}"]/following::span[@class="account-balance"][1]`),
    // ).toHaveText(expectedBalance);
  }
}
