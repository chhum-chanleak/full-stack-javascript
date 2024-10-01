// 1. typeof Type Guards
// Type Guards in TypeScript are a mechanism to refine the type of a variable based on runtime checks. They are essential for writing type-safe code, especially when dealing with variables of type 'any' or when you need to narrow down the type based on specific conditions.

// Exercise: Create a function that takes a value as input and returns a string indicating its type (e.g., "number", "string", "boolean", "object", "undefined", "null", "symbol", "bigint"). Use typeof to determine the type.
const isString = (value: any): string => {
  if (typeof(value) !== "string") {
    throw new Error("Value does not have a type of string");
  }
  return value;
};

// 2. Truthiness Narrowing
// Truthiness Narrowing in TypeScript is a technique used to refine the type of a variable based on its truthiness or falsiness. This means that the type of a variable can be narrowed down to a more specific type if you know that it's either truthy or falsy.

// Exercise: Write a function that takes a value as input and returns "truthy" or "falsy" based on its truthiness. Use truthiness narrowing to refine the type based on the value.
const greet2 = (msg: string | null | undefined): string => {
  // Check msg' value when it is neither equal to null nor undefined.
  if (msg != null) {
    // When msg is truthy, return msg.
    if (msg) {
      return msg
    }
  }
  throw new Error("Parameter must have a type of 'string' and not be empty string.");
};

// 3. Equality Narrowing
// Equality Narrowing in TypeScript is a technique used to refine the type of a variable based on its equality to a specific value. This means that the type of a variable can be narrowed down to a more specific type if you know that it's equal to a particular value.

// Exercise: Create a function that takes a number as input and returns "even" or "odd". Use equality narrowing to check if the number is divisible by 2.
const checkNum = (num: number): string => {
  if ((num % 2) === 0) {
    return 'even';
  }
  
  return `odd`;
};

// 4. The 'in' Operator Narrowing
// The 'in' Operator Narrowing in TypeScript is a technique used to refine the type of a variable based on the presence or absence of a specific property. This is particularly useful when working with objects that might have different properties or when dealing with discriminated unions.

// Exercise: Create new shape interfaces called 'Rectangle' with properties name and width and height, Circle with properties name, radius. All properties for each interface are of type number. Define the getArea function to handle each interface object area (ex: radius ** 2 * pi). Test the getArea function with Circle and Rectangle objects to ensure it correctly calculates the area for each shape.

// 5. instanceof Narrowing
// Exercise: Create a base class and a derived class. Write a function that takes an object as input and returns a string indicating whether it's an instance of the base class or the derived class. Use instanceof to narrow the type based on the object's class.

// 6. Assignments
// Exercise: Write a function that takes a variable as input and assigns a value to it based on its type. Use type guards to ensure that the value assigned is compatible with the variable's type.

// 7. Control Flow Analysis
// Exercise: Create a function that takes a value as input and returns a string based on its type. Use control flow analysis to ensure that all possible types are handled.

// 8. Using Type Predicates
// Exercise: Define a type predicate that checks if a value is an array of numbers. Use this predicate in a function that calculates the sum of elements in a numeric array.

// 9. Assertion Functions
// Exercise: Create an assertion function that checks if a value is a string. Use this assertion function in a function that converts a string to uppercase.

// 10. Non-null Assertion
// Exercise: Create a function that takes a string as input and returns its length. Use a non-null assertion to ensure that the string is not null or undefined before accessing its length.

// 11. Discriminated Unions
// Exercise: Define a discriminated union of two types with a common property. Write a function that takes an object of the discriminated union as input and returns a string based on the common property.

// 12. The never Type
// Exercise: Create a function that throws an error if a value is of a specific type. Use the never type to indicate that the function never returns.

// 13. Exhaustiveness Checking
// Exercise: Create a function that takes a discriminated union as input and returns a string based on the type. Use exhaustiveness checking to ensure that all possible types are handled.