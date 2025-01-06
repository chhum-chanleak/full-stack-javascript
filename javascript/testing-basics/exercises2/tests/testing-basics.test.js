"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_basics_1 = require("../src/testing-basics");
describe("add()", () => {
    it("adds two positive numbers", () => {
        expect((0, testing_basics_1.add)(1, 2)).toBe(3);
    });
    it("adds two negative numbers", () => {
        expect((0, testing_basics_1.add)(-1, -2)).toBe(-3);
    });
    it("adds one or two zeroes", () => {
        expect((0, testing_basics_1.add)(0, 1)).toBe(1);
        expect((0, testing_basics_1.add)(0, 0)).toBe(0);
    });
});
describe("CapitalizedString class", () => {
    it("capitalizes a non-capitalized string", () => {
        const capitalizer = new testing_basics_1.CapitalizedString();
        expect(capitalizer.capitalize("hello")).toBe("Hello");
    });
    it("does not capitalize a capitalized string", () => {
        const capitalizer = new testing_basics_1.CapitalizedString();
        expect(capitalizer.capitalize("Hi")).toBe("Hi");
    });
});
describe("EvenNumberValidator class", () => {
    it("returns true for even number", () => {
        const evenNumberValidator = new testing_basics_1.EvenNumberValidator();
        expect(evenNumberValidator.isEven(0)).toBe(true);
    });
    it("works with negative number", () => {
        const evenNumberValidator = new testing_basics_1.EvenNumberValidator();
        expect(evenNumberValidator.isEven(-2)).toBe(true);
    });
    it("returns false for odd number", () => {
        const evenNumberValidator = new testing_basics_1.EvenNumberValidator();
        expect(evenNumberValidator.isEven(1)).toBe(false);
    });
});
describe("FinMaxNumber class", () => {
    it("returns the largest number among inputted numbers", () => {
        const findMaxNumber = new testing_basics_1.FindMaxNumber();
        expect(findMaxNumber.find(1, 3, 2)).toBe(3);
    });
    it("works with negative numbers", () => {
        const findMaxNumber = new testing_basics_1.FindMaxNumber();
        expect(findMaxNumber.find(-1, -3, -2)).toBe(-1);
    });
});
describe("OddNumberValidator", () => {
    it("returns true for odd number", () => {
        const oddNumberValidator = new testing_basics_1.OddNumberValidator();
        expect(oddNumberValidator.isOdd(1)).toBe(true);
    });
    it("works with negative number", () => {
        const oddNumberValidator = new testing_basics_1.OddNumberValidator();
        expect(oddNumberValidator.isOdd(-1)).toBe(true);
    });
    it("returns false for even number", () => {
        const oddNumberValidator = new testing_basics_1.OddNumberValidator();
        expect(oddNumberValidator.isOdd(0)).toBe(false);
    });
});
