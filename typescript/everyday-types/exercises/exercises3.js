"use strict";
// Basic Types
// 1. Type Inference:
// Type inference is a powerful feature in TypeScript that automatically determines the types of variables, functions, and expressions based on their usage and context. This reduces the need for explicit type annotations, making your code more concise and readable.
// Create a variable and assign it a value. Let TypeScript infer its type.
let fruits = ['apple', 'banana'];
// Try assigning a different type of value to the same variable and observe the compiler's response.
// fruits = [1, 2]; // Type 'number' is not assignable to type 'string'.
// 2. Explicit Typing:
// Explicit types are explicitly specified types for variables, functions, and expressions in TypeScript. They provide greater control over type safety and can be used to clarify the intended behavior of your code.
// Declare a variable with an explicit type and assign it a value.
let num2 = 12;
// Try assigning a value of a different type and observe the compiler's response.
// num2 = '24'; // Type 'string' is not assignable to type 'number'.
// 3. Union Types:
// Union types and intersection types are opposites in TypeScript.
// Union types allow you to represent values that can be of multiple types. They are useful when you need to work with variables or expressions that can have different possible types.
// Create a variable with a union type (e.g., string | number).
let accountNumber2 = '12';
// All variables must conform to both interfaces Dog and Cat.
// Create a variable with the intersection type and assign it an object that satisfies both interfaces.
let pet = {
    sound: 'Howl',
    longRun: true,
    shortRun: true,
};
// 5. Literal Types:
// Literal types in TypeScript are used to represent specific, immutable values. They provide a way to enforce strict type checking for constants and expressions that should only have a limited set of possible values.
// Create a variable with a literal type (e.g., "apple" | "banana").
let coconut = 'coconut';
// Try assigning a different value to the variable and observe the compiler's response.
// coconut = 'banana'; // Type '"banana"' is not assignable to type '"coconut"'.
// Advanced Types
// 6. Generic Types:
// Generic types allow you to write reusable code that can work with different data types. They provide a way to create type-safe functions, classes, and interfaces that can operate on a variety of values.
// Create a generic function, class and interface that takes a generic type as a parameter.
const getType = (value) => {
    return value;
};
// Call the function with different types of arguments.
getType(true);
getType(2);
getType('Hello, world!');
// 8. Type Assertion:
// A type assertion in TypeScript is a way to tell the compiler that a value is of a specific type, even if the compiler isn't sure. This can be useful when you have more information about a value than the compiler does.
// Create a function using type assertion
const getId4 = (id) => {
    if (typeof (id) === 'string') {
        const str = id;
        return str;
    }
    const num = id;
    return num;
};
class Banana {
    constructor(color, vitamins) {
        this.color = color;
        this.vitamins = vitamins;
    }
    showDetail() {
        console.log(`${this.color}, ${this.vitamins}`);
    }
}
const banana = new Banana('yellow', ['b1', 'b2', 'potassium']);
class House {
    constructor(furniture, location) {
        this.furniture = furniture;
        this.location = location;
    }
    showDetail() {
        console.log(`${this.furniture}, ${this.location}`);
    }
}
// Create instances of the class.
const penthouse = new House(['table', 'cupboard', 'chairs'], 'Cambodia');
// Access properties and call methods on the instances.
// 11. Enum Types:
// Enums (enumerations) are a way to define a set of named constants. They provide a more readable and maintainable way to represent a fixed set of values compared to using raw numbers or strings. Enums are often used to represent a finite set of related values.
// Create an enum type with different members.
var RGB;
(function (RGB) {
    RGB["R"] = "red";
    RGB["G"] = "green";
    RGB["B"] = "blue";
})(RGB || (RGB = {}));
var Trajectory;
(function (Trajectory) {
    Trajectory[Trajectory["North"] = 0] = "North";
    Trajectory[Trajectory["South"] = 1] = "South";
    Trajectory[Trajectory["East"] = 2] = "East";
    Trajectory[Trajectory["West"] = 3] = "West";
})(Trajectory || (Trajectory = {}));
// 12. Tuple Types:
// Tuples are a fixed-length array with elements of specified types. They provide a way to represent ordered collections of elements with known types.
// Create a tuple type with specific elements.
const randomThings = [false, 2, 'Hello', [true]];
// Access elements of the tuple by their index.
randomThings[0];
// Try modifying elements of the tuple and observe the compiler's response.
