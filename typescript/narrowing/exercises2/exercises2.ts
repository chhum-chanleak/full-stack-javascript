// 1. typeof Type Guards
// Type Guards in TypeScript are a mechanism to refine the type of a variable based on runtime checks. They are essential for writing typesafe code, especially when dealing with variables of type 'any' or when you need to narrow down the type based on specific conditions.

// Exercise: Create a function that takes a value as input and returns a string indicating its type (e.g., "number", "string", "boolean", "object", "undefined", "null", "symbol", "bigint"). Use typeof to determine the type.
const isNumber3 = (value: any): string => {
  if (typeof(value) === 'number') {
    return typeof(value);
  }

  return `${value} does not have a type of 'number', it's has a type of (${typeof(value)}).`;
};

// 2. Truthiness Narrowing
// Truthiness Narrowing in TypeScript is a technique used to refine the type of a variable based on its truthiness or falsiness. This means that the type of a variable can be narrowed down to a more specific type if you know that it's either truthy or falsy.

// Exercise: Write a function that takes a value as input and returns "truthy" or "falsy" based on its truthiness. Use truthiness narrowing to refine the type based on the value.
const isTruthy = (value: number | null): string => {
  if (!value) {
    return 'falsy';
  } 
  return `truthy`;
}

// 3. Equality Narrowing
// Equality Narrowing in TypeScript is a technique used to refine the type of a variable based on its equality to a specific value. This means that the type of a variable can be narrowed down to a more specific type if you know that it's equal to a particular value.

// Exercise: Create a function that takes a number as input and returns "even" or "odd". Use equality narrowing to check if the number is divisible by 2.
const handleEquality = (value: number): string => {
  if ((value % 2) === 0) {
    return `even`;
  }
  return 'odd';
};

// 4. The 'in' Operator Narrowing
// The 'in' Operator Narrowing in TypeScript is a technique used to refine the type of a variable based on the presence or absence of a specific property. This is particularly useful when working with objects that might have different properties or when dealing with discriminated unions.

// Exercise: Create a function that takes a Person object as input and returns a string greeting.
// The greeting should include the person's name and age if it's available.
interface Fish2 {
  swim(): void;
}

interface Bird2 {
  fly(): void;
}

type Action = Fish2 | Bird2;

const handleIn = (obj: Action): void => {
  if ('swim' in obj) {
    console.log('A fish swims.');
  } else {
    console.log(`A bird flies.`);
  }
}

// 5. instanceof Narrowing
// The 'instanceof' operator in TypeScript is another powerful tool for type narrowing, allowing you to refine the type of a variable based on its runtime type.

// Exercise: Create 2 classes, Animal and Human. Write a function that takes an object as input and returns a string indicating whether it's an instance of the Animal class or the Human class. Use 'instanceof' to narrow the type based on the object's class.
class Animal2 {
  species: string;

  constructor(species: string) {
    this.species = species;
  }
}

const cat = new Animal2('Feline');

class Human2 {
  superIntelligence: boolean;

  constructor(superIntelligence: boolean) {
    this.superIntelligence = superIntelligence;
  }
}

const human2 = new Human2(true);

const handleInstanceOf = (obj: Animal2 | Human2): string => {
  if (obj instanceof Animal2) {
    return `Parameter is an instance of Animal2.`;
  }
  return `Parameter is an instance of Human2.`;
};

// 6. Assignments Narrowing
// Assignment narrowing is a powerful technique in TypeScript that allows you to refine the type of a variable based on the value it's assigned. This is particularly useful when working with variables of a union type, where the variable can hold values of multiple types.

// Exercise: Write a function that takes a variable as input and assigns a value to it based on its type. Use 'type guards' to ensure that the value assigned is compatible with the variable's type.
const isArrOfStr = (value: (number | string)[]): value is string[] => {
  return typeof(value[0]) !== 'number';
};

const isArrOfNum = (value: (number | string)[]): value is number[] => {
  return typeof(value[0]) !== 'string';
};

const handleAssignment = (value: (number | string)[]): void => {
  // Assignment narrowing
  if (isArrOfStr(value)) {
    let arrStr = [...value];
    console.log(`Parameter is an array of ${typeof(arrStr[0])}.`);
  } else if (isArrOfNum(value)){
    let arrNum = [...value];
    console.log(`Parameter is an array of ${typeof(arrNum[0])}.`);
  }  
};

// 7. Control Flow Analysis
// Control flow analysis (CFA) in TypeScript is a process that helps the compiler understand how the program's execution flow can change based on different conditions. This information is crucial for type inference, type checking, and code optimization.

// Exercise: Create a function that takes a value as input and returns a string based on its type. Use control flow analysis to ensure that all possible types are handled.

// Type guard function/type predicates
const isNumber4 = (value: boolean | number | string): value is number => {
  return typeof(value) === 'number';
};

const isString4 = (value: boolean | number | string): value is string => {
  return typeof(value) === 'string';
};

const handleFlowAnalysis = (value: boolean | number | string): string => {
  // Remove 'number' type.
  if (isNumber4(value)) {
    return `Number ${value}.`;
  } else if (isString4(value)) { // Remove 'string' type.
    return `Hello ${value}`;
  }
  return `This is ${value}`;
};

// 8. Using Type Predicates (Assertion Functions)
// Type predicates in TypeScript are custom functions that can be used to narrow the type of a variable based on a specific condition. They are often used in conjunction with union types and type guards to improve type safety and code clarity.

// Exercise: Define a type predicate that checks if a value is an array of numbers. Use this predicate in a function that calculates the sum of elements in a numeric array.
const isArrOfBool5 = (value: (boolean | number | string)[]): value is boolean[] => {
  return typeof(value[0]) === 'boolean';
};

const isArrOfStr5 = (value: (boolean | number | string)[]): value is string[] => {
  return typeof(value[0]) === 'string';
};

const isArrOfNum5 = (value: (boolean | number | string)[]): value is number[] => {
  return typeof(value[0]) === 'number';
};

const sumOfItems = (arr: (boolean | number | string)[]): number | string => {
  if (isArrOfNum5(arr)) {
    let sum = 0;

    for (let i = 0; i < arr.length; i += 1) {
      sum += arr[i];
    }
    return sum;
  }

  throw new Error(`Parameter must be an array of numbers.`);
};

// 9. Discriminated Unions
// Discriminated Unions in TypeScript are a powerful technique for modeling complex data structures that can have multiple possible shapes. They allow you to define a union type where each member of the union has a unique property that can be used to discriminate between the different types.

// Exercise: Define a discriminated union of two types with a common property. Write a function that takes an object of the discriminated union as input and returns a string based on the common property.

interface Circle {
  kind: "circle";
  radius: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  length: number;
}

type Shape3 = Circle | Rectangle;

const getArea6 = (shape: Shape3): number => {
  switch (shape.kind) {
    case 'circle':
      return (shape.radius ** 2) * Math.PI;
    case 'rectangle':
      return shape.width * shape.length;
  }
};

// 10. Exhaustiveness Checking and the 'never' Type
// In TypeScript, exhaustive checking ensures that all possible cases within a 'union type' are handled. This helps prevent runtime errors and improves code reliability. The 'never' type plays a crucial role in achieving exhaustive checking.

// Exercise: Create a function that takes a discriminated union as input and returns a string based on the type. Use exhaustiveness checking to ensure that all possible types are handled.
const getArea7 = (shape: Shape3): number => {
  switch (shape.kind) {
    case 'circle':
      return (shape.radius ** 2) * Math.PI;
    case 'rectangle':
      return shape.width * shape.length;
    default:
      return shape; // Exhaustiveness checking
  }
};