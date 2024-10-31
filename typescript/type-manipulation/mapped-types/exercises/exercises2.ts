// 1. Map modifier
// In TypeScript, mapped types let you create new types by transforming each property in an existing type. Let’s explore two examples and exercises with the map modifier to understand this concept better.

// Example 1:
// The 'Partial' utility in TypeScript makes all properties of an object type optional, and we can achieve this using a mapped type.
type UserExercises_2 = {
  id: number;
  name: string;
  email: string;
};

type OptionalUser_2 = {
  [Key in keyof UserExercises_2]?: UserExercises_2[Key];
};

// Usage
const user_2: OptionalUser_2 = { id: 1 }; // valid as all properties are optional

// Exercise 1:
// Define a type 'ProductModifier_2' and create a mapped type 'PartialProduct_2' that makes all properties optional.
// Makes all properties of argument 'Type' optional.
type ProductModifier_2 = {
  name: string,
  price: number,
};

type PartialProduct_2 = {
  [Key in keyof ProductModifier_2]?: ProductModifier_2[Key];
};

// Example 2: Making Properties 'Readonly'
// The 'Readonly' utility makes all properties immutable, meaning they can’t be reassigned. We can do this by creating a mapped type where all properties are marked with readonly.
type Article_2 = {
  title: string;
  content: string;
  author: string;
};

type ReadonlyArticle_2 = {
  readonly [Key in keyof Article_2]: Article_2[Key];
};

// Usage
const article_2: ReadonlyArticle_2 = { title: "TypeScript", content: "Mapped Types", author: "Alice" };
// article_2.title = "New Title"; // Error: Cannot assign to 'title' because it is a read-only property

// Exercise 2:
// Define a type 'Order_2' and create a mapped type 'ReadonlyOrder_2' that makes all properties readonly.
// Makes all properties of argument 'Type' 'readonly'.
type Order_2 = {
  name: string,
  price: number,
};

type ReadonlyOrder_2 = {
  readonly [Key in keyof Order_2]: Order_2[Key];
};

// 2. Key Remapping via 'as'
// In TypeScript, key remapping using the 'as' keyword allows you to create new types by changing the keys of an existing type. This is particularly useful when you want to modify the structure of an object while maintaining some of its properties. Let's explore this concept through two examples and corresponding exercises.

// Example 1:
// In this example, we'll take a type with certain keys and create a new type where those keys are renamed.

// Original Type
type User_22 = {
  id: number;
  username: string;
  email: string;
};

// Key Remapping
// We want to create a new type 'UserProfile_2' where 'username' is renamed to 'name'.
type UserProfile_2 = {
  [K in keyof User_22 as K extends 'username' ? 'name' : K]: User_22[K];
};

// Usage
const userProfile_2: UserProfile_2 = {
  id: 1,
  name: "JohnDoe",
  email: "john.doe@example.com",
};

// Exercise 1: Create a Mapped Type with Key Remapping
// Problem Statement: Given the following type, create a new type where the 'firstName' is changed to 'name' and the 'age' is changed to 'years'.
type Employee_22 = {
  firstName: string;
  lastName: string;
  age: number;
  position: string;
};

// Your answer here:
type EmployeeProfile_2 = {
  // Add remapping logic here
  [Key in keyof Employee_22 as Key extends "firstName" ? "name" : Key extends "age" ? "years" : Key]: Employee_22[Key];
};

// Example 2: Changing Keys with a Prefix
// In this example, we will create a new type where all keys from the original type are prefixed with "user_".

// Original Type
type ProductExample_2 = {
  id: number;
  title: string;
  price: number;
};

// Key Remapping with a Prefix
// We want to create a new type 'UserProduct_2' where each key is prefixed with "user_".
type UserProduct_2 = {
  [K in keyof ProductExample_2 as `user_${K & string}`]: ProductExample_2[K];
};

// Usage
const userProduct_2: UserProduct_2 = {
  user_id: 101,
  user_title: "Laptop",
  user_price: 999,
};

// Exercise 2: Create a Mapped Type with Suffix
// Problem Statement:
// Given a type 'Person_222' with properties such as 'firstName', 'lastName', and 'age', create a new mapped type called 'DetailedPerson_2' where each key in 'Person_222' has the suffix _detail.
type Person_222 = {
  firstName: string,
  lastName: string,
  age: number,
};

