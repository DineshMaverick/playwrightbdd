import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests', // Directory where your test files are located
  use: {
    headless: false, // Set to true if you want to run tests in headless mode
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: ['--no-sandbox'],
        },
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        launchOptions: {
          args: ['--no-sandbox'],
        },
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        launchOptions: {
          args: ['--no-sandbox'],
        },
        contextOptions: {
          ignoreHTTPSErrors: true,
        },
      },
    },
  ],
  globalSetup: './global-setup.ts',

};

export default config;
