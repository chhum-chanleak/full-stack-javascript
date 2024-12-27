// // mathUtils.ts
// export const add = (a: number, b: number): number => a + b;
// export const subtract = (a: number, b: number): number => a - b;

export const add = (num1: number, num2: number): number => num1 + num2;
export const subtract = (num1: number, num2: number): number => num1 - num2;

export class Logger {
  log(message: string): void {
    console.log(`Message: ${message}`);
  }

  warn(message: string): void {
    console.warn(`message: ${message}`);
  }
}

export const config = {
  apiEndpoint: "https://api.example.com",
  timeout: 5000,
};

export class Calculator {
  multiply(num1: number, num2: number): number {
    return num1 * num2;
  }
}