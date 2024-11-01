// 1. Conditional Type Constraints
// In TypeScript, conditional types allow you to make type selections based on conditions, enabling more flexible and dynamic typing. The general syntax is:

// Syntax:
// T extends U ? X : Y

// Exercise: Implementing Conditional Type Constraints
// Let's create a simple exercise to illustrate how 'conditional types' work.
// Problem Statement
// Define a type IsString<T> that checks if a type T is string. If T is string, IsString<T> should resolve to "It's a string". Otherwise, it should resolve to "Not a string".
type IsString_1<T> = T extends string ? "It's a string." : "Not a string.";

type String_1 = IsString_1<string>;
type _Number = IsString_1<number>;

// 2. Inferring Within Conditional Types
// In TypeScript, inferring within conditional types allows you to extract specific types from a complex type using the 'infer' keyword. This is useful for pulling out types based on certain conditions, enabling advanced type manipulation.

// Syntax:
// T extends SomeType<infer U> ? U : FallbackType

// Problem Statement
// Define a type ElementType<T> that extracts the element type from an array. If T is an array type like string[], ElementType<T> should resolve to string. If T is not an array, it should resolve to "Not an array".
type ElementType_1<T> = T extends Array<infer item> ? item : "Not an array.";

type inferTest_1 = ElementType_1<number[]>; // 'number'
type inferTest_2 = ElementType_1<[number, string]>; // 'number | string'
type inferTest_3 = ElementType_1<boolean>; // 'Not an array.'

// 3. Distributive Conditional Types
// In TypeScript, 'Distributive Conditional' Types allow you to create types based on conditions that distribute across union types. When you use conditional types with unions, TypeScript applies the conditional type to each member of the union separately, then combines the results into a new union type.

// Example Basic Example of 'Distributive Conditional' Types
type MyType_1<T> = T extends string ? "It's a string" : "It's something else";
// Now if we use MyType with a union:
type Test_1 = MyType_1<string | number>; // Results in "It's a string" | "It's something else"

// Exercise: Extract Keys with Specific Types
// Problem: Define a 'conditional type' called ExtractKeysOfType<T, U> that takes two types T (an object) and U (a type). It should extract the keys of T whose values match the type U.
// Objective: This conditional type should:
// Use a 'distributive conditional' type to check each property of T to see if its type matches U.
// Return only the keys where the value type is U.

// Step 1: Define ExtractKeysOfType
type ExtractKeysOfType_1<T, U> = {
  [K in keyof T]: T[K] extends U ? K : never;
}[keyof T];

// Step 2: Test the type with an example
type ExampleObject_1 = {
  name: string;
  age: number;
  isStudent: boolean;
  grade: number;
};

type StringKeys_1 = ExtractKeysOfType_1<ExampleObject_1, string>; // Expected: "name"
type NumberKeys_1 = ExtractKeysOfType_1<ExampleObject_1, number>; // Expected: "age" | "grade"
type BooleanKeys_1 = ExtractKeysOfType_1<ExampleObject_1, boolean>; // Expected: "isStudent"
