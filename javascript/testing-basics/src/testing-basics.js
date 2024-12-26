"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOddNumberValidator = exports.findMaxNumber = exports.isEvenNumberValidator = exports.capitalizer = exports.add = void 0;
const add = (num1, num2) => {
    return num1 + num2;
};
exports.add = add;
class CapitalizeString {
    capitalize(str) {
        if (!str) {
            try {
                throw new Error("Empty string not allowed");
            }
            catch (error) {
                console.error(`${error.message}`);
                return undefined;
            }
        }
        else if (str.charAt(0) === str.charAt(0).toUpperCase()) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
class IsEvenNumberValidator {
    isEven(num) {
        return num % 2 === 0;
    }
}
class FindMaxNumber {
    findMax(numbers) {
        if (numbers.length === 0) {
            return null;
        }
        return Math.max(...numbers);
    }
}
class IsOddNumberValidator {
    isOdd(num) {
        return num % 2 !== 0;
    }
}
exports.capitalizer = new CapitalizeString();
exports.isEvenNumberValidator = new IsEvenNumberValidator();
exports.findMaxNumber = new FindMaxNumber();
exports.isOddNumberValidator = new IsOddNumberValidator();
