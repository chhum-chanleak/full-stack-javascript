// // 1. Property Modifiers
// In TypeScript, property modifiers are used to control how properties in an object can be accessed, changed, or whether they are required or optional. There are three main property modifiers:

// Optional Properties (?): Marks a property as optional.
// Readonly Properties (readonly): Prevents a property from being modified after it is initialized.
// Index Signatures: Used to define dynamic properties with keys of a certain type.

// 1.1 Optional Properties
// // In TypeScript, optional properties allow you to define object properties that are not mandatory. You can mark a property as optional by adding a '?' after the property name. This is useful when creating flexible types where not every property is always needed.

// Exercise: Expanding a Product Type
// Define an interface Product that has:
// A required name (string)
// A required price (number)
// An optional discount (number)
// Create a function getFinalPrice that takes a Product object and returns:
// The price if discount is not provided
// The discounted price if discount is provided
interface Product2 {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

type GetFinalPrice2 = (product: Product2) => number;
const getFinalPrice2: GetFinalPrice2 = ({name, price, quantity, discount}) => {
  if (discount) {
    return (price * quantity) - (quantity * discount);
  }

  return price * quantity;
};

const glass3: Product2  = {
  name: "white glass",
  price: 10,
  quantity: 2,
  discount: 0.2
};

// console.log(getFinalPrice2(glass3)); // Ok

// 1.2 readonly Properties
// In TypeScript, the readonly modifier is used to make object properties immutable after they are initialized. Once a property is marked as readonly, it cannot be reassigned or modified, providing a way to enforce immutability in objects.

// Exercise : Readonly Product
// Create an interface Product that has:
// A name property (string) that is readonly
// A price property (number) that is mutable
// Create a function updateProductPrice that takes a Product and updates the price but not the name.
interface ReadonlyProduct2 {
  readonly name: string; // Immutable(readonly)
  price: number;
}

type UpdateProductPrice2 = (product: ReadonlyProduct2) => void;
const updateProductPrice2: UpdateProductPrice2 = (product) => {
  const TAX_RATE = 0.01;

  product.price += (product.price * TAX_RATE);
};

const house2: ReadonlyProduct2 = {
  name: "81",
  price: 20000,
};

// console.log(house2);
// updateProductPrice2(house2);
// console.log(house2);
// house2.name = "89"; // Not ok

// 1.3 Index Signatures
// In TypeScript, index signatures allow you to define the types of keys and values dynamically in an object. This is particularly useful when you don't know all the property names ahead of time, but you know the structure of the data that will be stored.

// Exercise: Dynamic Settings Object
// Problem:
// Create an interface Settings with an index signature that allows storing multiple configuration properties. Each property should be a string, but the keys can vary.
// Define an interface Settings that has:
// An index signature allowing any 'string' or 'number' keys with string values.
// A required appName property (string).
// An optional version property (string).
// A number 0 property that returns a string.
// Write a function addSetting that takes a Settings object, a key, and a value, and adds the key-value pair to the settings.
interface Settings2 {
  appName: string;
  version?: string;
  0: string;

