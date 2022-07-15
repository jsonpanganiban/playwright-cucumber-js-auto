export default {
  requireModule: ['ts-node/register'],
  require: ['e2e/**/*.js'],
  format: [
    // 'message:e2e/reports/cucumber-report.ndjson',
    'json:reports/cucumber-report.json',
    'html:reports/report.html',
    'summary',
    'progress-bar',
    '@cucumber/pretty-formatter',
    // './src/support/reporters/allure-reporter.ts',
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
};
