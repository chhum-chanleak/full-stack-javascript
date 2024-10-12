// // 1. Property Modifiers
// In TypeScript, property modifiers are used to control how properties in an object can be accessed, changed, or whether they are required or optional. There are three main property modifiers:

// Optional Properties (?): Marks a property as optional.
// Readonly Properties (readonly): Prevents a property from being modified after it is initialized.
// Index Signatures: Used to define dynamic properties with keys of a certain type.

// 1.1 Optional Properties
// // In TypeScript, optional properties allow you to define object properties that are not mandatory. You can mark a property as optional by adding a ? after the property name. This is useful when creating flexible types where not every property is always needed.

// Exercise 3: Expanding a Product Type
// Define an interface Product that has:
// A required name (string)
// A required price (number)
// An optional discount (number)
// Create a function getFinalPrice that takes a Product object and returns:
// The price if discount is not provided
// The discounted price if discount is provided
interface Product {
  name: string;
  price: number;
  discount?: number;
}
type GetFinalPrice = (product: Product) => number;
const getFinalPrice: GetFinalPrice = (product) => {
  if (product.discount === undefined) {
    return product.price;
  }

  return product.price * (1 - product.discount);
};

const glass: Product = {
  name: 'drinking glass',
  price: 10,
  discount: 0.1
};
const glass2: Product = {
  name: 'drinking glass',
  price: 10,
};

// console.log(getFinalPrice(glass)); // Ok
// console.log(getFinalPrice(glass2)); // Ok

// 1.2 readonly Properties
// In TypeScript, the readonly modifier is used to make object properties immutable after they are initialized. Once a property is marked as readonly, it cannot be reassigned or modified, providing a way to enforce immutability in objects.

// Exercise : Readonly Product
// Create an interface Product that has:
// A name property (string) that is readonly
// A price property (number) that is mutable
// Create a function updateProductPrice that takes a Product and updates the price but not the name.
interface ReadonlyProduct {
  readonly name: string;
  price: number;
}
type UpdateProductPrice = (readOnlyProduct: ReadonlyProduct, price: number) => void;
const updateProductPrice: UpdateProductPrice = (readOnlyProduct, price) => readOnlyProduct.price = price;

const mouse: ReadonlyProduct = { name: "Dell", price: 100 };

// console.log(mouse); // output: { name: 'Dell', price: 100 }
// updateProductPrice(mouse, 20);
// console.log(mouse); // output: { name: 'Dell', price: 20 }

// 1.3 Index Signatures
// In TypeScript, index signatures allow you to define the types of keys and values dynamically in an object. This is particularly useful when you don't know all the property names ahead of time, but you know the structure of the data that will be stored.

// Exercise: Dynamic Settings Object
// Problem:
// Create an interface Settings with an index signature that allows storing multiple configuration properties. Each property should be a string, but the keys can vary.
// Define an interface Settings that has:
// An index signature allowing any string keys with string values.
// A required appName property (string).
// An optional version property (string).
// Write a function addSetting that takes a Settings object, a key, and a value, and adds the key-value pair to the settings.
interface Settings {
  [key: string]: string | undefined;

  appName: string;
  version?: string;
}
type AddSetting = (setting: Settings, key: string, value: string) => void;
const addSetting: AddSetting = (setting, key, value) => setting[key] = value;

const gameSettings: Settings = {
  appName: "Plants vs Zombies",
  version: "2.0.1",
};

// console.log(gameSettings); // output: {appName: 'Plants vs Zombies', version: '2.0.1'}
// addSetting(gameSettings, "status", "online");
// console.log(gameSettings); // output: appName: {'Plants vs Zombies', version: '2.0.1', status: 'online'}

// 2. Excess Property Checks
// In TypeScript, Excess Property Checks help catch errors when objects are created with properties that aren't specified in the type or interface. When you assign an object to a type, TypeScript checks to make sure that there are no extra properties. This is useful to prevent bugs caused by incorrect or unnecessary properties being passed into objects.

// Exercise: Excess Property Check
// Problem:
// You are creating a system for storing employee records. You have a defined interface for Employee which contains specific properties. However, additional properties should not be allowed.
// Define an interface Employee that has:
// A name property (string).
// An id property (number).
// A position property (string).
// Try to create an object that includes an additional property (like salary) and observe the error caused by excess property checks.
// Write a function createEmployee that accepts an Employee object as an argument and returns the employee’s details.
interface Employee {
  readonly name: string;
  id: number;
  position: string;

