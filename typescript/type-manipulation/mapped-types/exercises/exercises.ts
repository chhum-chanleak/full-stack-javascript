// 1. Map modifier
// In TypeScript, mapped types let you create new types by transforming each property in an existing type. Let’s explore two examples and exercises with the map modifier to understand this concept better.

// Example 1:
// The 'Partial' utility in TypeScript makes all properties of an object type optional, and we can achieve this using a mapped type.
type UserExercises1 = {
  id: number;
  name: string;
  email: string;
};

type OptionalUser_1 = {
  [Key in keyof UserExercises1]?: UserExercises1[Key];
};

// Usage
const user_1: OptionalUser_1 = { id: 1 }; // valid as all properties are optional

// Exercise 1:
// Define a type 'Product' and create a mapped type 'PartialProduct' that makes all properties optional.
type Product_11 = {
  name: string,
  id: number,
};

// Makes all properties of argument 'Type' optional.
type PartialProduct_1<Type> = {
  [Property in keyof Type]?: Type[Property];
};

type OptionalProduct_1 = PartialProduct_1<Product_11>;
const product_1: OptionalProduct_1 = { name: "Abby" };

// Example 2: Making Properties 'Readonly'
// The 'Readonly' utility makes all properties immutable, meaning they can’t be reassigned. We can do this by creating a mapped type where all properties are marked with readonly.
type Article_1 = {
  title: string;
  content: string;
  author: string;
};

type ReadonlyArticle_1 = {
  readonly [Key in keyof Article_1]: Article_1[Key];
};

// Usage
const article: ReadonlyArticle_1 = { title: "TypeScript", content: "Mapped Types", author: "Alice" };
// article.title = "New Title"; // Error: Cannot assign to 'title' because it is a read-only property

// Exercise 2:
// Define a type 'Order_1' and create a mapped type 'ReadonlyOrder_1' that makes all properties readonly.
type Order_1 = {
  dish: string,
  price: number,
};

// Makes all properties of argument 'Type' 'readonly'.
type ReadonlyOrder_1<Type> = {
  readonly [Key in keyof Type]: Type[Key];
};

type OrderInfo_1 = ReadonlyOrder_1<Order_1>;
const myOrder_1: OrderInfo_1 = {
  dish: "Pho",
  price: 10,
};

// myOrder_1.dish = "Hello"; // Error: Cannot assign to 'dish' because it is a read-only property.

// 2. Key Remapping via 'as'
// In TypeScript, key remapping using the 'as' keyword allows you to create new types by changing the keys of an existing type. This is particularly useful when you want to modify the structure of an object while maintaining some of its properties. Let's explore this concept through two examples and corresponding exercises.

// Example 1:
// In this example, we'll take a type with certain keys and create a new type where those keys are renamed.

// Original Type
type User_11 = {
  id: number;
  username: string;
  email: string;
};

// Key Remapping
// We want to create a new type 'UserProfile_1' where 'username' is renamed to 'name'.
type UserProfile_1 = {
  [K in keyof User_11 as K extends 'username' ? 'name' : K]: User_11[K];
};

// Usage
const userProfile_1: UserProfile_1 = {
  id: 1,
  name: "JohnDoe",
  email: "john.doe@example.com",
};

// Exercise 1: Create a Mapped Type with Key Remapping
// Problem Statement: Given the following type, create a new type where the 'firstName' is changed to 'name' and the 'age' is changed to 'years'.
type Employee_11 = {
  firstName: string;
  lastName: string;
  age: number;
  position: string;
};

// Your answer here:
type EmployeeProfile_1 = {
  // Add remapping logic here
  [Key in keyof Employee_11 as Key extends "firstName" ? "name" : Key extends "age" ? "years" : Key]: Employee_11[Key];
};
const employeeProfile_1: EmployeeProfile_1 = {
  name: "Chhum",
  lastName: "Chan",
  years: 12,
  position: "manager",
};

// Example 2: Changing Keys with a Prefix
// In this example, we will create a new type where all keys from the original type are prefixed with "user_".

// Original Type
type ProductExample_1 = {
  id: number;
  title: string;
  price: number;
};

// Key Remapping with a Prefix
// We want to create a new type 'UserProduct_1' where each key is prefixed with "user_".
type UserProduct_1 = {
  [K in keyof ProductExample_1 as `user_${K & string}`]: ProductExample_1[K];
};

// Usage
const userProduct_1: UserProduct_1 = {
  user_id: 101,
  user_title: "Laptop",
  user_price: 999,
};

