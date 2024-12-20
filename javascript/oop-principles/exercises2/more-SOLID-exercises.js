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
// Client
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
// Client
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
// Client
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
    speed;
    color;
    id;
    constructor(speed, color, id) {
        this.speed = speed;
        this.color = color;
        this.id = id;
    }
    showInfo() {
        console.log(`Speed: ${this.speed}kph, Color: ${this.color}, Id: ${this.id}`);
    }
}
class AbstractVehicleRegistry {
    vehicles = new Map();
}
// Concrete implementation (low-level)
class Car extends Vehicle {
    speed;
    color;
    id;
    brand;
    constructor(speed, color, id, brand) {
        super(speed, color, id);
        this.speed = speed;
        this.color = color;
        this.id = id;
        this.brand = brand;
    }
    showInfo() {
        console.log(`Car information: ${JSON.stringify(this, null, 2)}`);
    }
}
class Motorcycle extends Vehicle {
    speed;
    color;
    id;
    brand;
    constructor(speed, color, id, brand) {
        super(speed, color, id);
        this.speed = speed;
        this.color = color;
        this.id = id;
        this.brand = brand;
    }
    showInfo() {
        console.log(`Motorcycle information: ${JSON.stringify(this, null, 2)}`);
    }
}
class Truck extends Vehicle {
    speed;
    color;
    id;
    brand;
    constructor(speed, color, id, brand) {
        super(speed, color, id);
        this.speed = speed;
        this.color = color;
        this.id = id;
        this.brand = brand;
    }
    showInfo() {
        console.log(`Truck information: ${JSON.stringify(this, null, 2)}`);
    }
}
// Vehicle registry for life-cycle management
class VehicleRegistry extends AbstractVehicleRegistry {
    vehicles = new Map();
    registerVehicle(id, vehicle) {
        // Check for repeated IDs
        if (id !== vehicle.id) {
            console.error(`Provided id (${id}) must be equal to vehicle's id (${vehicle.id})`);
        }
        this.vehicles.set(id, vehicle);
    }
    unregisterVehicle(id) {
        const vehicle = this.vehicles.get(id);
        if (!vehicle) {
            console.error(`${id} does not belong to any vehicle`);
        }
        if (this.vehicles.has(id)) {
            this.vehicles.delete(id);
        }
    }
    getVehicle(id) {
        return this.vehicles.get(id);
    }
    showVehicles() {
        console.log(this.vehicles);
    }
}
// Client (high-level)
class VehicleManager {
    registry;
    constructor(registry) {
        this.registry = registry;
    }
    showInfo(id) {
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
export class ShapeLSP {
}
class AbstractShapeRegistry {
    shapeRegistryDatabase = new Map();
}
class AbstractShapeManager2 {
    shapeRegistryDatabase;
    constructor(shapeRegistryDatabase) {
        this.shapeRegistryDatabase = shapeRegistryDatabase;
    }
}
class AbstractShapeApplication {
    shapeRegistry;
    shapeManager;
    constructor(shapeRegistry = new ShapeRegistry2(), shapeManager = new ShapeManager2(this.shapeRegistry)) {
        this.shapeRegistry = shapeRegistry;
        this.shapeManager = shapeManager;
    }
}
// Concrete implementations (low-level)
class CircleLSP extends ShapeLSP {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    getArea() {
        // Area = pi * r^2
        return 3.14 * (this.radius * this.radius);
    }
}
class TriangleLSP extends ShapeLSP {
    base;
    height;
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }
    getArea() {
        // Area = (base * height) / 2
        return (1 / 2) * this.base * this.height;
    }
}
class RectangleLSP extends ShapeLSP {
    height;
    width;
    constructor(height, width) {
        super();
        this.height = height;
        this.width = width;
    }
    getArea() {
        // Area = height * width
        return this.height * this.width;
    }
}
// Concrete implementations of shape registry services (low-level)
// Implement a shape services
class ShapeRegistry2 extends AbstractShapeRegistry {
    shapeRegistryDatabase = new Map();
    create(name, shape) {
        if (validateShapeData(name, shape)) {
            this.shapeRegistryDatabase.set(name, shape);
            console.log(`${name} has been created`);
        }
    }
    read() {
        if (this.shapeRegistryDatabase.size === 0) {
            throw new Error(`shapes ${errorMessages.EMPTINESS}`);
        }
        else {
            console.log(...this.shapeRegistryDatabase);
        }
    }
    update(name, shape) {
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
    delete(name) {
        if (!this.shapeRegistryDatabase.has(name)) {
            throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
        else {
            this.shapeRegistryDatabase.delete(name);
            console.log(`${name} has been deleted`);
        }
    }
    getShape(name) {
        return this.shapeRegistryDatabase.get(name);
    }
}
class ShapeManager2 extends AbstractShapeManager2 {
    shapeRegistryDatabase;
    constructor(shapeRegistryDatabase) {
        super(shapeRegistryDatabase);
        this.shapeRegistryDatabase = shapeRegistryDatabase;
    }
    showArea(name) {
        if (!this.shapeRegistryDatabase.getShape(name)) {
            throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
        console.log(this.shapeRegistryDatabase.getShape(name).getArea().toFixed(2));
    }
}
// Implement application of shapes
class ShapeApplication extends AbstractShapeApplication {
    shapeRegistry;
    shapeManager;
    constructor(shapeRegistry = new ShapeRegistry2(), shapeManager = new ShapeManager2(shapeRegistry)) {
        super(shapeRegistry, shapeManager);
        this.shapeRegistry = shapeRegistry;
        this.shapeManager = shapeManager;
    }
    run() {
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
class AbstractMachineServiceRegistry {
    registry = new Map();
}
class AbstractMachineServiceConsumer {
    registry;
    action;
    constructor(registry, action) {
        this.registry = registry;
        this.action = action;
    }
}
// Concrete implementations low-level
class PrintAction {
    execute(service, document) {
        if ("print" in service) {
            service.print(document);
        }
        else {
            console.log("Service does not support printing");
        }
    }
}
class ScanAction {
    execute(service, document) {
        if ("scan" in service) {
            service.scan(document);
        }
        else {
            console.log("Service does not support scanning");
        }
    }
}
class FaxAction {
    execute(service, document) {
        if ("fax" in service) {
            service.fax(document);
        }
        else {
            console.log("Service does not support faxing");
        }
    }
}
class Printer {
    start() {
        console.log("Printer is on");
    }
    stop() {
        console.log("Printer is off");
    }
    print(document) {
        console.log(`Printing document: ${document}`);
    }
}
class Scanner {
    start() {
        console.log("Scanner is on");
    }
    stop() {
        console.log("Scanner is off");
    }
    scan(document) {
        console.log(`Scanning document: ${document}`);
    }
}
class Fax {
    start() {
        console.log("Fax machine is on");
    }
    stop() {
        console.log("Fax machine is off");
    }
    fax(document) {
        console.log(`Faxing document: ${document}`);
    }
}
// Machine service registry implementation
class MachineServiceRegistry extends AbstractMachineServiceRegistry {
    registry = new Map();
    registerService(name, machine) {
        this.registry.set(name, machine);
        console.log(`${name} registered`);
    }
    deregisterService(name, machine) {
        if (!validateShapeData(name, machine)) {
            return;
        }
        this.registry.delete(name);
        console.log(`${name} deregistered`);
    }
    getService(name) {
        return this.registry.get(name);
    }
}
// Service Consumer with Decoupled Actions
class MachineServiceConsumer extends AbstractMachineServiceConsumer {
    registry;
    action;
    constructor(registry, action) {
        super(registry, action);
        this.registry = registry;
        this.action = action;
    }
    useService(name, document) {
        const service = this.registry.getService(name);
        if (!service) {
            throw new Error(`${name} not found`);
        }
        service.start();
        this.action.execute(service, document);
        service.stop();
    }
}
class AbstractRegistryStorage {
    registry = new Map();
}
class AbstractAnimalServiceRegistry {
}
// Concrete implementations (low-level) or (details)
class Tiger {
    eat() {
        console.log("Tiger eating.");
    }
    walk() {
        console.log("Tiger walking");
    }
    swim() {
        console.log("Tiger swimming");
    }
}
class Eagle {
    eat() {
        console.log("Eagle eating");
    }
    walk() {
        console.log("Eagle walking");
    }
    fly() {
        console.log("Eagle flying");
    }
}
// Storage implementation
class RegistryStorage extends AbstractRegistryStorage {
    // This class inherits "protected registry: Map<string, Animal> = new Map()" from abstract class AbstractRegistryStorage 
    register(name, animal) {
        if (this.registry.has(name)) {
            throw new Error(`${name} ${errorMessages.ALREADY_EXIST}`);
        }
        else {
            this.registry.set(name, animal);
            console.log(`${name} registered successful`);
        }
    }
    deregister(name) {
        if (!this.registry.has(name)) {
            throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
        else {
            this.registry.delete(name);
        }
    }
    getService(name) {
        const service = this.registry.get(name);
        if (!service) {
            console.log(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
        else {
            return service;
        }
    }
    readRegistry() {
        if (this.registry.size === 0) {
            console.log(`Registry ${errorMessages.EMPTINESS}`);
        }
        for (const [key, value] of this.registry.entries()) {
            console.log(`${key}: ${JSON.stringify(value)}`);
        }
    }
}
// Animal service registry (high-level)
class AnimalServiceRegistry extends AbstractAnimalServiceRegistry {
    registry;
    constructor(registry) {
        super();
        this.registry = registry;
    }
    register(name, animal) {
        this.registry.register(name, animal);
    }
    deregister(name) {
        this.registry.deregister(name);
        console.log(`${name} deregistered successfully`);
    }
    getService(name) {
        const service = this.registry.getService(name);
        if (!service) {
            throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
        else {
            return service;
        }
    }
    readRegistry() {
        this.registry.readRegistry();
    }
}
const mainISP2 = () => {
    const animalRegistry = new AnimalServiceRegistry(new RegistryStorage());
    animalRegistry.register("bengal tiger", new Tiger());
    animalRegistry.register("bald eagle", new Eagle());
    animalRegistry.register("harpy eagle", new Eagle());
    animalRegistry.deregister("bald eagle");
    animalRegistry.register("bald eagle2", new Eagle());
    const bengalTiger = animalRegistry.getService("bengal tiger");
    const harpyEagle = animalRegistry.getService("harpy eagle");
    // const baldEagle = animalRegistry.getService("bald eagle") as Eagle; // Error does not exist
    animalRegistry.readRegistry();
    bengalTiger.walk();
    harpyEagle.fly();
    const baldEagle2 = animalRegistry.getService("bald eagle2");
    animalRegistry.readRegistry();
};
// Low-level module: EmailNotifier
class EmailNotifier {
    send(message, recipient) {
        console.log(`Email sent to ${recipient}: ${message}`);
    }
}
// Low-level module: SMSNotifier
class SMSNotifier {
    send(message, recipient) {
        console.log(`SMS sent to ${recipient}: ${message}`);
    }
}
// High-level module
class NotificationService {
    notifier;
    constructor(notifier) {
        this.notifier = notifier;
    }
    notify(message, recipient) {
        this.notifier.send(message, recipient);
    }
}
// Low-level module: PayPal
class PayPalProcessor3 {
    processPayment(amount) {
        console.log(`Processing PayPal payment of $${amount}`);
    }
}
// Low-level module: Stripe
class StripeProcessor3 {
    processPayment(amount) {
        console.log(`Processing Stripe payment of $${amount}`);
    }
}
// High-level module
class ShoppingCart3 {
    paymentProcessor;
    constructor(paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }
    checkout(amount) {
        console.log("Checking out...");
        this.paymentProcessor.processPayment(amount);
    }
}
class AbstractVehicleStorage {
    vehicles = new Map();
}
class AbstractVehicleStorageLogger {
}
// Validators implementations
class AbstractVehicleStorageValidators {
}
// Concrete implementations (low-level) 
class Car3 {
    year;
    constructor(year) {
        this.year = year;
    }
    start() {
        console.log("Car starts the machine");
    }
    stop() {
        console.log("Car stops the machine");
    }
}
class Bike3 {
    year;
    constructor(year) {
        this.year = year;
    }
    start() {
        console.log("Bike starts moving forward");
    }
    stop() {
        console.log("Bike stops moving");
    }
}
class VehicleStorage extends AbstractVehicleStorage {
    // This class inherits "protected vehicles: Map<string, IVehicle3>" from its parent class
    getVehicles() {
        return this.vehicles;
    }
}
class VehicleController {
    vehiclesStorage;
    logger;
    validators;
    constructor(vehiclesStorage = new VehicleStorage(), logger = new VehicleStorageLogger(), validators = new VehicleStorageValidators()) {
        this.vehiclesStorage = vehiclesStorage;
        this.logger = logger;
        this.validators = validators;
    }
    register(name, vehicle) {
        this.validators.validateUniqueVehicle(name, this.vehiclesStorage.getVehicles());
        this.validators.validateEmptyString(name);
        this.vehiclesStorage.getVehicles().set(name, vehicle);
        console.log(`${name} registered successfully`);
    }
    getVehicle(name) {
        this.validators.validateExistence(name, this.vehiclesStorage.getVehicles());
        return this.vehiclesStorage.getVehicles().get(name);
    }
    readStorage() {
        this.logger.logStorage(this.vehiclesStorage.getVehicles());
    }
}
class VehicleStorageLogger extends AbstractVehicleStorageLogger {
    logStorage(vehiclesStorage) {
        if (vehiclesStorage.size === 0) {
            console.log("Storage is empty");
            return;
        }
        for (const [key, value] of vehiclesStorage.entries()) {
            console.log(`${key}:`);
            console.log(`Type: ${value.constructor.name}`);
        }
    }
}
class VehicleStorageValidators extends AbstractVehicleStorageValidators {
    validateUniqueVehicle(name, vehiclesStorage) {
        // Check whether it already exist
        if (vehiclesStorage.has(name)) {
            throw new Error(`${name} ${errorMessages.ALREADY_EXIST}`);
        }
        return true;
    }
    // Check whether the name is an empty string
    validateEmptyString(name) {
        if (name.length === 0) {
            throw new Error(`Name ${errorMessages.CANNOT_BE_AN_EMPTY_STRING}`);
        }
        return true;
    }
    // Check for existence
    validateExistence(name, vehiclesStorage) {
        // Check whether it exist or not
        if (!vehiclesStorage.has(name)) {
            throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
        return true;
    }
}
// Usage
const dip1Main = () => {
    const vehicleController = new VehicleController();
    vehicleController.register("bmw", new Car3(1990));
    vehicleController.register("yamaha bike", new Bike3(2012));
    // vehicleController.register("", new Bike3(2013)); // Error: "cannot be an empty string"
    // vehicleController.register("bmw", new Car3(2015)); // Error: already exist
    const bmw = vehicleController.getVehicle("bmw");
    const racingBike = vehicleController.getVehicle("yamaha bike");
    // const volkswagen = vehicleController.getVehicle("volkswagen") as Car3; // Error: does not exist
    bmw.start();
    racingBike.stop();
    vehicleController.readStorage();
};
class AbstractLogServiceStorage {
    logs = new Map();
}
// Concrete implementations (low-level)
class ConsoleLogger {
    log(message) {
        console.log(`Console logs: ${message}`);
    }
}
class FileLogger {
    log(message) {
        console.log(`File logs: ${message}`);
    }
}
// Data related implementation
class LogServiceStorage extends AbstractLogServiceStorage {
    // This class inherits "protected logStorage: Map<string, ILogger2> = new Map()" from its parent class
    getLogs() {
        return this.logs;
    }
}
class LogServiceStorageLogger {
    log(logs) {
        if (logs.size === 0) {
            console.error(`Storage ${errorMessages.EMPTINESS}`);
            return;
        }
        for (const [key, value] of logs.entries()) {
            console.log(`${key}:`);
            console.log(`${value.constructor.name}`);
        }
    }
}
// log services (high-level)
class LogService {
    logStorage;
    logger;
    constructor(logStorage, logger) {
        this.logStorage = logStorage;
        this.logger = logger;
    }
    register(name, log) {
        if (this.logStorage.getLogs().has(name)) {
            throw new Error(`${name} ${errorMessages.ALREADY_EXIST}`);
        }
        this.logStorage.getLogs().set(name, log);
        console.log(`${name} registered successfully`);
    }
    deregister(name) {
        if (!this.logStorage.getLogs().has(name)) {
            throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
        this.logStorage.getLogs().delete(name);
        console.log(`${name} deregistered successfully`);
    }
    getLog(name) {
        if (!this.logStorage.getLogs().has(name)) {
            throw new Error(`${name} ${errorMessages.NO_EXISTENCE}`);
        }
        return this.logStorage.getLogs().get(name);
    }
    readLog() {
        this.logger.log(this.logStorage.getLogs());
    }
}
// Usage
const dip2Main = () => {
    const logService = new LogService(new LogServiceStorage(), new LogServiceStorageLogger());
    logService.register("console", new ConsoleLogger());
    logService.register("file", new FileLogger());
    const consoleLogger = logService.getLog("console");
    const fileLogger = logService.getLog("file");
    logService.readLog();
    const logger = prompt("console or file? : ");
    (logger === "console") ? consoleLogger.log("Hello, console!") :
        (logger === "file") ? fileLogger.log("Hello, file!") :
            console.log("Unknown logger");
    logService.readLog();
};
dip2Main();
