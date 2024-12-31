// Core rules of TDD

// In Test-Driven Development (TDD), you should set up the import for the unit you are about to test even before implementing the unit. This is a key part of the process and ensures that your test is ready to execute once you write the code for the unit.

// 1. Write a test first (a failing on, including importing the new feature or functionality before its implementation)
// Always start by writing a test for a new feature or functionality.
// The test should define the expected behavior of the code.
import { add, reverseString, isPalindrome, fizzBuzz, isPrime, factorial } from "../src/tdd";

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
      expect(add(num1, num2)).toBe(expected);
    });
  }
});

describe("reverseString function", () => {
  it("reverses a given string", () => {
    // Assertion
    expect(reverseString("Hello")).toBe("olleH");
  });

  it("handles an empty string", () => {
    // Assertion
    expect(reverseString("")).toBe("");
  });
});

describe("isPalindrome", () => {
  it("returns true for a palindrome", () => {
    // Assertion
    expect(isPalindrome("madam")).toBe(true);
  });

  it("returns false for a non-palindrome", () => {
    // Assertion
    expect(isPalindrome("hello")).toBe(false);
  });

  it("returns true for a single character as a palindrome", () => {
    // Assertion
    expect(isPalindrome("b")).toBe(true);
  });

  it("handles an empty string as a palindrome", () => {
    // Assertion
    expect(isPalindrome("")).toBe(true);
  });  
});

describe("fizzBuzz", () => {
  // Assertion
  it("returns 'fizzbuzz' for a number that both is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("fizzbuzz");
  });

  it("returns 'fizz' for a number that is divisible by 3", () => {
    // Assertion
    expect(fizzBuzz(6)).toBe("fizz");
  });

  it("returns 'buzz' for a number that is divisible by 5", () => {
    // Assertion
    expect(fizzBuzz(10)).toBe("buzz");
  });

  it("returns the number as string if it's neither divisible by 3 nor 5", () => {
    // Assertion
    expect(fizzBuzz(8)).toBe("8");
  });
});

describe("isPrime", () => {
  it("returns true for prime number", () => {
    // Assertion
    expect(isPrime(7)).toBe(true);
  });

  it("returns false for a non-prime number", () => {
    expect(isPrime(4)).toBe(false);
  });

  it("returns false for number less than 2", () => {
    expect(isPrime(0)).toBe(false);
  });
});

describe("factorial", () => {
  it("returns 1 for 0!", () => {
    expect(factorial(0)).toBe(1);
  });

  it("returns the correct factorial for a positive number", () => {
    expect(factorial(4)).toBe(24);
  });

  it("throws an error for negative numbers", () => {
    expect(() => factorial(-1)).toThrow("Negative numbers are not allowed");
  });
});

// 2. Run the Test and Watch It Fails:
// Ensure the test fails because the feature hasn't been implemented yet.
// This step verifies that the test is meaningful and not a false positive.
// Go to the imported module ("../src/tdd") to see next steps