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
    executeService(user) {
        console.log(`Creating user: ${user.name}, email: ${user.email}`);
    }
}
// Email service implementation
class WelcomeEmailService {
    executeService(user) {
        console.log(`Sending welcome email to: ${user.email}`);
    }
}
// Database service implementation
class UserDatabase {
    executeService(user) {
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
        service.executeService(user);
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
    executeService(cart) {
        console.log(JSON.stringify(cart.items, null, 2));
    }
}
class AddItemsService {
    executeService(cart, ...items) {
        cart.items.push(...items);
    }
}
class CalculateTotalPriceService {
    executeService(cart) {
        let total = 0;
        for (let i = 0; i < cart.items.length; i += 1) {
            total += cart.items[i].price;
        }
        console.log(`Total price: $${total}`);
        return total;
    }
}
class RemoveItemsService {
    executeService(cart, ...items) {
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
            console.error(`${name} service does not exist.`);
        }
        service.executeService(cart, ...items);
    }
}
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
// Create a payment registry class for managing payments lifecycle
class PaymentRegistry {
    processors = new Map();
    registerPayment(name, processor) {
        this.processors.set(name, processor);
    }
    unregisterPayment(name) {
        const processor = this.processors.get(name);
        if (!processor) {
            console.error(`${name} payment does not exist.`);
        }
        if (this.processors.get(name)) {
            this.processors.delete(name);
            console.log(`${name} has been removed.`);
        }
    }
    getProcessor(name) {
        return this.processors.get(name);
    }
    showPayments() {
        console.log(this.processors);
    }
}
// Manager class using Dependency Injection
class PaymentManager {
    registry;
    constructor(registry) {
        this.registry = registry;
    }
    processPayment(name, amount) {
        const processor = this.registry.getProcessor(name);
        if (!processor) {
            throw new Error(`${name} payment is unknown. Please register the payment.`);
        }
        processor.processPayment(amount);
    }
}
// Create payment registry
const paymentRegistry = new PaymentRegistry();
// Register payment method
// paymentRegistry.registerPayment("google pay", new GooglePayment());
// paymentRegistry.registerPayment("apple pay", new ApplePayment());
// paymentRegistry.registerPayment("aba pay", new ABAPayment());
// Create a payment manager with injected services
const paymentManager = new PaymentManager(paymentRegistry);
// Usage
// paymentManager.processPayment("google pay", 100);
// paymentManager.processPayment("apple pay", 300);
// paymentManager.processPayment("aba pay", 200);
// paymentRegistry.showPayments();
// paymentRegistry.unregisterPayment("apple pay");
// paymentRegistry.showPayments();
// paymentRegistry.unregisterPayment("apple pay");
