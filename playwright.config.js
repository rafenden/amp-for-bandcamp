export default {
  testDir: './tests',
  outputDir: '.playwright/results',
  fullyParallel: true,
  retries: 0,
  reporter: 'list',
  projects: [
    {
      name: 'chromium',
      use: {
        channel: 'chrome',
      },
    },
  ],
};
