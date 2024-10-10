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
const performAddtion: (param1: number, param2: number) => number = (num1, num2) => num1 + num2;
const performSubtraction: (param1: number, param2: number) => number = (num1, num2) => num1 - num2;
const perFormDivision: (param1: number, param2: number) => number = (num1, num2) => num1 / num2;

// console.log(performAddtion(3, 5)); // Ok
// console.log(performSubtraction(3, 2)); // Ok
// console.log(perFormDivision(6, 3)); // Ok

// 2. Call Signatures
// In TypeScript, a call signature defines the types of parameters and return values for functions within objects or types. It allows you to describe functions in the context of object types or interfaces.

// Here’s an exercise to help reinforce your understanding of call signatures in TypeScript:
// Exercise: Implementing Call Signatures
// You are tasked with creating an interface that describes different mathematical operations using call signatures. Follow the steps below:
// Define the interface:
// Create an interface MathOperation that defines a call signature for a function that takes two numbers and returns a number.
// Implement the interface:
interface MathOperation {
  (a: number, b: number): number;
}

// Write three different implementations of this interface:
// One for addition.
const addNums: MathOperation = (a, b) => a + b;
// One for subtraction.
const subNums: MathOperation = (a, b) => a - b;
// One for multiplication.
const multi: MathOperation = (a, b) =>  a * b;

// Test your functions:
// Create a test function that accepts a MathOperation and applies it to two numbers, printing the result.
const testOperation = (operation: MathOperation, num1: number, num2: number) => {
  console.log(operation(num1, num2));
};

//  3. Construct Signatures
// In TypeScript, a 'construct signature' is similar to a 'call signature', but it’s used to describe how objects can be constructed using the 'new' keyword. It defines the types of arguments that can be passed to a constructor when creating an instance of a class or an object type.

// Exercise: Working with Construct Signatures
// Task:
// Create an Interface for a Class Constructor:
// Define an interface PersonConstructor with a construct signature that accepts two parameters: name (a string) and age (a number). It should return a Person object.
interface PersonConstructor {
  new (name: string, age: number): Person;
}

// Implement a Class:
// Implement the Person class with the following properties:
// name (a string)
// age (a number)
// The class should have a constructor that takes these parameters and assigns them to the class properties.
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// Create Instances Using the Constructor Interface:
// Use the construct signature from the PersonConstructor interface to create instances of the Person class using the new keyword.
// In the statement let myPerson: PersonConstructor = Person;, you're using TypeScript's type system to ensure that the Person class matches the structure defined by the PersonConstructor interface, which includes a construct signature.
// Now myPerson is a class represents class 'Person'
let myPerson: PersonConstructor = Person;

const andy = new myPerson('Andy', 18);

// 4. Generic Functions
// In TypeScript, generic functions allow you to create functions that work with any data type while maintaining type safety. By using generics, you can define a function that can accept parameters of different types and return a value of a corresponding type without losing the information about what types those are.

// Exercise: Creating a Generic Function
// Task:
// Create a Generic Function:
// Write a generic function wrapInArray that takes a single argument of any type and returns an array containing that argument.
const wrapInArray = <Type>(arg: Type): Type[] => {
  return [arg];
};

// Test Your Function:
// Call wrapInArray with different types of arguments (e.g., a number, a string, and an object) and log the results.
const numberWrapped = wrapInArray<number>(22);
const stringWrapped = wrapInArray<string>("Hello, world!");
const objectWrapped = wrapInArray<object>({ name: "Chhum", age: 12});

  // 4.1 Inference
  // You do not have to explicity specify 'type'
  const booleanWrapped = wrapInArray(true);
  // 4.2 Constraints
  // Generic function with a constraint
  const greet = <Type extends { name: string}>(obj: Type): string => {
    return `Hello, ${obj.name}`;
  };

  const cat = {
    name: 'Meow',
    age: 11,
  };
  // 4.3 Working with Constrained Values
  const catGreet = greet(cat); // Valid because 'cat' has a property called 'name'.
  // 4.4 Specifying Type Arguments
  const pair = <K, V>(key: K, value: V): [K, V] => [key, value];

  const myPair = pair<string, string>('name', 'Chhum');
  const myPair2 = pair<string, number>('age', 12);
  // 4.6 Guidelines for Writing Good Generic Functions
        // Use meaningful type parameter
        // Do
        const processItem = <Item>(item: Item): void => {
          // ...
        };

        // Don't
        const processItem2 = <T>(item: T): void => {
          // ...
        };
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
type DescribeBook = (title: string, author?: string) => string;
const describeBook: DescribeBook = (title, author?) => {
  if (author) {
    return `Title: ${title}, Author: ${author}`;
  }
  return `Title: ${title}`;
};

