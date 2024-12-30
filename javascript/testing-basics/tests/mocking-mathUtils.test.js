"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocking_mathUtils_1 = require("../src/mocking-mathUtils");
// All the created mock functions and objects in this 'jest.mock()' implementation can be accessed and called outside of the 'jest.mock' block(scope), but only within the scope of the test file where the module is mocked.
// Test setup
// The classes, objects, functions and methods defined inside the jest.mock() block are the subjects to be mocked and subsequently tested
jest.mock("../src/mocking-mathUtils", () => ({
    add: jest.fn(),
    subtract: jest.fn(),
    // Specifies what happens when the Logger class is instantiated:
    // This mock implementation essentially ensures that any new instance of Logger will have log and warn methods as mocked functions(methods).
    Logger: jest.fn().mockImplementation(() => ({
        log: jest.fn(),
        warn: jest.fn(),
    })),
    // config is an object which contains no methods
    config: {
        apiEndpoint: "https://api.example.com",
        timeout: 5000,
    },
    // Specifies what happens when the Calculator class is instantiated:
    // This mock implementation essentially ensures that any new instance of Calculator will have multiply method as mocked function(method).
    Calculator: jest.fn().mockImplementation(() => ({
        multiply: jest.fn(),
    }))
}));
// add function
it("should call add with correct arguments", () => {
    const mockAdd = mocking_mathUtils_1.add; // In Jest, the "jest.Mock" type is used to define the type of a mocked function. It provides you with
    mockAdd.mockReturnValue(5);
    // This part is essential in a test because it simulates the real-world usage of the code you're testing.
    // Call add(2, 3)
    const addResult = (0, mocking_mathUtils_1.add)(2, 3); // // The call to add(2, 3) is mocked because the imported function add is replaced with a mock during the test setup. The real implementation of add is not executed; instead, the mocked behavior is used.
    // Assertion
    expect(mockAdd).toHaveBeenCalledWith(2, 3);
    expect(addResult).toBe(5);
});
// subtract function
it("should call subtract with correct arguments", () => {
    // Mocking the subtract Function using type assertion
    const mockSubtract = mocking_mathUtils_1.subtract; // In Jest, the "jest.Mock" type is used to define the type of a mocked function. It provides you with
    // Defining a Return Value
    mockSubtract.mockReturnValue(2);
    // This part is essential in a test because it simulates the real-world usage of the code you're testing.
    // Calling the subtract Function
    const subtractResult = (0, mocking_mathUtils_1.subtract)(3, 1); // The call to subtract(3, 1) is mocked because the imported function subtract is replaced with a mock during the test setup. The real implementation of subtract is not executed; instead, the mocked behavior is used.
    // Verifying Function Behavior (Assertion)
    expect(mockSubtract).toHaveBeenCalledWith(3, 1);
    expect(subtractResult).toBe(2);
});
// Logger
test("a Logger class", () => {
    // Type assertion to treat(convert) Logger as a jest mock
    const MockLogger = mocking_mathUtils_1.Logger; // Logger can be asserted as jest.Mock type only when it had been already mocked in jest.mock() implementation
    // Instantiating the Mocked Class
    const mockLogger = new MockLogger();
    // This part(calling or invoking) is essential in a test because it simulates the real-world usage of the code you're testing.
    // Calling the Mocked Methods
    mockLogger.log("Hello, world!");
    mockLogger.warn("Hello and be warned");
    // Assertions
    expect(mockLogger.log).toHaveBeenCalledWith("Hello, world!");
    expect(mockLogger.warn).toHaveBeenCalledWith("Hello and be warned");
});
// config
test("a config object", () => {
    // Assertion
    expect(mocking_mathUtils_1.config.apiEndpoint).toBe("https://api.example.com");
    expect(mocking_mathUtils_1.config.timeout).toBe(5000);
});
//Calculator
test("a Calculator class", () => {
    // Type assertion to treat(convert) Logger as a jest mock
    const MockCalculator = mocking_mathUtils_1.Calculator; // Calculator can be asserted as jest.Mock type only when it had been already mocked in jest.mock() implementation
    // Instantiating the Mocked Class
    const mockCalculator = new MockCalculator();
    // Defining a Return Value
    mockCalculator.multiply.mockReturnValue(2);
    // This part (calling or invoking) is essential in a test because it simulates the real-world usage of the code you're testing.
    mockCalculator.multiply(2, 1);
    //Assertion
    expect(mockCalculator.multiply).toHaveBeenCalledWith(2, 1);
    expect(mockCalculator.multiply(2, 1)).toBe(2);
});
// Example
// import { add, subtract, Logger, config, Calculator } from "../src/mocking-mathUtils";
// // Mocking functions and classes
// jest.mock("../src/mocking-mathUtils", () => ({
//   add: jest.fn(),
//   subtract: jest.fn(),
//   Logger: jest.fn().mockImplementation(() => ({
//     log: jest.fn()
//   })),
//   config: {
//     module: "ESM",
//     language: "TypeScript",
//   },
//   Calculator: jest.fn().mockImplementation(() => ({
//     multiply: jest.fn(),
//   })),
// }));
// // Reset mocks before each test
// beforeEach(() => {
//   // Clears all mock calls and reset their state
//   add.mockClear();
//   subtract.mockClear();
//   Logger.mockClear();
//   Calculator.mockClear();
// });
// it("calls add function with correct arguments", () => {
//   const mockAdd = add as jest.Mock;
//   mockAdd.mockReturnValue(2);
//   add(1, 1);
//   expect(mockAdd).toHaveBeenCalledWith(1, 1);
//   expect(add(1, 1)).toBe(2);
// });
// it("calls subtract function with correct arguments", () => {
//   const mockSubtract = subtract as jest.Mock;
//   mockSubtract.mockReturnValue(0);
//   subtract(1, 1);
//   expect(mockSubtract).toHaveBeenCalledWith(1, 1);
//   expect(subtract(1, 1)).toBe(0);
// });
