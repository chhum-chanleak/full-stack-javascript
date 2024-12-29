import { add, subtract, Logger, config, Calculator } from "../src/mocking-mathUtils"

jest.mock("../src/mocking-mathUtils", () => ({

  // Mock functions creation
  add: jest.fn(),
  subtract: jest.fn(),
  Logger: jest.fn().mockImplementation(() => ({
    log: jest.fn()
  })),
  config: {
    module: "ESM",
    language: "TypeScript",
  },
  Calculator: jest.fn().mockImplementation(() => ({
    multiply: jest.fn(), 
  })),
}));

// add function
it("calls add function with correct arguments", () => {
  const mockAdd = add as jest.Mock;

  mockAdd.mockReturnValue(2);

  add(1, 1);

  expect(mockAdd).toHaveBeenCalledWith(1, 1);
  expect(add(1, 1)).toBe(2);
});

// subtract function
it("calls subtract function with correct arguments", () => {
  const mockSubtract = subtract as jest.Mock;

  mockSubtract.mockReturnValue(0);

  subtract(1, 1);

  expect(mockSubtract).toHaveBeenCalledWith(1, 1);
  expect(subtract(1, 1)).toBe(0);
});

// log method of class Logger
test("log method of class Logger", () => {
  const MockLogger = Logger as jest.Mock;
  const mockLogger = new MockLogger();

  mockLogger.log("Hello, world!");

  expect(mockLogger.log).toHaveBeenCalledWith("Hello, world!");
});

// config Object
test("a config object", () => {
  expect(config.module).toBe("ESM");
  expect(config.language).toBe("TypeScript");
});

// multiply method of class Calculator
test("multiply method of class Calculator", () => {
  const MockCalculator = Calculator as jest.Mock;
  const mockCalculator = new MockCalculator();

  mockCalculator.multiply.mockReturnValue(0);

  mockCalculator.multiply(0, 1);

  expect(mockCalculator.multiply).toHaveBeenCalledWith(0, 1);
  expect(mockCalculator.multiply(0, 1)).toBe(0);
});

// Please read this code below

// In Jest, the beforeEach() function is used to set up some common state or behavior before each test in a test suite. It runs before every individual test in the describe block or globally for all tests if defined outside of describe.

beforeEach(() => {
  // Setup code runs before each test
});

// Explanation of beforeEach() in the Example:
// beforeEach() ensures that before each test (it()), the mocks are cleared using mockClear(). This prevents tests from being affected by state left over from previous tests.
// mockClear() resets the mock function’s state (call count, arguments, etc.), so each test runs independently with a fresh mock state.