const book = describeBook('1984', 'George Orwell');
const book2 = describeBook("To Kill a Mockingbird");

  // 5.1 Optional Parameters in Callbacks
  // In TypeScript, optional parameters can also be used in callback functions. This allows the callback to be invoked with different numbers of arguments, providing flexibility in how the callback is called and implemented.

  // Exercise
  // Task: Write a function called fetchUserData that simulates fetching user data from a server. It should take a callback with two parameters:
  // user (optional): An object representing the user (with name and age properties).
  // error (optional): A string representing an error message.
  // Your function should invoke the callback with a user object if the request is successful (simulate this using a random condition), or with an error message if it fails.

  // Function type expression
  type User = {
    name: string,
    age: number
  };
  type CallBack = ({ name, age }?: User, error?: string) => void;
  type FetchUserData = (callBack: CallBack) => void;
  const fetchUserData: FetchUserData = (callback) => {
    const success = Math.random() > 0.5;

    if (success) {
      const user = { name: "Alice", age: 25, };
      callback(user);
    } else {
      const error = "Unable to fetch user data.";
      callback(undefined, error);
    }
  };

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
type User2 = {
  id: string,
  name: string,
};

// Overload signatures
function getUserInfo(userId: string): string;
function getUserInfo(userObj: User2): string;

// Implementation
function getUserInfo(user: string | User2): string {
  if (typeof(user) === 'object') {
    return `User ${user.id}: ${user.name}`;
  }
  
  return `USER ID: ${user}`;
}

const userId = getUserInfo("123abc");
const userInfo = getUserInfo({ id: "123", name: 'Chhum'});

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

function calculate(num1: number, num2: number): number;
function calculate(str1: string, str2: string): string;
function calculate(arr: number[]): number;
function calculate(param1: number | string | number[], param2?: number | string): number | string {
  if (param2 && typeof(param2) === 'number') {
    if (typeof(param1) === 'number') {
      return param1 + param2;
    }
  } else if (param2 && typeof(param2) === 'string') {
    if (typeof(param1) === 'string') {
      return `${param1}${param2}`;
    }
  } else if (param2 === undefined) {
    if (Array.isArray(param1)) {
      return param1.length;
    }
  }

  throw new Error("'Invalid arguments.");
};

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
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  // 'this' keyword will not appear at 'runtime'. It's only used for type checking at compilation.
  greet(this: Person2): void {
    console.log(`Hello, ${this._name}`);
  }
}

const person = new Person2('Andy');
const notGreet = person.greet; // Calling notGreet() will throw an error
// Do this instead
const yestGreet = person.greet.bind(person); // output: "Hello, Andy"

