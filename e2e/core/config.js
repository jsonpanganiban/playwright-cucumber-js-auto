const browserOptions = {
  slowMo: 0,
  args: [
    '--use-fake-ui-for-media-stream',
    '--use-fake-device-for-media-stream',
    '--no-sandbox',
    '--disable-dev-shm-usage',
  ],
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
  recordVideos: process.env.PWVIDEO || false,
  defaultTimeout: 60 * 1000, // milliseconds
  runSlow: 1000, // milliseconds
};

Object.assign(global, {
  BASE_URL: process.env.BASE_URL || 'https://www.demo.bnz.co.nz/client/',
});

module.exports = { config };
