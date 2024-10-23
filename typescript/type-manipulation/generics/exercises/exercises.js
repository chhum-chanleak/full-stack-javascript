"use strict";
// 1. Generic Types
// Generics are commonly used in functions, classes, or interfaces. The generic type is represented by a placeholder (often T, but it can be anything). This allows you to pass any type, and the function or class adapts accordingly.
// Exercise: Generic Stack
// Objective: Implement a generic stack class that allows pushing, popping, and peeking elements with type safety.
// Steps:
// Define a Stack class with a generic type variable T.
// Implement methods:
// push(item: T): Adds an item to the stack.
// pop(): T | undefined: Removes and returns the last item in the stack.
// peek(): T | undefined: Returns the last item without removing it.
// isEmpty(): boolean: Checks if the stack is empty.
class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        return this.items[this.items.length - 1];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
const numberStack = new Stack();
numberStack.isEmpty();
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
class Pair {
    constructor(firstValue, secondValue) {
        this._firstValue = firstValue;
        this._secondValue = secondValue;
    }
    getFirst() {
        return this._firstValue;
    }
    getSecond() {
        return this._secondValue;
    }
    swap() {
        const reversedType1 = this._secondValue;
        const reversedType2 = this._firstValue;
        return new Pair(reversedType1, reversedType2);
    }
}
const pair = new Pair("2", 3);
const merge = (obj1, obj2) => {
    return Object.assign(Object.assign({}, obj1), obj2);
};
const objA = { name: "Alice", age: 25 };
const objB = { name: "Bob", city: "New York" };
const objC = { name: "Alison", age: 12 };
const mergedObj = merge(objA, objC); // Yes
// const mergedObj2 = merge(objA, objB); // No
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
const compareByProperty = (obj1, obj2, key) => obj1[key] === obj2[key];
const product1 = { id: 1, name: "Laptop", price: 1000 };
const product2 = { id: 2, name: "Laptop", price: 1000 };
const product3 = { id: 3, name: "Phone", price: 500 };
const sameName = compareByProperty(product1, product2, "name");
const samePrice = compareByProperty(product1, product3, "price");
// 5. Using Class Types in Generics
// In TypeScript, you can use class types in generics to define functions or classes that work with any class type. This allows for creating reusable components that can interact with objects of any class.
// Exercise: Create a Generic Repository Class
// In this exercise, you'll implement a generic repository class that can handle any type of object.
// Create a generic class Repository that can store and manage objects of any type.
// Implement methods for adding, retrieving, and listing items.
class Repository {
    constructor() {
        this.items = [];
    }
    add(obj) {
        this.items.push(obj);
    }
    getItem(index) {
        return this.items[index];
    }
    list() {
        return this.items;
    }
}
const userRepo = new Repository();
const user = { id: 2, name: "Chhum", age: 12 }; // Yes
const user2 = { id: 2 }; // No
const user3 = { id: 3, name: "Bo" }; // Yes
// 6. Generic Parameter Defaults
// In TypeScript, you can define default types for generic parameters. This is useful when you want a generic type to fall back to a specific type if none is provided. Using default parameters in generics allows for more flexibility while still providing a sensible default behavior.
// Exercise: Create a Generic Storage Class with Default Type
// In this exercise, you'll implement a simple storage class that can hold items of a specified type, with a default type of any.
// Create a generic class Storage that accepts a type parameter with a default of any.
// Implement methods to add and retrieve items.
class Storage2 {
    constructor() {
        this.items = [];
    }
    get retrieve() {
        return this.items;
    }
    add(item) {
        this.items.push(item);
    }
}
const numberStorage = new Storage2();
numberStorage.add(2);
numberStorage.add(4);
const defaultStorage = new Storage2();
// defaultStorage.add("Hello"); // No
// 7. Variance Annotations
// In TypeScript, variance refers to the way that types relate to each other in the context of inheritance and subtype relationships. There are three types of variance:
// No Exercise
