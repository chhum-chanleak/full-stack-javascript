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
    logger;
    constructor(servicesStorage, logger) {
        this.servicesStorage = servicesStorage;
        this.logger = logger;
    }
}
// Concrete implementations (low-level)
// Data related class
class Order extends AbstractOrder {
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
    execute(order, invoiceGenerator, logger) {
        logger.log("Sending email confirmation...");
        logger.log(`Order Confirmation: ${invoiceGenerator.execute(order)}`);
    }
}
// (high-level)
class OrderServiceRegistry extends AbstractOrderServiceRegistry {
    servicesStorage;
    logger;
    constructor(servicesStorage, logger) {
        super(servicesStorage, logger);
        this.servicesStorage = servicesStorage;
        this.logger = logger;
    }
    register(name, service) {
        // Check whether service is already exists
        if (!validateUniqueName(name, this.servicesStorage)) {
            return;
        }
        ;
        this.servicesStorage.getServices().set(name, service);
        this.logger.log(`${name} service registered successfully`);
    }
    unregister(name) {
        // Check whether service exists
        if (!validateExistence(name, this.servicesStorage)) {
            return;
        }
        ;
        this.servicesStorage.getServices().delete(name);
        this.logger.log(`${name} service unregistered successfully`);
    }
    getService(name) {
        // Check whether service exists
        if (!validateExistence(name, this.servicesStorage)) {
            return undefined;
        }
        return this.servicesStorage.getServices().get(name);
    }
    listServices() {
        // Check wether storage is empty
        if (validateEmptiness(this.servicesStorage)) {
            this.logger.log(`Services storage ${errorMessages.EMPTINESS}`);
            return;
        }
        console.log(this.servicesStorage.getServices());
    }
}
// Utilities implementations
export class LoggerService {
    log(message, level = "info") {
        const timeStamp = new Date().toISOString();
        console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
    }
}
// Usage
const orderMain = () => {
    const order = new Order();
    order.addItem("apple", 10);
    order.addItem("banana", 20);
    const orderServiceRegistry = new OrderServiceRegistry(new OrderServicesStorage(), new LoggerService());
    orderServiceRegistry.listServices();
    orderServiceRegistry.register("email confirmation", new EmailConfirmation());
    orderServiceRegistry.register("email confirmation", new EmailConfirmation());
    orderServiceRegistry.register("invoice generator", new InvoiceGenerator());
    orderServiceRegistry.register("email confirmation2", new EmailConfirmation());
    orderServiceRegistry.unregister("email confirmation2");
    orderServiceRegistry.unregister("email confirmation2");
    const emailConfirmation = orderServiceRegistry.getService("email confirmation");
    const invoiceGenerator = orderServiceRegistry.getService("invoice generator");
    emailConfirmation.execute(order, new InvoiceGenerator(), new LoggerService());
    orderServiceRegistry.listServices();
};
class AbstractCustomerServiceStorage {
    services = new Map();
}
class AbstractCustomerServiceRegistry {
    serviceStorage;
    existenceValidator;
    nameAbsenceValidator;
    logger;
    storageLogger;
    constructor(serviceStorage, existenceValidator = new ExistenceValidator(), nameAbsenceValidator = new NameAbsenceValidator(), logger = new CustomerLogger(), storageLogger = new CustomerStorageLogger()) {
        this.serviceStorage = serviceStorage;
        this.existenceValidator = existenceValidator;
        this.nameAbsenceValidator = nameAbsenceValidator;
        this.logger = logger;
        this.storageLogger = storageLogger;
    }
}
class AbstractCustomerValidatorStorage {
    validators = new Map();
}
// Concrete implementations (low-level)
// Customer concrete implementations
class RegularCustomer {
    discountPercentage = 0.1;
    getDiscountPercentage() {
        return this.discountPercentage;
    }
}
class PremiumCustomer {
    discountPercentage = 0.2;
    getDiscountPercentage() {
        return this.discountPercentage;
    }
}
// Utility concrete implementations
// Logger
class CustomerLogger {
    log(message, level = "info") {
        const timeStamp = new Date().toISOString();
        console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
    }
}
class CustomerStorageLogger {
    log(message, level, serviceStorage) {
        const timeStamp = new Date().toISOString();
        console[level](`${timeStamp} ${level.toUpperCase()}: ${message}:`, serviceStorage.getServices());
    }
}
// Validators
class ExistenceValidator {
    logger;
    constructor(logger = new CustomerLogger()) {
        this.logger = logger;
    }
    validate(serviceStorage, name) {
        // Check whether name is undefined
        try {
            if (!name || !serviceStorage) {
                throw new Error(`${errorMessages.PARAMETERS_NAME_SERVICE_STORAGE_REQUIRED}`);
            }
        }
        catch (error) {
            this.logger.log(`${error.message}`, "error", serviceStorage);
        }
        try {
            if (!serviceStorage.getServices().has(name)) {
                throw new Error(`'${name}' ${errorMessages.NO_EXISTENCE}`);
            }
        }
        catch (error) {
            this.logger.log(`${error.message}`, "error");
            return false;
        }
        return true;
    }
}
class NameAbsenceValidator {
    logger;
    constructor(logger = new CustomerLogger()) {
        this.logger = logger;
    }
    validate(serviceStorage, name) {
        // Check whether name is undefined
        try {
            if (!name || !serviceStorage) {
                throw new Error(`${errorMessages.PARAMETERS_NAME_SERVICE_STORAGE_REQUIRED}`);
            }
        }
        catch (error) {
            this.logger.log(`${error.message}`, "error", serviceStorage);
        }
        try {
            if (serviceStorage.getServices().has(name)) {
                throw new Error(`'${name}' ${errorMessages.ALREADY_EXIST}`);
            }
        }
        catch (error) {
            this.logger.log(`${error.message}`, "error");
            return false;
        }
        return true;
    }
}
class StorageIsEmptyValidator {
    validate(serviceStorage) {
        if (serviceStorage.getServices().size !== 0) {
            return false;
        }
        return true;
    }
}
// Data storage implementations
// Customer service storage
class CustomerServiceStorage extends AbstractCustomerServiceStorage {
    // This class inherits "validators: Map<string, ICustomerValidator> = new Map()" from its parents
    getServices() {
        return this.services;
    }
}
// Customer validator storage
class CustomerValidatorStorage extends AbstractCustomerValidatorStorage {
    // This class inherits "validators: Map<string, ICustomerValidator> = new Map()" from its parents
    getValidators() {
        return this.validators;
    }
}
// Registries (high-level)
// Customer service registry (high-level)
class CustomerServiceRegistry extends AbstractCustomerServiceRegistry {
    serviceStorage;
    existenceValidator;
    nameAbsenceValidator;
    storageIsEmptyValidator;
    logger;
    storageLogger;
    constructor(serviceStorage, existenceValidator = new ExistenceValidator(), nameAbsenceValidator = new NameAbsenceValidator(), storageIsEmptyValidator = new StorageIsEmptyValidator(), logger = new CustomerLogger(), storageLogger = new CustomerStorageLogger()) {
        super(serviceStorage, existenceValidator, nameAbsenceValidator, logger, storageLogger);
        this.serviceStorage = serviceStorage;
        this.existenceValidator = existenceValidator;
        this.nameAbsenceValidator = nameAbsenceValidator;
        this.storageIsEmptyValidator = storageIsEmptyValidator;
        this.logger = logger;
        this.storageLogger = storageLogger;
    }
    register(name, service) {
        // Check whether name is absent
        if (this.nameAbsenceValidator.validate(this.serviceStorage, name)) {
            this.serviceStorage.getServices().set(name, service);
            this.logger.log(`'${name}' customer registered successfully`);
        }
    }
    unregister(name) {
        // Check whether name exist
        if (!this.existenceValidator.validate(this.serviceStorage, name)) {
            return;
        }
        this.serviceStorage.getServices().delete(name);
        this.logger.log(`${name} customer unregistered successfully`);
    }
    getService(name) {
        if (!this.existenceValidator.validate(this.serviceStorage, name)) {
            return undefined;
        }
        return this.serviceStorage.getServices().get(name);
    }
    listServices() {
        if (this.storageIsEmptyValidator.validate(this.serviceStorage)) {
            this.logger.log(`Storage ${errorMessages.EMPTINESS}`, "info");
            return;
        }
        this.storageLogger.log("", "info", this.serviceStorage);
    }
}
// Usage
const customerMain = () => {
    const customerServiceRegistry = new CustomerServiceRegistry(new CustomerServiceStorage());
    customerServiceRegistry.register("regular2", new RegularCustomer());
    customerServiceRegistry.register("regular", new RegularCustomer());
    customerServiceRegistry.register("premium", new PremiumCustomer());
    // customerServiceRegistry.register("premium", new PremiumCustomer());
    // customerServiceRegistry.register("regular", new RegularCustomer());
    customerServiceRegistry.unregister("premium");
    customerServiceRegistry.unregister("premium");
    customerServiceRegistry.unregister("regular");
    // customerServiceRegistry.unregister("regular2");
    customerServiceRegistry.listServices();
};
customerMain();
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
