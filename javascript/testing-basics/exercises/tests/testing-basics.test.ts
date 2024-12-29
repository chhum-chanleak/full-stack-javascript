import { add, Capitalizer, IsEvenNumberValidator, FindMaxNumber, IsOddNumberValidator } from "../src/testing-basics"

// describe("add function", () => {
//   it("adds two positive numbers", () => {
//     // Assertion
//     expect(add(1, 2)).toBe(3);
//   });

//   it("adds two negative numbers", () => {
//     // Assertion
//     expect(add(-1, -2)).toBe(-3);
//   });

//   it("adds zero or zeros", () => {
//     // Assertion
//     expect(add(0, 0)).toBe(0);
//   });
// });

// describe("capitalizer.capitalize method", () => {
  // const capitalizer = new Capitalizer();

//   it("capitalizes the first character", () => {
//     // Assertion
//     expect(capitalizer.capitalize("hi")).toBe("Hi");
//   });

//   it("does not capitalize string that already capitalized", () => {
//     // Assertion
//     expect(capitalizer.capitalize("Hello")).toBe("Hello");
//   });
// });

// describe("isEvenNumberValidator.isEven method", () => {
  // const isEvenNumberValidator = new IsEvenNumberValidator(); 

//   it("returns true for even numbers", () => {
//     // Assertion
//     expect(isEvenNumberValidator.isEven(0)).toBe(true);
//   });

//   it("returns true for negative even numbers", () => {
//     // Assertion
//     expect(isEvenNumberValidator.isEven(-2)).toBe(true);
//   });

//   it("returns false for odd numbers", () => {
//     // Assertion
//     expect(isEvenNumberValidator.isEven(1)).toBe(false);
//   });

//   it("returns false for negative odd numbers", () => {
//     // Assertion
//     expect(isEvenNumberValidator.isEven(-1)).toBe(false);
//   });
// });

// describe("findMax method", () => {
//   const findMaxNumber = new FindMaxNumber();

//   it("returns the largest number", () => {
//     // Assertion
//     expect(findMaxNumber.findMax(1, 3, 2)).toBe(3);
//   });

//   it("works with negative numbers", () => {
//     // Assertion
//     expect(findMaxNumber.findMax(-3, -1, -2)).toBe(-1);
//   });

//   it("works with single element", () => {
//     // Assertion
//     expect(findMaxNumber.findMax(1)).toBe(1);
//   });
// });

// describe("isOdd method", () => {
//   const isOddNumberValidator = new IsOddNumberValidator();

//   it("returns true for odd numbers", () => {
//     // Assertion
//     expect(isOddNumberValidator.isOdd(1)).toBe(true);
//   });

//   it("returns true negative odd numbers", () => {
//     // Assertion
//     expect(isOddNumberValidator.isOdd(-1)).toBe(true);
//   });

//   it("returns false for even numbers", () => {
//     // Assertion
//     expect(isOddNumberValidator.isOdd(0)).toBe(false);
//   });

//   it("returns false for negative even number", () => {
//     // Assertion
//     expect(isOddNumberValidator.isOdd(-2)).toBe(false);
//   });
// });