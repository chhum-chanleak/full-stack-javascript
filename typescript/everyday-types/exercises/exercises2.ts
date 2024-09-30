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
const integer: number = 12;
const getInteger = (): number => integer;
// Try assigning a value of a different type and observe the compiler's response.
// const word: string = getInteger(); // Type 'number' is not assignable to type 'string'.

// Union Types:
// Union types and intersection types are opposites in TypeScript.
// Union types allow you to represent values that can be of multiple types. They are useful when you need to work with variables or expressions that can have different possible types.
// Flexibility: Allow you to work with variables that can have different possible types.
// Type Safety: Help prevent type errors by ensuring that values are used correctly based on their possible types.
// Readability: Improve code readability by making the possible types explicit.
// Interoperability: Can be used to work with external libraries or APIs that return values of different types.
// Create a variable with a union type (e.g., string | number).
type ID3 = string | number;

const id3: ID3 = 24;
const id4: ID3 = '100';
// Assign different types of values to the variable and observe the compiler's response.
// const id5: ID3 = true; // Type 'boolean' is not assignable to type 'ID3'.

// Intersection Types:
// Intersection types and union types are opposites in TypeScript.
// Intersection types allow you to combine multiple types into a single type. This is useful when you need to ensure that a value conforms to multiple types simultaneously.
// Create an interface with properties.
interface Person2 { name: string, age: number };
// Create another interface with properties.
interface Employee2 { department: string, salary: number };
// Create an intersection type using the two interfaces.
type personEmployee = Person2 & Employee2;
// All variables must conform to both interfaces Person2, Employee2
// Create a variable with the intersection type and assign it an object that satisfies both interfaces.
const staff1: personEmployee = {name: 'Chhum', age: 28, department: 'IT', salary: 2000};
const person1: personEmployee = {department: 'IT', salary: 2000, name: 'Chhum', age: 28,};
// const staff2: personEmployee = {name: 12, age: '28', department: 'IT', salary: 2000}; // Type 'string' is not assignable to type 'number'.

// Literal Types:
// Literal types in TypeScript are used to represent specific, immutable values. They provide a way to enforce strict type checking for constants and expressions that should only have a limited set of possible values.
// Create a variable with a literal type (e.g., "apple" | "banana").
const fruit: "apple" = "apple";
let age: 20 = 20;
// Try assigning a different value to the variable and observe the compiler's response.
// age = 10; // Type '10' is not assignable to type '20'.

// Advanced Types

// Generic Types:
// Generic types allow you to write reusable code that can work with different data types. They provide a way to create type-safe functions, classes, and interfaces that can operate on a variety of values.
// Generic types allow you to create reusable components that can work with different data types. They provide flexibility and type safety by allowing you to define functions, classes, and interfaces that can accept a wide range of arguments.
// Create a generic function, class and interface that takes a generic type as a parameter.
// Use the generic type within the function.
const identify = <T> (arg: T): T => {
  return arg;
}

class genericClass<T> {
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}

interface genericInterface<T> {
  data: T,
  getData(): T,
}

class Gen implements genericInterface<number[]> {
  data: number[];

  constructor(data: number[]) {
    this.data = data;
  }

  getData(): number[] {
      return this.data;
  }
}

const num = identify<number>(2);
const iceMelts = identify<boolean>(true);

const colorData = new genericClass<string[]>(['red', 'gold', 'green']);
const currentLocation = new genericClass<string>('Phnom Penh');

const posIntUnder10 = new Gen([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
const evenNumUnder10 = new Gen([0, 2, 4, 6, 8]);
// Call the function with different types of arguments.
// identify<string>([2, 3]); // Argument of type 'number[]' is not assignable to parameter of type 'string'.
// const aquaticMammal = new genericClass<boolean>('Polar Bear'); // Argument of type 'string' is not assignable to parameter of type 'boolean'.
// const raptors = new Gen(['hawk', 'eagle', 'kite', ]);

// Type Alias:
// A type alias in TypeScript is a way to create a new name for an existing type. This can be useful for making your code more readable and maintainable, especially when dealing with complex type expressions.
// Create different type aliases
type Name = string;
type Age = number;
type Conditional = boolean;
// Assign each type to different variables
const myRealName: Name = 'Chhum';
const myAge: Age = 12;
const isProgrammer: Conditional = true;

// const myPosition: Name = 12; // Type 'number' is not assignable to type 'string'.
// const myDogAge: Age = '10'; // Type 'string' is not assignable to type 'number'.
// const sex: Conditional = [0]; // Type 'number[]' is not assignable to type 'boolean'.

// Type Assertion:
// A type assertion in TypeScript is a way to tell the compiler that a value is of a specific type, even if the compiler isn't sure. This can be useful when you have more information about a value than the compiler does.
// Create a function using type assertion
const value2: any = "Hello";
let message2 = value2 as string;

// If the argument type is anything other than 'string', it will output undefined.
const processValue = (value: number | string): void => {
  if (typeof(value) === 'number') {
    const num = value as number;
    console.log(`Number: ${num}`);
  } else if (typeof(value) === 'string') {
    const str = value as string;
    console.log(`String: ${str}`);
  }
};

// Interface Types:
// Interfaces in TypeScript are a powerful tool for defining the structure of objects. They specify the properties and methods that an object must have, ensuring type safety and improving code readability.
// Create an interface with properties and methods.
interface Animal {
  type: string;
  isMammal: boolean;

  produceMilk(): void;
}
// Create a class that implements the interface.
class Dog implements Animal {
  type: string;
  isMammal: boolean;

  constructor(type: string, isMammal: boolean) {
    this.type = type;
    this.isMammal = isMammal;
  }

  produceMilk() {
    if (this.isMammal) {
      console.log(`${this.type} breastfeeds her cubs.`);
    } else {
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
  types: string[];
  location: string;

  constructor(types: string[], location: string) {
    this.types = types;
    this.location = location;
  }

  showDetail(): void {
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
enum Num {
  one = 1,
  two = 2,
  three = 3,
}

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
const myMixed: [string, number, boolean] = ['Hello, world!', 13, false];
const getInformation = (info: [string, number]): [string, number] => info;
// Access elements of the tuple by their index.
myMixed[0]; // output: 'Hello, world!'
myMixed[2]; // output: false
// Try modifying elements of the tuple and observe the compiler's response.
myMixed[0] = 'Hi';
myMixed[0]; // output: 'Hi'