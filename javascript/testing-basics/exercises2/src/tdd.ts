// TDD Workflow Recap
// Red: Write a failing test.
// Green: Write the minimum code to make the test pass.
// Refactor(Blue): Improve the code while keeping the tests green if necessary.

// Sum of two numbers
export const sum = (num1: number, num2: number): number => num1 + num2;

// String is a palindrome
export const isPalindrome = (str: string): boolean => str.toLowerCase().split("").reverse().join("") === str.toLowerCase();

// Factorial
export const factorial = (num: number): number => {
  if (num < 0) throw new Error("Negative number not allowed");
  if (num === 0) return 1;

  let result = 1;

  for (let i = 1; i < num; num -= 1) {
    result *= num;
  }

  return result;
};

// FizzBuzz
export const fizzBuzz = (num: number): string => {
  if ((num % 3 === 0) && (num % 5 === 0)) return "fizzbuzz";
  if (num % 3 === 0) return "fizz";
  if (num % 5 === 0) return "buzz";

  return `${num}`;
};
