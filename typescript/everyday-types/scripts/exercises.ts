// Basic Types

// Type Inference:
// Create a variable and assign it a value. Let TypeScript infer its type.
const colors = ['aquamarine', 'blue', 'crimson'];
// Try assigning a different type of value to the same variable and observe the compiler's response.
const colors2 = ['aquamarine', 'blue', 'crimson', 20];

// Explicit Typing:
// Declare a variable with an explicit type and assign it a value.
const color: string = 'blue';
// Try assigning a value of a different type and observe the compiler's response.

// Union Types:
// Create a variable with a union type (e.g., string | number).
let id: number | string;
// Assign different types of values to the variable and observe the compiler's response.
id = 20;
// id = true; // Type 'boolean' is not assignable to type 'string | number'.ts(2322)
id = '29';

// Intersection Types:
// Create an interface with properties.
interface Car {
  price: number;
  model: string;
}
// Create another interface with properties.
interface House {
  price: number;
  location: string;
}
// Create an intersection type using the two interfaces.
type Intersection = Car & House;
// Create a variable with the intersection type and assign it an object that satisfies both interfaces.
const inheritance: Intersection = {
  price: 200,
  model: 'Honda',
  location: 'USA',
}

const inheritance2: Intersection = {
  price: 20000,
  model: 'Penthouse',
  location: 'United States',
}

// Literal Types:
// Create a variable with a literal type (e.g., "apple" | "banana").
const msg = "Hello, world!";
// Try assigning a different value to the variable and observe the compiler's response.
const msg2 = 25;

// Advanced Types
// Generic Types:
// Generic types allow you to create reusable components that can work with different data types. They provide flexibility and type safety by allowing you to define functions, classes, and interfaces that can accept a wide range of arguments.

// Create a generic function that takes a generic type as a parameter.
const identity = <Type> (arg: Type): void => {

  if (Array.isArray(arg)) {
    console.log('Array');
  } else {
    console.log(`${typeof(arg)}`);
  }
};
// Use the generic type within the function.
// Call the function with different types of arguments.
identity<string>('Green');

// Type Alias:
// A type alias in TypeScript is a way to create a new name for an existing type. This can be useful for making your code more readable and maintainable, especially when dealing with complex type expressions.
// Create different type aliases
type Person = {
  name: string,
  age: number,
};

type Fruit = {
  vitamins: string[],
  color: string,
};
// Assign each type to different variables
const employee: Person = {
  name: 'Chhum',
  age: 23,
}

const apple: Fruit = {
  vitamins: ['vitamin B', 'vitamin C'],
  color: 'green',
};

// Type Assertion:
// A type assertion in TypeScript is a way to tell the compiler that a value is of a specific type, even if the compiler isn't sure. This can be useful when you have more information about a value than the compiler does.
// Create a function using type assertion
const getLength = (value: any): any => {
  let str = value as string; // This is called 'type assertion'
  return str.length;
};

// If the argument type is anything other than 'string', it will output undefined.
const len = getLength('Hello!');

// Literal Type:
// Literal types in TypeScript allow you to specify a specific value for a variable or property. This can be useful for ensuring that a value is limited to a specific set of possibilities.
// Create literal types
type greeting = 'Hello, world!';
type adult = 18;
type isEnabled = true;
// Use the created literal types as with function
const systemStatus = false;
const getStatus = (): isEnabled => {
  return true;
};

// Interface Types:
// Interfaces in TypeScript are a powerful tool for defining the structure of objects. They specify the properties and methods that an object must have, ensuring type safety and improving code readability.
// Create an interface with properties and methods.
interface Vehicle {
  types: string[],
  model: string,
  launchDate: string
}
// Create a class that implements the interface.
class Car2 implements Vehicle {
  types;
  model;
  launchDate;

  constructor(types: string[], model: string, launchDate: string) {
    this.types = types;
    this.model = model;
    this.launchDate = launchDate;
  }

  showDetail() {
    console.log(`${this.types}, ${this.model}, ${this.launchDate}`);
  }
}
// Create instances of the class and use them where the interface is expected.
const car = new Car2(['semi-truck', 'van'], 'Tesla', '2022.11.30');

// Class Types:
// In TypeScript, a class is a blueprint for creating objects, providing a structured way to define properties and methods. It encapsulates data and behavior, promoting code organization and reusability.
// Create a class with properties and methods.
// class Person {
//   constructor(public name: string, public age: number) {}

//   greet() {
//     console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
//   }
// }

// const person1 = new Person("Alice", 30);
// person1.greet(); // Output: Hello, my name is Alice and I am 30 years old.
class Feline {
  public species: string;
  public size: string;
  private location: string;

  constructor(species: string, size: string, location: string) {
    this.species = species;
    this.size = size;
    this.location = location;
  }

  showDetails(): void {
    console.log(`${this.species}, ${this.size}, ${this.location}`);
  }
}
// Create instances of the class.
const cat = new Feline('Domestic cat', 'small', 'Brazil');
// Access properties and call methods on the instances.
cat.size;
cat.showDetails();

// Enum Types:
// Enums (enumerations) are a way to define a set of named constants. They provide a more readable and maintainable way to represent a fixed set of values compared to using raw numbers or strings. Enums are often used to represent a finite set of related values.
// Create an enum type with different members.
enum Color {
  Red = 1,
  Green = 2,
  Blue = 3
}
// Access members of the enum by their name or index.
const myColor: Color = Color.Green;
myColor; // output: 2

// Tuple Types:
// Tuples are a fixed-length array with elements of specified types. They provide a way to represent ordered collections of elements with known types.
// Tuples are useful for representing structured data, such as coordinate points, function return values, or configuration options.
// They provide a more type-safe alternative to arrays for scenarios where the element types and order are known in advance.
// Tuples can be used with other TypeScript features like generics and interfaces.
// Create a tuple type with specific elements.
const myTuple: [string, number, boolean] = ['Hello', 69, false];
// Access elements of the tuple by their index.
const [message, position, state] = myTuple;
message; // output: Hello
position; // output: 69
state; // output: false
// Try modifying elements of the tuple and observe the compiler's response.