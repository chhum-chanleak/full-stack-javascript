import { errorMessages } from "./errors.js";
import { validateShapeData } from "./validations.js";

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

// Abstractions

// Base interfaces
interface IUser {
  name: string;
  email: string;
}

interface Service {
  executeService(user: IUser): void;
}

interface IUserCreationService extends Service {
  executeService(user: IUser): void;
}

interface ISendingEmailService extends Service {
  executeService(user: IUser): void;
}

interface IDatabaseService extends Service {
  executeService(user: IUser): void;
}

// Concrete implementations

// User creation service implementation
class UserCreationService implements IUserCreationService {
  executeService(user: IUser): void {
    console.log(`Creating user: ${user.name}, email: ${user.email}`);
  }
}

// Email service implementation
class WelcomeEmailService implements ISendingEmailService {
  executeService(user: IUser): void {
    console.log(`Sending welcome email to: ${user.email}`);
  }
}

// Database service implementation
class UserDatabase implements IDatabaseService {
  executeService(user: IUser): void {
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
  private services: Map<string, Service> = new Map();

  addService(name: string, service: Service): void {
    this.services.set(name, service);
  }

  removeService(name: string): void {
    if (!this.services.has(name)) {
      throw new Error(`Service ${name} does not exist.`);
    }

    if (this.services.has(name)) {
      this.services.delete(name);
      console.log(`${name} Service has been removed.`);
    }    
  }

  getService(name: string): Service {
    return this.services.get(name) as Service;
  }
  
  showServices(): void {
    console.log(this.services);
  }
}

// Client

// Coordinator class (integration)
class UserService {
  constructor(private registry: ServiceRegistry) {}

