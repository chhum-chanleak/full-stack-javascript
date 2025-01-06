"use strict";
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
}
exports.Logger = Logger;
exports.config = {
    module: "ESM",
    language: "English",
};
class Calculator {
    multiply(num1, num2) {
        return num1 * num2;
    }
}
exports.Calculator = Calculator;