  [key: string]: unknown; // Enable Employee's object to add more properties
}

const staff: Employee = {
  name: "Chhum",
  id: 9,
  position: "CEO",
};
const staffWithSalary = {
  name: "Chhum",
  id: 9,
  position: "CEO",
  salary: 200,
};
const newStaff: Employee = { name: "Hello", id: 2, position: "world!", status: "Single", salary: 200};
const shortStaff: Employee = {name: "h", id: 22, position: "No", country: "PP"};

type CreateEmployee = (employee: Employee) => string;
const createEmployee: CreateEmployee = (employee) => {
  let counter = 0;
  
  for (const prop in employee) {
    counter += 1;
  }
  console.log(counter);
  if (counter === 3) {
    return `Name: ${employee.name}, ID: ${employee.id}, Position: ${employee.position}`;
  } else if (counter > 3) {
    return `Name: ${employee.name}, ID: ${employee.id}, Position: ${employee.position}, Salary: ${employee.salary} `;
  }

  throw new Error("Unknown argument.");
};

// console.log(createEmployee(staff)); // Ok
// console.log(createEmployee(staffWithSalary)); // Ok

// 3. Extending Types
// In TypeScript, Extending Types allows you to create new types by building on existing ones. This is done using the 'extends' keyword for interfaces and the '&' operator (intersection types) for combining types. Extending types enables code reuse and helps avoid duplication of shared properties across multiple types.

// Exercise: Extending Types for a User System
// Problem:
// You are building a system to manage user profiles. Users can either be regular users or admin users, and admins have some additional properties.
// Define an interface User with the following properties:
// username (string)
// email (string)
// Define an interface Admin that extends User and adds:
// adminLevel (number)
// Write a function createAdmin that accepts an Admin object and returns a string with the admin's username, email, and admin level.
interface User {
  name: string;
  email: string;
}
interface Admin extends User {
  level: number;
}

type CreateAdmin = (admin: Admin) => string;
const createAdmin: CreateAdmin = (admin) => `Name: ${admin.name}, E-mail: ${admin.email}, Level: ${admin.level}`;

const boss: Admin = { name: "mr. boss", email: "boss@bossmail.com", level: 9000};

// console.log(createAdmin(boss)); // Ok

// 4. Intersection Types
// In TypeScript, Intersection Types allow you to combine multiple types into one, creating a new type that has all the properties of the combined types. This is done using the '&' operator. Intersection types are useful when you want to merge different types or interfaces into a single type that has all the combined properties.

// Exercise: Product with Inventory and Pricing
// Problem:
// You are creating a system to manage products in an inventory. Each product has both inventory and pricing information, but these come from different types. You need to combine them into a single type using intersection types.
// Define a type Inventory with the following properties:
// stock (number)
// location (string)
// Define a type Pricing with the following properties:
// price (number)
// currency (string)
// Create an intersection type Product that combines Inventory and Pricing.
// Write a function describeProduct that takes a Product object and returns a string describing the product's stock, location, price, and currency.
interface Inventory {
  stock: number;
  location: string;
}
interface Pricing {
  price: number;
  currency: string;
}

type ProductInventoryPricing = Inventory & Pricing;
type DescribeProduct = (product: ProductInventoryPricing) => string;
const describeProduct: DescribeProduct = (product) => `Stock: ${product.stock}, Location: ${product.location}, Price: ${product.price}, Currency: ${product.currency}`;

const keyboard: ProductInventoryPricing = {
  stock: 2,
  location: "Phnom Penh",
  price: 100,
  currency: "Khmer Riel",
};

// console.log(describeProduct(keyboard)); // Ok

// 5. Generic Object Types
// Generic Object Types in TypeScript allow you to create flexible and reusable code by enabling types to be dynamic and adaptable. You can define types or interfaces that work with different types of data without having to specify them in advance. This is achieved using type parameters (like T, U, etc.).

// 5.1 The Array Type
// Exercise: Generic Array Functions
// Problem:
// You are tasked with creating a generic function that works with arrays of different types. You will implement two functions:
// getFirstElement<T>: This function accepts an array of type T and returns the first element of the array.
// getLastElement<T>: This function accepts an array of type T and returns the last element of the array.
// Both functions should enforce type safety, meaning they should only return elements of the correct type based on the array provided.
// Steps:
// Define a generic function getFirstElement that accepts an array of any type and returns the first element.
// Define a generic function getLastElement that accepts an array of any type and returns the last element.
// Test these functions using arrays of different types (e.g., numbers, strings, and booleans).
const getFirstElement = <T>(arr: T[]): T => {
  return arr[0];
};