  handleService(name: string, user: IUser): void {
    const service = this.registry.getService(name);

    service.executeService(user);
  }
}

// Create users
// const user: IUser = {
//   name: "Example Exam",
//   email: "example@exam",
// };

// Create service registries (database of services)
// const serviceRegistry = new ServiceRegistry();

// Add services
// serviceRegistry.addService("create", new UserCreationService());
// serviceRegistry.addService("email", new WelcomeEmailService());
// serviceRegistry.addService("database", new UserDatabase());

// Create a user services with injected services
// const userServices = new UserService(serviceRegistry);

// Usage
// userServices.handleService("create", user);
// userServices.handleService("email", user);
// userServices.handleService("database", user);

// Delete services
// serviceRegistry.removeService("email");

// userServices.handleService("email", user); // Error

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

// Abstractions

// Base interfaces
interface Item {
  id: number;
  name: string;
  price: number;  
}

interface Cart {
  items: Item[];
}

interface Service2 {
  executeService(cart: ShoppingCart, ...items: Item[]): void
}

interface IShowItemsService extends Service2 {
  executeService(cart: ShoppingCart): void;
}

interface IAddItemsService extends Service2 {
  executeService(cart: ShoppingCart, ...items: Item[]): void;
}

interface ICalculateTotalPriceService extends Service2 {
  executeService(cart: ShoppingCart): number;
}

interface IRemoveItemsService extends Service2 {
  executeService(cart: ShoppingCart, ...items: Item[]): void;
}

// Concrete implementations
class ShoppingCart implements Cart{
  constructor(public items: Item[] = []) {}
}

class ShowItemsService implements IShowItemsService {
  executeService(cart: ShoppingCart): void {
   console.log(JSON.stringify(cart.items, null, 2));
  }
}

class AddItemsService implements IAddItemsService {
  executeService(cart: ShoppingCart, ...items: Item[]): void {
    cart.items.push(...items);
  }
}

class CalculateTotalPriceService implements ICalculateTotalPriceService {
  executeService(cart: ShoppingCart): number {
    let total = 0;

    for (let i = 0; i < cart.items.length; i += 1) {
      total += cart.items[i].price;
    }

    console.log(`Total price: $${total}`);

    return total;
  }
}

class RemoveItemsService implements IRemoveItemsService {
  executeService(cart: ShoppingCart, ...items: Item[]): void {
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
class ServiceRegistry2{
  private services: Map<string, Service2> = new Map();

  addService(name: string, service: Service2): void {
    this.services.set(name, service);
  }

  removeService(name: string): void {
    if (!this.services.has(name)) {
      throw new Error(`${name} service does not exist.`);
    }

    if (this.services.has(name)) {
      this.services.delete(name);
      console.log(`${name} service has been remove.`);
    }
  }

  getService(name: string): Service2 {
    return this.services.get(name) as Service2;
  }

  showServices(): void {
    console.log(this.services);
  }
}

// Client

// Manager class using Dependency Injection
class ShoppingCartManager {
  constructor(private registry: ServiceRegistry2) {}

  handleService(name: string, cart: Cart, ...items: Item[]): void {
    const service = this.registry.getService(name);

    if (!service) {
      console.error(`${name} service does not exist.`);
    }

    service.executeService(cart, ...items);
  }
}

// const apple: Item = { id: 1, name: "apple", price: 2.5};
// const pineapple: Item = { id: 4, name: "pineapple", price: 5.5};
// const apple2: Item = { id: 2, name: "apple2", price: 2.5};
// const pineapple2: Item = { id: 3, name: "pineapple", price: 1.5};

// Shopping carts
// const shoppingCart = new ShoppingCart();

//Create a service registry (database of services)
// const serviceRegistry2 = new ServiceRegistry2();

// Create a manager instance with injected services
// const shoppingCartManager = new ShoppingCartManager(serviceRegistry2);

// Add services to shopping cart manager
// serviceRegistry2.addService("show items", new ShowItemsService());
// serviceRegistry2.addService("add items", new AddItemsService());
// serviceRegistry2.addService("calculate price", new CalculateTotalPriceService());
// serviceRegistry2.addService("remove items", new RemoveItemsService());

// Usage
// shoppingCartManager.handleService("show items", shoppingCart);
// shoppingCartManager.handleService("add items", shoppingCart, pineapple2, apple, apple2, pineapple);
// shoppingCartManager.handleService("show items", shoppingCart);
// shoppingCartManager.handleService("calculate price", shoppingCart);
// shoppingCartManager.handleService("remove items", shoppingCart, pineapple2);
// shoppingCartManager.handleService("show items", shoppingCart);

// 2. Open/Closed principle (OCP)

// Example (OCP):
// Use abstraction to make the code open for extension but closed for modification.

// Abstractions

// Base interface
// interface Shape {
//   getArea(): number;
// }

// // Concrete implementations

// // Rectangle implementation
// class Rectangle implements Shape {
//   constructor(private width: number, private height: number) {}

//   getArea(): number {
//     return this.width * this.height;
//   }
// }

// // Circle implementation
// class Circle implements Shape {
//   constructor(private radius: number) {}

//   getArea(): number {
//     return Math.PI * this.radius * this.radius;
//   }
// }

// // Usage
// const shapes: Shape[] = [
//   new Rectangle(10, 5),
//   new Circle(7),
// ];

// shapes.forEach(shape => {
//   console.log(`Area: ${shape.getArea()}`);
// });

// Exercise 1: Shape Area Calculation
// Problem:
// You have a function that calculates the area of a rectangle. Extend it to calculate the area of different shapes (e.g., circle, triangle) without modifying the existing function.

// Task:

// Add new shapes, such as a Triangle, Trapezoid, and Rhombus, without modifying the existing Shape implementations.

// Solution: OCP

// Abstractions

// Base interface 
interface Shape2 {
  getArea(): number;
}

// Concrete implementations

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

// Create shaper registry class for managing shape lifecycle
class ShapesRegistry {
  private shapes: Map<string, Shape2> = new Map();

  registerShape(name: string, shape: Shape2): void {
    this.shapes.set(name, shape);
  }

  unregisterShape(name: string): void {
    const shape = this.shapes.get(name) as Shape2;

    if (!shape) {
      throw new Error(`${name} does not exist.`);
    }

    if (this.shapes.has(name)) {
      this.shapes.delete(name);
    }
  }

  getShape(name: string): Shape2 {
    return this.shapes.get(name) as Shape2;
  }

  showRegisteredShapes(): void {
    console.log(this.shapes);
  }
}

// Client

// Create manager class using Dependency Injection
class ShapeManger {
  constructor(private registry: ShapesRegistry) {}

  showArea(name: string): void {
    const shape = this.registry.getShape(name);

    if (!shape) {
      throw new Error(`You must provide a shape`);
    }

    console.log(`Area of this ${name} is: ${shape.getArea()}`);
  }
}

// Create shape registry (database of Shape)
// const shapesRegistry = new ShapesRegistry();

// Register shapes
// shapesRegistry.registerShape("triangle", new Triangle(4, 8));
// shapesRegistry.registerShape("trapezoid", new Trapezoid(4, 8, 10));
// shapesRegistry.registerShape("rhombus", new Rhombus(8, 12));

// Create shape managers
// const shapeManager = new ShapeManger(shapesRegistry);

// Usage
// shapeManager.showArea("triangle");
// shapeManager.showArea("trapezoid");
// shapeManager.showArea("rhombus");

// shapesRegistry.showRegisteredShapes();

// const triangle = new Triangle(2, 4);
// const trapezoid = new Trapezoid(4, 6, 8);
// const rhombus = new Rhombus(4, 6);

// console.log(`Triangle area: ${triangle.getArea()}`);
// console.log(`Trapezoid: ${trapezoid.getArea()}`);
// console.log(`Rhombus area: ${rhombus.getArea()}`);

// Example (OCP):

// Use abstraction to allow easy extension.
// Base interface
// interface PaymentProcessor {
//   processPayment(amount: number): void;
// }

// // Concrete implementation

// // Credit Card implementation
// class CreditCardPayment implements PaymentProcessor {
//   processPayment(amount: number): void {
//     console.log(`Processing credit card payment of $${amount}`);
//   }
// }

// // PayPal implementation
// class PayPalPayment implements PaymentProcessor {
//   processPayment(amount: number): void {
//     console.log(`Processing PayPal payment of $${amount}`);
//   }
// }

// // Stripe implementation
// class StripePayment implements PaymentProcessor {
//   processPayment(amount: number): void {
//     console.log(`Processing Stripe payment of $${amount}`);
//   }
// }

// // Usage
// const payments: PaymentProcessor[] = [
//   new CreditCardPayment(),
//   new PayPalPayment(),
//   new StripePayment(),
// ];

// payments.forEach(payment => {
//   payment.processPayment(100);
// });

// Exercise 2: Payment Processing System

// Problem:
// You have a function to process payments via a credit card. Extend it to support other payment methods, like PayPal or Stripe, without altering the original implementation.

// Task:
// Add other payment processors, such as Google Pay, Apple Pay and ABA Pay, without modifying existing payment processors

// Solution: OCP

// Base interface
interface PaymentProcessor2 {
  processPayment(amount: number): void;
}

// Google Pay implementation
class GooglePayment implements PaymentProcessor2 {
  processPayment(amount: number): void {
    console.log(`Processing Google payment of $${amount}`);
  }
}

// ApplePayment implementation
class ApplePayment implements PaymentProcessor2 {
  processPayment(amount: number): void {
    console.log(`Processing Apple payment of $${amount}`);
  }
}

// ABA Pay implementation
class ABAPayment implements PaymentProcessor2 {
  processPayment(amount: number): void {
    console.log(`Processing ABA payment of $${amount}`);
  }
}

// Create a payment registry class for managing payments lifecycle
class PaymentRegistry {
  private processors: Map<string, PaymentProcessor2> = new Map();

  registerPayment(name: string, processor: PaymentProcessor2): void {
    this.processors.set(name, processor);
  }

  unregisterPayment(name: string): void {
    const processor = this.processors.get(name);

    if (!processor) {
      console.error(`${name} payment does not exist.`);
    }

    if (this.processors.get(name)) {
      this.processors.delete(name);
      console.log(`${name} has been removed.`);
    }
  }

  getProcessor(name: string): PaymentProcessor2 {
    return this.processors.get(name) as PaymentProcessor2;
  }

  showPayments(): void {
    console.log(this.processors);
  }
}

// Manager class using Dependency Injection
class PaymentManager {
  constructor(private registry: PaymentRegistry) {}

  processPayment(name: string, amount: number): void {
    const processor = this.registry.getProcessor(name);

    if (!processor) {
      throw new Error(`${name} payment is unknown. Please register the payment.`);
    }

    processor.processPayment(amount);
  }
}

// Create payment registry (database of PaymentProcessors2)
// const paymentRegistry = new PaymentRegistry();

// Register payment method
// paymentRegistry.registerPayment("google pay", new GooglePayment());
// paymentRegistry.registerPayment("apple pay", new ApplePayment());
// paymentRegistry.registerPayment("aba pay", new ABAPayment());

// Create a payment manager with injected services
// const paymentManager = new PaymentManager(paymentRegistry);

// Usage
// paymentManager.processPayment("google pay", 100);
// paymentManager.processPayment("apple pay", 300);
// paymentManager.processPayment("aba pay", 200);

// paymentRegistry.showPayments();
// paymentRegistry.unregisterPayment("apple pay");
// paymentRegistry.showPayments();
// paymentRegistry.unregisterPayment("apple pay");

// 3. Liskov Substitution Principle (LSP)
// LSP states that objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program. In simpler terms, subtypes must be substitutable for their base types.

// LSP violation
// class RectangleNo {
//   width: number;
//   height: number;

//   constructor(width: number, height: number) {
//     this.width = width;
//     this.height = height;
//   }

//   getArea(): number {
//     return this.width * this.height;
//   }
// }

// class Square extends RectangleNo {
//   constructor(side: number) {
//     super(side, side); // This violates LSP
//   }
// }

// In this example, Square inherits from Rectangle, but it violates LSP because a square's width and height are always equal. If we replace a Rectangle with a Square in a function that expects a Rectangle, the behavior might change unexpectedly, as the Square's area calculation might not be what's expected.

// LSP correct implementation
// interface ShapeYes {
//   getArea(): number;
// }

// class RectangleYes implements ShapeYes {
//   width: number;
//   height: number;

//   constructor(width: number, height: number) {
//     this.width = width;
//     this.height = height;
//   }

//   getArea(): number {
//     return this.width * this.height;
//   }
// }

// class SquareYes implements ShapeYes {
//   side: number;

//   constructor(side: number) {
//     this.side = side;
//   }

//   getArea(): number {
//     return this.side * this.side;
//   }
// }

// Here, Rectangle and Square both implement the Shape interface, ensuring that they can be substituted for each other without breaking the code. Both classes have a common getArea() method, and their implementations are consistent with their respective shapes.

// Key Points:

// Subclasses should not weaken the preconditions or strengthen the post-conditions of the base class.
// Subclasses should not throw exceptions that the base class does not.
// Subclasses should preserve the invariant of the base class.

// Exercises1:
// Vehicle Hierarchy:
// Create a base class Vehicle with properties speed and color.
// Create subclasses Car, Motorcycle, and Truck.
// Ensure that all subclasses can be substituted for Vehicle without breaking the code.

// Base class (Abstraction)
class Vehicle {
  constructor(protected speed: number, protected color: string, public id: number) {}

  showInfo(): void {
    console.log(`Speed: ${this.speed}kph, Color: ${this.color}, Id: ${this.id}`);
  }
}

abstract class AbstractVehicleRegistry {
  protected vehicles: Map<number, Vehicle> = new Map();

  abstract registerVehicle(id: number, vehicle: Vehicle): void;
  abstract unregisterVehicle(id: number): void;
  abstract getVehicle(id: number): Vehicle;
  abstract showVehicles(): void;
}

// Concrete implementation (low-level)
class Car extends Vehicle {
  constructor(protected speed: number, protected color: string, public id: number, protected brand: string) {
    super(speed, color, id);
  }

  showInfo(): void {
    console.log(`Car information: ${JSON.stringify(this, null, 2)}`);
  }
}

class Motorcycle extends Vehicle {
  constructor(protected speed: number, protected color: string, public id: number, protected brand: string) {
    super(speed, color, id);
  }

  showInfo(): void {
    console.log(`Motorcycle information: ${JSON.stringify(this, null, 2)}`);
  }
}

class Truck extends Vehicle {
  constructor(protected speed: number, protected color: string, public id: number, protected brand: string) {
    super(speed, color, id);
  }

  showInfo(): void {
    console.log(`Truck information: ${JSON.stringify(this, null, 2)}`);
  }
}

// Vehicle registry for life-cycle management
class VehicleRegistry extends AbstractVehicleRegistry {
  protected vehicles: Map<number, Vehicle> = new Map();

  registerVehicle(id: number, vehicle: Vehicle): void {
    // Check for repeated IDs
   if (id !== vehicle.id) {
      console.error(`Provided id (${id}) must be equal to vehicle's id (${vehicle.id})`);
    }

    this.vehicles.set(id, vehicle);
  }

  unregisterVehicle(id: number): void {
    const vehicle = this.vehicles.get(id) as Vehicle;

    if (!vehicle) {
      console.error(`${id} does not belong to any vehicle`);
    }

    if (this.vehicles.has(id)) {
      this.vehicles.delete(id);
    }
  }

  getVehicle(id: number): Vehicle {
    return this.vehicles.get(id) as Vehicle;
  }

  showVehicles(): void {
    console.log(this.vehicles);
  }
}

// Client (high-level)
class VehicleManager {
  constructor(private registry: AbstractVehicleRegistry) {}

  showInfo(id: number): void {
    const vehicle = this.registry.getVehicle(id);

    if (!vehicle) {
      throw new Error(`${id} is not an id of any vehicles`);
    }
    
    vehicle.showInfo();
  }
}

// // Create vehicle registry manager (database of Vehicle)
// const vehicleRegistry = new VehicleRegistry();

// // Register vehicles
// vehicleRegistry.registerVehicle(12, new Car(120, "red", 12, "Honda"));
// vehicleRegistry.registerVehicle(99, new Motorcycle(90, "black", 99, "Yamaha"));
// vehicleRegistry.registerVehicle(10, new Truck(140, "blue", 10, "Tesla"));

// // Create vehicle managers
// const vehicleManager = new VehicleManager(vehicleRegistry);

// // Usage
// vehicleRegistry.showVehicles();

// vehicleManager.showInfo(12);
// vehicleManager.showInfo(99);
// vehicleManager.showInfo(10);

// Exercise 2:
// Shape Hierarchy:
// Create a base class Shape with a method getArea().
// Create subclasses Circle, Triangle, and Rectangle.
// Ensure that all subclasses can be substituted for Shape without breaking the code.

// Solution 2

// Abstractions
export abstract class ShapeLSP {
  abstract getArea(): number;
}

abstract class AbstractShapeRegistry {
  protected shapeRegistryDatabase: Map<string, ShapeLSP> = new Map();

  abstract create(name: string, shape: ShapeLSP): void;
  abstract read(): void;
  abstract update(name: string, shape: ShapeLSP): void;
  abstract delete(name: string): void;
  abstract getShape(name: string): ShapeLSP;
}

abstract class AbstractShapeManager2 {
  constructor(protected shapeRegistryDatabase: AbstractShapeRegistry) {}

  abstract showArea(name: string): void;
}

abstract class AbstractShapeApplication {
  constructor(
    protected shapeRegistry: AbstractShapeRegistry = new ShapeRegistry2(), 
    protected shapeManager: AbstractShapeManager2 = new ShapeManager2(this.shapeRegistry)) {}

  abstract run(): void;
}

// Concrete implementations (low-level)
class CircleLSP extends ShapeLSP {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    // Area = pi * r^2
    return 3.14 * (this.radius * this.radius);
  }
}

class TriangleLSP extends ShapeLSP {
  constructor(private base: number, private height: number) {
    super();
  }

