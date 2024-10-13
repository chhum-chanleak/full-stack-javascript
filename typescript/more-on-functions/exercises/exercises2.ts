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
const addExpression = (a: number, b: number): number => a + b;
const subtractExpression = (a: number, b:number): number => a -b;
const divideExpression = (numerator: number, denominator: number): number => numerator / denominator;

// console.log(addExpression(2, 3));
// console.log(subtractExpression(3, 3));
// console.log(divideExpression(4, 2));

// 2. Call Signatures
// In TypeScript, a call signature defines the types of parameters and return values for functions within objects or types. It allows you to describe functions in the context of object types or interfaces.

// Exercise: Implementing Call Signatures
// You are tasked with creating an interface that describes different mathematical operations using call signatures. Follow the steps below:
// Define the interface:
// Create an interface MathOperation that defines a call signature for a function that takes two numbers and returns a number.
// Implement the interface:
// Write three different implementations of this interface:
// One for addition.
// One for subtraction.
// One for multiplication.
// Test your functions:
// Create a test function that accepts a MathOperation and applies it to two numbers, printing the result.
interface MathOperation3 {
  (num1: number, num2: number): number;
}

const addSignature: MathOperation3 = (num1, num2) => num1 + num2;
const subtractSignature: MathOperation3 = (a, b) => a - b;
const multiplySignature: MathOperation3 = (a, b) => a * b;

// console.log(addSignature(1, 1));
// console.log(subtractSignature(2, 3));
// console.log(multiplySignature(4, 4));

//  3. Construct Signatures
// In TypeScript, a 'construct signature' is similar to a 'call signature', but it’s used to describe how objects can be constructed using the 'new' keyword. It defines the types of arguments that can be passed to a constructor when creating an instance of a class or an object type.

// Exercise: Working with Construct Signatures
// Task:
// Create an Interface for a Class Constructor:
// Define an interface PersonConstructor with a construct signature that accepts two parameters: name (a string) and age (a number). It should return a Person object.
// Implement a Class:
// Implement the Person class with the following properties:
// name (a string)
// age (a number)
// The class should have a constructor that takes these parameters and assigns them to the class properties.
// Create Instances Using the Constructor Interface:
// Use the construct signature from the PersonConstructor interface to create instances of the Person class using the new keyword.
// In the statement let myPerson: PersonConstructor = Person;, you're using TypeScript's type system to ensure that the Person class matches the structure defined by the PersonConstructor interface, which includes a construct signature.
// Now myPerson is a class represents class 'Person'
interface PersonConstructor3 {
  new (name: string, age: number): ConstructPerson3;
}

class ConstructPerson3 {
  _name: string;
  _age: number;

  constructor(name: string, age: number) {
    this._name = name;
    this._age = age;
  }
}

const myPerson3: PersonConstructor3 = ConstructPerson3;

const man = new myPerson3("noMe", 12);
// console.log(man);

// 4. Generic Functions
// In TypeScript, generic functions allow you to create functions that work with any data type while maintaining type safety. By using generics, you can define a function that can accept parameters of different types and return a value of a corresponding type without losing the information about what types those are.

// Exercise: Creating a Generic Function
// Task:
// Write a generic function wrapInArray that takes a single argument of any type and returns an array containing that argument.
// Test Your Function:
// Call wrapInArray with different types of arguments (e.g., a number, a string, and an object) and log the results.
const wrapInArray2 = <T>(value: T): T[] => [value];

