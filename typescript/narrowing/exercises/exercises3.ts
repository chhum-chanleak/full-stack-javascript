// 1. 'typeof' Type Guards
// Type Guards in TypeScript are a mechanism to refine the type of a variable based on runtime checks. They are essential for writing type safe code, especially when dealing with variables of type 'any' or when you need to narrow down the type based on specific conditions.

// Exercise: Create a function that takes a value as input and returns a string indicating its type (e.g., "number", "string", "boolean", "object", "undefined", "null", "symbol", "bigint"). Use typeof to determine the type.
const handleTypeGuards = (value: any): string => typeof(value);

// 2. Truthiness Narrowing
// Truthiness Narrowing in TypeScript is a technique used to refine the type of a variable based on its truthiness or falsiness. This means that the type of a variable can be narrowed down to a more specific type if you know that it's either truthy or falsy.

// Exercise: Write a function that takes a value as input and returns "truthy" or "falsy" based on its truthiness. Use truthiness narrowing to refine the type based on the value.
const handleTruthiness = (value: string | null): string => {
  if (value) {
    return `truthy`;
  }
  return `falsy`;
};

// 3. Equality Narrowing
// Equality Narrowing in TypeScript is a technique used to refine the type of a variable based on its equality to a specific value. This means that the type of a variable can be narrowed down to a more specific type if you know that it's equal to a particular value.

// Exercise: Create a function that takes a number as input and returns "even" or "odd". Use equality narrowing to check if the number is divisible by 2.
const handleEquality2 = (value: number): string => {
  const isDivisibleBy2 = (value % 2 === 0);

  if (isDivisibleBy2) {
    return `even`;
  }
  return `odd`;
};

// 4. The 'in' Operator Narrowing
// The 'in' Operator Narrowing in TypeScript is a technique used to refine the type of a variable based on the presence or absence of a specific property. This is particularly useful when working with objects that might have different properties or when dealing with discriminated unions.

// Exercise: Create a function that takes a Person object as input and returns a string greeting.
// The greeting should include the person's name and age if it's available.
interface Person5 {
  name: string;
  age: number;
  greeting: string;

  showDetail(): void;
}

const abdul: Person5 = {
  name: "Abdul",
  age: 12,

  get greeting(): string {
  return `Hello, my name is ${this.name}, I am ${this.age} years old.`
  },

  showDetail(): void {
    console.log(`Hello, my name is ${this.name}, I am ${this.age} years old.`);
  },
};

const abdula: Person5 = {
  name: "Abdula",
  age: 11,

  get greeting(): string {
  return `Hello, my name is ${this.name}, I am ${this.age} years old.`
  },

  showDetail(): void {
    console.log(`Hello, my name is ${this.name}, I am ${this.age} years old.`);
  },
};

const handleIn2 = (person: Person5): string => {
  if ('name' in person) {
    return person.greeting;
  }

  return `This is not a person.`;
};

// 5. 'instanceof' Narrowing
// The 'instanceof' operator in TypeScript is another powerful tool for type narrowing, allowing you to refine the type of a variable based on its runtime type.

// Exercise: Create 2 classes, Animal and Human. Write a function that takes an object as input and returns a string indicating whether it's an instance of the Animal class or the Human class. Use 'instanceof' to narrow the type based on the object's class.

// 6. Assignments Narrowing
// Assignment narrowing is a powerful technique in TypeScript that allows you to refine the type of a variable based on the value it's assigned. This is particularly useful when working with variables of a union type, where the variable can hold values of multiple types.

// Exercise: Write a function that takes a variable as input and assigns a value to it based on its type. Use 'type guards' to ensure that the value assigned is compatible with the variable's type.

// 7. Control Flow Analysis
// Control flow analysis (CFA) in TypeScript is a process that helps the compiler understand how the program's execution flow can change based on different conditions. This information is crucial for type inference, type checking, and code optimization.

// Exercise: Create a function that takes a value as input and returns a string based on its type. Use control flow analysis to ensure that all possible types are handled.

// Type guard function/type predicates

// 8. Using Type Predicates (Assertion Functions)
// Type predicates in TypeScript are custom functions that can be used to narrow the type of a variable based on a specific condition. They are often used in conjunction with union types and type guards to improve type safety and code clarity.

// Exercise: Define a type predicate that checks if a value is an array of numbers. Use this predicate in a function that calculates the sum of elements in a numeric array.

// 9. Discriminated Unions
// Discriminated Unions in TypeScript are a powerful technique for modeling complex data structures that can have multiple possible shapes. They allow you to define a union type where each member of the union has a unique property that can be used to discriminate between the different types.

// Exercise: Define a discriminated union of two types with a common property. Write a function that takes an object of the discriminated union as input and returns a string based on the common property.

// 10. Exhaustiveness Checking and the 'never' Type
// In TypeScript, exhaustive checking ensures that all possible cases within a 'union type' are handled. This helps prevent runtime errors and improves code reliability. The 'never' type plays a crucial role in achieving exhaustive checking.

// Exercise: Create a function that takes a discriminated union as input and returns a string based on the type. Use exhaustiveness checking to ensure that all possible types are handled.