// Exercise 2: Create a Mapped Type with Suffix
// Problem Statement:
// Given a type 'Person_111' with properties such as 'firstName', 'lastName', and 'age', create a new mapped type called 'DetailedPerson_1' where each key in 'Person_111' has the suffix _detail.
type Person_111 = {
  firstName: string;
  lastName: string;
  age: number;
};

type DetailedPerson_1 = {
  [Key in keyof Person_111 as `${Key & string}_detail`]: Person_111[Key];
};
const detailerPerson_1: DetailedPerson_1 = {
  firstName_detail: "Abby",
  lastName_detail: "Lincoln",
  age_detail: 12,
};

// 3. Removing a Property from a Type
// To remove a certain property from a type in TypeScript, you can use mapped types along with the 'Omit' utility. This allows you to create a new type that excludes specific keys from the original type.

// Example: Removing a Property from a Type
// Let’s say you have a Person type, and you want to create a new type called PersonWithoutAge that excludes the age property.
type PersonRemovedProperty_1 = {
  name: string;
  age: number;
  email: string;
};

// Removing the "age" property
type PersonWithoutAge_1 = Omit<PersonRemovedProperty_1, "age">;

// Exercise: Removing a Property
// Problem Statement:
// Given a type 'ProductRemovedProperty_1', create a new type called 'ProductWithoutPrice_1' that excludes the 'price' property.
type ProductRemovedProperty_1 = {
  id: number;
  name: string;
  price: number;
  category: string;
};

// Answer 1:
// Define a new type by omitting "price"
type ProductWithoutPrice_1 = Omit<ProductRemovedProperty_1, "price">;
const glass_1: ProductWithoutPrice_1 = {
  id: 12,
  name: "pinkie",
  category: "container",
};

// Answer 2:
type ProductWithoutPrice_11 = {
  [Key in keyof ProductRemovedProperty_1 as Exclude<Key, "price">]: ProductRemovedProperty_1[Key];
};
const pen_1: ProductWithoutPrice_11 = {
  id: 11,
  name: "point-ball",
  category: "study material",
};

// 4. Map over arbitrary unions
// Example: Mapping over an Arbitrary Union
// Let’s say you have a union of string literals, such as "id" | "name" | "email", and you want to create a new type where each string in the union has a suffix _key.
type Keys_1 = "id" | "name" | "email";

// Add "_key" suffix to each item in the union
type SuffixedKeys_1 = {
  [K in Keys_1 as `${K}_key`]: K;
};
// Result
type UpdatedSuffixedKeys_1 = {
  id_key: "id";
  name_key: "name";
  email_key: "email";
};

// Exercise: Transform an Arbitrary Union with a Prefix
// Problem Statement:
// Given a union of string literals "firstName" | "lastName" | "age", create a new type 'PrefixedKeys_1' where each item in the union has the prefix 'user_'.
type MyUnion = "firstName" | "lastName" | "age";

type PrefixedKeys_1 = {
  [Key in MyUnion as `user_${Key}`]: Key;
};

const monitor_1: PrefixedKeys_1 = {
  user_firstName: "firstName",
  user_lastName: "lastName",
  user_age: "age",
};

// 5. Map using a conditional type
// Example: Adding a Suffix Based on a Conditional Type
// Let’s say you have a union of string literals, like "id" | "name" | "email", and you want to create a type 'SuffixedKeys_1', which only adds the suffix '_key' to keys that match "id" or "email".
type KeysConditional_1 = "id" | "name" | "email";

// Add "_key" suffix conditionally for "id" and "email"
type SuffixedKeysConditional_1 = {
  [K in KeysConditional_1 as K extends "id" | "email" ? `${K}_key` : K]: K;
};

// Resulting SuffixedKeys Type:
type SuffixedKeysResult_1 = {
  id_key: "id";
  name: "name";
  email_key: "email";
};

// Exercise: Add a Prefix Conditionally
// Problem Statement:
// Given a union type "firstName" | "lastName" | "age", create a new mapped type 'PrefixedKeysConditional_1' that adds the prefix 'user_' only to "firstName" and "lastName".
type MyConditionalUnion_1 = "firstName" | "lastName" | "age";

type PrefixedKeysConditional_1 = {
  [Key in MyConditionalUnion_1 as Key extends "firstName" | "lastName" ? `user_${Key}` : Key]: Key;
};

const notebook_1: PrefixedKeysConditional_1 = {
  user_firstName: "firstName",
  user_lastName: "lastName",
  age: "age",
};