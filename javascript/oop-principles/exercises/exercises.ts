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
  constructor(private name: string, private email: string) {}

  // Responsibility 1: Handling userNo data
  getUserInfo() {
    return `User: ${this.name}, Email: ${this.email}`;
  }

  // Responsibility 2: Sending notifications
  sendEmail(message: string) {
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
  constructor(private name: string, private email: string) {}

  // Responsibility 1: Handling user data
  getUserInfo() {
    return `User: ${this.name}, Email: ${this.email}`;
  }
}

class NotificationService {
  // Responsibility 2: Sending notifications
  sendEmail(userEmail: string, message: string) {
    console.log(`Sending email to ${userEmail}: ${message}`);
  }
}

// Usage
const userYes = new UserYes("John Doe", "john@example.com");
const notificationService = new NotificationService();

// console.log(userYes.getUserInfo());
// notificationService.sendEmail(userYes.email, "Hello John, welcome!");

// Explanation of Refactor:
// The User class now only handles user data.
// The NotificationService class handles the responsibility of sending notifications.
// Each class has a single responsibility, making the code easier to maintain and modify.

// Exercise: Refactor a Code Example to Adhere to SRP
// You are given the following class, which violates the Single Responsibility Principle. Refactor the code so that it adheres to SRP.
// Separate responsibilities into distinct classes (e.g., Order, InvoiceGenerator, EmailService).
// Ensure that each class handles only one responsibility.
// Once you’ve refactored the code, your Order class should only deal with order management, and the email and invoice logic should be in separate classes.
// class Order {
//   private items: string[] = [];
//   private totalAmount: number = 0;

//   addItem(item: string, price: number): void {
//     this.items.push(item);
//     this.totalAmount += price;
//   }

//   getTotal(): number {
//     return this.totalAmount;
//   }

//   generateInvoice(): string {
//     return `Invoice: ${this.items.join(", ")} - Total: $${this.totalAmount}`;
//   }

//   sendEmailConfirmation(): void {
//     console.log("Sending email confirmation...");
//     console.log(`Order Confirmation: ${this.generateInvoice()}`);
//   }
// }

// Refactored code of 'Order' class
// Responsible for storing order list and its structure
interface OrderType {
  getOrderName(): string;
  getOrderPrice(): number;
}

class Order implements OrderType {
  constructor(private order: string, private price: number) {}

  getOrderName(): string {
    return this.order;
  }

  getOrderPrice(): number {
    return this.price;
  }
}

class OrdersManager {
  private orders: Order[] = [];

  addOrder(newOrder: Order): void {
    this.orders.push(newOrder);
  }

  getOrderList(): Order[] {
    return this.orders;
  }
}

class OrdersTotalPayment {
  getTotalPayment(orders: Order[]): number {
    let totalPayment = 0;

    for (let i = 0; i < orders.length; i += 1) {
      totalPayment += orders[i].getOrderPrice();
    }

    return totalPayment;
  }
}

class InvoiceGenerator {
  private formatOrders(orders: Order[]): string {
    const formattedOrders: string[] = [];
    for (let i = 0; i < orders.length; i += 1) {
      formattedOrders.push(`{ order: ${orders[i].getOrderName()}, price: ${orders[i].getOrderPrice()}}`)
    }

    return formattedOrders.join(", ");
  }

