"use strict";
// 1. 'keyof' operator
// In TypeScript, 'keyof' is a type operator used to get a union of all the keys of a given object type. It allows you to reference the keys of an object type as a type itself. This can be useful when you want to restrict values to the keys of a specific object type.
const getKey2 = (key) => key;
// Only accept keys of 'Carkeys' as argument.
// console.log(getKey2("model")); // Yes
// console.log(getKey2("year")); // Yes
// console.log(getKey2("id")); // No
// Exercise 2: Generic Function with 'keyof'
// Create a generic function getValue that takes an object and a key of that object, and returns the value of the key.
const getValue2 = (obj, key) => obj[key];
const phone = {
    price: 200,
    id: 12,
};
const user4 = {
    id: true,
    name: false,
};
const setProperty3 = (obj, key, value) => {
    obj[key] = value;
};
const dog2 = {
    species: "k9",
    age: 1,
};
console.log(dog2);
setProperty3(dog2, "species", "boxer"); // Yes
setProperty3(dog2, "age", 2); // Yes
// setProperty3(dog2, "age", "Hello"); // No
console.log(dog2);
