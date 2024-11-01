// 1. 'keyof' operator
// In TypeScript, 'keyof' is a type operator used to get a union of all the keys of a given object type. It allows you to reference the keys of an object type as a type itself. This can be useful when you want to restrict values to the keys of a specific object type.

// Exercise 1: Simple Object Keys
// Define a Car type with properties make, model, and year. Create a type CarKeys that represents the keys of the Car object using keyof.
// Create a function that accepts only CarKeys as an argument
type Car2 = {
  model: string,
  year: number,
};
// CarKeys2 = "model" | "year"
type CarKeys2 = keyof Car2;

const getKey2 = (key: CarKeys2 ): string => key;

// Only accept keys of 'Carkeys' as argument.
// console.log(getKey2("model")); // Yes
// console.log(getKey2("year")); // Yes
// console.log(getKey2("id")); // No

// Exercise 2: Generic Function with 'keyof'
// Create a generic function getValue that takes an object and a key of that object, and returns the value of the key.
const getValue2 = <Obj, Key extends keyof Obj>(obj: Obj, key: Key): Obj[Key] => obj[key];

const phone = {
  price: 200,
  id: 12,
};

// console.log(getValue2(phone, "price")); // Yes
// console.log(getValue2(phone, "model")); // No
// console.log(getValue2(phone, "id")); // Yes

// Exercise 3: Map Object Keys to Booleans
// Given a type User with properties id, name, and email, create a type UserFlags that maps each key of User to a boolean using keyof.
type User4 = {
  id: number,
  name: string,
};

// Map each key to a boolean
type UserFlags4 = {
  [k in keyof User4]: boolean;
};

const user4: UserFlags4 = {
  id: true,
  name: false,
};

// Exercise 4: Restrict Object Property Assignment
// Create a type Animal with properties species, age, and name. Then create a function setProperty that only allows modifying properties of Animal using keyof and updates the value of the property passed.
type Animal3 = {
  species: string,
  age: number,
};

const setProperty3 = <Obj, Key extends keyof Obj>(obj: Obj, key: Key, value: Obj[Key]): void => {
  obj[key] = value;
};

const dog2: Animal3 = {
  species: "k9",
  age: 1,
};

console.log(dog2);
setProperty3(dog2, "species", "boxer"); // Yes
setProperty3(dog2, "age", 2); // Yes
// setProperty3(dog2, "age", "Hello"); // No
console.log(dog2);