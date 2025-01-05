import { sum, isPalindrome, factorial, fizzBuzz } from "../src/tdd"

// Sum of two numbers
describe("sum()", () => {
  it("adds 2 positive numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds 2 negative numbers", () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  it("adds one negative number or and one positive number or vice versa", () => {
    expect(sum(-1, 1)).toBe(0);
  });

  it("works with one or two zeros", () => {
    expect(sum(0, 1)).toBe(1);
  });
});

// String is a palindrome
describe("isPalindrome()", () => {
  it("returns true for a palindrome string", () => {
    expect(isPalindrome("madam")).toBe(true);
  }); 

  it("returns false for a non-palindrome string", () => {
    expect(isPalindrome("hello")).toBe(false);
  });

  it("works with a capitalized string", () => {
    expect(isPalindrome("Madam")).toBe(true);
    expect(isPalindrome("Hello")).toBe(false);
  });
});

// factorial
describe("factorial()", () => {
  it("returns 1 for 0", () => {
    expect(factorial(0)).toBe(1);
  });

  it("returns correct factorial for positive number", () => {
    expect(factorial(3)).toBe(6);
  });

  it("throws an error for negative number", () => {
    expect(() => factorial(-1)).toThrow("Negative number not allowed");
  });
});

// FizzBuzz
describe("fizzBuzz()", () => {
  it("returns 'fizzbuzz' for a number which is both divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("fizzbuzz");
  });

  it("returns 'fizz' for a number which is divisible by 3", () => {
    expect(fizzBuzz(6)).toBe("fizz");
  });

  it("returns 'buzz' for a number which is divisible by 5", () => {
    expect(fizzBuzz(10)).toBe("buzz");
  });

  it("returns the number in string when no conditions match", () => {
    expect(fizzBuzz(13)).toBe("13");
  });
});