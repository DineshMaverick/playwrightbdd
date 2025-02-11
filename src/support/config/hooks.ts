import { Before, BeforeAll, AfterAll, After, AfterStep, setDefaultTimeout, ITestCaseHookParameter, Status, formatterHelpers, BeforeStep } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import WebBrowser from "../manager/Browser";
import fse from "fs-extra";
import UIActions from "../playwright/actions/UIActions";
import Log from "../logger/Log";

const timeInMin: number = 60 * 1000;
setDefaultTimeout(Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin);
let browser: Browser;
let page1: Page;

// Connect to BrowserStack and launch the browser
BeforeAll(async function () {
    console.log('Connecting to BrowserStack...');

    try {
        // BrowserStack capabilities
        const browserStackCaps = {
            browser: 'chrome',
            os: 'Windows',
            os_version: '10',
            name: 'Playwright Test',
            build: 'playwright-build-1',
            'browserstack.user': "dineshbabuganesa_lVaRbg",
            'browserstack.key': "cw6SZ2Zd1SZxR4eCiwRH",
        };

        browser = await chromium.connect({
            wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(browserStackCaps))}`
        });

        console.log('Connected to BrowserStack');
    } catch (error) {
        console.error(`Error connecting to BrowserStack: ${error.message}`);
        throw error;
    }
});

// Close the browser
AfterAll(async function () {
    try {
        if (browser) {
            await browser.close();
            console.log('Browser closed');
        }
    } catch (error) {
        console.error(`Error closing browser: ${error.message}`);
        throw error;
    }
});

// Create a new browser context and page per scenario
Before(async function ({ pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle });
    Log.testBegin(`${pickle.name}: ${line}`);

    this.context = await browser.newContext({
        viewport: null,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        recordVideo: process.env.RECORD_VIDEO === "true" ? { dir: './test-results/videos' } : undefined,
    });
    page1 = await this.context.newPage();
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page1.waitForLoadState('domcontentloaded');
    await page1.getByPlaceholder('Username').click();
    await page1.getByPlaceholder('Username').fill("Admin");
    await page1.getByPlaceholder('Password').fill("admin123");
    await page1.getByPlaceholder('Password').press('Enter');

    this.web = new UIActions(page1);
    // this.rest = new RESTRequest(page1);
    // this.soap = new SOAPRequest();
});
export { page1 };

// Capture screenshots before each step
BeforeStep(async function ({ pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle });
    const scenario = pickle.name;
    // const image = await page1.screenshot({ path: `./test-results/screenshots/${scenario} (${line}).png`, fullPage: true });
    // await this.attach(image.toString('base64'),'image/png' );
});

// Capture screenshots after each step
AfterStep(async function ({ result, pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle });
    const scenario = pickle.name;
    const image = await page1.screenshot({ path: `./test-results/screenshots/${scenario} (${line}).png`, fullPage: true });
    await this.attach(image, 'image/png');
});

// Cleanup after each scenario
After(async function ({ result, pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle });
    const status = result.status;
    const scenario = pickle.name;
    const videoPath = await page1.video()?.path();

    await page1.close();
    await this.context.close();

    if (process.env.RECORD_VIDEO === "true") {
        if (status === Status.FAILED) {
            fse.renameSync(videoPath, `./test-results/videos/${scenario}(${line}).webm`);
            await this.attach(fse.readFileSync(`./test-results/videos/${scenario}(${line}).webm`), 'video/webm');
        } else {
            fse.unlinkSync(videoPath);
        }
    }
    Log.testEnd(`${scenario}: ${line}`, status);
});
