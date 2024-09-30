"use strict";
// Basic Types
// Type Inference:
// Type inference is a powerful feature in TypeScript that automatically determines the types of variables, functions, and expressions based on their usage and context. This reduces the need for explicit type annotations, making your code more concise and readable.
// Create a variable and assign it a value. Let TypeScript infer its type.
let col = ['red', 'green', 'blue'];
// Try assigning a different type of value to the same variable and observe the compiler's response.
// col = ['red', 'green', true]; // Type 'boolean' is not assignable to type 'string'.
// Explicit Typing:
// Explicit types are explicitly specified types for variables, functions, and expressions in TypeScript. They provide greater control over type safety and can be used to clarify the intended behavior of your code.
// Declare a variable with an explicit type and assign it a value.
const integer = 12;
const getInteger = () => integer;
const id3 = 24;
const id4 = '100';
;
;
// All variables must conform to both interfaces Person2, Employee2
// Create a variable with the intersection type and assign it an object that satisfies both interfaces.
const staff1 = { name: 'Chhum', age: 28, department: 'IT', salary: 2000 };
const person1 = { department: 'IT', salary: 2000, name: 'Chhum', age: 28, };
// const staff2: personEmployee = {name: 12, age: '28', department: 'IT', salary: 2000}; // Type 'string' is not assignable to type 'number'.
// Literal Types:
// Literal types in TypeScript are used to represent specific, immutable values. They provide a way to enforce strict type checking for constants and expressions that should only have a limited set of possible values.
// Create a variable with a literal type (e.g., "apple" | "banana").
const fruit = "apple";
let age = 20;
// Try assigning a different value to the variable and observe the compiler's response.
// age = 10; // Type '10' is not assignable to type '20'.
// Advanced Types
// Generic Types:
// Generic types allow you to write reusable code that can work with different data types. They provide a way to create type-safe functions, classes, and interfaces that can operate on a variety of values.
// Generic types allow you to create reusable components that can work with different data types. They provide flexibility and type safety by allowing you to define functions, classes, and interfaces that can accept a wide range of arguments.
// Create a generic function, class and interface that takes a generic type as a parameter.
// Use the generic type within the function.
const identify = (arg) => {
    return arg;
};
class genericClass {
    constructor(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}
class Gen {
    constructor(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}
const num = identify(2);
const iceMelts = identify(true);
const colorData = new genericClass(['red', 'gold', 'green']);
const currentLocation = new genericClass('Phnom Penh');
const posIntUnder10 = new Gen([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const evenNumUnder10 = new Gen([0, 2, 4, 6, 8]);
// Assign each type to different variables
const myRealName = 'Chhum';
const myAge = 12;
const isProgrammer = true;
// const myPosition: Name = 12; // Type 'number' is not assignable to type 'string'.
// const myDogAge: Age = '10'; // Type 'string' is not assignable to type 'number'.
// const sex: Conditional = [0]; // Type 'number[]' is not assignable to type 'boolean'.
// Type Assertion:
// A type assertion in TypeScript is a way to tell the compiler that a value is of a specific type, even if the compiler isn't sure. This can be useful when you have more information about a value than the compiler does.
// Create a function using type assertion
const value2 = "Hello";
let message2 = value2;
// If the argument type is anything other than 'string', it will output undefined.
const processValue = (value) => {
    if (typeof (value) === 'number') {
        const num = value;
        console.log(`Number: ${num}`);
    }
    else if (typeof (value) === 'string') {
        const str = value;
        console.log(`String: ${str}`);
    }
};
// Create a class that implements the interface.
class Dog {
    constructor(type, isMammal) {
        this.type = type;
        this.isMammal = isMammal;
    }
    produceMilk() {
        if (this.isMammal) {
            console.log(`${this.type} breastfeeds her cubs.`);
        }
        else {
            console.log(`${this.type} is not a mammal.`);
        }
    }
}
// Create instances of the class and use them where the interface is expected.
const dingo = new Dog('Dingo', true);
const croc = new Dog('Crocodile', false);
// Class Types:
// In TypeScript, a class is a blueprint for creating objects, providing a structured way to define properties and methods. It encapsulates data and behavior, promoting code organization and reusability.
// Create a class with properties and methods.
class Birds {
    constructor(types, location) {
        this.types = types;
        this.location = location;
    }
    showDetail() {
        console.log(`${this.types}, ${this.location}`);
    }
}
// Create instances of the class.
const raptors = new Birds(['hawk', 'eagle', 'owl'], 'Asia');
console.log('Hello, raptor');
// Access properties and call methods on the instances.
raptors.types; // output: ['hawk', 'eagle', 'owl'], 'Asia']
raptors.location; // output: 'Asia';
raptors.showDetail(); // output: 'hawk', 'eagle', 'owl', 'Asia'
// Enum Types:
// Enums (enumerations) are a way to define a set of named constants. They provide a more readable and maintainable way to represent a fixed set of values compared to using raw numbers or strings. Enums are often used to represent a finite set of related values.
// Create an enum type with different members.
var Num;
(function (Num) {
    Num[Num["one"] = 1] = "one";
    Num[Num["two"] = 2] = "two";
    Num[Num["three"] = 3] = "three";
})(Num || (Num = {}));
// Access members of the enum by their name or index.
Num.one; // output: 1
Num.three; // output: 3
Num[1]; // output: 'one';
// Tuple Types:
// Tuples are a fixed-length array with elements of specified types. They provide a way to represent ordered collections of elements with known types.
// Tuples are useful for representing structured data, such as coordinate points, function return values, or configuration options.
// They provide a more type-safe alternative to arrays for scenarios where the element types and order are known in advance.
// Tuples can be used with other TypeScript features like generics and interfaces.
// Create a tuple type with specific elements.
const myMixed = ['Hello, world!', 13, false];
const getInformation = (info) => info;
// Access elements of the tuple by their index.
myMixed[0]; // output: 'Hello, world!'
myMixed[2]; // output: false
// Try modifying elements of the tuple and observe the compiler's response.
myMixed[0] = 'Hi';
myMixed[0]; // output: 'Hi'
