// 3. Write the Minimum Code to Pass the Test:
// Write just enough code to make the failing test pass.
// Avoid implementing extra functionality or over-engineering.
export const add = (num1: number, num2: number): number => num1 + num2;

export const reverseString = (str: string): string => str.split("").reverse().join("");

export const isPalindrome = (str: string): boolean => str.toLocaleLowerCase().split("").reverse().join("") === str;

type fizzBuzz = (num: number) => string;
export const fizzBuzz: fizzBuzz = (num) => {
  // fizzbuzz case
  if ((num % 3 === 0) && (num % 5 === 0)) {
    return "fizzbuzz";
  }
  if (num % 3 === 0) { // fizz
    return "fizz";
  }  
  if (num % 5 === 0) { // buzz
    return "buzz";
  }

  // Neither
  return `${num}`;
};

type IsPrime = (num: number) => boolean;
export const isPrime: IsPrime = (num) => {
  if (num < 2) {
    return false;
  }
  
  for (let i = 2; i <= Math.sqrt(num); i += 1) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
};

type Factorial = (num: number) => number;
export const factorial: Factorial = (num) => {
  if (num === 0 || num === 1) {
    return 1;
  }

  if (num < 0) {
    throw new Error("Negative numbers are not allowed");
  }

  let result = 1;

  for (let i = 0; i < num; num -= 1) {
    result *= num;
  }

  return result;
};

// 4. Refactor the module's implementation code when necessary, then go to the test cases("../tests/tdd.test.ts") and refactor them

// 5. Repeat the Cycle:
// Add a new test for the next piece of functionality.
// Follow the "Fail, Pass, Refactor" cycle for each new test.