// 1. 'typeof' operator
// The 'typeof' operator in TypeScript is used to get the type of a variable or an expression at runtime. It's a useful tool for type checking, and it can be used in both type contexts and value contexts.

// Example 1: Basic usage with primitive types
let num2 = 42;
let isTrue2 = true;
let str2 = "Hello";

console.log(typeof num2);    // "number"
console.log(typeof isTrue2); // "boolean"
console.log(typeof str2);    // "string"

// Exercise 1: Define a variable 'myName2' with the value "John". Use 'typeof' to check its type and log it to the console.
const myName2 = "John";

console.log(`typeof myName2: ${typeof myName2}`);

// Example 2: Using 'typeof' for function return type
function greet2() {
  return "Hello, TypeScript!";
}

type greetsReturnType2 = typeof greet2; // "function"

const message2: ReturnType<typeof greet2> = greet2();
console.log(message2); // "Hello, TypeScript!"

// Exercise 2: Create a function 'add2(a: number, b: number)' that returns the sum of two numbers. Use 'typeof' to extract the return type of the function and use it in another variable declaration.
type Add2 = (num1: number, num2: number) => number;
const add2: Add2 = (num1, num2) => num1 + num2;

type add2ReturnType = ReturnType<typeof add2>;
const two: add2ReturnType = 2;

// Example 3: Using 'typeof' in type declarations
const person2 = {
  name: "Alice",
  age: 25
};

type PersonType2 = typeof person2; // { name: string; age: number }
let anotherPerson2: PersonType2 = { name: "Bob", age: 30 };

// Exercise 3: Create an object 'car2' with properties brand and year. Use 'typeof' to create a type CarType2 and create another object 'myCar2' based on this type.
const car2 = {
  brand: "Tesla",
  year: 2020,
};

type CarType2 = typeof car2;
const myCar2: CarType2 = {
  brand: "Honda",
  year: 2022,
};

// Example 4: 'typeof' with arrays and objects
let arr2 = [1, 2, 3];
let obj2 = { key: "value" };

console.log(typeof arr2); // "object"
console.log(typeof obj2); // "object"

// Exercise 4: Write a TypeScript function 'getType2' that accepts any value and returns its type using 'typeof'.
type GetType2 = (value: unknown) => string;
const getType2: GetType2 = (value) => (Array.isArray(value)) ? "Array" : typeof value;

// console.log(getType2([2]));
// console.log(getType2(obj2));
// console.log(getType2("Hello"));