"use strict";
// 1. Map modifier
// In TypeScript, mapped types let you create new types by transforming each property in an existing type. Let’s explore two examples and exercises with the map modifier to understand this concept better.
// Usage
const user_2 = { id: 1 }; // valid as all properties are optional
// Usage
const article_2 = { title: "TypeScript", content: "Mapped Types", author: "Alice" };
// Usage
const userProfile_2 = {
    id: 1,
    name: "JohnDoe",
    email: "john.doe@example.com",
};
// Usage
const userProduct_2 = {
    user_id: 101,
    user_title: "Laptop",
    user_price: 999,
};
