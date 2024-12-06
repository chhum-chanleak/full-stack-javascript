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

interface FlyingBird extends Bird {
  fly(): void;
}

interface SwimmingBird extends Bird {
  swim(): void;
}

class Eagle implements FlyingBird {
  eat(): void {
      console.log("Eagle swallows snakes.");
  }
  fly(): void {
      console.log("Eagle flies hight.");
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

// 5. Dependency inversion