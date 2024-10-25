// 1. In TypeScript, Indexed Access Types allow you to access a type's property by using the type of a key. This feature is useful when you want to refer to a property of another type dynamically, instead of hard-coding the property name.

// Basic Syntax:
// T[K]

// Example 1: Basic Indexed Access
interface Person_2 {
  name: string;
  age: number;
  isStudent: boolean;
}

type AgeType_2 = Person_2["age"];  // AgeType will be `number`
type NameType_2 = Person_2["name"]; // NameType will be `string`

// Exercise 1:
// Given the following 'Employee_2' interface, define a type 'EmployeeNameType_2' that refers to the 'name' property.
interface Employee_2 {
  name: string;
  position: string;
  salary: number;
}

// Answer 1:
type EmployeeNameType_2 = Employee_2["name"];

// Example 2: Using a Union of Keys
interface Car_2 {
  brand: string;
  model: string;
  year: number;
}

type CarInfo = Car_2["brand" | "year"];  // CarInfo will be `string | number`

// Exercise 2:
// Create a type 'UserContactInfo_2' from the 'User_2' interface that combines the types of 'email' and 'phoneNumber'.
interface User_2 {
  id: number;
  email: string;
  phoneNumber: string;
  address: string;
}

// Answer 2:
type UserContactInfo_2 = User_2["email" | "phoneNumber"];

// Example 3: Nested Indexed Access
interface Producut_2 {
  id: number;
  details: {
      price: number;
      inStock: boolean;
  };
}

type ProductPrice_2 = Producut_2["details"]["price"];  // 'ProductPrice_2' will be `number`

// Exercise 3:
// Using the 'Company_2' interface, create a type 'CompanyCEONameType_2' that refers to the 'name' of the CEO.
interface CEO_2 {
  name: string;
  experience: number;
}

interface Company_2 {
  name: string;
  location: string;
  ceo: CEO_2;
}

// Answer 3:
type CompanyCEONameType_2 = Company_2["ceo"]["name"];

// Example 4: Using 'keyof' with Indexed Access Types
interface Animal_2 {
  species: string;
  legs: number;
}

type AnimalKeys_2 = keyof Animal_2;  // AnimalKeys will be ` "species" | "legs" `
type AnimalValues_2 = Animal_2[AnimalKeys_2];  // AnimalValues will be ` string | number `

// Exercise 4:
// Create a type 'Keys_2' and 'Values_2' that combines all the possible keys and values of the 'Gadget_2' interface.
interface Gadget_2 {
  brand: string;
  price: number;
  inStock: boolean;
}

type Keys_2 = keyof Gadget_2;
type Values_2 = Gadget_2[Keys_2];