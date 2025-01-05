"use strict";
// TDD Workflow Recap
// Red: Write a failing test.
// Green: Write the minimum code to make the test pass.
// Refactor: Improve the code while keeping the tests green if necessary.
Object.defineProperty(exports, "__esModule", { value: true });
exports.fizzBuzz = exports.factorial = exports.isPalindrome = exports.sum = void 0;
// Sum of two numbers
const sum = (num1, num2) => num1 + num2;
exports.sum = sum;
// String is a palindrome
const isPalindrome = (str) => {
    return str.toLowerCase().split("").reverse().join("") === str.toLowerCase();
};
exports.isPalindrome = isPalindrome;
const factorial = (num) => {
    if (num < 0)
        throw new Error("Negative number not allowed");
    if (num === 0)
        return 1;
    let result = 1;
    for (let i = 0; i < num; num -= 1) {
        result *= num;
    }
    return result;
};
exports.factorial = factorial;
const fizzBuzz = (num) => {
    if ((num % 3 === 0) && (num % 5 === 0))
        return "fizzbuzz";
    if (num % 3 === 0)
        return "fizz";
    if (num % 5 === 0)
        return "buzz";
    return num.toString();
};
exports.fizzBuzz = fizzBuzz;