// console.log(wrapInArray2<number>(2)); // Ok
// console.log(wrapInArray2<boolean>(true)); // Ok

  // 4.1 Inference
  // In TypeScript, generic type inference allows TypeScript to automatically infer the type arguments of a generic function based on the provided function arguments. This helps reduce redundancy since you don’t need to explicitly specify the types if TypeScript can infer them.
  // You do not have to explicity specify 'type'
  // console.log(wrapInArray2("Hello")); // Ok

  // 4.2 Constraints
  // In TypeScript, you can constrain generics to ensure that they only accept certain types. This is done using the extends keyword. 
  // Generic function with a constraint
  interface Length2 {
    length: number;
  }

  // getLength() only accepts an argument which has a 'length' property.
  const getLength = <T extends Length2>(arr: T): number => arr.length;

  // console.log(getLength("Hello")); // Ok
  // console.log(getLength([2, 4])); // Ok

  // 4.3 Working with Constrained Values
  // In TypeScript, when working with constrained generic types, you can access properties or methods that are guaranteed by the constraint. This allows you to safely interact with the constrained values.
  const informSize = <T extends Length2>(arr: T): void => {
    if (arr.length >= 5) {
      console.log("It is large.");
    } else {
      console.log("It is small.");
    }
  };

  // console.log(informSize("Hell")); // Ok
  // console.log(informSize([2, 4, 1, 2, 3, 5])); // Ok

  // 4.4 Specifying Type Arguments
  // In TypeScript, while the compiler often infers the type arguments for generic functions, you can also explicitly specify the type arguments if necessary. This is particularly useful when you want to enforce a specific type or when inference doesn’t work as expected.
  const showType2 = <T>(arg: T): void => console.log(`${arg} has a type of ${typeof(arg)}.`);

  // explicitly specify the type argument(<number>).
  // showType2<number>(2); // Ok
  // showType2<number[]>([2, 3]); // Ok

  // 4.5 Guidelines for Writing Good Generic Functions
  // 1. Limit the Number of Type Parameters
  // Avoid using too many generic parameters unless absolutely necessary. Multiple type parameters can make functions harder to read and reason about.  
  // Bad example
  function processData<A, B, C, D>(a: A, b: B, c: C, d: D): void {
    console.log(a, b, c, d);
  }
  // Good example
  function processData2<T, U>(a: T, b: U): void {
    console.log(a, b);
  }

  // 2. Use Descriptive Type Parameter Names
  // Use meaningful type parameter names to make the function easier to understand. Although 'T' is a common shorthand, in more complex cases, using descriptive names can clarify what the type represents.

  // Bad example
  function merge<T, U>(obj1: T, obj2: U): T & U {
    return { ...obj1, ...obj2 };
  }
  // Good example
  function merge2<FirstObject, SecondObject>(obj1: FirstObject, obj2: SecondObject): FirstObject & SecondObject {
    return { ...obj1, ...obj2 };
  }

  // 3. Add Constraints Only When Necessary
  // Don't over-constrain your generics. Only add constraints (extends) when you need access to specific properties or methods. This helps keep the function flexible.

  // Bad example
  function logObject<T extends { name: string; age: number }>(obj: T): void {
  console.log(obj.name, obj.age);
  }
  // Good example
  function logObject2<T extends { name: string }>(obj: T): void {
    console.log(obj.name);
  }

// 5. Optional Parameters
// In TypeScript, optional parameters allow you to define function parameters that are not required when calling the function. If the caller does not provide a value for an optional parameter, it will be 'undefined' by default. In TypeScript, you can define optional parameters in a function by appending a question mark (?) to the parameter name. Optional parameters allow you to specify parameters that may or may not be provided when the function is called.

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

// call signature
interface DescribeBook2 {
  (title: string, author?: string): string;
}

const describeBook2: DescribeBook2 = (title, author?) => {
  if (author) {
    return `Title: ${title}, Author: ${author}`;
  }
  
  return `Title: ${title}`;
};

// console.log(describeBook2("1984", "George Orwell")); // Ok
// console.log(describeBook2("To Kill a Mockingbird")); // Ok

  // 5.1 Optional Parameters in Callbacks
  // In TypeScript, optional parameters can also be used in callback functions. This allows the callback to be invoked with different numbers of arguments, providing flexibility in how the callback is called and implemented.

  // No exercise for 5.1

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
interface GetUserInfo2 {
  // Overloads
  (id: string): string;
  (obj: {id: string, name: string}): string;
}

