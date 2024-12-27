"use strict";
// // mathUtils.ts
// export const add = (a: number, b: number): number => a + b;
// export const subtract = (a: number, b: number): number => a - b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = exports.config = exports.Logger = exports.subtract = exports.add = void 0;
const add = (num1, num2) => num1 + num2;
exports.add = add;
const subtract = (num1, num2) => num1 - num2;
exports.subtract = subtract;
class Logger {
    log(message) {
        console.log(`Message: ${message}`);
    }
    warn(message) {
        console.warn(`message: ${message}`);
    }
}
exports.Logger = Logger;
exports.config = {
    apiEndpoint: "https://api.example.com",
    timeout: 5000,
};
class Calculator {
    multiply(num1, num2) {
        return num1 * num2;
    }
}
exports.Calculator = Calculator;
