"use strict";
// // 1. Property Modifiers
// In TypeScript, property modifiers are used to control how properties in an object can be accessed, changed, or whether they are required or optional. There are three main property modifiers:
const getFinalPrice2 = ({ name, price, quantity, discount }) => {
    if (discount) {
        return (price * quantity) - (quantity * discount);
    }
    return price * quantity;
};
const glass3 = {
    name: "white glass",
    price: 10,
    quantity: 2,
    discount: 0.2
};
const updateProductPrice2 = (product) => {
    const TAX_RATE = 0.01;
    product.price += (product.price * TAX_RATE);
};
const house2 = {
    name: "81",
    price: 20000,
};
const addSetting2 = (settings, key, value) => {
    // Create a key-value pair for 'settings'.
    settings[key] = value; // This line is possible due o '[key: string | number]: string | undefined;' inside interface 'Setting2'.
};
const config = {
    appName: "Canvas",
    version: '5.1',
    0: '012',
};
const config2 = {
    appName: "Canvas",
    version: '5.1',
    0: '012',
    code: '12', // This line is possible due o '[key: string | number]: string | undefined;' inside interface 'Setting2'.
};
addSetting2(config, 1, "192.168.0.1");
const createEmployee2 = (employee) => console.log(`
  Name: ${employee.name}, ID: ${employee.id}, Position: ${employee.position}.
  `);
// Ok
const baristaa = {
    name: "Baron",
    id: "B123",
    position: "barista",
};
const createAdmin2 = ({ name, level, email }) => `Name: ${name}, E-mail: ${email}, Level: ${level}`;
const user2 = {
    name: "Chhum",
    email: "chhum@noone.com",
    level: 2,
};
const user22 = {
    name: "Chhu",
    email: "chu@mem.com",
};
const describeProduct2 = ({ stock, location, price, currency }) => `Stock: ${stock}, Location: ${location}, Price: ${price}, Currency: ${currency}.
`;
const laptop = {
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
const getFirstElement2 = (array) => {
    return array[0];
};
// Type inference
// console.log(getFirstElement2([5, 2, 3, 4])); // Ok 
// console.log(getFirstElement2([true, false, false])); // Ok
// Explicit type
// console.log(getFirstElement2<number>([5, 2, 3, 4])); // Ok
// console.log(getFirstElement2<boolean>([true, false, false])); // Ok
// console.log(getFirstElement2<number>(["Hello", "world!"])); // Not ok
const getLastElement2 = (array) => {
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
const getFirstLast2 = (array) => ({ first: array[0], last: array[array.length - 1] });
const numberLine = [1, 2, 3, 4, 5, 6];
numberLine.push(7); // Ok
const numberLine2 = [1, 2, 3, 4, 5, 6];
const peon = ["Lazie-Peeon", 70, false];
const describeEmployee2 = (employee) => `Name: ${employee[0]}, ID: ${employee[1]}, Status: ${employee[2]}`;
// console.log(describeEmployee2(peon)); // Ok
peon[0] = "Chad Peon";
const idNameStatus = [9, "Chhum", false];
// console.log(idNameStatus[0]); // Ok
// idNameStatus[0] = 10; // Not ok
// Cannot assign to '0' because it is a read-only property.
