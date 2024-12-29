"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_basics_1 = require("../src/testing-basics");
describe("addition function", () => {
    it("should add two numbers correctly", () => {
        expect((0, testing_basics_1.add)(2, 1)).toBe(3);
    });
    it("should add negative numbers", () => {
        expect((0, testing_basics_1.add)(-1, -2)).toBe(-3);
    });
    it("should add zero", () => {
        expect((0, testing_basics_1.add)(0, 2)).toBe(2);
    });
});
describe("validate method", () => {
    it("should return a capitalized character", () => {
        expect(testing_basics_1.capitalizer.capitalize("hi")).toBe("Hi");
    });
    it("should return undefined", () => {
        expect(testing_basics_1.capitalizer.capitalize("")).toBe(undefined);
    });
    it("does not change a string which starts with a capital letter", () => {
        expect(testing_basics_1.capitalizer.capitalize("Hello")).toBe("Hello");
    });
});
describe("isEven method", () => {
    it("should return true when an even number is passed", () => {
        expect(testing_basics_1.isEvenNumberValidator.isEven(18)).toBe(true);
    });
    it("should return false when an odd number is passed", () => {
        expect(testing_basics_1.isEvenNumberValidator.isEven(1)).toBe(false);
    });
    it("should return true for 0", () => {
        expect(testing_basics_1.isEvenNumberValidator.isEven(0)).toBe(true);
    });
});
describe("findMax method", () => {
    it("should return the largest number", () => {
        expect(testing_basics_1.findMaxNumber.findMax([2, 5, 3])).toBe(5);
    });
    it("should return null for empty array", () => {
        expect(testing_basics_1.findMaxNumber.findMax([])).toBe(null);
    });
    it("should return the single element array", () => {
        expect(testing_basics_1.findMaxNumber.findMax([2])).toBe(2);
    });
});
describe("isOdd method", () => {
    it("should return true when odd number is passed", () => {
        expect(testing_basics_1.isOddNumberValidator.isOdd(13)).toBe(true);
    });
    it("should return true when negative odd number is passed", () => {
        expect(testing_basics_1.isOddNumberValidator.isOdd(-13)).toBe(true);
    });
    it("should return false when even number is passed", () => {
        expect(testing_basics_1.isOddNumberValidator.isOdd(10)).toBe(false);
    });
    it("should return false when negative even number is passed", () => {
        expect(testing_basics_1.isOddNumberValidator.isOdd(-10)).toBe(false);
    });
    it("should return false for 0", () => {
        expect(testing_basics_1.isOddNumberValidator.isOdd(0)).toBe(false);
    });
});
