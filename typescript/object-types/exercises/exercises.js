"use strict";
// // 1. Property Modifiers
// In TypeScript, property modifiers are used to control how properties in an object can be accessed, changed, or whether they are required or optional. There are three main property modifiers:
const getFinalPrice = (product) => {
    if (product.discount === undefined) {
        return product.price;
    }
    return product.price * (1 - product.discount);
};
const glass = {
    name: 'drinking glass',
    price: 10,
    discount: 0.1
};
const glass2 = {
    name: 'drinking glass',
    price: 10,
};
const updateProductPrice = (readOnlyProduct, price) => readOnlyProduct.price = price;
const mouse = { name: "Dell", price: 100 };
const addSetting = (setting, key, value) => setting[key] = value;
const gameSettings = {
    appName: "Plants vs Zombies",
    version: "2.0.1",
};
const staff = {
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
const newStaff = { name: "Hello", id: 2, position: "world!", status: "Single", salary: 200 };
const shortStaff = { name: "h", id: 22, position: "No", country: "PP" };
const createEmployee = (employee) => {
    let counter = 0;
    for (const prop in employee) {
        counter += 1;
    }
    console.log(counter);
    if (counter === 3) {
        return `Name: ${employee.name}, ID: ${employee.id}, Position: ${employee.position}`;
    }
    else if (counter > 3) {
        return `Name: ${employee.name}, ID: ${employee.id}, Position: ${employee.position}, Salary: ${employee.salary} `;
    }
    throw new Error("Unknown argument.");
};
const createAdmin = (admin) => `Name: ${admin.name}, E-mail: ${admin.email}, Level: ${admin.level}`;
const boss = { name: "mr. boss", email: "boss@bossmail.com", level: 9000 };
const describeProduct = (product) => `Stock: ${product.stock}, Location: ${product.location}, Price: ${product.price}, Currency: ${product.currency}`;
const keyboard = {
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
const getFirstElement = (arr) => {
    return arr[0];
};
const getLastElement = (arr) => {
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
const getFirstAndLast = (arr) => {
    return {
        firstElement: arr[0],
        lastElement: arr[arr.length - 1],
    };
};
const coordinates = [1, 2, 3];
const describeEmployee = (employee) => `
Name: ${employee[0]}, ID: ${employee[1]}, Status: ${employee[2]}.
`;
const worker = ["Chhum", 12, true];
console.log(describeEmployee(worker)); // Ok
const userProfile = [12, "Hello", true];
console.log(userProfile[2]); // output: true
// userProfile[1] = "Alice"; // Cannot assign to '1' because it is a read-only property.
