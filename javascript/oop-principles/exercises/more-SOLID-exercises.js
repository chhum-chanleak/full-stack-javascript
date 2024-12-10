"use strict";
// SOLID exercise
// 1. Single responsibility principle (SRP)
// Exercise 1: Refactor a Non-SRP Class
// Problem:
// You are given the following UserManager class that violates SRP:
// Task:
// Refactor the UserManager class into multiple classes that each handle only one responsibility. Implement it with appropriate interfaces, if necessary.
class UserManager {
    createUser(username, email) {
        console.log(`Creating user: ${username}`);
        // Logic to create a user
    }
    sendWelcomeEmail(email) {
        console.log(`Sending welcome email to: ${email}`);
        // Logic to send an email
    }
    saveToDatabase(user) {
        console.log(`Saving user to database: ${user.username}`);
        // Logic to save to database
    }
}
class UserCreation {
    createUser(user) {
        console.log(`Creating user: ${user.name}, e-mail: ${user.email}`);
    }
}
class WelcomeEmailService {
    sendWelcomeEmail(email) {
        console.log(`Sending welcome email to: ${email}`);
    }
}
class UserDatabase {
    saveUser(user) {
        console.log(`Saving ${user.name} to database`);
    }
}
// Coordinator class (integration)
class UserManager2 {
    userCreation;
    emailService;
    database;
    constructor(userCreation, emailService, database) {
        this.userCreation = userCreation;
        this.emailService = emailService;
        this.database = database;
    }
    handleNewUser(user) {
        try {
            this.userCreation.createUser(user);
            this.emailService.sendWelcomeEmail(user.email);
            this.database.saveUser(user);
        }
        catch (error) {
            console.error(`Error handling new user: ${error}`);
        }
    }
}
const user = {
    name: "Example exam",
    email: "example@exam",
};
const userManager = new UserManager2(new UserCreation(), new WelcomeEmailService(), new UserDatabase());
class ShoppingCart {
    items;
    constructor(items = []) {
        this.items = items;
    }
}
class ShowItemsService {
    showItems(cart) {
        console.log(JSON.stringify(cart.items, null, 2));
    }
}
class AddItemsService {
    addToCart(cart, ...items) {
        cart.items.push(...items);
    }
}
class CalculateTotalPriceService {
    calculateTotalPrice(cart) {
        let total = 0;
        for (let i = 0; i < cart.items.length; i += 1) {
            total += cart.items[i].price;
        }
        return total;
    }
}
class RemoveItemsService {
    removeItems(cart, ...items) {
        for (let i = 0; i < cart.items.length; i += 1) { // Outer loop
            for (let j = 0; j < items.length; j += 1) { // Inner loop
                if (cart.items[i].id === items[j].id) {
                    cart.items.splice(i, 1);
                    i = -1;
                    break; // Exit the loop(inner) prematurely
                }
            }
        }
    }
}
// Manager class using Dependency Injection
class CartManager {
    showItemsService;
    addItemsService;
    calculateTotalPriceService;
    removeItemsService;
    constructor(showItemsService, addItemsService, calculateTotalPriceService, removeItemsService) {
        this.showItemsService = showItemsService;
        this.addItemsService = addItemsService;
        this.calculateTotalPriceService = calculateTotalPriceService;
        this.removeItemsService = removeItemsService;
    }
    showItems(cart) {
        this.showItemsService.showItems(cart);
    }
    addItems(cart, ...items) {
        this.addItemsService.addToCart(cart, ...items);
    }
    calculateTotalPrice(cart) {
        const total = this.calculateTotalPriceService.calculateTotalPrice(cart);
        console.log(`Total price: $${total}`);
        return total;
    }
    removeItems(cart, ...items) {
        this.removeItemsService.removeItems(cart, ...items);
        if (items.length > 1) {
            console.log(`${JSON.stringify(items, null, 2)} have been removed from cart.`);
        }
        else {
            console.log(`${JSON.stringify(items, null, 2)} has been removed from cart.`);
        }
    }
}
const apple = { id: 1, name: "apple", price: 2.5 };
const pineapple = { id: 4, name: "pineapple", price: 5.5 };
const apple2 = { id: 2, name: "apple2", price: 2.5 };
const pineapple2 = { id: 3, name: "pineapple", price: 1.5 };
// Shopping cart
const shoppingCart = new ShoppingCart();
// Create a manager instance with injected services
const cartManager = new CartManager(new ShowItemsService(), new AddItemsService(), new CalculateTotalPriceService(), new RemoveItemsService());
// Rectangle implementation
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
// Circle implementation
class Circle {
    radius;
    constructor(radius) {
        this.radius = radius;
    }
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
}
// Usage
const shapes = [
    new Rectangle(10, 5),
    new Circle(7),
];
// Triangle implementation
class Triangle {
    base;
    height;
    constructor(base, height) {
        this.base = base;
        this.height = height;
    }
    getArea() {
        return (1 / 2) * this.base * this.height;
    }
}
// Trapezoid implementation
class Trapezoid {
    base1;
    base2;
    height;
    constructor(base1, base2, height) {
        this.base1 = base1;
        this.base2 = base2;
        this.height = height;
    }
    getArea() {
        return (1 / 2) * (this.base1 + this.base2) * this.height;
    }
}
// Rhombus implementation
class Rhombus {
    diagonal1;
    diagonal2;
    constructor(diagonal1, diagonal2) {
        this.diagonal1 = diagonal1;
        this.diagonal2 = diagonal2;
    }
    getArea() {
        // Get area of a rhombus with given diagonals
        return (1 / 2) * this.diagonal1 * this.diagonal2;
    }
}
// Credit Card implementation
class CreditCardPayment {
    processPayment(amount) {
        console.log(`Processing credit card payment of $${amount}`);
    }
}
// PayPal implementation
class PayPalPayment {
    processPayment(amount) {
        console.log(`Processing PayPal payment of $${amount}`);
    }
}
// Stripe implementation
class StripePayment {
    processPayment(amount) {
        console.log(`Processing Stripe payment of $${amount}`);
    }
}
// Usage
const payments = [
    new CreditCardPayment(),
    new PayPalPayment(),
    new StripePayment(),
];
class ApplePayment {
    processPayment(amount) {
        console.log(`Processing Apple payment of $${amount}`);
    }
}
const applePayment = new ApplePayment();
applePayment.processPayment(200);