const getUserInfo2: GetUserInfo2 = (info) => {
  if (typeof(info) === "string") {
    return `USER_ID: ${info.toUpperCase()}`;
  } else if (info.name) {
    return `USER_ID: ${info.id}, Name: ${info.name}`;
  }

  throw new Error("Unknown argument.");
};

// console.log(getUserInfo2("123abc")); // Ok
// console.log(getUserInfo2({ id: "123abc", name: "Alice"})); // Ok
// console.log(getUserInfo2(2)); // Not ok

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
interface Calculate2 {
  (number_1: number, number_2?: number): number;
  (string_1: string, string_2?: string): string;
  (array: number[]): number;
}

// Take in an array of number and return its length
function calculate2(param: number[]): number;
function calculate2(param_1: number, param_2: number): number;
function calculate2(param_1: string, param_2: string): string;
function calculate2(param_1: unknown, param_2?: unknown) {
  if (param_2) {
    if ((typeof(param_1) === 'number') && (typeof(param_2) === 'number')) {
      return param_1 + param_2;
    } else if ((typeof(param_1) === 'string') && (typeof(param_2) === 'string')){
      return `${param_1}${param_2}`;
    }
  } else if (Array.isArray(param_1) && typeof(param_1[0] === 'number')) {
    return param_1.length;
  }

  throw new Error("Unknown argument.");
};

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
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  // 'greet()' can only be called by 
  greet(this: Person3): void {
    console.log(`Hello, my name is ${this._name}`)
  }
}

const person3 = new Person3("HHH");

// person3.greet(); // output: Hello, my name is HHH

// Assigning greet to another variable loses context for 'this' of 'person3'.
const notPerson = person3.greet;

// notPerson(); // Not ok

// Using bind to explicitly set the 'this' context of 'person3'.
const newPerson = notPerson.bind(person3);
// newPerson(); // output: Hello, my name is HHH

