import { add, subtract, Logger, config, Calculator } from "../src/mocking-mathUtils"

jest.mock("../src/mocking-mathUtils", () => ({
  add: jest.fn(),
  subtract: jest.fn(),
  Logger: jest.fn().mockImplementation(() => ({
    log: jest.fn(),
  })),
  config: {
    module: "ESM",
    language: "English",
  },
  Calculator: jest.fn().mockImplementation(() => ({
    multiply: jest.fn(),
  })),
}));

// add
it("adds two numbers", () => {
  // Convert add to mockAdd
  const mockAdd = add as jest.Mock;

  // Define the returned value
  mockAdd.mockReturnValue(1);

  // Call unit
  add(0, 1);

  // Define expected input
  expect(mockAdd).toHaveBeenCalledWith(0, 1);

  // Assert
  expect(add(0, 1)).toBe(1);
});

// subtract
it("subtracts two numbers", () => {
  // Convert
  const mockSubtract = subtract as jest.Mock;

  // Define the returned value
  mockSubtract.mockReturnValue(-1);

  // Call unit
  subtract(0, 1);

  // Define the expected input
  expect(mockSubtract).toHaveBeenCalledWith(0, 1);

  // Assert
  expect(subtract(0, 1)).toBe(-1);
});

// Logger
test("log() method of class Logger", () => {
  // Convert
  const MockLogger = Logger as jest.Mock;
  
  // Instantiate
  const mockLogger = new MockLogger();

  // Call unit
  mockLogger.log("Hello, world!");

  // Define expected input
  expect(mockLogger.log).toHaveBeenCalledWith("Hello, world!");
});

// config object
test("config object", () => {
  // Assert
  expect(config).toEqual({ module: "ESM", language: "English" });
});

// Calculator
test("multiply method of class Calculator", () => {
  // Convert
  const MockCalculator = Calculator as jest.Mock;
  // Instantiate
  const mockCalculator = new MockCalculator();

  // Define the returned value
  mockCalculator.multiply.mockReturnValue(0)

  // Call unit
  mockCalculator.multiply(0, 1);

  // Define the expected input
  expect(mockCalculator.multiply).toHaveBeenCalledWith(0, 1);

  // Assert
  expect(mockCalculator.multiply(0, 1)).toBe(0);
});