"use strict";
// 1. Map modifier
// In TypeScript, mapped types let you create new types by transforming each property in an existing type. Let’s explore two examples and exercises with the map modifier to understand this concept better.
// Usage
const user_1 = { id: 1 }; // valid as all properties are optional
const product_1 = { name: "Abby" };
// Usage
const article = { title: "TypeScript", content: "Mapped Types", author: "Alice" };
const myOrder_1 = {
    dish: "Pho",
    price: 10,
};
// Usage
const userProfile_1 = {
    id: 1,
    name: "JohnDoe",
    email: "john.doe@example.com",
};
const employeeProfile_1 = {
    name: "Chhum",
    lastName: "Chan",
    years: 12,
    position: "manager",
};
// Usage
const userProduct_1 = {
    user_id: 101,
    user_title: "Laptop",
    user_price: 999,
};
const detailerPerson_1 = {
    firstName_detail: "Abby",
    lastName_detail: "Lincoln",
    age_detail: 12,
};
const glass_1 = {
    id: 12,
    name: "pinkie",
    category: "container",
};
const pen_1 = {
    id: 11,
    name: "point-ball",
    category: "study material",
};
const monitor_1 = {
    user_firstName: "firstName",
    user_lastName: "lastName",
    user_age: "age",
};
const notebook_1 = {
    user_firstName: "firstName",
    user_lastName: "lastName",
    age: "age",
};
