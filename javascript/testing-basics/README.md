# testing-basics

<!-- install jest for typescript -->
npm i -D jest typescript <!-- Prerequisites -->
npm i -D ts-jest @types/jest <!-- Installing -->
npx ts-jest config:init <!-- Creating config -->
npm test or npx jest  <!-- Running tests -->

jest.config.js file must look like this:
    <!-- module.exports = {
        preset: 'ts-jest',
        testEnvironment: 'node',
    }; -->

ts.config.json file must look like this:
    <!-- {
        "compilerOptions": {
            "target": "ES6",
            "module": "commonjs",
            "strict": true,
            "esModuleInterop": true,
            "skipLibCheck": true,
            "forceConsistentCasingInFileNames": true
        }
    } -->
* Note: You see it right. "module": "CommonJS" NOT "module": "es6" or similar

Test runners: (Jest, Mocha, Karma, Vitest, etc)

First tests:
What are tests?
Tests are automated checks that verify the behavior of a specific piece of code, ensuring it functions as expected. They are categorized into three main types:
1. Unit Tests: These tests focus on individual units of code, such as functions or classes, in isolation. They aim to verify that each unit performs its intended task correctly.
2. Integration Tests: These tests examine how different units of code interact with each other. They ensure that the components work together seamlessly as a whole.
3. End-to-End Tests: These tests simulate real-world user scenarios, verifying that the entire system works as expected from start to finish.

Mocking basics: (Mocking is primarily about isolating the logic of the unit you are testing(when your units(entities) are coupled). Mocking ensures that your  tests focus purely on what your unit does and not on what its). Mock tests are essential for effective unit testing, enabling developers to isolate code, control dependencies, and create reliable, efficient tests. By simulating interactions with external components, mocks help ensure that units of code function correctly in various scenarios, contributing to robust and maintainable software.
<!-- jest.mock('./myModule'); // Mock the entire 'myModule' module

// Or mock a specific export
jest.mock('./myModule', () => ({
myFunction: jest.fn(), 
})); -->
Red, Green, Refactor and Jest:

TTD (Test Driven Development):
Test-Driven Development (TDD) is a software development approach where tests are written before the actual code. TDD has a set of clear rules and principles designed to guide developers in writing reliable, maintainable code.
Test Driven Development is not the same thing as unit tests. Unit tests are a type of test. TDD is a coding technique.

Core Rules of TDD

1. Write a Test First:
Always start by writing a test for a new feature or functionality.
The test should define the expected behavior of the code.

2. Run the Test and Watch It Fail:
Ensure the test fails because the feature hasn't been implemented yet.
This step verifies that the test is meaningful and not a false positive.

3. Write the Minimum Code to Pass the Test:
Write just enough code to make the failing test pass.
Avoid implementing extra functionality or over-engineering.

4. Refactor the Code:
Once the test passes, refactor the code to improve its structure and readability while keeping the test green.
Ensure all tests still pass after refactoring.

5. Repeat the Cycle:
Add a new test for the next piece of functionality.
Follow the "Fail, Pass, Refactor" cycle for each new test.

Principles of TDD
Test Small Units:

1. Focus on testing individual functions or components in isolation.
Each test should cover a single aspect of functionality.
Keep Tests Simple and Fast:

2. Tests should run quickly to enable frequent feedback during development.
Avoid dependencies that make tests slow or brittle.
Red-Green-Refactor Workflow:

3. Red: Write a test and see it fail.
Green: Write code to make the test pass.
Refactor: Clean up the code without changing its behavior.
Write Meaningful Tests:

4. Ensure each test validates specific functionality and has a clear purpose.
Tests should fail for the right reasons and succeed when the functionality works as expected.
Maintain Test Coverage:

Aim for high test coverage but prioritize meaningful tests over superficial coverage.
Benefits of TDD
Improved Code Quality: Forces you to think about edge cases and functionality upfront.
Regression Prevention: Comprehensive test coverage ensures changes don't break existing functionality.
Refactoring Confidence: Safe refactoring without fear of breaking code.
Well-Defined Requirements: Writing tests first clarifies the desired behavior of the system.
Common TDD Missteps to Avoid
Skipping the "Fail" Step:

Writing code before the test fails undermines the purpose of TDD.
Writing Too Much Code:

Avoid implementing features not covered by the test.
Complex or Fragile Tests:

Tests should be simple and focused. Complex tests are harder to maintain.
Testing Implementation Details:

Focus on behavior rather than how the code is implemented.

In Test-Driven Development (TDD), you should set up the import for the unit you are about to test even before implementing the unit. This is a key part of the process and ensures that your test is ready to execute once you write the code for the unit.


