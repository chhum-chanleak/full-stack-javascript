// 1. In TypeScript, Indexed Access Types allow you to access a type's property by using the type of a key. This feature is useful when you want to refer to a property of another type dynamically, instead of hard-coding the property name.

// Basic Syntax:
// T[K]

// Example 1: Basic Indexed Access
interface Person_1 {
  name: string;
  age: number;
  isStudent: boolean;
}

type AgeType_1 = Person_1["age"];  // AgeType will be `number`
type NameType_1 = Person_1["name"]; // NameType will be `string`

// Exercise 1:
// Given the following 'Employee_1' interface, define a type EmployeeNameType that refers to the 'name' property.
interface Employee_1 {
  name: string;
  position: string;
  salary: number;
}

type EmployeeNameType2 = Employee_1["name"]; // EmployeeNameType2 has a type of 'string'.

// Example 2: Using a Union of Keys
interface Car_1 {
  brand: string;
  model: string;
  year: number;
}

type CarInfo = Car_1["brand" | "year"];  // CarInfo will be `string | number`

// Exercise 2:
// Create a type UserContactInfo from the 'User_1' interface that combines the types of 'email' and 'phoneNumber'.
interface User_1 {
  id: number;
  email: string;
  phoneNumber: string;
  address: string;
}

type UserContactInfo = User_1["email" | "phoneNumber"];

// Example 3: Nested Indexed Access
interface Producut_1 {
  id: number;
  details: {
      price: number;
      inStock: boolean;
  };
}

type ProductPrice_1 = Producut_1["details"]["price"];  // ProductPrice will be `number`

// Exercise 3:
// Using the 'Company_1' interface, create a type 'CompanyCEONameType_1' that refers to the 'name' of the CEO.
interface CEO_1 {
  name: string;
  experience: number;
}

interface Company_1 {
  name: string;
  location: string;
  ceo: CEO_1;
}

type CompanyCEONameType_1 = Company_1["ceo"]["name"];

// Example 4: Using 'keyof' with Indexed Access Types
interface Animal_1 {
  species: string;
  legs: number;
}

type AnimalKeys_1 = keyof Animal_1;  // AnimalKeys will be ` "species" | "legs" `
type AnimalValues_1 = Animal_1[AnimalKeys_1];  // AnimalValues will be ` string | number `

// Exercise 4:
// Create a type 'KeysAndValues_1' that combines all the possible keys and values of the 'Gadget_1' interface.
interface Gadget_1 {
  brand: string;
  price: number;
  inStock: boolean;
}

type KeysAndValues_1 = keyof Gadget_1; // KeysAndValues_1 has keys of `"brand" | "price" | "inStock"`
type KeysAndValues_2 = Gadget_1[KeysAndValues_1]; // KeysAndValues_2 has types(values) of `"string" | "number" | "boolean"`