  getArea(): number {
    // Area = (base * height) / 2
    return (1 / 2) * this.base * this.height;
  }
}

class RectangleLSP extends ShapeLSP {
  constructor(private height: number, private width: number) {
    super();
  }

  getArea(): number {
    // Area = height * width
    return this.height * this.width;
  }
}

// Concrete implementations of shape registry services (low-level)

// Implement a shape services
class ShapeRegistry2 extends AbstractShapeRegistry {
  protected shapeRegistryDatabase: Map<string, ShapeLSP> = new Map();

  create(name: string, shape: ShapeLSP): void {
    if (validateShapeData(name, shape)) {
      this.shapeRegistryDatabase.set(name, shape);
      console.log(`${name} has been created`);
    }
  }

  read(): void {
    if (this.shapeRegistryDatabase.size === 0) {
      throw new Error(`shapes ${errorMessages.EMPTINESS}`);
    } else {
      console.log(...this.shapeRegistryDatabase);
    }    
  }

  update(name: string, shape: ShapeLSP): void {
    // Check for the presence of both of parameters
    if (!name || !shape) {
      throw new Error(`${errorMessages.MISSING_NAME_SERVICE_PARAMETERS}`);
    } 
    else {
      // Delete the old one if it exists
      this.shapeRegistryDatabase.has(name) 
      && this.shapeRegistryDatabase.delete(name);
      // Create the new one with old name, but new value
      this.shapeRegistryDatabase.set(name, shape);
      console.log(`${name} has been updated`);
    } 
  }