type DetailedPerson_2 = {
  [Key in keyof Person_222 as `${Key & string}_detail`]: Person_222[Key];
};

// 3. Removing a Property from a Type
// To remove a certain property from a type in TypeScript, you can use mapped types along with the 'Omit' and 'Exclude' utilities. This allows you to create a new type that excludes specific keys from the original type.

// Example: Removing a Property from a Type
// Let’s say you have a 'PersonRemovedProperty_2' type, and you want to create a new type called 'PersonWithoutAge_2' that excludes the age property.
type PersonRemovedProperty_2 = {
  name: string;
  age: number;
  email: string;
};

// Removing the "age" property

// Using 'Omit'
type PersonWithoutAge_2 = Omit<PersonRemovedProperty_2, "age">;

// Using 'Exclude'
type WithoutAge_2 = {
  [K in Exclude<keyof PersonRemovedProperty_2, "age">]: PersonRemovedProperty_2[K];
};

// Exercise: Removing a Property
// Problem Statement:
// Given a type 'ProductRemovedProperty_2', create a new type called 'ProductWithoutPrice_2' that excludes the 'price' property.
type ProductRemovedProperty_2 = {
  id: number;
  name: string;
  price: number;
  category: string;
};

// Using 'Omit':
// Define a new type by omitting "price"
type OmittedPrice = Omit<ProductRemovedProperty_2, "price">;

// Using 'Exclude':
// Define a new type by excluding "price"
type ExcludedPrice = {
  [K in Exclude<keyof ProductRemovedProperty_2, "price">]: ProductRemovedProperty_2[K];
};

// 4. Map over arbitrary unions
// In TypeScript, you can map over arbitrary unions by using 'distributive conditional' types. This allows you to apply a transformation to each member of a union type individually. 'Distributive conditional' types are triggered by wrapping a union type in a conditional type, enabling you to handle each union member one by one.

// Example: Mapping over an Arbitrary Union
// Let’s say you have a union of string literals, such as "id" | "name" | "email", and you want to create a new type where each string in the union has a suffix '_key'.
type Keys_22 = "id" | "name" | "email";

// Add "_key" suffix to each item in the union
type SuffixedKeys_2 = {
  [K in Keys_22 as `${K}_key`]: K;
};
// Result
type UpdatedSuffixedKeys_2 = {
  id_key: "id";
  name_key: "name";
  email_key: "email";
};

// Exercise: Transform an Arbitrary Union with a Prefix
// Problem Statement:
// Given a union of string literals "firstName" | "lastName" | "age", create a new type 'PrefixedKeys_2' where each item in the union has the prefix 'user_'.
type MyUnion_2 = "firstName" | "lastName" | "age";

type PrefixedKeys_2 = {
  [K in MyUnion_2 as `user_${K & string}`]: K;
};

// 5. Map using a 'conditional type'
// Example: Adding a Suffix Based on a 'Conditional Type'
// Let’s say you have a union of string literals, like "id" | "name" | "email", and you want to create a type 'SuffixedKeys_2', which only adds the suffix '_key' to keys that match "id" or "email".
type KeysConditional_2 = "id" | "name" | "email";

// Add "_key" suffix conditionally for "id" and "email"
type SuffixedKeysConditional_2 = {
  [K in KeysConditional_2 as K extends "id" | "email" ? `${K}_key` : K]: K;
};

// Resulting SuffixedKeys Type:
type SuffixedKeysResult_2 = {
  id_key: "id";
  name: "name";
  email_key: "email";
};

// Exercise: Add a Prefix Conditionally
// Problem Statement:
// Given a union type "firstName" | "lastName" | "age", create a new mapped type 'PrefixedKeysConditional_2' that adds the prefix 'user_' only to "firstName" and "lastName".
type MyConditionalUnion_2 = "firstName" | "lastName" | "age";

type PrefixedKeysConditional_2 = {
  [K in MyConditionalUnion_2 as K extends "firstName" | "lastName" ? `user_${K & string}` : K]: K;
};
