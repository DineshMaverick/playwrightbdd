import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.BROWSERSTACK_USERNAME = 'dineshbabuganesa_lVaRbg';
  process.env.BROWSERSTACK_ACCESS_KEY = 'cw6SZ2Zd1SZxR4eCiwRH';
}

export default globalSetup;
