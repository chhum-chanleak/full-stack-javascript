// 1. 'typeof' operator
// The 'typeof' operator in TypeScript is used to get the type of a variable or an expression at runtime. It's a useful tool for type checking, and it can be used in both type contexts and value contexts.

// Example 1: Basic usage with primitive types
let num = 42;
let isTrue = true;
let str = "Hello";

console.log(typeof num);    // "number"
console.log(typeof isTrue); // "boolean"
console.log(typeof str);    // "string"

// Exercise 1: Define a variable myName with the value "John". Use typeof to check its type and log it to the console.
const myName = "John";

console.log(typeof myName); // Ok

// Example 2: Using 'typeof' for function return type
function greet() {
  return "Hello, TypeScript!";
}

type GreetReturnType = typeof greet; // "function"

const message: ReturnType<typeof greet> = greet();
console.log(message); // "Hello, TypeScript!"

// Exercise 2: Create a function add(a: number, b: number) that returns the sum of two numbers. Use typeof to extract the return type of the function and use it in another variable declaration.
type Add = (num1: number, num2: number) => number;
const add: Add = (num1, num2) => num1 + num2;

const typeOfAdd: ReturnType<typeof add> = 2;

// Example 3: Using 'typeof' in type declarations
const person = {
  name: "Alice",
  age: 25
};

type PersonType = typeof person; // { name: string; age: number }

let anotherPerson: PersonType = { name: "Bob", age: 30 };

// Exercise 3: Create an object car with properties brand and year. Use typeof to create a type CarType and create another object myCar based on this type.
const car = {
  brand: "Honda",
  year: 2012,
};

type CarType = typeof car;
const myCar: CarType = {
  brand: "Nissan",
  year: 2020,
};

// Example 4: 'typeof' with arrays and objects
let arr = [1, 2, 3];
let obj = { key: "value" };

console.log(typeof arr); // "object"
console.log(typeof obj); // "object"

// Exercise 4: Write a TypeScript function getType that accepts any value and returns its type using 'typeof'.
type GetType = (value: unknown) => any;
const getType: GetType = (value) => {
  if (Array.isArray(value)) {
    return "Array";
  } else {
    return typeof value;
  }
};

console.log(getType(arr)); // Yes
console.log(getType(obj)); // Yes
console.log(getType(false)); // Yes

