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
// Concrete implementations
// User creation service implementation
class UserCreationService {
    createUser(user) {
        console.log(`Creating user: ${user.name}, email: ${user.email}`);
    }
}
// Email service implementation
class WelcomeEmailService {
    sendWelcomeEmail(user) {
        console.log(`Sending welcome email to: ${user.email}`);
    }
}
// Database service implementation
class UserDatabase {
    saveUser(user) {
        console.log(`Saving ${user.name} to database`);
    }
}
// The ServiceRegistry class is solely responsible for managing the lifecycle of services:
// Adding services.
// Removing services.
// Fetching services.
// Displaying registered services.
// Register services
class ServiceRegistry {
    // Objects of Map type
    services = new Map();
    addService(name, service) {
        this.services.set(name, service);
    }
    removeService(name) {
        if (!this.services.has(name)) {
            throw new Error(`Service ${name} does not exist.`);
        }
        if (this.services.has(name)) {
            this.services.delete(name);
            console.log(`${name} Service has been removed.`);
        }
    }
    getService(name) {
        return this.services.get(name);
    }
    showServices() {
        console.log(this.services);
    }
}
// Coordinator class (integration)
class UserService {
    registry;
    constructor(registry) {
        this.registry = registry;
    }
    handleService(name, user) {
        const service = this.registry.getService(name);
        if (service instanceof UserCreationService) {
            service.createUser(user);
        }
        else if (service instanceof WelcomeEmailService) {
            service.sendWelcomeEmail(user);
        }
        else if (service instanceof UserDatabase) {
            service.saveUser(user);
        }
        else {
            throw new Error(`${name} service does not exist.`);
        }
    }
}
// Concrete implementations
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
        console.log(`Total price: $${total}`);
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
// The ServiceRegistry class is solely responsible for managing the lifecycle of services:
// Adding services.
// Removing services.
// Fetching services.
// Displaying registered services.
// Register services
class ServiceRegistry2 {
    services = new Map();
    addService(name, service) {
        this.services.set(name, service);
    }
    removeService(name) {
        if (!this.services.has(name)) {
            throw new Error(`${name} service does not exist.`);
        }
        if (this.services.has(name)) {
            this.services.delete(name);
            console.log(`${name} service has been remove.`);
        }
    }
    getService(name) {
        return this.services.get(name);
    }
    showServices() {
        console.log(this.services);
    }
}
// Manager class using Dependency Injection
class ShoppingCartManager {
    registry;
    constructor(registry) {
        this.registry = registry;
    }
    handleService(name, cart, ...items) {
        const service = this.registry.getService(name);
        if (!service) {
            throw new Error(`${name} service does not exist.`);
        }
        if (service instanceof ShowItemsService) {
            service.showItems(cart);
        }
        else if (service instanceof AddItemsService) {
            service.addToCart(cart, ...items);
        }
        else if (service instanceof CalculateTotalPriceService) {
            service.calculateTotalPrice(cart);
        }
        else if (service instanceof RemoveItemsService) {
            service.removeItems(cart, ...items);
        }
        else {
            throw new Error(`${name} is an invalid service.`);
        }
    }
}
const apple = { id: 1, name: "apple", price: 2.5 };
const pineapple = { id: 4, name: "pineapple", price: 5.5 };
const apple2 = { id: 2, name: "apple2", price: 2.5 };
const pineapple2 = { id: 3, name: "pineapple", price: 1.5 };
// Concrete implementations
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
// Concrete implementations
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
// Create shaper registry class for managing shape lifecycle
class ShapesRegistry {
    shapes = new Map();
    registerShape(name, shape) {
        this.shapes.set(name, shape);
    }
    unregisterShape(name) {
        const shape = this.shapes.get(name);
        if (!shape) {
            throw new Error(`${name} does not exist.`);
        }
        if (this.shapes.has(name)) {
            this.shapes.delete(name);
        }
    }
    getShape(name) {
        return this.shapes.get(name);
    }
    showRegisteredShapes() {
        console.log(this.shapes);
    }
}
// Create manager class using Dependency Injection
class ShapeManger {
    registry;
    constructor(registry) {
        this.registry = registry;
    }
    showArea(name) {
        const shape = this.registry.getShape(name);
        if (!shape) {
            throw new Error(`You must provide a shape`);
        }
        console.log(`Area of this ${name} is: ${shape.getArea()}`);
    }
}
// Create shape registry
const shapesRegistry = new ShapesRegistry();
// Register shapes
shapesRegistry.registerShape("triangle", new Triangle(4, 8));
shapesRegistry.registerShape("trapezoid", new Trapezoid(4, 8, 10));
shapesRegistry.registerShape("rhombus", new Rhombus(8, 12));
// Create shape managers
const shapeManager = new ShapeManger(shapesRegistry);
// Usage
shapeManager.showArea("triangle");
shapeManager.showArea("trapezoid");
shapeManager.showArea("rhombus");
shapesRegistry.showRegisteredShapes();
// Concrete implementation
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
// Google Pay implementation
class GooglePayment {
    processPayment(amount) {
        console.log(`Processing Google payment of $${amount}`);
    }
}
// ApplePayment implementation
class ApplePayment {
    processPayment(amount) {
        console.log(`Processing Apple payment of $${amount}`);
    }
}
// ABA Pay implementation
class ABAPayment {
    processPayment(amount) {
        console.log(`Processing ABA payment of $${amount}`);
    }
}
// Manager class using Dependency Injection
class PaymentManager {
    processors = new Map();
    registerPayment(name, processor) {
        this.processors.set(name, processor);
    }
    processPayment(name, amount) {
        const processor = this.processors.get(name);
        if (!processor) {
            throw new Error(`${processor} payment is unknown. Please register the payment.`);
        }
        processor.processPayment(amount);
    }
}
// // Create a payment manager with injected services
// const paymentManager = new PaymentManager();
// // Register payment
// paymentManager.registerPayment("GooglePayment", new GooglePayment());
// paymentManager.registerPayment("ApplePayment", new ApplePayment());
// paymentManager.registerPayment("ABAPayment", new ABAPayment());
// // Usage
// paymentManager.processPayment("GooglePayment", 100);
// paymentManager.processPayment("ApplePayment", 300);
// paymentManager.processPayment("ABAPayment", 200);
