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
// 4.1 Inference
// You do not have to explicity specify 'type'
// 4.2 Constraints
// Generic function with a constraint
// 4.3 Working with Constrained Values
// 4.4 Specifying Type Arguments
// 4.6 Guidelines for Writing Good Generic Functions
// Use meaningful type parameter
// Do
// Don't
;
// 5. Optional Parameters
// In TypeScript, optional parameters allow you to define function parameters that are not required when calling the function. If the caller does not provide a value for an optional parameter, it will be undefined by default. In TypeScript, you can define optional parameters in a function by appending a question mark (?) to the parameter name. Optional parameters allow you to specify parameters that may or may not be provided when the function is called.
// Exercise
// Now, let’s create a small exercise to practice using optional parameters.
// Exercise: Create a Function to Describe a Book
// Task: Write a TypeScript function called describeBook that takes two parameters:
// title (required): a string representing the title of the book.
// author (optional): a string representing the author's name.
// The function should return a description of the book in the following format:
// If the author is provided: "Title: [title], Author: [author]"
// If the author is not provided: "Title: [title]"
// Example Outputs:
// describeBook("1984", "George Orwell") should return: "Title: 1984, Author: George Orwell"
// describeBook("To Kill a Mockingbird") should return: "Title: To Kill a Mockingbird"
// Function type
// 5.1 Optional Parameters in Callbacks
// In TypeScript, optional parameters can also be used in callback functions. This allows the callback to be invoked with different numbers of arguments, providing flexibility in how the callback is called and implemented.
// Exercise
// Task: Write a function called fetchUserData that simulates fetching user data from a server. It should take a callback with two parameters:
// user (optional): An object representing the user (with name and age properties).
// error (optional): A string representing an error message.
// Your function should invoke the callback with a user object if the request is successful (simulate this using a random condition), or with an error message if it fails.
// Function type expression
// 6. Function Overloads
// 6.1 Overload Signatures and the Implementation Signature
// In TypeScript, function overloads allow you to define multiple signatures for the same function, enabling the function to behave differently based on the arguments passed. This feature is useful when a function can accept different sets of parameters or return different types.
// Exercise
// Task: Create an Overloaded Function to Parse User Information
// Write a function called getUserInfo that accepts either a string (representing a user’s ID) or an object (representing user details with id and name properties).
// If the input is a string (user ID), the function should return the ID in uppercase.
// If the input is an object with id and name, it should return a string in the format: "User [id]: [name]".
// Example Outputs:
// getUserInfo("123abc") should return: "USER ID: 123ABC"
// getUserInfo({ id: "123abc", name: "Alice" }) should return: "User ID: 123abc, Name: Alice"
// function type
// Overload signatures
// Implementation
// Exercise 2:
// Task: Implement a calculate function with overloads
// Write a function called calculate that can either:
// Add two numbers when passed two numeric arguments.
// Concatenate two strings when passed two string arguments.
// Return the length of an array when passed an array of numbers.
// Expected Outputs:
// calculate(5, 10) should return: 15
// calculate("Hello", "World") should return: "HelloWorld"
// calculate([1, 2, 3, 4]) should return: 4
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
// Do this instead
// 8. Other Types to Know About
// 8.1 void
// In TypeScript, void is a type that indicates the absence of a return value from a function. When a function has a return type of void, it either doesn't return anything, or it returns undefined. This is useful for functions that are meant to perform some side effects, such as logging or modifying a value, without returning any specific value.
// Exercise: Writing a void Function
// Task:
// Write a function printInfo that takes two parameters: a name (string) and an age (number).
// The function should log a message like: "Name: John, Age: 25".
// Ensure the function returns void to indicate that it doesn't return any value.
// Try modifying the function to return a string and see what TypeScript says.
// printInfo("Chhum", 14); // Ok
// 8.2 object
// In TypeScript, the object type is used to represent non-primitive types, meaning anything that is not number, string, boolean, symbol, null, or undefined. It can be used to describe values that are objects, including arrays, functions, and more specific types like custom object literals.
// Exercise: Object Type
// Task:
// Create a type alias Car that represents an object with the following properties:
// make: string
// model: string
// year: number
// Write a function printCarInfo that accepts a Car object and logs the car's make, model, and year.
// Create an object myCar of type Car and pass it to printCarInfo.
// printCarInfo(myCar); // ok
// 8.3 unknown
// In TypeScript, the 'unknown' type is a safer alternative to 'any' because it forces you to perform type checks before performing operations on a value. Unlike 'any', which allows any operation on the value without type safety, 'unknown' requires explicit type assertions or checks, making your code more robust and secure.
// Exercise: Handling 'unknown'
// Task:
// Create a function processValue that accepts a parameter of type 'unknown'.
// Inside the function, check if the parameter is:
// A string, and if so, return the string in uppercase.
// A number, and if so, return the number multiplied by 10.
// If neither, return "Unsupported type".
// Test the function with various inputs like strings, numbers, and objects.
// console.log(processValue('Hello')); // Ok
// console.log(processValue(7)); // Ok
// console.log(processValue(true)); // Not ok
// 8.4 'never'  
// In TypeScript, the 'never' type represents values that 'never' occur. It is typically used for functions that:
// 'never' return (e.g., functions that throw an error or have infinite loops).
// Represent unreachable code (like the default case in exhaustive type checks).
// The 'never' type is the most specific type, meaning that no value can ever have the type 'never'. It is used to signify that a function or part of code will not successfully complete.
// Exercise: Handling 'never'
// Task:
// Create a function assertUnreachable that takes a value of type 'never'. This function will be useful to handle unreachable code.
// Define a union type Shape that can be "circle", "square", or "triangle".
// Write a function getArea that accepts a Shape and returns a string describing how to calculate the area.
// For "circle", return "π * r^2".
// For "square", return "side^2".
// For "triangle", return "0.5 * base * height".
// Use assertUnreachable to ensure that all shapes are covered exhaustively.
// console.log(getArea(circle2)); // Ok
// console.log(getArea(square2));  // Ok
// console.log(getArea(triangle2)); // Ok
// 8.5 Function
// In TypeScript, a function type specifies the types of the arguments and the return type of a function.
// Using a Variable Declaration
// Exercise:
// Create a function type that takes two strings and returns a boolean.
// Implement a function based on this type that checks if the first string contains the second string.
// Test the function with various inputs.
// Using variable Declaration
// Using type alias
// 9. Rest Parameters and Arguments  
// In TypeScript, rest parameters allow you to represent an indefinite number of arguments as an array. This is useful when you want to create functions that can accept more parameters than you can explicitly define.
// Exercise:
// Create a function that takes a variable number of string arguments and concatenates them into a single string, separated by spaces.
// Implement the function and test it with different sets of strings.
// Rest Parameters
// Rest Arguments
// console.log(makeJoin("Hello", "world!", "everyone", "!")); // Ok
//  10. Parameter Destructuring
// In TypeScript, parameter destructuring allows you to unpack values from arrays or properties from objects directly into function parameters. This makes it easier to work with complex data structures by providing a clearer and more concise syntax.
// Exercise: Implementing Parameter Destructuring
// Create an interface for a Product that has id, name, and price.
// Implement a function that takes a Product object and prints its details in a formatted way using parameter destructuring.
// Test the function with different Product objects.
// showDetail(skinCare); // Ok
// 11. Assignability of Functions
// In TypeScript, assignability of functions refers to how function types can be assigned to variables or passed as parameters, considering their parameter types and return types. This concept is rooted in structural typing, meaning that TypeScript checks if a function's parameter types and return type match those expected by the target function type.
// Exercise: Function Assignability
// Create a function type called NumberCallback that accepts a number and returns void.
// Implement two functions:
// The first function, printNumber, takes a number and logs it to the console.
// The second function, printOptionalNumber, takes an optional number and logs it, defaulting to zero if not provided.
// Demonstrate assignability by assigning printOptionalNumber to a variable of type NumberCallback.
// Create a third function that takes a number and returns a string representation of that number. Show that you cannot assign this function to NumberCallback.