const getLastElement = <T>(arr: T[]): T => {
  return arr[arr.length - 1];
};

const numberArray = [4, 3, 2];
const stringArray = ["Hello", "world!"];
const mixedArray = [4, "Hello"];
const booleanArray = [true, true, false];

// console.log(getFirstElement<number>(numberArray)); // Ok
// console.log(getLastElement<number>(numberArray)); // Ok
// console.log(getFirstElement<string>(stringArray)); // Ok
// console.log(getLastElement<string>(stringArray)); // Ok
// console.log(getFirstElement<string | number>(mixedArray)); // Ok
// console.log(getLastElement<string | number>(mixedArray)); // Ok
// Argument of type 'boolean[]' is not assignable to parameter of type '(string | number)[]'.
// Type 'boolean' is not assignable to type 'string | number'.
// console.log(getFirstElement<string | number>(booleanArray)); // Not Ok
// console.log(getLastElement<string | number>(booleanArray)); // Not Ok

// 5.2 The ReadonlyArray Type
// In TypeScript, generic object types can be used with the readonlyArray<T> type to create arrays where the elements are immutable. This means that once the array is created, its contents cannot be modified—neither the elements nor the array itself (i.e., you cannot push, pop, or modify individual elements).
// The readonlyArray<T> type is a built-in generic type in TypeScript that ensures that the array is read-only. It is particularly useful when you want to prevent changes to an array after it has been initialized.

// Exercise: Implement a readonlyArray<T> with Functions
// Problem:
// You need to implement a function that accepts a readonlyArray<T> and returns the first and last elements of the array. The function should ensure that the original array cannot be modified within the function.
// Steps:
// Create a function getFirstAndLast<T> that accepts a readonlyArray<T>.
// The function should return an object with first and last properties, which represent the first and last elements of the array.
const getFirstAndLast = <T>(arr: ReadonlyArray<T>): object => {
  return {
    firstElement: arr[0],
    lastElement: arr[arr.length - 1],
  };
}

const coordinates: ReadonlyArray<number> = [1, 2, 3];

// console.log(getFirstAndLast(coordinates)); // Ok

// 5.3 Tuple Types
// In TypeScript, tuple types are a special type of array that allows you to specify the exact types (and optionally the number) of elements in the array. Unlike regular arrays where all elements are of the same type, tuples allow each element to have a distinct type, providing more flexibility when working with fixed sets of values.

// Exercise: Managing Employee Data with Tuples
// Problem:
// You are tasked with creating a tuple to represent employee data, which includes:
// The employee's name (a string).
// The employee's ID (a number).
// Whether the employee is currently active (a boolean).
// You will also write a function describeEmployee that takes an employee tuple as an argument and returns a descriptive string.
type DescribeEmployee = (employee: [string, number, boolean]) => string;
const describeEmployee: DescribeEmployee = (employee) => `
Name: ${employee[0]}, ID: ${employee[1]}, Status: ${employee[2]}.
`;

type WorkerInfo = [string, number, boolean];
const worker: WorkerInfo = ["Chhum", 12, true];

console.log(describeEmployee(worker)); // Ok

// 5.4 readonly Tuple Types
// In TypeScript, tuple types represent a fixed-length array where each element has a specific type. By combining readonly with tuple types, you can make the tuple immutable, preventing any changes to its elements after it has been created.

// Exercise: Working with readonly Tuple Types
// In this exercise, you'll define a few readonly tuple types, access their values, and attempt to modify them (which should lead to TypeScript errors).
// Task 1: Define a Readonly Tuple
// Define a readonly tuple named userProfile with the following structure:
// A number for the user ID.
// A string for the user's name.
// A boolean for whether the user is active.
// Task 2: Access Tuple Values
// Access and log the values of userProfile using console.log.
// Task 3: Attempt to Modify the Tuple
// Try to change the user name to "Alice" and observe the error produced by TypeScript.
type UserProfile = readonly [number, string, boolean];
const userProfile: UserProfile = [12, "Hello", true];

console.log(userProfile[2]); // output: true
// userProfile[1] = "Alice"; // Cannot assign to '1' because it is a read-only property.