"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tdd_1 = require("../src/tdd");
// Sum of two numbers
describe("sum()", () => {
    it("adds two positive numbers", () => expect((0, tdd_1.sum)(1, 2)).toBe(3));
    it("adds two negative numbers", () => expect((0, tdd_1.sum)(-1, -2)).toBe(-3));
    it("adds one or two zeroes", () => {
        expect((0, tdd_1.sum)(0, 1)).toBe(1);
        expect((0, tdd_1.sum)(0, 0)).toBe(0);
    });
});
// String is a palindrome
describe("isPalindrome()", () => {
    it("returns true for a palindrome string", () => expect((0, tdd_1.isPalindrome)("madam")).toBe(true));
    it("is case insensitive", () => expect((0, tdd_1.isPalindrome)("Madam")).toBe(true));
    it("returns false for a non-palindrome string", () => expect((0, tdd_1.isPalindrome)("hello")).toBe(false));
});
// factorial
describe("factorial()", () => {
    it("throws an error for negative number", () => expect(() => (0, tdd_1.factorial)(-1)).toThrow("Negative number not allowed"));
    it("returns 1 for 0", () => expect((0, tdd_1.factorial)(0)).toBe(1));
    it("returns correct factorial", () => expect((0, tdd_1.factorial)(5)).toBe(120));
});
// FizzBuzz
describe("fizzBuzz()", () => {
    it("returns 'fizzbuzz' for number that is both divisible by 3 and 5", () => expect((0, tdd_1.fizzBuzz)(15)).toBe("fizzbuzz"));
    it("returns 'fizz' for number that is divisible by 3", () => expect((0, tdd_1.fizzBuzz)(6)).toBe("fizz"));
    it("returns 'buzz' for number that is divisible by 5", () => expect((0, tdd_1.fizzBuzz)(10)).toBe("buzz"));
    it("returns the inputted number as string when no conditions match", () => expect((0, tdd_1.fizzBuzz)(7)).toBe("7"));
});
