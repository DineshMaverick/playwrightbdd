
Feature: Scenarios related to add,edit and deletion of employees

    Background:
    @login 
        Scenario Outline: Login into the application
        
        Given user Launch the browser "<userName>", "<password>"
       
        
        Examples:
            | userName   | password   |
            | Admin      | admin123   | 
    @employeecreation
    Scenario Outline: Add a new employee
        
        Given user navigate to PIM page
        When the user enters the employee details "<firstName>", "<middleName>", "<lastName>", "<EmployeeID>"
        Then user should see able to enter all the fields "The details are entered successfully"
        
        Examples:
            | firstName | middleName | lastName | EmployeeID       | 
            | Dinesh7   | Babu       | Maverick | 0404             |

    @editemployee
     Scenario Outline: Edit a new employee
        
        Given user navigate to PIM page for editing the employee
        When the user edits the employee details "<firstName>", "<middleName>", "<lastName>", "<EmployeeID>"
        Then user should see able to see the edited fields "The details are edited  successfully"
        
        Examples:
            | firstName | middleName | lastName    | EmployeeID       | 
            | Dinesh12  | Babu1      | Ganesan1    | 0414             |
    @deletetemployee
     Scenario Outline: Delete a new employee
        
        Given user navigate to PIM page for deleting the employee
        When the user search the employee details delete the employee "<firstName>"
        Then user should see able to delete the employee "The employee is deleted  successfully"
        
    
