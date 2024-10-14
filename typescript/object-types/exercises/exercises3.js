"use strict";
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
// 1.2 readonly Properties
// In TypeScript, the readonly modifier is used to make object properties immutable after they are initialized. Once a property is marked as readonly, it cannot be reassigned or modified, providing a way to enforce immutability in objects.
// Exercise : Readonly Product
// Create an interface Product that has:
// A name property (string) that is readonly
// A price property (number) that is mutable
// Create a function updateProductPrice that takes a Product and updates the price but not the name.
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
// 5.2 The ReadonlyArray Type
// In TypeScript, generic object types can be used with the readonlyArray<T> type to create arrays where the elements are immutable. This means that once the array is created, its contents cannot be modified—neither the elements nor the array itself (i.e., you cannot push, pop, or modify individual elements).
// The readonlyArray<T> type is a built-in generic type in TypeScript that ensures that the array is read-only. It is particularly useful when you want to prevent changes to an array after it has been initialized.
// Exercise: Implement a readonlyArray<T> with Functions
// Problem:
// You need to implement a function that accepts a readonlyArray<T> and returns the first and last elements of the array. The function should ensure that the original array cannot be modified within the function.
// Steps:
// Create a function getFirstAndLast<T> that accepts a readonlyArray<T>.
// The function should return an object with first and last properties, which represent the first and last elements of the array.
// 5.3 Tuple Types
// In TypeScript, tuple types are a special type of array that allows you to specify the exact types (and optionally the number) of elements in the array. Unlike regular arrays where all elements are of the same type, tuples allow each element to have a distinct type, providing more flexibility when working with fixed sets of values.
// Exercise: Managing Employee Data with Tuples
// Problem:
// You are tasked with creating a tuple to represent employee data, which includes:
// The employee's name (a string).
// The employee's ID (a number).
// Whether the employee is currently active (a boolean).
// You will also write a function describeEmployee that takes an employee tuple as an argument and returns a descriptive string.
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