  [key: string | number]: string | undefined;
}

type AddSetting2 = (settings: Settings2, key: string | number, value: string) => void;
const addSetting2: AddSetting2 = (settings, key, value) => {
  // Create a key-value pair for 'settings'.
  settings[key] = value; // This line is possible due o '[key: string | number]: string | undefined;' inside interface 'Setting2'.
};

const config: Settings2 = {
  appName: "Canvas",
  version: '5.1',
  0: '012',
};

const config2: Settings2 = {
  appName: "Canvas",
  version: '5.1',
  0: '012',
  code:'12', // This line is possible due o '[key: string | number]: string | undefined;' inside interface 'Setting2'.
};

addSetting2(config, 1, "192.168.0.1");
// console.log(config); // Ok
// console.log(config2) // Ok;

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
interface Employee2 {
  name: string;
  id: string;
  position: string;
}

type CreateEmployee2 = (employee: Employee2) => void;
const createEmployee2: CreateEmployee2 = (employee) => console.log(`
  Name: ${employee.name}, ID: ${employee.id}, Position: ${employee.position}.
  `);

// Ok
const baristaa: Employee2 = {
  name: "Baron",
  id: "B123",
  position: "barista",
};

// Not Ok
// const barista: Employee2 = {
//   name: "Baron",
//   id: "B123",
//   position: "barista",
//   salary: 200, // Object literal may only specify known properties, and 'salary' does not exist in type 'Employee2'.
// };

// createEmployee2(baristaa); // Ok
// createEmployee2({ name: "BB", id:"bb1", position: "manager", salary: 200 }); // Not Ok

// 3. Extending Types
// In TypeScript, 'Extending Types' allows you to create new types by building on existing ones. This is done using the 'extends' keyword for interfaces and the '&' operator (intersection types) for combining types. Extending types enables code reuse and helps avoid duplication of shared properties across multiple types.

// Exercise: Extending Types for a User System
// Problem:
// You are building a system to manage user profiles. Users can either be regular users or admin users, and admins have some additional properties.
// Define an interface User with the following properties:
// username (string)
// email (string)
// Define an interface Admin that extends User and adds:
// adminLevel (number)
// Write a function createAdmin that accepts an Admin object and returns a string with the admin's username, email, and admin level.
interface User2 {
  name: string;
  email: string;
}
interface Admin2 extends User2 {
  level: number;
}

type CreateAdmin2 = (admin: Admin2) => string;
const createAdmin2: CreateAdmin2 = ({name, level, email}) => `Name: ${name}, E-mail: ${email}, Level: ${level}`;

const user2: Admin2 = {
  name: "Chhum",
  email: "chhum@noone.com",
  level: 2,
};

const user22: User2 = {
  name: "Chhu",
  email: "chu@mem.com",
};

// console.log(createAdmin2(user2)); // Ok
// console.log(createAdmin2(user22)); // Error: Argument of type 'User2' is not assignable to parameter of type 'Admin2'.
// // Property 'level' is missing in type 'User2' but required in type 'Admin2'.

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
type Inventory2 = {
  stock: number;
  location: string;
};
type Pricing2 = {
  price: number;
  currency: string;
};
type InventoryPricingProduct2 = Inventory2 & Pricing2;

type DescribeProduct2 = (product: InventoryPricingProduct2) => string;
const describeProduct2: DescribeProduct2 = ({stock, location, price, currency}) => `Stock: ${stock}, Location: ${location}, Price: ${price}, Currency: ${currency}.
`;

const laptop: InventoryPricingProduct2 = {
  stock: 2,
  location: "Phom Penh",
  price: 1000,
  currency: "Khmer Riel",
};

// console.log(describeProduct2(laptop)); // ok
// console.log(describeProduct2({ stock: 3, location: "Phnom Penh", price: 200, currency: "$", code: "l12"})); // Not ok
// // Object literal may only specify known properties, and 'code' does not exist in type 'InventoryPricingProduct2'.

// 5. Generic Object Types
// Generic Object Types in TypeScript allow you to create flexible and reusable code by enabling types to be dynamic and adaptable. You can define types or interfaces that work with different types of data without having to specify them in advance. This is achieved using type parameters (like T, U, etc.).

// 5.1 The Array Type
// In TypeScript, the array type allows you to store multiple values of the same type in a list-like structure. TypeScript provides several ways to define arrays, ensuring that the elements inside the array conform to the specified type.

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
const getFirstElement2 = <TypeOfArray>(array: TypeOfArray[]) => {
  return array[0];
};

// Type inference
// console.log(getFirstElement2([5, 2, 3, 4])); // Ok 
// console.log(getFirstElement2([true, false, false])); // Ok
// Explicit type
// console.log(getFirstElement2<number>([5, 2, 3, 4])); // Ok
// console.log(getFirstElement2<boolean>([true, false, false])); // Ok
// console.log(getFirstElement2<number>(["Hello", "world!"])); // Not ok

const getLastElement2 = <TypeOfArray>(array: TypeOfArray[]) => {
  return array[array.length - 1];
};

// Type inference
// console.log(getLastElement2([5, 2, 3, 4])); // Ok 
// console.log(getLastElement2([true, false, false])); // Ok
// Explicit type
// console.log(getLastElement2<number>([5, 2, 3, 4])); // Ok
// console.log(getLastElement2<boolean>([true, false, false])); // Ok
// console.log(getLastElement2<number>(["Hello", "world!"])); // Not ok

// 5.2 The ReadonlyArray Type
// In TypeScript, generic object types can be used with the readonlyArray<T> type to create arrays where the elements are immutable. This means that once the array is created, its contents cannot be modified—neither the elements nor the array itself (i.e., you cannot push, pop, or modify individual elements).
// The readonlyArray<T> type is a built-in generic type in TypeScript that ensures that the array is read-only. It is particularly useful when you want to prevent changes to an array after it has been initialized.

// Exercise: Implement a readonlyArray<T> with Functions
// Problem:
// You need to implement a function that accepts a readonlyArray<T> and returns the first and last elements of the array. The function should ensure that the original array cannot be modified within the function.
// Steps:
// Create a function getFirstAndLast<T> that accepts a readonlyArray<T>.
// The function should return an object with first and last properties, which represent the first and last elements of the array.
const getFirstLast2 = <ReadonlyArray>(array: readonly ReadonlyArray[]) => ({ first: array[0], last: array[array.length - 1] });

const numberLine = [1, 2, 3, 4, 5, 6];
numberLine.push(7); // Ok

const numberLine2: readonly number[] = [1, 2, 3, 4, 5, 6];
// numberLine2.push(7); // Not ok
// Property 'push' does not exist on type 'readonly number[]'.

// console.log(getFirstLast2<number>(numberLine)); // Ok

// const getFirstLast3 = <ReadonlyArray>(array: readonly ReadonlyArray[]) => {
//   array.push(1); // 'array' is 'readonly' or 'immutable' so you cannot change it.
// };

// 5.3 Tuple Types
// In TypeScript, tuple types are a special type of array that allows you to specify the exact types (and optionally the number) of elements in the array. Unlike regular arrays where all elements are of the same type, tuples allow each element to have a distinct type, providing more flexibility when working with fixed sets of values.

// Exercise: Managing Employee Data with Tuples
// Problem:
// You are tasked with creating a tuple to represent employee data, which includes:
// The employee's name (a string).
// The employee's ID (a number).
// Whether the employee is currently active (a boolean).
// You will also write a function describeEmployee that takes an employee tuple as an argument and returns a descriptive string.
type EmployeeTuple2 = [string, number, boolean];
const peon: EmployeeTuple2 = ["Lazie-Peeon", 70, false];

// const elf: EmployeeTuple2 = ["Sandara", 18]; // Not ok
// Type '[string, number]' is not assignable to type 'EmployeeTuple2'.
// Source has 2 element(s) but target requires 3.

type DescribeEmployee2 = (employee: EmployeeTuple2) => string;
const describeEmployee2: DescribeEmployee2 = (employee) => `Name: ${employee[0]}, ID: ${employee[1]}, Status: ${employee[2]}`;

// console.log(describeEmployee2(peon)); // Ok
peon[0] = "Chad Peon";
// console.log(describeEmployee2(peon)); // Ok

// 5.4 'readonly' Tuple Types
// In TypeScript, tuple types represent a fixed-length array where each element has a specific type. By combining 'readonly' with tuple types, you can make the tuple immutable, preventing any changes to its elements after it has been created.

// Exercise: Working with 'readonly' Tuple Types
// In this exercise, you'll define a few 'readonly' tuple types, access their values, and attempt to modify them (which should lead to TypeScript errors).
// Task 1: Define a 'Readonly' Tuple
// Define a 'readonly' tuple named userProfile with the following structure:
// A number for the user ID.
// A string for the user's name.
// A boolean for whether the user is active.
// Task 2: Access Tuple Values
// Access and log the values of userProfile using console.log.
// Task 3: Attempt to Modify the Tuple
// Try to change the user name to "Alice" and observe the error produced by TypeScript.

type IdNameStatus = readonly [number, string, boolean];
const idNameStatus: IdNameStatus = [9, "Chhum", false];

// console.log(idNameStatus[0]); // Ok
// idNameStatus[0] = 10; // Not ok
// Cannot assign to '0' because it is a read-only property.