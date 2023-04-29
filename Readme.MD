  Author: DineshBabu
  Frameowrk: Playwright BDD
  
  
#### Steps to use
##### 1. Installation

Playwright framework requires [Node.js](https://nodejs.org/) v14+ to run.

Installing the dependencies.
```sh
npm ci
```
##### 2. Test creation
- Test scenarios are organized into features and these feature files should be placed inside features folder.
- Step definitions connect Gherkin steps in feature files to programming code. A step definition carries out the action that should be performed by the scenario steps. These step definitions should placed inside steps folder in different packages.
- For web UI based tests maintain all the selectors inside pages folder.

##### 3. Execution
To run test scenarios use below command.
```sh
npm run test
```
To run specific scenario, use tags command. Below are few examples.
```sh
npm run test:tags @sanity
npm run test:tags "@calculator or @author"
npm run test:tags "@rest and @author"
```
To dry run test scenarios use below command.
```sh
npm run dry:test
```
To rerun the failed test scenarios use below command.
```sh
npm run failed:test
```
To change any environment configuration in .env file at run time use set command.
Eg: To change browser to Firefox use below command
```sh
set BROWSER=firefox
```
Similar command can be used to update other environment configuration

To generate HTML and Cucumber report use below command
```sh
npm run report
```
##### 4. Report & Logs
Cucumber HTML report will be present inside
```sh
test-results/reports/cucumber.html
```
HTML report will be present inside
```sh
test-results/reports/html/index.html
```
Execution log will be present in the log file.
```sh
test-results/logs/execution.log
