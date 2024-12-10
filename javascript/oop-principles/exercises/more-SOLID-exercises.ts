// SOLID exercise

// 1. Single responsibility principle (SRP)
// Exercise 1: Refactor a Non-SRP Class
// Problem:
// You are given the following UserManager class that violates SRP:

// Task:
// Refactor the UserManager class into multiple classes that each handle only one responsibility. Implement it with appropriate interfaces, if necessary.
class UserManager {
  createUser(username: string, email: string): void {
    console.log(`Creating user: ${username}`);
    // Logic to create a user
  }

  sendWelcomeEmail(email: string): void {
    console.log(`Sending welcome email to: ${email}`);
    // Logic to send an email
  }

  saveToDatabase(user: { username: string; email: string }): void {
    console.log(`Saving user to database: ${user.username}`);
    // Logic to save to database
  }
}

// Solution:
interface IUser {
  name: string;
  email: string;
}

interface IUserCreation {
  createUser(user: IUser): void;
}

class UserCreation implements IUserCreation {
  createUser(user: IUser): void {
    console.log(`Creating user: ${user.name}, e-mail: ${user.email}`);
  }
}

interface IEmailService {
  sendWelcomeEmail(email: string): void;
}

class WelcomeEmailService implements IEmailService {
  sendWelcomeEmail(email: string): void {
    console.log(`Sending welcome email to: ${email}`);
  }
}

interface IDatabase {
  saveUser(user: IUser): void;
}

class UserDatabase implements IDatabase {
  saveUser(user: IUser): void {
    console.log(`Saving ${user.name} to database`);
  }
}

// Coordinator class (integration)
class UserManager2 {
  constructor(private userCreation: IUserCreation, private emailService: IEmailService, private database: IDatabase) {}

  handleNewUser(user: IUser): void {
    try {
      this.userCreation.createUser(user);
      this.emailService.sendWelcomeEmail(user.email);
      this.database.saveUser(user);
    } catch(error) {
      console.error(`Error handling new user: ${error}`);
    }
  }
}

const user: IUser = {
  name: "Example exam",
  email: "example@exam",
};
const userManager = new UserManager2(new UserCreation(), new WelcomeEmailService(), new UserDatabase());

// userManager.handleNewUser(user);

// Exercise 2: Implement SRP for a Shopping Cart
// Problem:
// Write a program for a shopping cart system. Ensure each class handles a single responsibility:

// Adding and removing items from the cart.
// Calculating the total price.
// Handling payment.
// Requirements:
// Define separate classes for each responsibility.
// Use dependency injection to manage interactions between the classes.
// Create a main.ts file that simulates the shopping cart's functionality.
interface Item {
  id: number;
  name: string;
  price: number;  
}

interface Cart {
  items: Item[];
}

class ShoppingCart implements Cart{
  constructor(public items: Item[] = []) {}
}

interface IShowItemsService {
  showItems(cart: Cart): void;
}

class ShowItemsService implements IShowItemsService {
  showItems(cart: Cart): void {
   console.log(JSON.stringify(cart.items, null, 2));
  }
}

interface IAddItemsService {
  addToCart(cart: Cart, ...items: Item[]): void;
}

class AddItemsService implements IAddItemsService {
  addToCart(cart: Cart, ...items: Item[]): void {
    cart.items.push(...items)
  }
}

interface ICalculateTotalPriceService {
  calculateTotalPrice(cart: Cart): number;
}

class CalculateTotalPriceService implements ICalculateTotalPriceService {
  calculateTotalPrice(cart: Cart): number {
    let total = 0;

    for (let i = 0; i < cart.items.length; i += 1) {
      total += cart.items[i].price;
    }

    return total;
  }
}

interface IRemoveItemsService {
  removeItems(cart: Cart, ...items: Item[]): void;
}

