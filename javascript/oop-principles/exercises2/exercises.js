import { errorMessages } from "./errors.js";
import { validateUniqueName, validateExistence, validateEmptiness } from "./order-validators.js";
// Data related abstractions
class AbstractOrder {
    items = [];
    totalAmount = 0;
}
export class AbstractOrderServicesStorage {
    services = new Map();
}
class AbstractOrderServiceRegistry {
    servicesStorage;
    constructor(servicesStorage) {
        this.servicesStorage = servicesStorage;
    }
}
// Concrete implementations (low-level)
// Data related class
class Order extends AbstractOrder {
    items = [];
    totalAmount = 0;
    addItem(item, price) {
        this.items.push(item);
        this.totalAmount += price;
    }
    getItems() {
        return this.items;
    }
    getTotal() {
        return this.totalAmount;
    }
}
class OrderServicesStorage extends AbstractOrderServicesStorage {
    // This class inherits "servicesStorage: Map<string, IService>" from its parent class
    getServices() {
        return this.services;
    }
}
// Service implementations
class InvoiceGenerator {
    execute(order) {
        return `Invoice: ${order.getItems().join(", ")} - Total: $${order.getTotal()}`;
    }
}
class EmailConfirmation {
    execute(order, invoiceGenerator) {
        console.log("Sending email confirmation...");
        console.log(`Order Confirmation: ${invoiceGenerator.execute(order)}`);
    }
}
// (high-level)
class OrderServiceRegistry extends AbstractOrderServiceRegistry {
    servicesStorage;
    constructor(servicesStorage) {
        super(servicesStorage);
        this.servicesStorage = servicesStorage;
    }
    register(name, service) {
        // Check whether service is already exists
        if (!validateUniqueName(name, this.servicesStorage)) {
            return;
        }
        ;
        this.servicesStorage.getServices().set(name, service);
        console.log(`${name} service registered successfully`);
    }
    unregister(name) {
        // Check whether service exists
        if (!validateExistence(name, this.servicesStorage)) {
            return;
        }
        ;
        this.servicesStorage.getServices().delete(name);
        console.log(`${name} service unregistered successfully`);
    }
    getService(name) {
        // Check whether service exists
        if (!validateExistence(name, this.servicesStorage)) {
            return;
        }
        return this.servicesStorage.getServices().get(name);
    }
    listServices() {
        // Check wether storage is empty
        if (validateEmptiness(this.servicesStorage)) {
            console.log(`Services storage ${errorMessages.EMPTINESS}`);
            return;
        }
        console.log(this.servicesStorage.getServices());
    }
}
// Usage
const orderMain = () => {
    const order = new Order();
    order.addItem("apple", 10);
    order.addItem("banana", 20);
    const orderServiceRegistry = new OrderServiceRegistry(new OrderServicesStorage());
    orderServiceRegistry.listServices();
    orderServiceRegistry.register("email confirmation", new EmailConfirmation());
    orderServiceRegistry.register("invoice generator", new InvoiceGenerator());
    const emailConfirmation = orderServiceRegistry.getService("email confirmation");
    const invoiceGenerator = orderServiceRegistry.getService("invoice generator");
    console.log(invoiceGenerator.execute(order));
    emailConfirmation.execute(order, new InvoiceGenerator());
    orderServiceRegistry.listServices();
};
orderMain();
// 2. Open-closed (OCP)
// The Open-Closed Principle (OCP) is one of the SOLID principles of object-oriented design. It states that:
// A class or module should be open for extension (i.e., you can add new functionality) but closed for modification (i.e., you shouldn’t have to change the existing code to add new functionality).
// This principle helps us achieve flexibility and maintainability, as we can extend the behavior of a system without changing its existing parts.
// Key Ideas:
// Open for Extension: You should be able to extend the behavior of a class or module.
// Closed for Modification: Once a class or module is written, its existing code should remain untouched.
// Example in TypeScript:
// Let’s start with an example that violates OCP and then refactor it to adhere to the principle.
// Exercise: Refactor Code to Follow OCP
// You are given the following code that calculates discounts for different types of customers. It violates OCP because adding a new customer type requires modifying the 'DiscountCalculator' class.
class DiscountCalculator {
    calculateDiscount(customer) {
        if (customer.type === 'regular') {
            return 0.1; // 10% discount
        }
        else if (customer.type === 'premium') {
            return 0.2; // 20% discount
        }
    }
}
const regularCustomer = { type: 'regular' };
const premiumCustomer = { type: 'premium' };
// Concretes
class RegularCustomer {
    discountPercent;
    constructor(discountPercent) {
        this.discountPercent = discountPercent;
    }
    getDiscountPercent() {
        return this.discountPercent;
    }
}
class PremiumCustomer {
    discountPercent;
    constructor(discountPercent) {
        this.discountPercent = discountPercent;
    }
    getDiscountPercent() {
        return this.discountPercent;
    }
}
// 'Handler' (Calculator) class
class DiscountCalculator2 {
    calculateCustomerDiscountedPayment(customer, totalPayment) {
        if (customer.getDiscountPercent() < 0) {
            throw new Error("Invalid discount percentage.");
        }
        if (totalPayment < 0) {
            throw new Error("Total payment must be a positive number.");
        }
        const discount = totalPayment * customer.getDiscountPercent();
        return totalPayment - discount;
    }
}
const regularCustomer2 = new RegularCustomer(0.1);
const premiumCustomer2 = new PremiumCustomer(0.3);
const discountCalculator = new DiscountCalculator2();
// console.log(discountCalculator.calculateCustomerDiscountedPayment(regularCustomer2, 20));
// console.log(discountCalculator.calculateCustomerDiscountedPayment(premiumCustomer2, 10));
// Once you’ve completed the refactor, the DiscountCalculator2 class should remain unchanged when adding new customer types.
// 3. Liskov substitution (LSP)
// The Liskov Substitution Principle states that subtypes must be substitutable for their base types without altering the correctness of the program. This means that objects of a superclass should be replaceable with objects of a subclass without causing errors or unexpected behavior.
// In TypeScript, we ensure this by designing classes and interfaces such that derived classes adhere to the expected behavior of the base class or interface.
// Violating the Liskov substitution (LSP) Principle:
class RectangleNo {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    setWidth(width) {
        this.width = width;
    }
    setHeight(height) {
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
class SquareNo extends RectangleNo {
    setWidth(width) {
        this.width = width;
        this.height = width; // Ensure square properties
    }
    setHeight(height) {
        this.width = height;
        this.height = height; // Ensure square properties
    }
}
function printArea(rectangle) {
    rectangle.setWidth(5);
    rectangle.setHeight(10);
    console.log(`Area: ${rectangle.getArea()}`);
}
// Test with Rectangle
const rectNo = new RectangleNo(2, 3);
// printArea(rectNo); // Correct output: Area: 50
// Test with Square (violates LSP)
const squareNo = new SquareNo(2, 2);
class RectangleYes {
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
class SquareYes {
    side;
    constructor(side) {
        this.side = side;
    }
    getArea() {
        return this.side * this.side;
    }
}
function printShapeArea(shape) {
    console.log(`Area: ${shape.getArea()}`);
}
// Test with Rectangle
const rectYes = new RectangleYes(5, 10);
// printShapeArea(rectYes); // Output: Area: 50
// Test with Square
const squareYes = new SquareYes(5);
class Eagle {
    eat() {
        console.log("Eagle swallows snakes.");
    }
    fly() {
        console.log("Eagle flies high.");
    }
}
class Penguin {
    eat() {
        console.log("Penguin munches fish.");
    }
    swim() {
        console.log("Penguin swim swiftly.");
    }
}
const baldEagle = new Eagle();
const kingPenguin = new Penguin();
class EagleNo {
    fly() {
        console.log("The eagle is flying!");
    }
    swim() {
        throw new Error("Eagles can't swim!");
    }
}
class PenguinNo {
    fly() {
        throw new Error("Penguins can't fly!");
    }
    swim() {
        console.log("The penguin is swimming!");
    }
}
class EagleYes {
    fly() {
        console.log("The eagle is flying!");
    }
}
class PenguinYes {
    swim() {
        console.log("The penguin is swimming!");
    }
}
class Car {
    start() {
        console.log("Car starts engine.");
    }
    stop() {
        console.log("Car stops engine.");
    }
    refuel() {
        console.log("Car refuels at gas-station.");
    }
}
class ElectricScooter {
    start() {
        console.log("Scooter starts engine.");
    }
    stop() {
        console.log("Scooter stops engine.");
    }
    chargeBattery() {
        console.log("Scooter recharges electricity.");
    }
}
const e_scooter = new ElectricScooter();
const car = new Car();
// e_scooter.start();
// e_scooter.stop();
// e_scooter.chargeBattery();
// console.log("");
// car.start();
// car.stop();
// car.refuel();
// 5. Dependency inversion
// The Dependency Inversion Principle (DIP) is the "D" in the SOLID principles. It emphasizes designing systems where high-level modules (policies) are not directly dependent on low-level modules (details). Instead, both should depend on abstractions.
// Definition of DIP
// High-level modules should not depend on low-level modules. Both should depend on abstractions.
// Abstractions should not depend on details. Details should depend on abstractions.
// This promotes flexibility and scalability by decoupling high-level logic from low-level implementations.
// DIP in TypeScript: Example
// Without DIP (Tightly Coupled Code)
// Here, the DatabaseServiceNo is tightly coupled to the App class.
class DatabaseServiceNo {
    save(data) {
        console.log(`Data saved to the database: ${data}`);
    }
}
class AppNo {
    dbService;
    constructor() {
        this.dbService = new DatabaseServiceNo(); // Direct dependency
    }
    saveData(data) {
        this.dbService.save(data);
    }
}
const appNo = new AppNo();
// Low-level implementation 1
class DatabaseService {
    save(data) {
        console.log(`Data saved to the database: ${data}`);
    }
}
// Low-level implementation 2
class FileServiceYes {
    save(data) {
        console.log(`Data saved to a file: ${data}`);
    }
}
// High-level module
class AppYes {
    storageServiceYes;
    constructor(storageServiceYes) {
        this.storageServiceYes = storageServiceYes;
    }
    saveData(data) {
        this.storageServiceYes.save(data);
    }
}
// Use with DatabaseService
const app1 = new AppYes(new DatabaseService());
// app1.saveData("Database User Data");
// Use with FileServiceYes
const app2 = new AppYes(new FileServiceYes());
// Low-level module implementation
class EmailNotifier {
    send(message) {
        console.log(`Email notifier: ${message}`);
    }
}
class MSNNotifier {
    send(message) {
        console.log(`MSN notifier: ${message}`);
    }
}
// High-level module (policies)
class NotifierManager {
    notifier;
    constructor(notifier) {
        this.notifier = notifier;
    }
    notify(message) {
        this.notifier.send(message);
    }
}
const emailNotifier = new NotifierManager(new EmailNotifier());
const msnNotifier = new NotifierManager(new MSNNotifier());
// emailNotifier.notify("Dear example");
// msnNotifier.notify("Hi there");
