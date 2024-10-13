"use strict";
// 1. Function Type Expressions
// In TypeScript, a function type expression defines the types of parameters and the return type of a function, similar to call signatures but more commonly used for standalone functions. You can define the shape of a function using a function type and assign functions to variables accordingly.
// A function type expression is an 'inline' way to specify the type of a function when declaring a variable or parameter. It uses a similar syntax to define the parameters and return type directly.
// Example:
// // Using a function type expression for variable declaration
// const multiply: (a: number, b: number) => number = (x, y) => x * y;
// Exercise: Using Function Type Expressions
// Task:
// Define 3 Functions Type Expression:
// One that performs addition.
// One that performs subtraction.
// One that performs division.
const addExpression = (a, b) => a + b;
const subtractExpression = (a, b) => a - b;
const divideExpression = (numerator, denominator) => numerator / denominator;
const addSignature = (num1, num2) => num1 + num2;
const subtractSignature = (a, b) => a - b;
const multiplySignature = (a, b) => a * b;
class ConstructPerson3 {
    constructor(name, age) {
        this._name = name;
        this._age = age;
    }
}
const myPerson3 = ConstructPerson3;
const man = new myPerson3("noMe", 12);
// console.log(man);
// 4. Generic Functions
// In TypeScript, generic functions allow you to create functions that work with any data type while maintaining type safety. By using generics, you can define a function that can accept parameters of different types and return a value of a corresponding type without losing the information about what types those are.
// Exercise: Creating a Generic Function
// Task:
// Write a generic function wrapInArray that takes a single argument of any type and returns an array containing that argument.
// Test Your Function:
// Call wrapInArray with different types of arguments (e.g., a number, a string, and an object) and log the results.
const wrapInArray2 = (value) => [value];
// getLength() only accepts an argument which has a 'length' property.
const getLength = (arr) => arr.length;
// console.log(getLength("Hello")); // Ok
// console.log(getLength([2, 4])); // Ok
// 4.3 Working with Constrained Values
// In TypeScript, when working with constrained generic types, you can access properties or methods that are guaranteed by the constraint. This allows you to safely interact with the constrained values.
const informSize = (arr) => {
    if (arr.length >= 5) {
        console.log("It is large.");
    }
    else {
        console.log("It is small.");
    }
};
// console.log(informSize("Hell")); // Ok
// console.log(informSize([2, 4, 1, 2, 3, 5])); // Ok
// 4.4 Specifying Type Arguments
// In TypeScript, while the compiler often infers the type arguments for generic functions, you can also explicitly specify the type arguments if necessary. This is particularly useful when you want to enforce a specific type or when inference doesn’t work as expected.
const showType2 = (arg) => console.log(`${arg} has a type of ${typeof (arg)}.`);
// explicitly specify the type argument(<number>).
// showType2<number>(2); // Ok
// showType2<number[]>([2, 3]); // Ok
// 4.5 Guidelines for Writing Good Generic Functions
// 1. Limit the Number of Type Parameters
// Avoid using too many generic parameters unless absolutely necessary. Multiple type parameters can make functions harder to read and reason about.  
// Bad example
function processData(a, b, c, d) {
    console.log(a, b, c, d);
}
// Good example
function processData2(a, b) {
    console.log(a, b);
}
// 2. Use Descriptive Type Parameter Names
// Use meaningful type parameter names to make the function easier to understand. Although 'T' is a common shorthand, in more complex cases, using descriptive names can clarify what the type represents.
// Bad example
function merge(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
}
// Good example
function merge2(obj1, obj2) {
    return Object.assign(Object.assign({}, obj1), obj2);
}
// 3. Add Constraints Only When Necessary
// Don't over-constrain your generics. Only add constraints (extends) when you need access to specific properties or methods. This helps keep the function flexible.
// Bad example
function logObject(obj) {
    console.log(obj.name, obj.age);
}
// Good example
function logObject2(obj) {
    console.log(obj.name);
}
const describeBook2 = (title, author) => {
    if (author) {
        return `Title: ${title}, Author: ${author}`;
    }
    return `Title: ${title}`;
};
const getUserInfo2 = (info) => {
    if (typeof (info) === "string") {
        return `USER_ID: ${info.toUpperCase()}`;
    }
    else if (info.name) {
        return `USER_ID: ${info.id}, Name: ${info.name}`;
    }
    throw new Error("Unknown argument.");
};
function calculate2(param_1, param_2) {
    if (param_2) {
        if ((typeof (param_1) === 'number') && (typeof (param_2) === 'number')) {
            return param_1 + param_2;
        }
        else if ((typeof (param_1) === 'string') && (typeof (param_2) === 'string')) {
            return `${param_1}${param_2}`;
        }
    }
    else if (Array.isArray(param_1) && typeof (param_1[0] === 'number')) {
        return param_1.length;
    }
    throw new Error("Unknown argument.");
}
;
// console.log(calculate2(5, 10)); // Ok
// console.log(calculate2("Hello", ", world!")); // Ok
// console.log(calculate2([5, 10])); // Ok
// console.log(calculate2([12], true)); // Not ok
// 6.2 Writing Good Overloads
// Be specific in overload signatures and avoid overlaps.
// Use type guards in the implementation to handle different types.
// Keep overloads manageable in number and complexity.
// Use optional parameters and union types where appropriate.
// Use overloads to clarify different parameter structures.
// Consider using 'generic's for common logic across types.
// No exercises for 6.2
// 7. Declaring 'this' in a Function
// In TypeScript, you can explicitly declare the type of 'this' in a function to ensure proper type safety, especially when dealing with methods that rely on 'this'. This is particularly useful when 'this' can be misused or needs to be of a specific type within the function context.
// Exercise: Create a Person class with a method that uses 'this'
// Task:
// Create a class Person with a name property.
// Write a method greet that prints a greeting using this.name.
// Declare 'this' explicitly in the method to ensure it's of type Person.
// Try calling the method and then assigning it to a variable and calling it again to see what happens.
class Person3 {
    constructor(name) {
        this._name = name;
    }
    // 'greet()' can only be called by 
    greet() {
        console.log(`Hello, my name is ${this._name}`);
    }
}
const person3 = new Person3("HHH");
// person3.greet(); // output: Hello, my name is HHH
// Assigning greet to another variable loses context for 'this' of 'person3'.
const notPerson = person3.greet;
// notPerson(); // Not ok
// Using bind to explicitly set the 'this' context of 'person3'.
const newPerson = notPerson.bind(person3);
const printInfo2 = (name, age) => console.log(`Name: ${name}, Age: ${age}`);
const printCarInfo2 = (car) => console.log(`Made in: ${car.make}, Model: ${car.model}, Year: ${car.year}`);
const vivo = { make: "Sweden", model: "2020", year: 2020 };
const processValue2 = (value) => {
    if (typeof (value) === "string") {
        return value.toUpperCase();
    }
    else if (typeof (value) === "number") {
        return value * 10;
    }
    throw new Error("Unknown argument.");
};
const getArea2 = (shape) => {
    switch (shape.kind) {
        case "circle":
            return `pi * r^2`;
        case "square":
            return `sideLength * sideLength`;
        case "triangle":
            return `(1 / 2) * base * height`;
        default:
            const _exhaustiveCheck = shape;
            return _exhaustiveCheck;
    }
};
const circle = {
    kind: "circle",
};
// console.log(getArea2(circle)); // Ok
// 8.5 Function
// In TypeScript, a function type specifies the types of the arguments and the return type of a function.
// Exercise:
// Create a function type that takes two strings and returns a boolean.
// Implement a function based on this type that checks if the first string contains the second string.
// Test the function with various inputs.
// Using variable Declaration
let twoString;
twoString = (string1, string2) => false;
const getTwoString2 = (string1, string2) => true;
const concat2 = (...items) => {
    let joinedString = "";
    for (let i = 0; i < items.length; i += 1) {
        joinedString += ` ${items[i]}`;
    }
    return joinedString;
};
const destructProduct = ({ id, name, price }) => console.log(`ID: ${id}, Name: ${name}, Price: ${price}`);
const mouse = {
    id: '123abc',
    name: "Dell",
    price: 10,
};
const printNumber2 = (number) => console.log(number);
const printOptionalNumber2 = (number = 0) => console.log(number);
const representNumber = (number) => {
    return `${number}`;
};
let returnString = representNumber;
// returnString = printNumber2; // Not ok because Type 'NumberCallback2' is not assignable to type '(number: number) => string'.
// Type 'void' is not assignable to type 'string'.
let printOptional;
printOptional = representNumber; // Ok because return type 'void' is assignable to other return 'types'
