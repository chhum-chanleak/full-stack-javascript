// 1. Generic Types
// Generics are commonly used in functions, classes, or interfaces. The generic type is represented by a placeholder (often T, but it can be anything). This allows you to pass any type, and the function or class adapts accordingly.

// Exercise: Generic Stack
// Objective: Implement a generic stack class that allows pushing, popping, and peeking elements with type safety.
// Steps:
// Define a Stack class with a generic type variable T and an 'items' field which is an empty array.
// Implement methods:
// push(item: T): Adds an item to the stack.
// pop(): T | undefined: Removes and returns the last item in the stack.
// peek(): T | undefined: Returns the last item without removing it.
// isEmpty(): boolean: Checks if the stack is empty.
class Stack2<Type> {
  private items: Type[] = [];

  public add(item: Type): void {
    this.items.push(item);
  }

  public pop(): Type | undefined {
    return this.items.pop();
  }

  public peek(): Type | undefined {
    return this.items[this.items.length - 1];
  }

  public isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const array = new Stack2<number>();

// array.add(1); // Yes
// console.log(array);
// array.add(3); // Yes
// console.log(array.peek());
// console.log(array.isEmpty());
// array.add("Hello"); // No

// 2. Generic Classes
// A generic class in TypeScript allows you to define a class that works with various types, making it reusable and type-safe. This means that you can create a class that can adapt to the type that is provided when instantiated, without restricting it to a specific type.

// Exercise: Generic Pair Class
// Objective: Implement a generic Pair class that stores two values of the same type (or different types) and provides methods to retrieve and swap those values.
// Steps:
// Define a class called Pair<T1, T2>, where T1 and T2 represent the types of the two values.
// Implement methods:
// getFirst(): T1: Returns the first value.
// getSecond(): T2: Returns the second value.
// swap(): Pair<T2, T1>: Swaps the first and second values, returning a new Pair with reversed types.
class Pair2<Type1, Type2> {
  private _mouse: Type1;
  private _keyboard: Type2;
 
  constructor(mouse: Type1, keyboard: Type2) {
    this._mouse = mouse;
    this._keyboard = keyboard;
  }

  public getFirst(): Type1 {
    return this._mouse;
  }

  public getSecond(): Type2 {
    return this._keyboard;
  }

  public swap(): Pair2<Type2, Type1> {
    const newType1 = this._keyboard;
    const newType2 = this._mouse;
    
    return new Pair2(newType1, newType2);
  }
}

// const pair2 = new Pair2<boolean, string>(true, "Hello");

// console.log(pair2);
// console.log(pair2.getFirst(), pair2.getSecond());

// const swappedPair2 = pair2.swap();

// console.log(swappedPair2);

// 3. Generic Constraints
// In TypeScript, generic constraints allow you to specify conditions that a type must satisfy when using generics. This is useful when you want to restrict the type to a certain shape or behavior, ensuring that only types with specific properties or methods can be used.

// Exercise: Create a Generic Function to Merge Objects
// In this exercise, you'll implement a generic function that merges two objects, ensuring that they both conform to a certain interface.
// Define an interface called Mergeable that requires a property name.
// Create a generic function called merge that takes two parameters of type T and returns an object of type T where T extends Mergeable.
interface Mergable2 {
  _name: string;
  _id: number;
}

const merge2 = <T extends Mergable2>(obj1: T, obj2: T): T => {
  return { ...obj1, ...obj2, };
};

class SameObject<Mergable2> {
  _name: string;
  _id: number;

  constructor(name: string, id: number) {
    this._name = name;
    this._id = id;
  }
}

const samsung = new SameObject<Mergable2>("Galaxy", 1);
const iPhone = new SameObject<Mergable2>("iPhone 17", 2);
const nokia = { name: "3310"};

// const mergePhones = merge2(samsung, iPhone); // Yes
// console.log(merge2(samsung, nokia)); // No

// 4. Using Type Parameters in Generic Constraints
// In TypeScript, you can use type parameters in generic constraints to ensure that one type parameter constrains or interacts with another type parameter. This technique is useful when working with multiple generics where one depends on another, enabling you to enforce relationships between different types.

// Exercise: Object Comparison Based on Properties
// Objective: Create a function compareByProperty that compares two objects based on a specific property. The second type parameter (K) should be constrained to the keys of the objects.
// Steps:
// Define a function compareByProperty with two generic type parameters:
// T for the objects.
// K constrained to be a key of T.
// The function should accept two objects of type T and a key K to compare.
// The function returns true if the values of the specified property are equal, otherwise false.
const compareByProperty2 = <Type, K extends keyof Type>(obj1: Type, obj2: Type, key: K): boolean => obj1[key] === obj2[key];

// const product11 = { id: 1, name: "Laptop", price: 1000 };
// const product22 = { id: 2, name: "Laptop", price: 1000 };
// const product33 = { id: 3, name: "Phone", price: 500 };

// console.log(compareByProperty2(product1, product2, "id")); // Yes
// console.log(compareByProperty2(product1, product3, "name")); // Yes
// console.log(compareByProperty2(product1, product2, "country")); // No

// 5. Using Class Types in Generics
// In TypeScript, you can use class types in generics to define functions or classes that work with any class type. This allows for creating reusable components that can interact with objects of any class.

// Exercise: Create a Generic Repository Class
// In this exercise, you'll implement a generic repository class that can handle any type of object.
// Create a generic class Repository that can store and manage objects of any type.
// Implement methods for adding, retrieving, and listing items.
class Repository2<Type> {
  private items: Type[] = [];

  public add(obj: Type): void {
    this.items.push(obj);
  }

  public retrieve(index: number): Type {
    return this.items[index];
  }

  public List(): Type[] {
    return this.items;
  }
}

// const repository2 = new Repository2<number>();

// const one = 1;

// console.log(repository2.List());
// repository2.add(1); // Yes
// console.log(repository2.List());
// repository2.add("Hello"); // No

// 6. Generic Parameter Defaults
// In TypeScript, you can define default types for generic parameters. This is useful when you want a generic type to fall back to a specific type if none is provided. Using default parameters in generics allows for more flexibility while still providing a sensible default behavior.

// Exercise: Create a Generic Storage Class with Default Type
// In this exercise, you'll implement a simple storage class that can hold items of a specified type, with a default type of any.
// Create a generic class Storage that accepts a type parameter with a default of any.
// Implement methods to add and retrieve items.
class Storage3<Type = any> {
  private items: Type[] = [];

  public add(item: Type): void {
    this.items.push(item);
  }

  public retrieve(index: number): Type {
    return this.items[index];
  }
}

const anyTypeStorage3 = new Storage3();

// console.log(anyTypeStorage3);
// anyTypeStorage3.add("Hello"); // Yes
// anyTypeStorage3.add(2); // Yes
// anyTypeStorage3.add(false); // Yes
// console.log(anyTypeStorage3);

const numberStorage2 = new Storage3<number>();

// console.log(numberStorage);
// numberStorage.add(2); // Yes
// numberStorage.add("Hello"); // No

// 7. Variance Annotations
// In TypeScript, variance refers to the way that types relate to each other in the context of inheritance and subtype relationships. There are three types of variance:

// No Exercise
