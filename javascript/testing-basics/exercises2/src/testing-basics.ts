export const add = (num1: number, num2: number): number => num1 + num2;

export class CapitalizedString {
  capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export class EvenNumberValidator {
  isEven(num: number): boolean {
    return num % 2 === 0;
  }
}

export class FindMaxNumber {
  find(...numbers: number[]): number {
    return Math.max(...numbers);
  }
}

export class OddNumberValidator {
  isOdd(num: number): boolean {
    return num % 2 !== 0;
  }
}