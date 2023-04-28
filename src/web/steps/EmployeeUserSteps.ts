import { Given, Then, When } from "@cucumber/cucumber";
import {page1}  from "../../support/config/hooks";
import LoginPage from "../pages/LoginPage";
import EmployeeUserPage from "../pages/EmployeeUserPage";
import SearchPage from "../pages/EmployeeUserPage";

Given('user Launch the browser {string}, {string}', async function (userName: string, password: string,) {
    // Write code here that turns the phrase above into concrete actions
    //await new LoginPage(page1).navigateToLoginScreen(userName,password);
             return 'pending';
  });
Given('user navigate to PIM page', async function () {
    // Write code here that turns the phrase above into concrete actions
            await new EmployeeUserPage(page1).PIMpage();
    //                return 'pending';
  });
When('the user enters the employee details {string}, {string}, {string}, {string}',
  async function (firstName: string, middleName: string, lastName: string, EmployeeID: string) {
             // Write code here that turns the phrase above into concrete actions
            await new EmployeeUserPage(page1).addEmployee(firstName,middleName,lastName,EmployeeID)
  });
Then('user should see able to enter all the fields {string}', async function (string) {
            // Write code here that turns the phrase above into concrete actions
            return 'pending';
  });
          
Given('user navigate to PIM page for editing the employee', async function () {
            // Write code here that turns the phrase above into concrete actions
            await new EmployeeUserPage(page1).PIMpage();
            // return 'pending';
 });
When('the user edits the employee details {string}, {string}, {string}, {string}', 
            async function (firstName: string, middleName: string, lastName: string, EmployeeID: string) {
                     // Write code here that turns the phrase above into concrete actions
            await new EmployeeUserPage(page1).editEmployee(firstName,middleName,lastName,EmployeeID)
  });
Then('user should see able to see the edited fields {string}', async function (string) {
                    // Write code here that turns the phrase above into concrete actions
            return 'pending';
  });
Given('user navigate to PIM page for deleting the employee', async function () {
                    // Write code here that turns the phrase above into concrete actions
            await new EmployeeUserPage(page1).PIMpage();
                    //                return 'pending';
  });
When('the user search the employee details delete the employee {string}', async function (firstName: string) {
                             // Write code here that turns the phrase above into concrete actions
            await new EmployeeUserPage(page1).deleteEmployee(firstName)
  });
Then('user should see able to delete the employee {string}', async function (string) {
                            // Write code here that turns the phrase above into concrete actions
            return 'pending';
  });
