
import { sum, isPalindrome, factorial, fizzBuzz } from "../src/tdd"

// Sum of two numbers
describe("sum()", () => {
  it("adds two positive numbers", () => expect(sum(1, 2)).toBe(3));

  it("adds two negative numbers", () => expect(sum(-1, -2)).toBe(-3));

  it("adds one or two zeroes", () =>  {
    expect(sum(0, 1)).toBe(1);
    expect(sum(0, 0)).toBe(0);
  });
});

// String is a palindrome
describe("isPalindrome()", () => {
  it("returns true for a palindrome string", () => expect(isPalindrome("madam")).toBe(true));

  it("is case insensitive", () => expect(isPalindrome("Madam")).toBe(true));

  it("returns false for a non-palindrome string", () => expect(isPalindrome("hello")).toBe(false));
});

// factorial
describe("factorial()", () => {
  it("throws an error for negative number", () => expect(() => factorial(-1)).toThrow("Negative number not allowed"))

  it("returns 1 for 0", () => expect(factorial(0)).toBe(1));

  it("returns correct factorial", () => expect(factorial(5)).toBe(120));
});

// FizzBuzz
describe("fizzBuzz()", () => {
  it("returns 'fizzbuzz' for number that is both divisible by 3 and 5", () => expect(fizzBuzz(15)).toBe("fizzbuzz"));

  it("returns 'fizz' for number that is divisible by 3", () => expect(fizzBuzz(6)).toBe("fizz"));

  it("returns 'buzz' for number that is divisible by 5", () => expect(fizzBuzz(10)).toBe("buzz"));

  it("returns the inputted number as string when no conditions match", () => expect(fizzBuzz(7)).toBe("7"));
});