// 8. Other Types to Know About
  // 8.1 void
  // In TypeScript, void is a type that indicates the absence of a return value from a function. When a function has a return type of void, it either doesn't return anything, or it returns undefined. This is useful for functions that are meant to perform some side effects, such as logging or modifying a value, without returning any specific value.

  // Exercise: Writing a void Function
  // Task:
  // Write a function printInfo that takes two parameters: a name (string) and an age (number).
  // The function should log a message like: "Name: John, Age: 25".
  // Ensure the function returns void to indicate that it doesn't return any value.
  // Try modifying the function to return a string and see what TypeScript says.
  type PrintInfo2 = (name: string, age: number) => void;
  const printInfo2: PrintInfo2 = (name, age) => console.log(`Name: ${name}, Age: ${age}`);

  // printInfo2("Chan", 3); // Ok

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
  type Car2 = {
    make: string,
    model: string,
    year: number,
  };
  type PrintCarInfo2 = (car: Car2) => void;
  const printCarInfo2: PrintCarInfo2 = (car) => console.log(`Made in: ${car.make}, Model: ${car.model}, Year: ${car.year}`);

  const vivo: Car2 = { make: "Sweden", model: "2020", year: 2020 };

  // printCarInfo2(vivo); // Ok

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
  type ProcessValue2 = (value: unknown) => number | string;
  const processValue2: ProcessValue2 = (value) => {
    if (typeof(value) === "string") {
      return value.toUpperCase();
    } else if (typeof(value) === "number") {
      return value * 10;
    }
    throw new Error("Unknown argument.");
  };

  // console.log(processValue2("Hello")); // Ok
  // console.log(processValue2(3)); // Ok
  // console.log(processValue2({ name: "hello" })); // Not ok

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
  type Circle2 = {
    kind: "circle",
  };
  type Square2 = {
    kind: "square",
  };
  type Triangle2 = {
    kind: "triangle",
  };

  type Shape2 = Circle2 | Square2 | Triangle2;
  type GetArea2 = (shape: Shape2) => string;
  const getArea2: GetArea2 = (shape) => {
    switch (shape.kind) {
      case "circle":
        return `pi * r^2`;
      case "square":
        return `sideLength * sideLength`;
      case "triangle":
        return `(1 / 2) * base * height`;
      default: 
        const _exhaustiveCheck: never = shape;
        return _exhaustiveCheck;
    } 
  };

  const circle: Circle2 = {
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
  let twoString: (string1: string, string2: string) => boolean;
  twoString = (string1, string2) => false;

  // console.log(twoString("Hello", "world!")); // Ok
  // console.log(twoString("Hello", true)); // Not ok

  // Using type alias
  type TwoString2 = (string1: string, string2: string) => boolean;
  const getTwoString2: TwoString2 = (string1, string2) => true;

  // console.log(getTwoString2("Hello", "world!")); // Ok
  // console.log(getTwoString2("Hello", 2)); // Not ok

// 9. Rest Parameters and Arguments  
// In TypeScript, rest parameters allow you to represent an indefinite number of arguments as an array. This is useful when you want to create functions that can accept more parameters than you can explicitly define.

// Exercise:
// Create a function that takes a variable number of string arguments and concatenates them into a single string, separated by spaces.
// Implement the function and test it with different sets of strings.

// Rest Parameters
type Concat2 = (...items: string[]) => string;
const concat2: Concat2 = (...items) => {
  let joinedString: string = "";

  for (let i = 0; i < items.length; i += 1) {
    joinedString += ` ${items[i]}`;
  }

  return joinedString;
};

// Rest Arguments
// console.log(concat2("Hello", "world!", "again")); // Ok
  
//  10. Parameter Destructuring
// In TypeScript, parameter destructuring allows you to unpack values from arrays or properties from objects directly into function parameters. This makes it easier to work with complex data structures by providing a clearer and more concise syntax.

// Exercise: Implementing Parameter Destructuring
// Create an interface for a Product that has id, name, and price.
// Implement a function that takes a Product object and prints its details in a formatted way using parameter destructuring.
// Test the function with different Product objects.
interface ProductDestructuring {
  id: string;
  name: string;
  price: number;
}

type DestructProduct = (obj: ProductDestructuring) => void;
const destructProduct: DestructProduct = ({ id, name, price }) => console.log(`ID: ${id}, Name: ${name}, Price: ${price}`);

const mouse: ProductDestructuring = {
  id: '123abc',
  name: "Dell",
  price: 10,
};

// console.log(destructProduct(mouse)); // Ok
// console.log(destructProduct({ id: "dell", name: "dell keyboard", price: 20 })); // Ok

// 11. Assignability of Functions
// In TypeScript, assignability of functions refers to how function types can be assigned to variables or passed as parameters, considering their parameter types and return types. This concept is rooted in structural typing, meaning that TypeScript checks if a function's parameter types and return type match those expected by the target function type. For example, the target function with a parameter of type 'number' and a function return type of 'void' can be assign to the source function with a parameter of type 'number' and a return type of any type.

// Exercise: Function Assignability
// Create a function type called NumberCallback that accepts a number and returns void.
// Implement two functions:
// The first function, printNumber, takes a number and logs it to the console.
// The second function, printOptionalNumber, takes an optional number and logs it, defaulting to zero if not provided.
// Demonstrate assignability by assigning printOptionalNumber to a variable of type NumberCallback.
// Create a third function that takes a number and returns a string representation of that number. Show that you cannot assign this function to NumberCallback.
type NumberCallback2 = (number: number) => void;
const printNumber2: NumberCallback2 = (number) => console.log(number);
const printOptionalNumber2: NumberCallback2 = (number = 0) => console.log(number);
const representNumber = (number: number): string => {
  return `${number}`;
};
let returnString = representNumber;
// returnString = printNumber2; // Not ok because Type 'NumberCallback2' is not assignable to type '(number: number) => string'.
// Type 'void' is not assignable to type 'string'.
let printOptional: NumberCallback2;
printOptional = representNumber; // Ok because return type 'void' is assignable to other return 'types'