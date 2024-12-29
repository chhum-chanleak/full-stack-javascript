export const add = (num1: number, num2: number): number => num1 + num2;

export const subtract = (num1: number, num2: number): number => num1 - num2;

export class Logger {
  log(message: string): void {
    console.log(`Message: ${message}`);
  }
}

export const config = {
  module: "ESM",
  language: "TypeScript",
};

export class Calculator {
  multiply(num1: number, num2: number): number {
    return num1 * num2;
  }
}