"use strict";
// 1. Function Type Expressions
// In TypeScript, a function type expression defines the types of parameters and the return type of a function, similar to call signatures but more commonly used for standalone functions. You can define the shape of a function using a function type and assign functions to variables accordingly.
// A function type expression is an 'inline' way to specify the type of a function when declaring a variable or parameter. It uses a similar syntax to define the parameters and return type directly.
// Example:
// // Using a function type expression for variable declaration
// const multiply: (a: number, b: number) => number = (x, y) => x * y;
// console.log(multiply(4, 5)); // Output: 20
// Exercise: Using Function Type Expressions
// Task:
// Define 3 Functions Type Expression:
// One that performs addition.
// One that performs subtraction.
// One that performs division.
const performAddtion = (num1, num2) => num1 + num2;
const performSubtraction = (num1, num2) => num1 - num2;
const perFormDivision = (num1, num2) => num1 / num2;
// Write three different implementations of this interface:
// One for addition.
const addNums = (a, b) => a + b;
// One for subtraction.
const subNums = (a, b) => a - b;
// One for multiplication.
const multi = (a, b) => a * b;
// Test your functions:
// Create a test function that accepts a MathOperation and applies it to two numbers, printing the result.
const testOperation = (operation, num1, num2) => {
    console.log(operation(num1, num2));
};
// Implement a Class:
// Implement the Person class with the following properties:
// name (a string)
// age (a number)
// The class should have a constructor that takes these parameters and assigns them to the class properties.
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
// Create Instances Using the Constructor Interface:
// Use the construct signature from the PersonConstructor interface to create instances of the Person class using the new keyword.
// In the statement let myPerson: PersonConstructor = Person;, you're using TypeScript's type system to ensure that the Person class matches the structure defined by the PersonConstructor interface, which includes a construct signature.
// Now myPerson is a class represents class 'Person'
let myPerson = Person;
const andy = new myPerson('Andy', 18);
// 4. Generic Functions
// In TypeScript, generic functions allow you to create functions that work with any data type while maintaining type safety. By using generics, you can define a function that can accept parameters of different types and return a value of a corresponding type without losing the information about what types those are.
// Exercise: Creating a Generic Function
// Task:
// Create a Generic Function:
// Write a generic function wrapInArray that takes a single argument of any type and returns an array containing that argument.
const wrapInArray = (arg) => {
    return [arg];
};
// Test Your Function:
// Call wrapInArray with different types of arguments (e.g., a number, a string, and an object) and log the results.
const numberWrapped = wrapInArray(22);
const stringWrapped = wrapInArray("Hello, world!");
const objectWrapped = wrapInArray({ name: "Chhum", age: 12 });
// 4.1 Inference
// You do not have to explicity specify 'type'
const booleanWrapped = wrapInArray(true);
// 4.2 Constraints
// Generic function with a constraint
const greet = (obj) => {
    return `Hello, ${obj.name}`;
};
const cat = {
    name: 'Meow',
    age: 11,
};
// 4.3 Working with Constrained Values
const catGreet = greet(cat); // Valid because 'cat' has a property called 'name'.
// 4.4 Specifying Type Arguments
const pair = (key, value) => [key, value];
const myPair = pair('name', 'Chhum');
const myPair2 = pair('age', 12);
// 4.6 Guidelines for Writing Good Generic Functions
// Use meaningful type parameter
// Do
const processItem = (item) => {
    // ...
};
// Don't
const processItem2 = (item) => {
    // ...
};
const describeBook = (title, author) => {
    if (author) {
        return `Title: ${title}, Author: ${author}`;
    }
    return `Title: ${title}`;
};
const book = describeBook('1984', 'George Orwell');
const book2 = describeBook("To Kill a Mockingbird");
const fetchUserData = (callback) => {
    const success = Math.random() > 0.5;
    if (success) {
        const user = { name: "Alice", age: 25, };
        callback(user);
    }
    else {
        const error = "Unable to fetch user data.";
        callback(undefined, error);
    }
};
// Implementation
function getUserInfo(user) {
    if (typeof (user) === 'object') {
        return `User ${user.id}: ${user.name}`;
    }
    return `USER ID: ${user}`;
}
const userId = getUserInfo("123abc");
const userInfo = getUserInfo({ id: "123", name: 'Chhum' });
function calculate(param1, param2) {
    if (param2 && typeof (param2) === 'number') {
        if (typeof (param1) === 'number') {
            return param1 + param2;
        }
    }
    else if (param2 && typeof (param2) === 'string') {
        if (typeof (param1) === 'string') {
            return `${param1}${param2}`;
        }
    }
    else if (param2 === undefined) {
        if (Array.isArray(param1)) {
            return param1.length;
        }
    }
    throw new Error("'Invalid arguments.");
}
;
const sum3 = calculate(5, 10);
const concate3 = calculate("Hello,", " World!");
const size3 = calculate([1, 2, 3, 4]);
// 6.2 Writing Good Overloads
// Be specific in overload signatures and avoid overlaps.
// Use type guards in the implementation to handle different types.
// Keep overloads manageable in number and complexity.
// Use optional parameters and union types where appropriate.
// Use overloads to clarify different parameter structures.
// Consider using generics for common logic across types.
// 7. Declaring 'this' in a Function
// In TypeScript, you can explicitly declare the type of 'this' in a function to ensure proper type safety, especially when dealing with methods that rely on 'this'. This is particularly useful when 'this' can be misused or needs to be of a specific type within the function context.
// Exercise: Create a Person class with a method that uses 'this'
// Task:
// Create a class Person with a name property.
// Write a method greet that prints a greeting using this.name.
// Declare 'this' explicitly in the method to ensure it's of type Person.
// Try calling the method and then assigning it to a variable and calling it again to see what happens.
class Person2 {
    constructor(name) {
        this._name = name;
    }
    // 'this' keyword will not appear at 'runtime'. It's only used for type checking at compilation.
    greet() {
        console.log(`Hello, ${this._name}`);
    }
}
const person = new Person2('Andy');
const notGreet = person.greet; // Calling notGreet() will throw an error
// Do this instead
const yestGreet = person.greet.bind(person); // output: "Hello, Andy"
const printInfo = (name, age) => {
    console.log(`Name: ${name}, Age: ${age}`);
};
const printCarInfo = (obj) => {
    console.log(`Make: ${obj.make}, Model: ${obj.model}, Year: ${obj.year}`);
};
const myCar = {
    make: 'Japan',
    model: 'Nissan',
    year: 2012,
};
const processValue = (param) => {
    if (typeof (param) === "string") {
        return param.toUpperCase();
    }
    else if (typeof (param) === 'number') {
        return param * 10;
    }
    throw new Error("Unsupported type.");
};
const assertUnreachable = (arg) => {
    throw new Error(`Unexpected value ${arg}`);
};
const getArea = (shape) => {
    switch (shape.kind) {
        case "circle":
            shape;
            return `pi * r^2`;
        case "square":
            shape;
            return `sideLength ** 2`;
        case "triangle":
            shape;
            return `(1 / 2) * base * height`;
        default:
            // const _exhaustiveCheck: never = shape;
            // return _exhaustiveCheck;
            assertUnreachable(shape);
    }
};
const circle2 = {
    kind: "circle",
    radius: 12,
};
const square2 = {
    kind: 'square',
    sideLength: 6,
};
const triangle2 = {
    kind: "triangle",
    base: 8,
    height: 4,
};
// console.log(getArea(circle2)); // Ok
// console.log(getArea(square2));  // Ok
// console.log(getArea(triangle2)); // Ok
// 8.5 Function
// In TypeScript, a function type specifies the types of the arguments and the return type of a function.
// Using a Variable Declaration
let add;
add = (x, y) => x + y; // Valid assignment
const add2 = (x, y) => x + y; // Use the type alias
// console.log(add(5, 10)); // Output: 15
const subtract2 = (x, y) => x - y; // Another function using the same type
// console.log(subtract2(10, 5)); // Output: 5
// Exercise:
// Create a function type that takes two strings and returns a boolean.
// Implement a function based on this type that checks if the first string contains the second string.
// Test the function with various inputs.
// Using variable Declaration
let concateVariable;
concateVariable = (firstName, lastName) => firstName.length < lastName.length;
const concate = (firstName, lastName) => firstName.length < lastName.length;
const makeJoin = (...strs) => {
    let concatenatedString = "";
    for (let i = 0; i < strs.length; i += 1) {
        concatenatedString += ` ${strs[i]}`;
    }
    return concatenatedString;
};
const showDetail = ({ id, name, price }) => console.log(`ID: ${id}, Name: ${name}, Price: ${price}`);
const skinCare = {
    id: '123abc',
    name: 'Leg Lotion',
    price: 12,
};
const printNumber = (num) => {
    console.log(num);
};
const printOptionalNumber = (num) => {
    console.log(num !== undefined ? num : 0);
};
let showNumber = printNumber;
let optionalNumber = printOptionalNumber;
const numberShowString = (num) => num.toString();
// let showString: NumberShowString = showNumber; // No ok
