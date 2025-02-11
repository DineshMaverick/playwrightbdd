import { Before, BeforeAll, AfterAll, After,AfterStep, setDefaultTimeout, ITestCaseHookParameter, Status, formatterHelpers, BeforeStep } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import WebBrowser from "../manager/Browser";
import fse from "fs-extra";
import UIActions from "../playwright/actions/UIActions";
import Log from "../logger/Log";
import { buffer } from "stream/consumers";

const timeInMin: number = 60 * 1000;
setDefaultTimeout(Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin);
let browser;
let page1;

// launch the browser
BeforeAll(async function () {
    //browser = await chromium.launch();
    browser = await chromium.launch({ headless: false });
    console.log('Initializing Xvfb...');
    const { exec } = require('child_process');
    exec('Xvfb :99 -ac -screen 0 1024x768x16 &', (error: any, stdout: any, stderr: any) => {
      if (error) {
        console.error(`Xvfb error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Xvfb stderr: ${stderr}`);
        return;
      }
      console.log(`Xvfb stdout: ${stdout}`);
    });
  

});

// close the browser
AfterAll(async function () {
    await browser.close();
});

// Create a new browser context and page per scenario
Before(async function ({ pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle })
    Log.testBegin(`${pickle.name}: ${line}`);
   
    this.context = await browser.newContext({
        viewport: null,
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        recordVideo: process.env.RECORD_VIDEO === "true" ? { dir: './test-results/videos' } : undefined,
    });
    page1 = await this.context?.newPage();
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    await page1.waitForLoadState('domcontentloaded')
    await page1.getByPlaceholder('Username').click();
    await page1.getByPlaceholder('Username').fill("Admin");
    await page1.getByPlaceholder('Username').press('Tab');
    await page1.getByPlaceholder('Password').fill("admin123");
    await page1.getByPlaceholder('Password').press('Enter');
   
    this.web = new UIActions(this.page);
    //this.rest = new RESTRequest(this.page);
    //this.soap = new SOAPRequest();
});
export {page1};

BeforeStep(async function ({ pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle })
  
    const scenario = pickle.name;
    
   //const image = await this.page1?.screenshot({ path: `./test-results/screenshots/${scenario} (${line}).png`, fullPage: true });
   //const image18 = Buffer.from(image, 'base64');
   //await this.attach(image.toString('base64'),'image/png' );
   
});

//});
AfterStep(async function ({ result, pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle })
    const scenario = pickle.name;
    const image = await page1?.screenshot({ path: `./test-results/screenshots/${scenario} (${line}).png`, fullPage: true });
    await this.attach(image, 'image/png');
});


// Cleanup after each scenario
After(async function ({ result, pickle, gherkinDocument }: ITestCaseHookParameter) {
    const { line } = formatterHelpers.PickleParser.getPickleLocation({ gherkinDocument, pickle })
    const status = result.status;
    const scenario = pickle.name;
    const videoPath = await this.page1?.video()?.path();
    //if (status === Status.PASSED) {
       // const image = await page1?.screenshot({ path: `./test-results/screenshots/${scenario} (${line}).png`, fullPage: true });
        //await this.attach(image, 'image/png');
        //Log.error(`${scenario}: ${line} - ${status}\n${result.message}`);
    //}
    await this.page1?.close();
    await this.context?.close();
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