// 8. Other Types to Know About
  // 8.1 void
  // In TypeScript, void is a type that indicates the absence of a return value from a function. When a function has a return type of void, it either doesn't return anything, or it returns undefined. This is useful for functions that are meant to perform some side effects, such as logging or modifying a value, without returning any specific value.

  // Exercise: Writing a void Function
  // Task:
  // Write a function printInfo that takes two parameters: a name (string) and an age (number).
  // The function should log a message like: "Name: John, Age: 25".
  // Ensure the function returns void to indicate that it doesn't return any value.
  // Try modifying the function to return a string and see what TypeScript says.
  type PrintInfo = (name: string, age: number) => void;
  const printInfo: PrintInfo = (name, age) => {
    console.log(`Name: ${name}, Age: ${age}`);
  };

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
  type Car = {
    make: string,
    model: string,
    year: number,  
  };
  type PrintCarInfo = (obj: Car) => void;
  const printCarInfo: PrintCarInfo = (obj) => {
    console.log(`Make: ${obj.make}, Model: ${obj.model}, Year: ${obj.year}`);
  };

  const myCar: Car = {
    make: 'Japan',
    model: 'Nissan',
    year: 2012,
  };

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
  type ProcessValue = (param: unknown) => string | number;
  const processValue: ProcessValue = (param) => {
    if (typeof(param) === "string") {
      return param.toUpperCase();
    } else if (typeof(param) === 'number') {
      return param * 10;
    }

    throw new Error("Unsupported type.");
  };

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

  type AssertUnreachable = (arg: never) => never;
  const assertUnreachable: AssertUnreachable = (arg) => {
    throw new Error(`Unexpected value ${arg}`);
  };

  interface Circle {
    kind: "circle";
    radius: number;
  }
  interface Square {
    kind: "square";
    sideLength: number;
  }
  interface Triangle {
    kind: "triangle";
    base: number;
    height: number;
  }
  type Shape = Circle | Square | Triangle;
  type GetArea = (shape: Shape) => string;
  const getArea: GetArea = (shape) => {
    switch (shape.kind) {
      case "circle":
        shape
        return `pi * r^2`;
      case "square":
        shape
        return `sideLength ** 2`;
      case "triangle":
        shape
        return `(1 / 2) * base * height`;
      default:
        // const _exhaustiveCheck: never = shape;
        // return _exhaustiveCheck;
        assertUnreachable(shape);
    }
  };

  const circle2: Shape = {
    kind: "circle",
    radius: 12,
  };
  const square2: Shape = {
    kind: 'square',
    sideLength: 6,
  };
  const triangle2: Shape = {
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
  let add: (x: number, y: number) => number;

  add = (x, y) => x + y; // Valid assignment
  // console.log(add(5, 10)); // Output: 15 

  // Using a Type Alias
  type Add = (x: number, y: number) => number;
  const add2: Add = (x, y) => x + y; // Use the type alias

  // console.log(add(5, 10)); // Output: 15

  const subtract2: Add = (x, y) => x - y; // Another function using the same type

  // console.log(subtract2(10, 5)); // Output: 5

  // Exercise:
  // Create a function type that takes two strings and returns a boolean.
  // Implement a function based on this type that checks if the first string contains the second string.
  // Test the function with various inputs.

  // Using variable Declaration
  let concateVariable: (str1: string, str2: string) => boolean;

  concateVariable = (firstName, lastName) => firstName.length < lastName.length;

  // Using type alias
  type Concate = (param1: string, param2: string) => boolean;
  const concate: Concate = (firstName, lastName) => firstName.length < lastName.length;

  // console.log(concateVariable("Chhum", "Chanleak")); // Ok
  // console.log(concate("Chanleak", "Chhum")); // Ok

// 9. Rest Parameters and Arguments  
  // In TypeScript, rest parameters allow you to represent an indefinite number of arguments as an array. This is useful when you want to create functions that can accept more parameters than you can explicitly define.

  // Exercise:
  // Create a function that takes a variable number of string arguments and concatenates them into a single string, separated by spaces.
  // Implement the function and test it with different sets of strings.

  // Rest Parameters
  type MakeJoin = (...strs: string[]) => string;
  const makeJoin: MakeJoin = (...strs) => {
    let concatenatedString: string = "";

    for (let i = 0; i < strs.length; i += 1) {
      concatenatedString += ` ${strs[i]}`;
    }

    return concatenatedString;
  };

  // Rest Arguments
  // console.log(makeJoin("Hello", "world!", "everyone", "!")); // Ok

  
//  10. Parameter Destructuring
// In TypeScript, parameter destructuring allows you to unpack values from arrays or properties from objects directly into function parameters. This makes it easier to work with complex data structures by providing a clearer and more concise syntax.

// Exercise: Implementing Parameter Destructuring
// Create an interface for a Product that has id, name, and price.
// Implement a function that takes a Product object and prints its details in a formatted way using parameter destructuring.
// Test the function with different Product objects.
interface Product {
  id: number | string;
  name: string;
  price: number;
}

type ShowDetail = ({ id, name, price }: { id: number | string, name: string, price: number }) => void;
const showDetail: ShowDetail = ({ id, name, price }) => console.log(`ID: ${id}, Name: ${name}, Price: ${price}`);

const skinCare: Product = {
  id: '123abc',
  name: 'Leg Lotion',
  price: 12,
};

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
type NumberCallback = (param: number) => void;
const printNumber: NumberCallback = (num) => {
  console.log(num);
};

const printOptionalNumber:NumberCallback = (num?) => {
  console.log(num !== undefined ? num : 0);
};

let showNumber: NumberCallback = printNumber;
let optionalNumber: NumberCallback = printOptionalNumber;

// printNumber(3); // Ok
// printOptionalNumber(); // Ok
// printOptionalNumber(2); // Ok

type NumberShowString = (param: number) => string;
const numberShowString: NumberShowString = (num) => num.toString();

// let showString: NumberShowString = showNumber; // No ok