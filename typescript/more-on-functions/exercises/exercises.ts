// 1. Function Type Expressions
// In TypeScript, a function type expression defines the types of parameters and the return type of a function, similar to call signatures but more commonly used for standalone functions. You can define the shape of a function using a function type and assign functions to variables accordingly.

// Exercise: Using Function Type Expressions
// Create a function type expression for a function that takes a string as an argument and returns a boolean indicating whether the string is a palindrome.

// Task:
// Define a Function Type Expression:
// Create a variable 'operation' that has a function type expression taking two numbers and returning a number.
type Operation = (a: number, b: number) => number;

// Write Three Implementations:
// Assign three different functions to the operation variable:
// One that performs addition.
const addFTE: Operation = (a, b) => a + b;
// One that performs subtraction.
const subFTE: Operation = (a, b) => a - b;
// One that performs division.
const divFTE: Operation = (a, b) => a / b;

// Create a Test Function:
// Write a function performOperation that accepts two numbers and an operation function (typed as your function type expression). Inside, call the operation with the two numbers and print the result.
const performOperation = (num1: number, num2: number, operation: Operation) => {
  console.log(operation(num1, num2));
};

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


// Task: Implement a calculate function with overloads
// Write a function called calculate that can either:
// Add two numbers when passed two numeric arguments.
// Concatenate two strings when passed two string arguments.
// Return the length of an array when passed an array of numbers.
// Expected Outputs:
// calculate(5, 10) should return: 15
// calculate("Hello", "World") should return: "HelloWorld"
// calculate([1, 2, 3, 4]) should return: 4



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
