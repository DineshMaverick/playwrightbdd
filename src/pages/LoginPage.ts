import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import StringUtil from "../../support/utils/StringUtil";
import {page1}  from "../../support/config/hooks";
import Constants from "../constants/Constants";
import { test, expect,Browser,Page,chromium, BrowserContext} from '@playwright/test';
import { Given, Then, When } from "@cucumber/cucumber";
import { Interface } from "readline";
export default class  LoginPage
{   
  constructor(private web: UIActions) { }
  private Username_textBox = "Username";
  private Password_textBox = 'Password';
  
  public async navigateToLoginScreen(userName: string, password: string,) 
  {
    let browser: Browser;
    let context: BrowserContext;
   
    
    browser = await chromium.launch({
      headless: false,
      channel: "chrome",
 
      
      
    })


  }
}