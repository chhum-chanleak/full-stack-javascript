export const test = 0;
// SOLID principles
// 1. Single responsibility (SRP)
// The Single Responsibility Principle (SRP) is one of the key principles in object-oriented design, part of the SOLID principles. It states that a class should have only one reason to change, meaning that a class should only have one job or responsibility. By following SRP, we ensure that our code is more maintainable, easier to understand, and less prone to bugs.
// Key Ideas:
// Single Responsibility: A class or module should focus on one task.
// Changeability: If a class has more than one responsibility, it could change for multiple reasons, which makes maintenance difficult.
// Example in TypeScript:
// Let's consider an example where we have a class that violates SRP, followed by a refactored version that adheres to it.
// Violating SRP: (keep an eye on parameter(s) of the methods and number of methods). Parameters can play a role in whether a class adheres to the Single Responsibility Principle (SRP) because they can indicate additional responsibilities.
// In this example, a UserNo class handles both userNo data and user-related notifications (i.e., two responsibilities).
// Example:
class UserNo {
    name;
    email;
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    // Responsibility 1: Handling userNo data
    getUserInfo() {
        return `User: ${this.name}, Email: ${this.email}`;
    }
    // Responsibility 2: Sending notifications
    sendEmail(message) {
        console.log(`Sending email to ${this.email}: ${message}`);
    }
}
const userNo = new UserNo("John Doe", "john@example.com");
// console.log(userNo.getUserInfo());
// userNo.sendEmail("Hello John, welcome!");
// In this case, the User class violates SRP because it handles two responsibilities: userNo data and sending emails.
// Refactored to Adhere to SRP:
// Now, let’s refactor the code to separate concerns. We’ll create two classes: one for handling user data and another for sending notifications.
class UserYes {
    name;
    email;
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    // Responsibility 1: Handling user data
    getUserInfo() {
        return `User: ${this.name}, Email: ${this.email}`;
    }
}
class NotificationService {
    // Responsibility 2: Sending notifications
    sendEmail(userEmail, message) {
        console.log(`Sending email to ${userEmail}: ${message}`);
    }
}
// Usage
const userYes = new UserYes("John Doe", "john@example.com");
const notificationService = new NotificationService();
class Order {
    order;
    price;
    constructor(order, price) {
        this.order = order;
        this.price = price;
    }
    getOrderName() {
        return this.order;
    }
    getOrderPrice() {
        return this.price;
    }
}
class OrdersManager {
    orders = [];
    addOrder(newOrder) {
        this.orders.push(newOrder);
    }
    getOrderList() {
        return this.orders;
    }
}
class OrdersTotalPayment {
    getTotalPayment(orders) {
        let totalPayment = 0;
        for (let i = 0; i < orders.length; i += 1) {
            totalPayment += orders[i].getOrderPrice();
        }
        return totalPayment;
    }
}
class InvoiceGenerator {
    formatOrders(orders) {
        const formattedOrders = [];
        for (let i = 0; i < orders.length; i += 1) {
            formattedOrders.push(`{ order: ${orders[i].getOrderName()}, price: ${orders[i].getOrderPrice()}}`);
        }
        return formattedOrders.join(", ");
    }
    generateInvoice(orders, totalPayment) {
        if (!orders || orders.length === 0) {
            throw new Error("No order provided.");
        }
        if (totalPayment <= 0) {
            throw new Error("Invalid payment.");
        }
        return `Invoice: ${this.formatOrders(orders)}} - Total payment: ${totalPayment}}`;
    }
}
class EmailConfirmation {
    sendEmailConfirmation(invoice) {
        console.log("Sending email confirmation...");
        console.log(`Order confirmation: ${invoice}`);
    }
}
const fruitsManager = new OrdersManager();
fruitsManager.addOrder(new Order("apple", 2));
fruitsManager.addOrder(new Order("banana", 3));
const fruitsTotalPayment = new OrdersTotalPayment();
const invoice = new InvoiceGenerator();
const fruits = fruitsManager.getOrderList();
const emailConfirmation = new EmailConfirmation();
// console.log(fruitsManager.getOrderList());
// console.log(fruitsTotalPayment.getTotalPayment(fruitsManager.getOrderList()));
// console.log(invoice.generateInvoice(fruits, fruitsTotalPayment.getTotalPayment(fruits)));
// console.log(emailConfirmation.sendEmailConfirmation(invoice.generateInvoice(fruits, fruitsTotalPayment.getTotalPayment(fruits))));
// 2. Open-closed (OCP)
// The Open-Closed Principle (OCP) is one of the SOLID principles of object-oriented design. It states that:
// A class or module should be open for extension (i.e., you can add new functionality) but closed for modification (i.e., you shouldn’t have to change the existing code to add new functionality).
// This principle helps us achieve flexibility and maintainability, as we can extend the behavior of a system without changing its existing parts.
// Key Ideas:
// Open for Extension: You should be able to extend the behavior of a class or module.
// Closed for Modification: Once a class or module is written, its existing code should remain untouched.
// Example in TypeScript:
// Let’s start with an example that violates OCP and then refactor it to adhere to the principle.
// Violating the Open-Closed Principle:
// In the following code, the 'InvoiceProcessorNo' class handles two types of invoices (Credit and Debit) and has conditional logic inside it. To add a new type of invoice, we would need to modify the existing class, violating the OCP.
// Don't
class InvoiceProcessorNo {
    processInvoice(invoice) {
        if (invoice.type === 'credit') {
            console.log('Processing credit invoice');
        }
        else if (invoice.type === 'debit') {
            console.log('Processing debit invoice');
        }
    }
}
const processorNo = new InvoiceProcessorNo();
const creditInvoiceNo = { type: 'credit' };
const debitInvoiceNo = { type: 'debit' };
// processorNo.processInvoice(creditInvoiceNo);
// processorNo.processInvoice(debitInvoiceNo);
// To add a new invoice type (e.g., refund), we’d have to modify the InvoiceProcessorNo class.
// This makes the system more fragile because modifying an existing class increases the risk of introducing bugs.
// Refactoring to Adhere to the Open-Closed Principle:
// To fix this, we can use polymorphism and extend the behavior of InvoiceProcessor without modifying its existing code. We’ll introduce an abstract class Invoice and subclasses for each type of invoice.
// Do
class Invoice {
}
class CreditInvoice extends Invoice {
    process() {
        console.log('Processing credit invoice');
    }
}
class DebitInvoice extends Invoice {
    process() {
        console.log('Processing debit invoice');
    }
}
class RefundInvoice extends Invoice {
    process() {
        console.log('Processing refund invoice');
    }
}
// This type of class has a few names of convention such 'Processor', 'Service', 'Manager', and 'Handler'
class InvoiceProcessorYes {
    processInvoice(invoice) {
        invoice.process();
    }
}
// Usage
const processorYes = new InvoiceProcessorYes();
const creditInvoiceYes = new CreditInvoice();
const debitInvoiceYes = new DebitInvoice();
const refundInvoiceYes = new RefundInvoice();
// processorYes.processInvoice(creditInvoiceYes);
// processorYes.processInvoice(debitInvoiceYes);
// processorYes.processInvoice(refundInvoiceYes);
// Explanation of Refactor:
// 'Invoice' is now an abstract class with a process() method.
// Different invoice types ('CreditInvoiceYes', 'DebitInvoiceYes', 'RefundInvoice') implement the process() method, each with its own behavior.
// The 'InvoiceProcessorYes' class now only interacts with the abstract Invoice class, allowing us to add new types of invoices by extending the Invoice class, without modifying the 'InvoiceProcessorYes' class.
// This adheres to the Open-Closed Principle because:
// The 'InvoiceProcessorYes' class is closed for modification (no need to change it).
// We can extend it with new invoice types without modifying the original 'InvoiceProcessorYes' class.
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