  generateInvoice(orders: Order[], totalPayment: number): string {
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
  sendEmailConfirmation(invoice: string): void {
    console.log("Sending email confirmation...");
    console.log(`Order confirmation: ${invoice}`);
  }
}

const fruitsManager = new OrdersManager();
fruitsManager.addOrder(new Order("apple", 2));
fruitsManager.addOrder(new Order("banana", 3));

const fruitsTotalPayment = new OrdersTotalPayment();
const invoice = new InvoiceGenerator();
const fruits: Order[] = fruitsManager.getOrderList();
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
  processInvoice(invoice: any) {
    if (invoice.type === 'credit') {
      console.log('Processing credit invoice');
    } else if (invoice.type === 'debit') {
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
abstract class Invoice {
  abstract process(): void;
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
  processInvoice(invoice: Invoice) {
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
  calculateDiscount(customer: any) {
    if (customer.type === 'regular') {
      return 0.1; // 10% discount
    } else if (customer.type === 'premium') {
      return 0.2; // 20% discount
    }
  }
}

const regularCustomer = { type: 'regular' };
const premiumCustomer = { type: 'premium' };

// const calculator = new DiscountCalculator();
// console.log(calculator.calculateDiscount(regularCustomer));
// console.log(calculator.calculateDiscount(premiumCustomer));

// Objective:
// Refactor this code so that you can add new customer types (e.g., vip) without modifying the DiscountCalculator class.
// Use the Open-Closed Principle by introducing polymorphism and extending the DiscountCalculator class with new customer types.

// Abstraction
interface Customer {
  getDiscountPercent(): number;
}

// Concretes
class RegularCustomer implements Customer {
  constructor(public discountPercent: number) {}

  getDiscountPercent(): number {
    return this.discountPercent;
  }
}

class PremiumCustomer implements Customer {
  constructor(public discountPercent: number) {}

  getDiscountPercent(): number {
    return this.discountPercent;
  }
}

// 'Handler' (Calculator) class
class DiscountCalculator2 {
  calculateCustomerDiscountedPayment(customer: Customer, totalPayment: number): number {
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
  constructor(protected width: number, protected height: number) {}

  setWidth(width: number): void {
    this.width = width;
  }

  setHeight(height: number): void {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class SquareNo extends RectangleNo {
  setWidth(width: number): void {
    this.width = width;
    this.height = width; // Ensure square properties
  }

  setHeight(height: number): void {
    this.width = height;
    this.height = height; // Ensure square properties
  }
}

function printArea(rectangle: RectangleNo): void {
  rectangle.setWidth(5);
  rectangle.setHeight(10);
  console.log(`Area: ${rectangle.getArea()}`);
}

// Test with Rectangle
const rectNo = new RectangleNo(2, 3);
// printArea(rectNo); // Correct output: Area: 50

// Test with Square (violates LSP)
const squareNo = new SquareNo(2, 2);
// printArea(squareNo); // Incorrect behavior: Area: 100

// Why does this violate LSP?
// The Square class overrides the behavior of Rectangle. When using printArea with a Square, the result is inconsistent with the expectation for a rectangle, causing incorrect behavior.

// Correct Implementation: Adhering to LSP
// To follow LSP, we can refactor to separate the interfaces for Rectangle and Square:
interface ShapeYes {
  getArea(): number;
}

class RectangleYes implements ShapeYes {
  constructor(private width: number, private height: number) {}

  getArea(): number {
    return this.width * this.height;
  }
}

class SquareYes implements ShapeYes {
  constructor(private side: number) {}

  getArea(): number {
    return this.side * this.side;
  }
}

function printShapeArea(shape: ShapeYes): void {
  console.log(`Area: ${shape.getArea()}`);
}

// Test with Rectangle
const rectYes = new RectangleYes(5, 10);
// printShapeArea(rectYes); // Output: Area: 50

// Test with Square
const squareYes = new SquareYes(5);
// printShapeArea(squareYes); // Output: Area: 25

// Here, Square and Rectangle both implement the ShapeYes interface and can be used interchangeably, preserving LSP.

// Exercise: Applying LSP in TypeScript
// Create an interface Bird with a method fly. Then, implement two classes: Eagle (a bird that can fly) and Penguin (a bird that cannot fly). Ensure the implementation adheres to the Liskov Substitution Principle.

// Steps:
// Define an interface Bird with appropriate methods.
// Implement classes Eagle and Penguin.
// Ensure the design does not violate LSP.
interface Bird {
  eat(): void;
}

// FlyingBird can 'eat()' and 'fly()'
interface FlyingBird extends Bird {
  fly(): void;
}

// SwimmingBird can 'eat()' and 'swim()'
interface SwimmingBird extends Bird {
  swim(): void;
}

class Eagle implements FlyingBird {
  eat(): void {
      console.log("Eagle swallows snakes.");
  }
  
  fly(): void {
      console.log("Eagle flies high.");
  }
}

class Penguin implements SwimmingBird {
  eat(): void {
      console.log("Penguin munches fish.");
  }

  swim(): void {
      console.log("Penguin swim swiftly.");
  }
}

const baldEagle = new Eagle();
const kingPenguin = new Penguin();

// baldEagle.eat();
// baldEagle.fly();
// kingPenguin.eat();
// kingPenguin.swim();

// 4. Interface segregation
// The Interface Segregation Principle (ISP) states that a class should not be forced to implement interfaces it does not use. Instead, you should break down interfaces into smaller, more specific ones to ensure classes only implement what they actually need.

// This principle is one of the SOLID principles of object-oriented design and helps avoid bloated, "fat" interfaces.

// Example: Violating ISP in TypeScript
// Consider a scenario where we have a Bird interface for all bird types:
interface BirdNo {
  fly(): void;
  swim(): void;
}

class EagleNo implements BirdNo {
  fly(): void {
    console.log("The eagle is flying!");
  }

  swim(): void {
    throw new Error("Eagles can't swim!");
  }
}

class PenguinNo implements BirdNo {
  fly(): void {
    throw new Error("Penguins can't fly!");
  }

  swim(): void {
    console.log("The penguin is swimming!");
  }
}

// Problem:
// The Eagle class is forced to implement swim, even though eagles cannot swim.
// The Penguin class is forced to implement fly, even though penguins cannot fly.
// This violates ISP because Bird is a "fat" interface containing methods not relevant to certain bird types.

// Correct Implementation: Adhering to ISP
// We can split the Bird interface into smaller, more specific interfaces:
interface FlyableYes {
  fly(): void;
}

interface SwimmableYes {
  swim(): void;
}

class EagleYes implements FlyableYes {
  fly(): void {
    console.log("The eagle is flying!");
  }
}

class PenguinYes implements SwimmableYes {
  swim(): void {
    console.log("The penguin is swimming!");
  }
}

// Benefits:
// Eagle only implements the Flyable interface and is not forced to implement Swimmable.
// Penguin only implements the Swimmable interface and is not forced to implement Flyable.

// Exercise: Apply ISP in TypeScript
// Scenario:

// You are building a system for various types of machines.
// Define a base interface Machine with methods for start, stop, refuel, and chargeBattery.
// However, some machines are fuel-powered, while others are electric-powered.

// Task:
// Refactor the Machine interface to adhere to the Interface Segregation Principle.
// Create the following classes:
// Car (fuel-powered).
// ElectricScooter (battery-powered).

// Requirements:
// Avoid forcing any class to implement methods irrelevant to its functionality.

// 'Intersection' interface
interface Machine {
  start(): void;
  stop(): void;
}

interface FuelPoweredMachine extends Machine {
  refuel(): void;
}

interface ElectricPoweredMachine extends Machine {
  chargeBattery(): void;
}

class Car implements FuelPoweredMachine {
  start(): void {
    console.log("Car starts engine.");
  }

  stop(): void {
    console.log("Car stops engine.");
  }

  refuel(): void {
    console.log("Car refuels at gas-station.");
  }
}

class ElectricScooter implements ElectricPoweredMachine {
  start(): void {
    console.log("Scooter starts engine.");
  }

  stop(): void {
    console.log("Scooter stops engine.");
  }

  chargeBattery(): void {
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
  save(data: string): void {
    console.log(`Data saved to the database: ${data}`);
  }
}

class AppNo {
  private dbService: DatabaseServiceNo;

  constructor() {
    this.dbService = new DatabaseServiceNo(); // Direct dependency
  }

  saveData(data: string): void {
    this.dbService.save(data);
  }
}

const appNo = new AppNo();
// appNo.saveData("User data");

// Issues:
// The App class is tightly coupled to the DatabaseService class.
// If we want to switch to another storage mechanism (e.g., a file), we must modify the App class.

// With DIP (Loosely Coupled Code)
// Introduce an abstraction to decouple the high-level module (App) from the low-level module (DatabaseService).

// Abstraction
interface StorageServiceYes {
  save(data: string): void;
}

// Low-level implementation 1
class DatabaseService implements StorageServiceYes {
  save(data: string): void {
    console.log(`Data saved to the database: ${data}`);
  }
}

// Low-level implementation 2
class FileServiceYes implements StorageServiceYes {
  save(data: string): void {
    console.log(`Data saved to a file: ${data}`);
  }
}

// High-level module
class AppYes {
  private storageServiceYes: StorageServiceYes;

  constructor(storageServiceYes: StorageServiceYes) {
    this.storageServiceYes = storageServiceYes;
  }

  saveData(data: string): void {
    this.storageServiceYes.save(data);
  }
}

// Use with DatabaseService
const app1 = new AppYes(new DatabaseService());
// app1.saveData("Database User Data");

// Use with FileServiceYes
const app2 = new AppYes(new FileServiceYes());
// app2.saveData("File User Data");

// Benefits:

// Decoupling: The App class depends on the abstraction (StorageService), not the concrete implementations (DatabaseService, FileService).
// Flexibility: New storage implementations can be added without modifying the App class.
// Testability: Mock services can be injected for testing.

// Exercise
// You are tasked with building a system to notify users. The system should:

// Send notifications via email.
// Be flexible to support SMS notifications in the future.
// Create a Notifier abstraction.
// Implement EmailNotifier as a low-level module.
// Design a high-level module NotificationService that depends on the Notifier abstraction.
// Add an additional implementation for SmsNotifier.

// Add a PushNotificationNotifier class to the above system to send push notifications.
// Test it by injecting it into the NotificationService class.

// Expected Solution:
// Abstraction
// interface Notifier {
//   sendNotification(message: string): void;
// }

// Low-level implementations
// // Email Notifier Implementation
// class EmailNotifier implements Notifier {
//   sendNotification(message: string): void {
//     console.log(`Email sent: ${message}`);
//   }
// }

// // SMS Notifier Implementation
// class SmsNotifier implements Notifier {
//   sendNotification(message: string): void {
//     console.log(`SMS sent: ${message}`);
//   }
// }

// // High-level Module
// class NotificationService {
//   private notifier: Notifier;

//   constructor(notifier: Notifier) {
//     this.notifier = notifier;
//   }

//   notify(message: string): void {
//     this.notifier.sendNotification(message);
//   }
// }

// // Example Usage
// const emailService = new NotificationService(new EmailNotifier());
// emailService.notify("Welcome via Email!");

// const smsService = new NotificationService(new SmsNotifier());
// smsService.notify("Welcome via SMS!");

// Abstraction
interface Notifier2 {
  send(message: string): void;
}

// Low-level module implementation
class EmailNotifier implements Notifier2 {
  send(message: string): void {
    console.log(`Email notifier: ${message}`);
  }
}

class MSNNotifier implements Notifier2 {
  send(message: string): void {
    console.log(`MSN notifier: ${message}`)
  }
}

// High-level module (policies)
class NotifierManager {
  constructor(private notifier: Notifier2) {}

  notify(message: string): void {
    this.notifier.send(message);
  }
}

const emailNotifier = new NotifierManager(new EmailNotifier());
const msnNotifier = new NotifierManager(new MSNNotifier());

emailNotifier.notify("Dear example");
msnNotifier.notify("Hi there");