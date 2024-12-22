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
// Registries (high-level)
// Customer service registry (high-level)
class CustomerServiceRegistry extends AbstractCustomerServiceRegistry {
    serviceStorage;
    existenceValidator;
    nameAbsenceValidator;
    storageIsEmptyValidator;
    customerLogger;
    storageLogger;
    constructor(serviceStorage, existenceValidator = new ExistenceValidator(), nameAbsenceValidator = new NameAbsenceValidator(), storageIsEmptyValidator = new StorageIsEmptyValidator(), customerLogger = new CustomerLogger(), storageLogger = new CustomerStorageLogger()) {
        super(serviceStorage, existenceValidator, nameAbsenceValidator, customerLogger, storageLogger);
        this.serviceStorage = serviceStorage;
        this.existenceValidator = existenceValidator;
        this.nameAbsenceValidator = nameAbsenceValidator;
        this.storageIsEmptyValidator = storageIsEmptyValidator;
        this.customerLogger = customerLogger;
        this.storageLogger = storageLogger;
    }
    register(name, service) {
        // Check whether name is absent
        if (this.nameAbsenceValidator.validate(this.serviceStorage, name)) {
            this.serviceStorage.getServices().set(name, service);
            this.customerLogger.log(`'${name}' customer registered successfully`);
        }
    }
    unregister(name) {
        // Check whether name exist
        if (!this.existenceValidator.validate(this.serviceStorage, name)) {
            return;
        }
        this.serviceStorage.getServices().delete(name);
        this.customerLogger.log(`${name} customer unregistered successfully`);
    }
    getService(name) {
        if (!this.existenceValidator.validate(this.serviceStorage, name)) {
            return undefined;
        }
        return this.serviceStorage.getServices().get(name);
    }
    listServices() {
        if (this.storageIsEmptyValidator.validate(this.serviceStorage)) {
            this.customerLogger.log(`Storage ${errorMessages.EMPTINESS}`, "info");
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
    // customerServiceRegistry.unregister("premium");
    customerServiceRegistry.unregister("regular");
    // customerServiceRegistry.unregister("regular2");
    customerServiceRegistry.listServices();
};
class AbstractBirdStorage {
    birds = new Map();
}
class AbstractBirdRegistry {
    birdStorage;
    birdIsAbsentValidator;
    logger;
    constructor(birdStorage, birdIsAbsentValidator, logger) {
        this.birdStorage = birdStorage;
        this.birdIsAbsentValidator = birdIsAbsentValidator;
        this.logger = logger;
    }
}
class AbstractBirdLogger {
    log(message, level = "info", birdStorage) {
        const timeStamp = new Date().toISOString();
        console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
    }
}
// Concrete implementations (low-level)
// Flying birds
class Eagle {
    walk() {
        console.log("Eagle walks on grass");
    }
    fly() {
        console.log("Eagle flies high");
    }
}
class Hawk {
    walk() {
        console.log("Hawk walks on grass");
    }
    fly() {
        console.log("Hawk flies high");
    }
}
// Flightless birds
class Penguin {
    walk() {
        console.log("Penguin walks on ice");
    }
    runOrSwimVeryWell() {
        console.log("Penguin swims swiftly");
    }
}
class Ostrich {
    walk() {
        console.log("Ostrich walks on Savannah grassland");
    }
    runOrSwimVeryWell() {
        console.log("Ostrich runs very fast");
    }
}
// Storage of birds
class BirdStorage extends AbstractBirdStorage {
    // This class inherits "protected birds: Map<string, Bird> = new Map()" from its parent
    getBirds() {
        return this.birds;
    }
}
// Bird registry (high-level)
class BirdRegistry extends AbstractBirdRegistry {
    birdStorage;
    birdIsAbsentValidator;
    logger;
    constructor(birdStorage, birdIsAbsentValidator, logger) {
        super(birdStorage, birdIsAbsentValidator, logger);
        this.birdStorage = birdStorage;
        this.birdIsAbsentValidator = birdIsAbsentValidator;
        this.logger = logger;
    }
    register(name, bird) {
        // Check whether name already exists in the storage
        if (!this.birdIsAbsentValidator.validate(this.birdStorage, name)) {
            this.logger.log(`${name} ${errorMessages.ALREADY_EXIST}`, "error");
            return;
        }
        // Add bird and log message when the above condition does not check
        this.birdStorage.getBirds().set(name, bird);
        this.logger.log(`${name} registered successfully`);
    }
    unregister(name) {
        // Check whether name already exists in the storage
        if (this.birdIsAbsentValidator.validate(this.birdStorage, name)) {
            this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
            return;
        }
        // Delete bird and log a message when the above condition does not check
        this.birdStorage.getBirds().delete(name);
        this.logger.log(`${name} unregistered successfully`);
    }
    getBird(name) {
        if (this.birdIsAbsentValidator.validate(this.birdStorage, name)) {
            this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
            return;
        }
        // Return bird when the above condition does not check
        return this.birdStorage.getBirds().get(name);
    }
    listBirds() {
        (this.birdStorage.getBirds().size !== 0) ? this.logger.log("Storage: ", "info", this.birdStorage)
            : this.logger.log(`Storage ${errorMessages.EMPTINESS}`);
    }
}
// Utility implementations
// Validators
class BirdIsAbsentValidator {
    validate(birdStorage, name) {
        // When a certain bird exists
        if (birdStorage.getBirds().get(name)) {
            return false;
        }
        return true;
    }
}
// Loggers
class RegistryLogger extends AbstractBirdLogger {
}
// Usage
const birdMain = () => {
    const birdRegistry = new BirdRegistry(new BirdStorage(), new BirdIsAbsentValidator(), new RegistryLogger());
    birdRegistry.register("eagle", new Eagle());
    birdRegistry.register("eagle", new Eagle());
    birdRegistry.register("ostrich", new Ostrich());
    birdRegistry.unregister("eele");
    birdRegistry.unregister("eagle");
    birdRegistry.register("eagle", new Eagle());
    const eagle = birdRegistry.getBird("eagle");
    const ostrich = birdRegistry.getBird("ostrich");
    eagle.fly();
    eagle.walk();
    console.log("");
    ostrich.walk();
    ostrich.runOrSwimVeryWell();
    birdRegistry.listBirds();
};
birdMain();
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
