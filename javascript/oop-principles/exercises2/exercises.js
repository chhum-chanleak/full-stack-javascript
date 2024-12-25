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
        const birds = this.birdStorage.getBirds();
        this.logger.log("List of all birds:");
        birds.forEach((key, value) => {
            console.log(`Key: ${JSON.stringify(key)}`);
            console.log(`Value: ${JSON.stringify(value)}`);
        });
        // Space for readability
        console.log("");
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
class AbstractCar {
    manufacturer;
    constructor(manufacturer) {
        this.manufacturer = manufacturer;
    }
}
class AbstractElectricScooter {
    manufacturer;
    constructor(manufacturer) {
        this.manufacturer = manufacturer;
    }
}
// Machine storage abstraction
class AbstractMachineStorage {
    machines = new Map();
}
// Service(Machine) registry abstraction
class AbstractMachineRegistry {
    machineStorage;
    constructor(machineStorage) {
        this.machineStorage = machineStorage;
    }
}
// Concrete implementations (low-level)
class Car extends AbstractCar {
    manufacturer;
    logger;
    constructor(manufacturer, logger) {
        super(manufacturer);
        this.manufacturer = manufacturer;
        this.logger = logger;
    }
    start() {
        this.logger.log("Car starts moving");
    }
    stop() {
        this.logger.log("Car has stopped");
    }
    refuel() {
        this.logger.log("Car is refueling diesel/gasoline");
    }
}
class ElectricScooter extends AbstractElectricScooter {
    manufacturer;
    logger;
    constructor(manufacturer, logger) {
        super(manufacturer);
        this.manufacturer = manufacturer;
        this.logger = logger;
    }
    start() {
        this.logger.log("Scooter starts moving");
    }
    stop() {
        this.logger.log("Scooter has stopped");
    }
    chargeBattery() {
        this.logger.log("Scooter is recharging power");
    }
}
// Service(Machines) storage
class MachineStorage extends AbstractMachineStorage {
    // This class inherit "protected machines: Map<string, IMachine> = new Map()" from its parent
    getMachines() {
        return this.machines;
    }
}
// Service(Machine) registry (high-level)
class MachineRegistry extends AbstractMachineRegistry {
    machineStorage;
    nameIsAbsentValidator;
    emptyStorageValidator;
    logger;
    constructor(machineStorage, nameIsAbsentValidator, emptyStorageValidator, logger) {
        super(machineStorage);
        this.machineStorage = machineStorage;
        this.nameIsAbsentValidator = nameIsAbsentValidator;
        this.emptyStorageValidator = emptyStorageValidator;
        this.logger = logger;
    }
    register(name, machine) {
        // Check whether passed name exists and return if it does throw an error message
        if (!this.nameIsAbsentValidator.validate(name, this.machineStorage)) {
            this.logger.log(`${name} ${errorMessages.ALREADY_EXIST}`, "error");
            return;
        }
        // Execute this when passed name does not exist
        this.machineStorage.getMachines().set(name, machine);
        this.logger.log(`${name} registered successfully`);
    }
    unregister(name) {
        // When passed name does not exist, then throw an error message
        if (this.nameIsAbsentValidator.validate(name, this.machineStorage)) {
            this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
            return;
        }
        // Execute this when passed name exists
        this.machineStorage.getMachines().delete(name);
        this.logger.log(`${name} unregistered from the storage`);
    }
    // Return abstraction (IMachine) or undefined. So use type assertion when you want to return any concrete of IMachine
    getMachine(name) {
        // When passed name does not exist, then throw an error message
        if (this.nameIsAbsentValidator.validate(name, this.machineStorage)) {
            this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
            return undefined;
        }
        // Execute this when passed name exists
        return this.machineStorage.getMachines().get(name);
    }
    listMachines() {
        const machines = this.machineStorage.getMachines();
        if (this.emptyStorageValidator.validate("", this.machineStorage)) {
            this.logger.log(`Storage ${errorMessages.EMPTINESS}`, "error");
            return;
        }
        this.logger.log("List of machines: ");
        for (const [key, value] of machines.entries()) {
            this.logger.log(`Key: ${JSON.stringify(key, null, 2)} Value: ${JSON.stringify(value.constructor.name, null, 2)}`);
        }
    }
}
// Utility implementations
// Machine logger implementations
class MachineRegistryLogger {
    logLevelValidator;
    constructor(logLevelValidator = new InvalidLevelValidator()) {
        this.logLevelValidator = logLevelValidator;
    }
    log(message, level = "info") {
        const timeStamp = new Date().toISOString();
        if (!this.logLevelValidator.validate(level)) {
            console.error(`${timeStamp} Error: Invalid log level`);
            return;
        }
        console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
    }
}
// Machine validator implementations
class NameIsAbsentValidator {
    validate(name, machineStorage) {
        // Return false when a certain machine exists
        if (machineStorage.getMachines().has(name)) {
            return false;
        }
        // Return true otherwise
        return true;
    }
}
class EmptyStorageValidator {
    validate(name = "", machineStorage) {
        if (machineStorage.getMachines().size !== 0) {
            return false;
        }
        return true;
    }
}
class InvalidLevelValidator {
    validate(level) {
        if (!["info", "warn", "error", "debug"].includes(level)) {
            return false;
        }
        return true;
    }
}
// Usage
const carMain = () => {
    const machineRegistry = new MachineRegistry(new MachineStorage(), new NameIsAbsentValidator(), new EmptyStorageValidator(), new MachineRegistryLogger());
    machineRegistry.register("toyota prius", new Car("toyota", new MachineRegistryLogger));
    machineRegistry.register("toyota prius2", new Car("toyota", new MachineRegistryLogger));
    machineRegistry.register("hybrid scooter", new ElectricScooter("Baidu", new MachineRegistryLogger));
    machineRegistry.register("hybrid scooter", new ElectricScooter("Baidu", new MachineRegistryLogger));
    machineRegistry.unregister("toyota prius2");
    // machineRegistry.unregister("toyota prius2");
    const toyotaPrius = machineRegistry.getMachine("toyota prius");
    const hybridScooter = machineRegistry.getMachine("hybrid scooter");
    toyotaPrius.start();
    toyotaPrius.stop();
    toyotaPrius.refuel();
    hybridScooter.start();
    hybridScooter.stop();
    hybridScooter.chargeBattery();
    machineRegistry.listMachines();
};
// Notifier storage
class AbstractNotifierStorage {
    notifiers = new Map();
}
// Notifier registry
class AbstractNotifierRegistry {
    notifierStorage;
    constructor(notifierStorage) {
        this.notifierStorage = notifierStorage;
    }
}
// Concrete implementations (low-level)
class EmailNotification {
    logger = new NotificationLogger();
    notify() {
        this.logger.log(`Sending email notification...`);
    }
}
class SMSNotification {
    logger = new NotificationLogger();
    notify() {
        this.logger.log(`Sending SMS notification...`);
    }
}
// Notifier storage
class NotifierStorage extends AbstractNotifierStorage {
    // This class inherits "protected notifiers: Map<string, INotifier> = new Map()" from its parent
    getNotifiers() {
        return this.notifiers;
    }
}
// Notifier registry
class NotifierRegistry extends AbstractNotifierRegistry {
    notifierStorage;
    nameExistsValidator;
    logger;
    notificationStorageIsEmptyValidator;
    constructor(notifierStorage, nameExistsValidator = new NameExistsValidator(), logger = new NotificationLogger(), notificationStorageIsEmptyValidator = new NotifierStorageIsEmptyValidator()) {
        super(notifierStorage);
        this.notifierStorage = notifierStorage;
        this.nameExistsValidator = nameExistsValidator;
        this.logger = logger;
        this.notificationStorageIsEmptyValidator = notificationStorageIsEmptyValidator;
    }
    register(name, notifier) {
        // Check whether passed name exists, if it does, then log an error message
        if (this.nameExistsValidator.validate(name, this.notifierStorage)) {
            this.logger.log(`${name} ${errorMessages.ALREADY_EXIST}`, "error");
            return;
        }
        this.notifierStorage.getNotifiers().set(name, notifier);
        this.logger.log(`${name} registered successfully`);
    }
    unregister(name) {
        // Check whether passed name exists, if it does not, then then log an error message
        if (!this.nameExistsValidator.validate(name, this.notifierStorage)) {
            this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
            return;
        }
        this.notifierStorage.getNotifiers().delete(name);
        this.logger.log(`${name} unregistered successfully`);
    }
    // Use type assertion when call this method, since it only returns the abstraction of the low-level.
    // Example: const emailNotification = 
    getNotifier(name) {
        // Check whether passed name exists, if it does not, then then log an error message
        if (!this.nameExistsValidator.validate(name, this.notifierStorage)) {
            this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
            return undefined;
        }
        return this.notifierStorage.getNotifiers().get(name);
    }
    listNotifiers() {
        // Check whether the storage is empty, then throw a warning message if it is
        if (this.notificationStorageIsEmptyValidator.validate(this.notifierStorage)) {
            this.logger.log(`Storage ${errorMessages.EMPTINESS}`, "warn");
            return;
        }
        const notifiers = this.notifierStorage.getNotifiers();
        console.log("");
        this.logger.log("List of notifiers: ");
        for (const [key, value] of notifiers.entries()) {
            console.log(`Key: ${key}, Value: ${value.constructor.name}`);
        }
    }
}
// Utility implementations
// Logger
class NotificationLogger {
    levelValidator = new NotificationLevelValidator();
    log(message, level = "info") {
        // Check whether passed level is valid
        if (!this.levelValidator.validate(level)) {
            console.error(`${level} is a invalid level`);
            return;
        }
        const timeStamp = new Date().toISOString();
        console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
    }
}
// Validators
class NotificationLevelValidator {
    validate(level) {
        // Check whether passed level is valid
        if (!["info", "warn", "debug", "error"].includes(level)) {
            return false;
        }
        return true;
    }
}
class NameExistsValidator {
    validate(name, notifierStorage) {
        // Check whether passed name exists
        if (!notifierStorage.getNotifiers().has(name)) {
            return false;
        }
        return true;
    }
}
class NotifierStorageIsEmptyValidator {
    validate(notifierStorage) {
        // Check whether the storage is empty
        if (notifierStorage.getNotifiers().size !== 0) {
            return false;
        }
        return true;
    }
}
// Usage
const notifierMain = () => {
    const notifierRegistry = new NotifierRegistry(new NotifierStorage());
    notifierRegistry.listNotifiers();
    notifierRegistry.register("email notification", new EmailNotification());
    notifierRegistry.register("sms notification", new SMSNotification());
    // notifierRegistry.unregister("email notification");
    // notifierRegistry.unregister("email notification");
    const emailNotification = notifierRegistry.getNotifier("email notification");
    const smsNotification = notifierRegistry.getNotifier("sms notification");
    emailNotification.notify();
    smsNotification.notify();
    notifierRegistry.listNotifiers();
};
// notifierMain();
