import { Given } from '@cucumber/cucumber';
import { chromium, firefox, webkit, Browser, BrowserContext, Page } from 'playwright';

let browser: Browser;
let context: BrowserContext;
let page: Page;

Given('user Launch the browser {string} in maximized mode and navigate to the URL {string}', async (browserType: string, url: string) => {
    if (browserType === 'chromium') {
        browser = await chromium.launch({ headless: false });
    } else if (browserType === 'firefox') {
        browser = await firefox.launch({ headless: false });
    } else if (browserType === 'edge') {
        browser = await chromium.launch({ headless: false, channel: 'msedge' });
    } else if (browserType === 'safari') {
        browser = await webkit.launch({ headless: false });
    }

    context = await browser.newContext({
        viewport: null // This will maximize the browser window
    });
    page = await context.newPage();
    await page.goto(url);
});