  delete(name: string): void {
    if (!this.shapeRegistryDatabase.has(name)) {
      throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
    } 
    else {
      this.shapeRegistryDatabase.delete(name);
      console.log(`${name} has been deleted`);  
    }
  }

  getShape(name: string): ShapeLSP {
    return this.shapeRegistryDatabase.get(name) as ShapeLSP;
  }
}

class ShapeManager2 extends AbstractShapeManager2 {
  constructor(protected shapeRegistryDatabase: AbstractShapeRegistry) {
    super(shapeRegistryDatabase);
  }

  showArea(name: string): void {
    if (!this.shapeRegistryDatabase.getShape(name)) {
      throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
    }

    console.log(this.shapeRegistryDatabase.getShape(name).getArea().toFixed(2));
  }
}

// Implement application of shapes
class ShapeApplication extends AbstractShapeApplication {
  constructor(
    protected shapeRegistry: AbstractShapeRegistry = new ShapeRegistry2(), 
    protected shapeManager: AbstractShapeManager2 = new ShapeManager2(shapeRegistry)) {
    super(shapeRegistry, shapeManager);
  }

  run(): void {
      // Usage
  this.shapeRegistry.create("circle", new CircleLSP(8));
  this.shapeRegistry.create("circle2", new CircleLSP(12));
  this.shapeRegistry.create("circle3", new CircleLSP(3));
  this.shapeRegistry.create("circle4", new CircleLSP(2));
  this.shapeRegistry.read();
  this.shapeRegistry.update("circle2", new CircleLSP(10));
  this.shapeRegistry.read();
  this.shapeRegistry.delete("circle3");
  this.shapeRegistry.read();
  console.log("");

  this.shapeManager.showArea("circle4");
  }
}

// const app = new ShapeApplication();

// app.run();

// 4. Interfaces Segregation Principle(ISP)

// Exercise 1: Device Control System
// Scenario: You are building a system to control different types of devices: printers, scanners, and fax machines. A single Machine interface currently has methods for all three devices:

// interface Machine {
//   print(document: string): void;
//   scan(document: string): void;
//   fax(document: string): void;
// }

// However:
// Printers only need the print method.
// Scanners only need the scan method.
// Fax machines only need the fax method.
// Problem: The current design forces all devices to implement methods they don’t use, violating ISP.

// Task:
// Split the Machine interface into smaller, more focused interfaces.
// Implement classes for each type of device, adhering to the appropriate interface(s).

// Abstractions

export interface Machine {
  start(): void;
  stop(): void;
}

interface IPrinter extends Machine {
  start(): void;
  stop(): void;
  print(document: string): void;
}

interface IScanner extends Machine {
  start(): void;
  stop(): void;
  scan(document: string): void;
}

interface IFax extends Machine {
  start(): void;
  stop(): void;
  fax(document: string): void;
}

interface IAction {
  execute(service: Machine, document: string): void;
}

abstract class AbstractMachineServiceRegistry {
  protected registry: Map<string, Machine> = new Map();

