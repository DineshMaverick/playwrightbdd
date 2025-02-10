import UIActions from "../../support/playwright/actions/UIActions";
import Assert from "../../support/playwright/asserts/Assert";
import {page1}  from "../../support/config/hooks";
import StringUtil from "../../support/utils/StringUtil";
//import Constants from "../constants/Constants";
import { test, expect,Browser,Page,chromium, BrowserContext} from '@playwright/test';
import { Given, Then, When } from "@cucumber/cucumber";


// Initializing the object (loginPage) ofS class (LoginPage)


export default class EmployeeUserPage 
{    
 
    constructor(private web: UIActions) { }
        
    private PIM_Link = '//a//span[text()="PIM"]';
    private Addemployee_Link = '//div//button[@class="oxd-button oxd-button--medium oxd-button--secondary"]';
    private Firstname_TEXTBOX = "First Name";
    private Middlename_TEXTBOX = "Middle Name";
    private Lastname_TEXTBOX = "Last Name";
    private Save_Button = "'button', { name: 'Save' }";
    private Employeelist_Link = '//div//a[text()="Employee List"]';
    private SearchName_textBox = 'input:below(:text("Employee Name"))';
    private Search_Button= "'button', { name: 'Search' }";
    private search_data= "xpath=//div[@class='orangehrm-container']//div[@class='oxd-table-card']";
    private search_edit= "xpath=//div[@class='orangehrm-container']//div[@class='oxd-table-card']//button[@class='oxd-icon-button oxd-table-cell-action-space']/i[@class='oxd-icon bi-pencil-fill']";
    private search_delete= "//div[@class='orangehrm-container']//div[@class='oxd-table-card']//button[@class='oxd-icon-button oxd-table-cell-action-space']/i[@class='oxd-icon bi-trash']";
  
    
  
  
    //test('Registration Page', async ({ page }) => {

    public async PIMpage()
    {
        await page1.waitForLoadState('domcontentloaded');
        await page1.waitForSelector(this.PIM_Link, {
            state: "visible",
        });
        await page1.locator(this.PIM_Link, {timeout: 9000}).click();
    }
    public async addEmployee(firstName: string, middleName: string, lastName: string, EmployeeID: string) 
    {
        await page1.waitForLoadState('domcontentloaded');
        await page1.waitForSelector(this.Addemployee_Link, {
            state: "visible",
        });
        await page1.locator(this.Addemployee_Link).click();
     
        await page1.getByPlaceholder(this.Firstname_TEXTBOX).click();
        await page1.getByPlaceholder(this.Firstname_TEXTBOX).fill(firstName);
        await page1.getByPlaceholder(this.Middlename_TEXTBOX).click();
        await page1.getByPlaceholder(this.Middlename_TEXTBOX).fill(middleName);
        await page1.getByPlaceholder(this.Lastname_TEXTBOX).click();
        await page1.getByPlaceholder(this.Lastname_TEXTBOX).fill(lastName);
       
   
    }
    public async editEmployee(firstName: string, middleName: string, lastName: string, EmployeeID: string) 
    {
      
        await page1.locator(this.Employeelist_Link).click();
     
        await​​ page1.locator(this.SearchName_textBox).first().fill('');
        await page1.locator(this.SearchName_textBox).first().click();
        await page1.getByLabel(this.SearchName_textBox).first().fill(firstName);
        await page1.getByRole(this.Search_Button).click();
        await page1.getByRole(this.search_data).click();
        await page1.getByPlaceholder(this.Firstname_TEXTBOX).click();
        await page1.getByPlaceholder(this.Firstname_TEXTBOX).fill(firstName);
        await page1.getByPlaceholder(this.Middlename_TEXTBOX).click();
        await page1.getByPlaceholder(this.Middlename_TEXTBOX).fill(middleName)
        await page1.getByPlaceholder(this.Lastname_TEXTBOX).click();
        await page1.getByPlaceholder(this.Lastname_TEXTBOX).fill(lastName);
   

    }
    public async deleteEmployee(firstName: string) 
    {
        await page1.waitForLoadState('domcontentloaded');
        await page1.locator(this.Employeelist_Link).click();
        await page1.locator(this.SearchName_textBox).first().click();
        await page1.getByLabel(this.SearchName_textBox).first().fill('dinesh');
        await page1.getByRole(this.Search_Button).click();
        await page1.getByRole(this.search_delete).click();
        
      
}
}