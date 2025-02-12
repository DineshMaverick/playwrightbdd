import { Given } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;

async function getWindowSize(page: Page) {
  const windowSize = await page.evaluate(() => {
    return {
      width: window.outerWidth,
      height: window.outerHeight
    };
  });
  return windowSize;
}

Given('user Launch the browser {string} in maximized mode and navigate to the URL {string}', async (browserType: string, url: string) => {
  const browserStackCaps = {
    browser: browserType,
    os: 'Windows',
    os_version: '10',
    name: 'Playwright Test',
    build: 'playwright-build-1',
    'browserstack.local': 'false',
    'browserstack.user': "dineshbabuganesa_lVaRbg",
    'browserstack.key': "cw6SZ2Zd1SZxR4eCiwRH",
  };

  try {
    if (browserType === 'chromium' || browserType === 'edge') {
      browser = await chromium.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(browserStackCaps))}`
      });
    } else if (browserType === 'firefox') {
      browser = await firefox.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(browserStackCaps))}`
      });
    } else if (browserType === 'safari') {
      browser = await webkit.connect({
        wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(browserStackCaps))}`
      });
    }

    context = await browser.newContext();
    page = await context.newPage();
    const screenSize = await getWindowSize(page);

    await page.setViewportSize({ width: screenSize.width, height: screenSize.height });
    await page.goto(url);
  } catch (error) {
    console.error('Error launching browser:', error);
  }
});
