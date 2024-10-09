"use strict";
// 1. Function Type Expressions
// In TypeScript, a function type expression defines the types of parameters and the return type of a function, similar to call signatures but more commonly used for standalone functions. You can define the shape of a function using a function type and assign functions to variables accordingly.
// Write Three Implementations:
// Assign three different functions to the operation variable:
// One that performs addition.
const addFTE = (a, b) => a + b;
// One that performs subtraction.
const subFTE = (a, b) => a - b;
// One that performs division.
const divFTE = (a, b) => a / b;
// Create a Test Function:
// Write a function performOperation that accepts two numbers and an operation function (typed as your function type expression). Inside, call the operation with the two numbers and print the result.
const performOperation = (num1, num2, operation) => {
    console.log(operation(num1, num2));
};
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
// Implementation
//    Overload Signatures and the Implementation Signature
//    Writing Good Overloads
//  Declaring this in a Function
//  Other Types to Know About
//    void
//    object
//    unknown
//    never
//    Function
//  Rest Parameters and Arguments
//    Rest Parameters
//    Rest Arguments
//  Parameter Destructuring
//  Assignability of Functions
//    Return type void
