"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OddNumberValidator = exports.FindMaxNumber = exports.EvenNumberValidator = exports.CapitalizedString = exports.add = void 0;
const add = (num1, num2) => num1 + num2;
exports.add = add;
class CapitalizedString {
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.CapitalizedString = CapitalizedString;
class EvenNumberValidator {
    isEven(num) {
        return num % 2 === 0;
    }
}
exports.EvenNumberValidator = EvenNumberValidator;
class FindMaxNumber {
    find(...numbers) {
        return Math.max(...numbers);
    }
}
exports.FindMaxNumber = FindMaxNumber;
class OddNumberValidator {
    isOdd(num) {
        return num % 2 !== 0;
    }
}
exports.OddNumberValidator = OddNumberValidator;
