const browserOptions = {
  slowMo: 0,
  args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  firefoxUserPrefs: {
    'media.navigator.streams.fake': true,
    'media.navigator.permission.disabled': true,
  },
  headless: false,
};

export const config = {
  browser: process.env.BROWSER || 'chromium',
  browserOptions,
  IMG_THRESHOLD: { threshold: 0.4 },
  BASE_API_URL: 'https://www.demo.bnz.co.nz/client/',
};

Object.assign(global, {
  BASE_URL: 'https://www.demo.bnz.co.nz/client/',
});
