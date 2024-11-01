// 1. keyof operator
// In TypeScript, 'keyof' is a type operator used to get a union of all the keys of a given object type. It allows you to reference the keys of an object type as a type itself. This can be useful when you want to restrict values to the keys of a specific object type.

// Exercise 1: Simple Object Keys
// Define a Car type with properties make, model, and year. Create a type CarKeys that represents the keys of the Car object using keyof.
// Create a function that accepts only CarKeys as an argument
type Car = {
  make: string;
  model: string;
  year: number;
};

type CarKeys = keyof Car;

// Only accept keys of 'Carkeys' as argument.
const getCarkey = (key: CarKeys) => console.log(key);

// getCarkey("Hello"); // No
// getCarkey("make"); // Yes, because 'make' is one of 'Carkeys''s keys.
// getCarkey("year"); // Yes

// Exercise 2: Generic Function with 'keyof'
// Create a generic function getValue that takes an object and a key of that object, and returns the value of the key.
type Product = {
  name: string,
  id: number,
};
const getValue = <T, K extends keyof T>(obj: T, key: K): T[K] => obj[key];

const keyboard: Product = {
  name: "Dell",
  id: 12,
};

// console.log(getValue(keyboard, "name")); // Yes
// console.log(getValue(keyboard, "price")); // No
// console.log(getValue(keyboard, "id")); // Yes

// Exercise 3: Map Object Keys to Booleans
// Given a type User with properties id, name, and email, create a type UserFlags that maps each key of User to a boolean using keyof.
type User2 = {
  id: number;
  name: string;
  email: string;
};

// Map each key to a boolean
type UserFlags = {
  [K in keyof User2]: boolean;
};

// Example usage
const userFlags: UserFlags = {
  id: true,
  name: false,
  email: true,
};

// Exercise 4: Restrict Object Property Assignment
// Create a type Animal with properties species, age, and name. Then create a function setProperty that only allows modifying properties of Animal using keyof and updates the value of the property passed.
type Animal2 = {
  species: string,
  age: number,
  name: string,
};

const setProperty = <T, K extends keyof T> (obj: T, key: K, value: T[K]): T[K] => obj[key] = value;

const cat: Animal2 = {
  species: "feline",
  age: 5,
  name: 'Bo',
};

// setProperty(cat, "species", "domestic cat"); // Yes
// setProperty(cat, "name", 12); // No
setProperty(cat, "age", 14); // Yes
