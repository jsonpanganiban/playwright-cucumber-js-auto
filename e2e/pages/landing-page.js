const locators = { MENU: '.js-top-bar-menu-notification' };
const PAGE_TITLE = 'Internet Banking';

export class LandingPage {
  static async navigateToLandingPage() {
    return page.goto(global.BASE_URL);
  }

  static async verifyLandingPageIsDisplayed() {
    return expect(await page.title()).to.equal(PAGE_TITLE);
  }

  static async navigateToMenu(menuItem) {
    await page.click(locators.MENU);
    await page.click(`//nav[@class="MainMenu-nav"]//span[text()="${menuItem}"]`);
  }
}