  abstract registerService(name: string, machine: Machine): void;
  abstract deregisterService(name: string, machine: Machine): void;
  abstract getService(name: string): Machine | undefined;
}

abstract class AbstractMachineServiceConsumer {
  constructor(
    protected registry: AbstractMachineServiceRegistry,
    protected action: IAction
  ) {}

  abstract useService(name: string, document: string): void;
}

// Concrete implementations low-level

class PrintAction implements IAction {
  execute(service: Machine, document: string): void {
    if ("print" in service) {
      (service as IPrinter).print(document);
    } else {
      console.log("Service does not support printing");
    }
  }
}

class ScanAction implements IAction {
  execute(service: Machine, document: string): void {
    if ("scan" in service) {
      (service as IScanner).scan(document);
    } else {
      console.log("Service does not support scanning");
    }
  }
}

class FaxAction implements IAction {
  execute(service: Machine, document: string): void {
    if ("fax" in service) {
      (service as IFax).fax(document);
    } else {
      console.log("Service does not support faxing");
    }
  }
}

class Printer implements IPrinter {
  start(): void {
    console.log("Printer is on");
  }

  stop(): void {
    console.log("Printer is off");
  }

  print(document: string): void {
    console.log(`Printing document: ${document}`);
  }
}

class Scanner implements IScanner {
  start(): void {
    console.log("Scanner is on");
  }

