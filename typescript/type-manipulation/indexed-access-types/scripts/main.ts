// 1. Indexed access types
type Person = {
  age: number,
  name: string,
  alive: boolean,
};
type Age = Person["age"];

type I1 = Person["age" | "name"];
type I2 = Person[keyof Person];

type AliveOrName = "alive" | "name";
type I3 = Person[AliveOrName];

// Arbitrary type
const MyArray = [
  { name: "Alice", age: 15 },
  { name: "Bob", age: 23 },
  { name: "Eve", age: 38 },
];

type anotherPerson = typeof MyArray[number];
type anotherAge = typeof MyArray[number]["age"];

// Note
// const key = "name";
// type name = Person[key]; // No
// Type 'key' cannot be used as an index type.
// 'key' refers to a value, but is being used as a type here. Did you mean 'typeof key'?

// Do this
type key = "name";
type Name = Person[key];