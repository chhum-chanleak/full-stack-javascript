"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsOddNumberValidator = exports.FindMaxNumber = exports.IsEvenNumberValidator = exports.Capitalizer = exports.add = void 0;
const add = (num1, num2) => num1 + num2;
exports.add = add;
class Capitalizer {
    capitalize(str) {
        if (str.charAt(0) === str.charAt(0).toUpperCase()) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}
exports.Capitalizer = Capitalizer;
class IsEvenNumberValidator {
    isEven(num) {
        return num % 2 === 0;
    }
}
exports.IsEvenNumberValidator = IsEvenNumberValidator;
class FindMaxNumber {
    findMax(...nums) {
        // Check for single element
        if (nums.length === 1) {
            return nums[0];
        }
        return Math.max(...nums);
    }
}
exports.FindMaxNumber = FindMaxNumber;
class IsOddNumberValidator {
    isOdd(num) {
        return num % 2 !== 0;
    }
}
exports.IsOddNumberValidator = IsOddNumberValidator;
