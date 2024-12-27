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

Mocking basics: (Mocking is primarily about isolating the logic of the unit you are testing. Mocking ensures that your  tests focus purely on what your unit does and not on what its)
<!-- jest.mock('./myModule'); // Mock the entire 'myModule' module

// Or mock a specific export
jest.mock('./myModule', () => ({
myFunction: jest.fn(), 
})); -->

Red, Green, Refactor and Jest mocks:
Projects for testability:

1. Unit Tests: These tests focus on individual units of code, such as functions or classes, in isolation. They aim to verify that each unit performs its intended task correctly.
2. Integration Tests: These tests examine how different units of code interact with each other. They ensure that the components work together seamlessly as a whole.
3. End-to-End Tests: These tests simulate real-world user scenarios, verifying that the entire system works as expected from start to finish.