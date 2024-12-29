export const add = (num1: number, num2: number): number => num1 + num2;

export class Capitalizer {
  capitalize(str: string): string {
    if (str.charAt(0) === str.charAt(0).toUpperCase()) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export class IsEvenNumberValidator {
  isEven(num: number): boolean {
    return num % 2 === 0;
  }
}

export class FindMaxNumber {
  findMax(...nums: number[]): number {
    // Check for single element
    if (nums.length === 1) {
      return nums[0];
    }

    return Math.max(...nums);
  }
}

export class IsOddNumberValidator {
  isOdd(num: number): boolean {
    return num % 2 !== 0;
  }
}