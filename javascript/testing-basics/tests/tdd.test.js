"use strict";
// Core rules of TDD
Object.defineProperty(exports, "__esModule", { value: true });
// In Test-Driven Development (TDD), you should set up the import for the unit you are about to test even before implementing the unit. This is a key part of the process and ensures that your test is ready to execute once you write the code for the unit.
// 1. Write a test first (including importing the new feature or functionality before its implementation)
// Always start by writing a test for a new feature or functionality.
// The test should define the expected behavior of the code.
const tdd_1 = require("../src/tdd");
describe("add function", () => {
    const testCases = [
        { num1: 0, num2: 1, expected: 1 },
        { num1: 0, num2: 0, expected: 0 },
        { num1: -1, num2: -2, expected: -3 },
    ];
    for (let i = 0; i < testCases.length; i += 1) {
        const { num1, num2, expected } = testCases[i];
        it(`adds ${num1} + ${num2} to equal ${expected}`, () => {
            // Assertion
            expect((0, tdd_1.add)(num1, num2)).toBe(expected);
        });
    }
});
// 2. Run the Test and Watch It Fail:
// Ensure the test fails because the feature hasn't been implemented yet.
// This step verifies that the test is meaningful and not a false positive.
// Go to the imported module ("../src/tdd") to see next steps