  stop(): void {
    console.log("Scanner is off");
  }

  scan(document: string): void {
    console.log(`Scanning document: ${document}`);
  }
}

class Fax implements IFax {
  start(): void {
    console.log("Fax machine is on");
  }

  stop(): void {
    console.log("Fax machine is off");
  }

  fax(document: string): void {
    console.log(`Faxing document: ${document}`);
  }
}

// Machine service registry implementation
class MachineServiceRegistry extends AbstractMachineServiceRegistry {
  protected registry: Map<string, Machine> = new Map();

  registerService(name: string, machine: Machine): void {
    this.registry.set(name, machine);
    console.log(`${name} registered`);
  }

  deregisterService(name: string, machine: Machine): void {
    if (!validateShapeData<string, Machine>(name, machine)) {
      return;
    }

    this.registry.delete(name);
    console.log(`${name} deregistered`);
  }

  getService(name: string): Machine | undefined {

    return this.registry.get(name);
  }
}

// Service Consumer with Decoupled Actions
class MachineServiceConsumer extends AbstractMachineServiceConsumer {
  constructor(
    protected registry: AbstractMachineServiceRegistry,
    protected action: IAction
  ) {
    super(registry, action);
  }

  useService(name: string, document: string): void {
    const service = this.registry.getService(name);

    if (!service) {
      throw new Error(`${name} not found`);
    }

    this.action.execute(service, document);
  }
}

const main = (): void =>  {
// Create machines (food)
const printer = new Printer();
const scanner = new Scanner();
const fax = new Fax();

// create actions (food purpose)
const printAction = new PrintAction();
const scanAction = new ScanAction();
const faxAction = new FaxAction();

// Create service registry (fridge)
const machineServiceRegistry = new MachineServiceRegistry();

// Register machines (label and put food into the fridge)
machineServiceRegistry.registerService("printer", printer);
machineServiceRegistry.registerService("scanner", scanner);
machineServiceRegistry.registerService("fax", fax);

// create machines and actions consumer (take food from the fridge and use(consume) it for different purposes)
const printerServiceConsumer = new MachineServiceConsumer(machineServiceRegistry, printAction);
const scannerServiceConsumer = new MachineServiceConsumer(machineServiceRegistry, scanAction);
const faxServiceConsumer = new MachineServiceConsumer(machineServiceRegistry, faxAction);

// Usage
printerServiceConsumer.useService("printer", "Hello, world!");
scannerServiceConsumer.useService("scanner", "Hello, again!");
faxServiceConsumer.useService("fax", "Hello, world!")
};

main();

// Exercise 2: Animal Behavior System
// Scenario: You are designing a system for animals in a zoo. The system tracks various animal behaviors such as flying, swimming, and walking. A single Animal interface currently looks like this:

// interface Animal {
//   fly(): void;
//   swim(): void;
//   walk(): void;
// }

// Problem:
// Birds can fly and walk but don’t swim.
// Fish can swim but don’t fly or walk.
// Mammals can walk and sometimes swim but don’t fly.
// This design forces all animals to implement behaviors they don’t need, violating ISP.

// Task:
// Refactor the Animal interface to follow ISP.
// Implement classes for Bird, Fish, and Mammal, ensuring each class only implements the methods relevant to its abilities.