class RemoveItemsService implements IRemoveItemsService {
  removeItems(cart: Cart, ...items: Item[]): void {
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
  constructor(
    private showItemsService: IShowItemsService,
    private addItemsService: IAddItemsService,
    private calculateTotalPriceService: CalculateTotalPriceService,
    private removeItemsService: IRemoveItemsService
  ) {}

  showItems(cart: Cart): void {
    this.showItemsService.showItems(cart);
  }

  addItems(cart: Cart, ...items: Item[]): void {
    this.addItemsService.addToCart(cart, ...items);
  }

  calculateTotalPrice(cart: Cart): number {
    const total = this.calculateTotalPriceService.calculateTotalPrice(cart);

    console.log(`Total price: $${total}`);

    return total;
  }

  removeItems(cart: Cart, ...items: Item[]) {
    this.removeItemsService.removeItems(cart, ...items);

    if (items.length > 1) {
      console.log(`${JSON.stringify(items, null, 2)} have been removed from cart.`);
    } else {
      console.log(`${JSON.stringify(items, null, 2)} has been removed from cart.`);
    }   
  }
}

const apple: Item = { id: 1, name: "apple", price: 2.5};
const pineapple: Item = { id: 4, name: "pineapple", price: 5.5};
const apple2: Item = { id: 2, name: "apple2", price: 2.5};
const pineapple2: Item = { id: 3, name: "pineapple", price: 1.5};
// Shopping cart
const shoppingCart = new ShoppingCart();

// Create a manager instance with injected services
const cartManager = new CartManager(
  new ShowItemsService(),
  new AddItemsService(),
  new CalculateTotalPriceService(),
  new RemoveItemsService(),
);

// cartManager.addItems(shoppingCart, apple, pineapple);
// cartManager.showItems(shoppingCart);
// cartManager.calculateTotalPrice(shoppingCart);
// cartManager.removeItems(shoppingCart, apple);
// cartManager.showItems(shoppingCart);

// 2. Open/Closed principle (OCP)

// Exercise 1: Shape Area Calculation
// Problem:
// You have a function that calculates the area of a rectangle. Extend it to calculate the area of different shapes (e.g., circle, triangle) without modifying the existing function.

// Task:

// Add new shapes, such as a Triangle, Trapezoid, and Rhombus, without modifying the existing Shape implementations.

// Example (OCP):
// Use abstraction to make the code open for extension but closed for modification.

// Base interface
interface Shape {
  getArea(): number;
}

// Rectangle implementation
class Rectangle implements Shape {
  constructor(private width: number, private height: number) {}

  getArea(): number {
    return this.width * this.height;
  }
}

// Circle implementation
class Circle implements Shape {
  constructor(private radius: number) {}

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

// Usage
const shapes: Shape[] = [
  new Rectangle(10, 5),
  new Circle(7),
];

// shapes.forEach(shape => {
//   console.log(`Area: ${shape.getArea()}`);
// });

// Solution: OCP

// Base interface
interface Shape2 {
  getArea(): number;
}

// Triangle implementation
class Triangle implements Shape2 {
  constructor(private base: number, private height: number) {}

  getArea(): number {
    return (1 / 2) * this.base * this.height;
  }
}

// Trapezoid implementation
class Trapezoid implements Shape2 {
  constructor(private base1: number, private base2: number, private height: number) {}

  getArea(): number {
    return (1 / 2) * (this.base1 + this.base2) * this.height
  }
}

// Rhombus implementation
class Rhombus implements Shape2 {
  constructor(private diagonal1: number, private diagonal2: number) {}

  getArea(): number {
    // Get area of a rhombus with given diagonals
    return (1 / 2) * this.diagonal1 * this.diagonal2;
  }
}

// const triangle = new Triangle(2, 4);
// const trapezoid = new Trapezoid(4, 6, 8);
// const rhombus = new Rhombus(4, 6);

// console.log(`Triangle area: ${triangle.getArea()}`);
// console.log(`Trapezoid: ${trapezoid.getArea()}`);
// console.log(`Rhombus area: ${rhombus.getArea()}`);

// Exercise 2: Payment Processing System
// Problem:
// You have a function to process payments via a credit card. Extend it to support other payment methods, like PayPal or Stripe, without altering the original implementation.
// Task:

// Add other payment processors, such as Google Pay, Apple Pay and ABA Pay, without modifying existing payment processors.

// Solution (OCP):
// Use abstraction to allow easy extension.

// Base interface
interface PaymentProcessor {
  processPayment(amount: number): void;
}

// Credit Card implementation
class CreditCardPayment implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing credit card payment of $${amount}`);
  }
}

// PayPal implementation
class PayPalPayment implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing PayPal payment of $${amount}`);
  }
}

// Stripe implementation
class StripePayment implements PaymentProcessor {
  processPayment(amount: number): void {
    console.log(`Processing Stripe payment of $${amount}`);
  }
}

// Usage
const payments: PaymentProcessor[] = [
  new CreditCardPayment(),
  new PayPalPayment(),
  new StripePayment(),
];

// payments.forEach(payment => {
//   payment.processPayment(100);
// });

// Solution: OCP
interface PaymentProcessor2 {
  processPayment(amount: number): void;
}

class ApplePayment implements PaymentProcessor2 {
  processPayment(amount: number): void {
    console.log(`Processing Apple payment of $${amount}`);
  }
}

const applePayment = new ApplePayment();
applePayment.processPayment(200);