/* eslint-disable indent */
// eslint-disable-next-line object-curly-newline
import { Before, After, BeforeAll, setDefaultTimeout, AfterAll } from '@cucumber/cucumber';
import { chromium, webkit, firefox } from '@playwright/test';
import { removeFiles } from '../helpers/file-manager';
import { config } from './config';

setDefaultTimeout(process.env.PWDEBUG ? -1 : 60 * 1000);

const VIDEO = true;

const options = {
  args: ['--start-maximized'],
  acceptDownloads: true,
  recordVideo: VIDEO ? { dir: 'reports/videos' } : undefined,
};

BeforeAll(async () => {
  await removeFiles('reports/videos/*.webm');
  await removeFiles('reports/images/*.png');
  switch (config.browser) {
    case 'webkit':
      global.browser = await webkit.launch(config.browserOptions);
      break;
    case 'firefox':
      global.browser = await firefox.launch(config.browserOptions);
      break;
    default:
      global.browser = await chromium.launch(config.browserOptions);
      break;
  }
});

Before(async ({ pickle }) => {
  global.testName = pickle.name.replace(/\W/g, '-');
  global.context = await global.browser.newContext(options);
  global.page = await global.context.newPage();
  await page.goto(global.BASE_URL);
});

After(async () => {
  await global.page.close();
  await global.context.close();
});

After(async function (scenario) {
  if (scenario.result.status) {
    await this.attach(
      `Status: ${scenario.result.status}. Duration:${scenario.result.duration.seconds}s`,
    );
    const image = await global.page.screenshot({
      path: `reports/images/${global.testName}.png`,
    });
    await this.attach(image, 'image/png');
  }
});

AfterAll(async () => {
  await global.browser.close();
});
