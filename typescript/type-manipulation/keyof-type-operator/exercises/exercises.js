"use strict";
// 1. keyof operator
// In TypeScript, 'keyof' is a type operator used to get a union of all the keys of a given object type. It allows you to reference the keys of an object type as a type itself. This can be useful when you want to restrict values to the keys of a specific object type.
// Only accept keys of 'Carkeys' as argument.
const getCarkey = (key) => console.log(key);
const getValue = (obj, key) => obj[key];
const keyboard = {
    name: "Dell",
    id: 12,
};
// Example usage
const userFlags = {
    id: true,
    name: false,
    email: true,
};
const setProperty = (obj, key, value) => obj[key] = value;
const cat = {
    species: "feline",
    age: 5,
    name: 'Bo',
};
// setProperty(cat, "species", "domestic cat"); // Yes
// setProperty(cat, "name", 12); // No
setProperty(cat, "age", 14); // Yes
