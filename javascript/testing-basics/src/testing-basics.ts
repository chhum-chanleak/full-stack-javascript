export const add = (num1: number, num2: number): number => {
  return num1 + num2;
};

class CapitalizeString {
  capitalize(str: string): string | undefined {
    if (!str) {
      try {
        throw new Error("Empty string not allowed");
      } catch(error) {
        console.error(`${(error as Error).message}`);
        return undefined;
      }  
    } else if (str.charAt(0) === str.charAt(0).toUpperCase()) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

class IsEvenNumberValidator {
  isEven(num: number): boolean {
    return num % 2 === 0;
  }
}

class FindMaxNumber {
  findMax(numbers: number[]): number | null {
    if (numbers.length === 0) {
      return null;
    }

    return Math.max(...numbers);
  }
}

class IsOddNumberValidator {
  isOdd(num: number): boolean {
    return num % 2 !== 0;
  }
}

export const capitalizer = new CapitalizeString();
export const isEvenNumberValidator = new IsEvenNumberValidator();
export const findMaxNumber = new FindMaxNumber();
export const isOddNumberValidator = new IsOddNumberValidator();