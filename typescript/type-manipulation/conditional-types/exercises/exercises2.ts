// 1. Conditional Type Constraints
// In TypeScript, conditional types allow you to make type selections based on conditions, enabling more flexible and dynamic typing. The general syntax is:

// Syntax:
// T extends U ? X : Y

// Exercise: Implementing Conditional Type Constraints
// Let's create a simple exercise to illustrate how 'conditional types' work.
// Problem Statement:
// Define a type 'IsString<T>_2' that checks if a type T is string. If T is string, IsString<T> should resolve to "It's a string". Otherwise, it should resolve to "Not a string".
type IsString_2<Type> = Type extends "string" ? "It's a string" : "Not a string";

type MyID_2 = IsString_2<number>;
type MyName_2 = IsString_2<string>;

// 2. Inferring Within Conditional Types
// In TypeScript, inferring within conditional types allows you to extract specific types from a complex type using the 'infer' keyword. This is useful for pulling out types based on certain conditions, enabling advanced type manipulation.

// Syntax:
// T extends SomeType<infer U> ? U : FallbackType

// Example 1: Extracting Return Type of a Function
// Suppose you want to create a type that extracts the return type of any given function type.
type ReturnTypeOf_1<T> = T extends (...args: any[]) => infer R ? R : never;

const exampleFunction_1 = (x: number, y: number) => x + y;
type Result_1 = ReturnTypeOf_1<typeof exampleFunction_1>;  // Result is inferred as `number`

// Problem Statement
// Define a type 'ElementType<Type>_2' that extracts the element type from an array. If Type is an array type like string[], 'ElementType<Type>_2' should resolve to string. If Type is not an array, it should resolve to "Not an array".
type ElementType_2<Type> = Type extends (infer item)[] ? item : "Not an array.";

type MyInfer_11 = ElementType_2<boolean[]>;
type MyInfer_2 = ElementType_2<(number | string)[]>;

// 3. Distributive Conditional Types
// In TypeScript, 'Distributive Conditional' Types allow you to create types based on conditions that distribute across union types. When you use conditional types with unions, TypeScript applies the conditional type to each member of the union separately, then combines the results into a new union type.
// Example Basic Example of 'Distributive Conditional' Types:
type MyType_2<T> = T extends string ? "It's a string" : "It's something else";

// Using a union type
type Result_2 = MyType_2<string | number | boolean>;
// Result = "It's a string" | "It's something else"

// Exercise: Extract Keys with Specific Types:
// Problem: Define a 'conditional type' called ExtractKeysOfType_2<T, U> that takes two types T (an object) and U (a type). It should extract the keys of T whose values match the type U.
// Objective: This conditional type should:
// Use a 'distributive conditional' type to check each property of T to see if its type matches U.
// Return only the keys where the value type is U.
type ExtractKeysOfType_2<T, U> = {
  [Key in keyof T]: T[Key] extends U ? Key : never;
}[keyof T];

type MyExtractedKeys = ExtractKeysOfType_2<{ id: number, name: string }, number>;