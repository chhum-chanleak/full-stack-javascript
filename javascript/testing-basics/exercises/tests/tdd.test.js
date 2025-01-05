"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tdd_1 = require("../src/tdd");
// Sum of two numbers
describe("sum()", () => {
    it("adds 2 positive numbers", () => {
        expect((0, tdd_1.sum)(1, 2)).toBe(3);
    });
    it("adds 2 negative numbers", () => {
        expect((0, tdd_1.sum)(-1, -2)).toBe(-3);
    });
    it("adds one negative number or and one positive number or vice versa", () => {
        expect((0, tdd_1.sum)(-1, 1)).toBe(0);
    });
    it("works with one or two zeros", () => {
        expect((0, tdd_1.sum)(0, 1)).toBe(1);
    });
});
// String is a palindrome
describe("isPalindrome()", () => {
    it("returns true for a palindrome string", () => {
        expect((0, tdd_1.isPalindrome)("madam")).toBe(true);
    });
    it("returns false for a non-palindrome string", () => {
        expect((0, tdd_1.isPalindrome)("hello")).toBe(false);
    });
    it("works with a capitalized string", () => {
        expect((0, tdd_1.isPalindrome)("Madam")).toBe(true);
        expect((0, tdd_1.isPalindrome)("Hello")).toBe(false);
    });
});
// factorial
describe("factorial()", () => {
    it("returns 1 for 0", () => {
        expect((0, tdd_1.factorial)(0)).toBe(1);
    });
    it("returns correct factorial for positive number", () => {
        expect((0, tdd_1.factorial)(3)).toBe(6);
    });
    it("throws an error for negative number", () => {
        expect(() => (0, tdd_1.factorial)(-1)).toThrow("Negative number not allowed");
    });
});
// FizzBuzz
describe("fizzBuzz()", () => {
    it("returns 'fizzbuzz' for a number which is both divisible by 3 and 5", () => {
        expect((0, tdd_1.fizzBuzz)(15)).toBe("fizzbuzz");
    });
    it("returns 'fizz' for a number which is divisible by 3", () => {
        expect((0, tdd_1.fizzBuzz)(6)).toBe("fizz");
    });
    it("returns 'buzz' for a number which is divisible by 5", () => {
        expect((0, tdd_1.fizzBuzz)(10)).toBe("buzz");
    });
    it("returns the number in string when no conditions match", () => {
        expect((0, tdd_1.fizzBuzz)(13)).toBe("13");
    });
});
