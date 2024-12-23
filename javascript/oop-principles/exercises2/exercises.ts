import { errorMessages } from "./errors.js";
import { validateUniqueName, validateExistence, validateEmptiness } from "./order-validators.js";

// SOLID principles
// 1. Single responsibility (SRP)
// The Single Responsibility Principle (SRP) is one of the key principles in object-oriented design, part of the SOLID principles. It states that a class should have only one reason to change, meaning that a class should only have one job or responsibility. By following SRP, we ensure that our code is more maintainable, easier to understand, and less prone to bugs.

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

//   InvoiceGenerator(): string {
//     return `Invoice: ${this.items.join(", ")} - Total: $${this.totalAmount}`;
//   }

//   EmailConfirmation(): void {
//     console.log("Sending email confirmation...");
//     console.log(`Order Confirmation: ${this.InvoiceGenerator()}`);
//   }
// }

// Refactored code of 'Order' class
// Responsible for storing order list and its structure

// Solution: (Please use this solution as an example of application of SOLID principles since it is a well refined code)

// Abstractions
export interface IService {
  execute(order: AbstractOrder, invoiceGenerator?: IInvoiceGeneratorService, logger?: ILoggerService): string | void;
}

interface IInvoiceGeneratorService extends IService {
  execute(order: AbstractOrder): string;
}

interface IEmailConfirmation extends IService {
  execute(order: AbstractOrder, invoiceGenerator: IInvoiceGeneratorService, logger: ILoggerService): void;
}

// Data related abstractions

abstract class AbstractOrder {
  protected items: string[] = [];
  protected totalAmount: number = 0;

  abstract addItem(item: string, price: number): void;
  abstract getItems(): string[];
  abstract getTotal(): number;  
}

export abstract class AbstractOrderServicesStorage {
  protected services: Map<string, IService> = new Map();

  abstract getServices(): Map<string, IService>;
}

abstract class AbstractOrderServiceRegistry {
  constructor(
    protected servicesStorage: AbstractOrderServicesStorage,
    protected logger: ILoggerService
  ) {}

  abstract register(name: string, service: IService): void;
  abstract unregister(name: string): void;
  abstract getService(name: string): IService | undefined;
  abstract listServices(): void;
}

type Level = "info" | "warn" | "debug" | "error";

interface ILoggerService {
  log(message: string, level?: Level): void;
}

// Concrete implementations (low-level)

// Data related class
class Order extends AbstractOrder {

  addItem(item: string, price: number): void {
    this.items.push(item);
    this.totalAmount += price;
  }

  getItems(): string[] {
    return this.items;
  }

  getTotal(): number {
    return this.totalAmount;
  }
}

class OrderServicesStorage extends AbstractOrderServicesStorage {
  // This class inherits "servicesStorage: Map<string, IService>" from its parent class
  getServices(): Map<string, IService> {
    return this.services;
  }
}

// Service implementations

class InvoiceGenerator implements IInvoiceGeneratorService {
  execute(order: AbstractOrder): string {
    return `Invoice: ${order.getItems().join(", ")} - Total: $${order.getTotal()}`;
  }
}

class EmailConfirmation implements IEmailConfirmation {
  execute(order: AbstractOrder, invoiceGenerator: IInvoiceGeneratorService, logger: ILoggerService): void {
    logger.log("Sending email confirmation...");
    logger.log(`Order Confirmation: ${invoiceGenerator.execute(order)}`);
  }
}

// (high-level)
class OrderServiceRegistry extends AbstractOrderServiceRegistry {
  constructor(
    protected servicesStorage: AbstractOrderServicesStorage,
    protected logger: ILoggerService
  ) {
    super(servicesStorage, logger);
  }

  register(name: string, service: IService): void {
    // Check whether service is already exists
    if(!validateUniqueName(name, this.servicesStorage)) {
      return;
    };

    this.servicesStorage.getServices().set(name, service);
    this.logger.log(`${name} service registered successfully`);
  }

  unregister(name: string): void {
    // Check whether service exists
    if(!validateExistence(name, this.servicesStorage)) {
      return;
    };

    this.servicesStorage.getServices().delete(name);
    this.logger.log(`${name} service unregistered successfully`);
  }

  getService(name: string): IService | undefined{
    // Check whether service exists
    if (!validateExistence(name, this.servicesStorage)) {
      return undefined;
    }

    return this.servicesStorage.getServices().get(name);
  }

  listServices(): void {
    // Check wether storage is empty
    if (validateEmptiness(this.servicesStorage)) {
      this.logger.log(`Services storage ${errorMessages.EMPTINESS}`);
      return;
    }
    
    console.log(this.servicesStorage.getServices());
  }
}

// Utilities implementations
export class LoggerService implements ILoggerService {
  log(message: string, level: Level = "info"): void {
    const timeStamp = new Date().toISOString();

    console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
  }
}

// Usage
const orderMain = (): void => {
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

  const emailConfirmation = orderServiceRegistry.getService("email confirmation") as EmailConfirmation;
  const invoiceGenerator = orderServiceRegistry.getService("invoice generator") as InvoiceGenerator;

  emailConfirmation.execute(order, new InvoiceGenerator(), new LoggerService());

  orderServiceRegistry.listServices();
};

// orderMain();

// 2. Open-closed (OCP)
// The Open-Closed Principle (OCP) is one of the SOLID principles of object-oriented design. It states that:
// A class or module should be open for extension (i.e., you can add new functionality) but closed for modification (i.e., you shouldn’t have to change the existing code to add new functionality).
// This principle helps us achieve flexibility and maintainability, as we can extend the behavior of a system without changing its existing parts.

// Key Ideas:
// Open for Extension: You should be able to extend the behavior of a class or module.
// Closed for Modification: Once a class or module is written, its existing code should remain untouched.

// Exercise: Refactor Code to Follow OCP
// You are given the following code that calculates discounts for different types of customers. It violates OCP because adding a new customer type requires modifying the 'DiscountCalculator' class.
// class DiscountCalculator {
//   calculateDiscount(customer: any) {
//     if (customer.type === 'regular') {
//       return 0.1; // 10% discount
//     } else if (customer.type === 'premium') {
//       return 0.2; // 20% discount
//     }
//   }
// }

// const regularCustomer = { type: 'regular' };
// const premiumCustomer = { type: 'premium' };

// Objective:
// Refactor this code so that you can add new customer types (e.g., vip) without modifying the DiscountCalculator class.
// Use the Open-Closed Principle by introducing polymorphism and extending the DiscountCalculator class with new customer types.

// Solution

// Abstractions

// Customer service abstractions
interface Customer {
  getDiscountPercentage(): number;
}

abstract class AbstractCustomerServiceStorage {
  protected services: Map<string, Customer> = new Map();

  abstract getServices(): Map<string, Customer>;
}

abstract class AbstractCustomerServiceRegistry {
  constructor(
    protected serviceStorage: AbstractCustomerServiceStorage,
    protected existenceValidator: ICustomerValidator = new ExistenceValidator(),
    protected nameAbsenceValidator: ICustomerValidator = new NameAbsenceValidator(),
    protected logger: ILogger = new CustomerLogger(),
    protected storageLogger: ILogger = new CustomerStorageLogger()
  ) {}

  abstract register(name: string, service: Customer): void;
  abstract unregister(name: string): void;
  abstract getService(name: string): Customer | undefined;
  abstract listServices(): void;
}

// Validator abstractions
interface ICustomerValidator {
  validate(serviceStorage: AbstractCustomerServiceStorage, name?: string, ): boolean;
}

// Logger abstractions

type CustomerLevel = "info" | "warn" | "error" | "debug";
interface ILogger {
  log(message?: string, level?: CustomerLevel, serviceStorage?: AbstractCustomerServiceStorage): void;
}

// Concrete implementations (low-level)

// Customer concrete implementations
class RegularCustomer implements Customer {
  private discountPercentage: number = 0.1;

  getDiscountPercentage(): number {
    return this.discountPercentage;
  }
}

class PremiumCustomer implements Customer {
  private discountPercentage: number = 0.2;

  getDiscountPercentage(): number {
    return this.discountPercentage;
  }
}

// Utility concrete implementations

// Logger
class CustomerLogger implements ILogger {
  log(message: string, level: CustomerLevel = "info"): void {
    const timeStamp = new Date().toISOString();

    console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
  }
}

class CustomerStorageLogger implements ILogger {
  log(message: string, level: CustomerLevel, serviceStorage: AbstractCustomerServiceStorage): void {
    const timeStamp = new Date().toISOString();

    console[level](`${timeStamp} ${level.toUpperCase()}: ${message}:`, serviceStorage.getServices());
  }
}

// Validators

class ExistenceValidator implements ICustomerValidator {
  constructor(private readonly logger: ILogger = new CustomerLogger()) {}

  validate(serviceStorage: AbstractCustomerServiceStorage, name: string): boolean {
  // Check whether name is undefined
  try {  if (!name || !serviceStorage) {
    throw new Error(`${errorMessages.PARAMETERS_NAME_SERVICE_STORAGE_REQUIRED}`);
  }
  } catch(error) {
    this.logger.log(`${(error as Error).message}`, "error", serviceStorage);
  }

  try {
    if (!serviceStorage.getServices().has(name)) {
      throw new Error(`'${name}' ${errorMessages.NO_EXISTENCE}`);
    }
  } catch(error) {
    this.logger.log(`${(error as Error).message}`, "error");
    return false;
  }

    return true;
  } 
}

class NameAbsenceValidator implements ICustomerValidator {
  constructor(private readonly  logger: ILogger = new CustomerLogger()) {}

  validate(serviceStorage: AbstractCustomerServiceStorage, name: string): boolean {
  // Check whether name is undefined
  try {  if (!name || !serviceStorage) {
    throw new Error(`${errorMessages.PARAMETERS_NAME_SERVICE_STORAGE_REQUIRED}`);
  }
  } catch(error) {
    this.logger.log(`${(error as Error).message}`, "error", serviceStorage);
  }  

  try {
    if (serviceStorage.getServices().has(name)) {
      throw new Error(`'${name}' ${errorMessages.ALREADY_EXIST}`);
    }
  } catch(error) {
    this.logger.log(`${(error as Error).message}`, "error");
    return false;
  }

    return true;
  } 
}

class StorageIsEmptyValidator implements ICustomerValidator {
  validate(serviceStorage: AbstractCustomerServiceStorage): boolean {
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
  getServices(): Map<string, Customer> {
    return this.services;
  }
}

// Registries (high-level)

// Customer service registry (high-level)
class CustomerServiceRegistry extends AbstractCustomerServiceRegistry {
  constructor(
    protected serviceStorage: AbstractCustomerServiceStorage,
    protected existenceValidator: ICustomerValidator = new ExistenceValidator(),
    protected nameAbsenceValidator: ICustomerValidator = new NameAbsenceValidator(),
    protected storageIsEmptyValidator: ICustomerValidator = new StorageIsEmptyValidator(),
    protected customerLogger: ILogger = new CustomerLogger(),
    protected storageLogger: ILogger = new CustomerStorageLogger()
  ) {
    super(
      serviceStorage,
      existenceValidator,
      nameAbsenceValidator,
      customerLogger,
      storageLogger
    );
  }

  register(name: string, service: Customer): void {
    // Check whether name is absent
    if (this.nameAbsenceValidator.validate(this.serviceStorage, name)) {
      this.serviceStorage.getServices().set(name, service);
      this.customerLogger.log(`'${name}' customer registered successfully`);
    }
  }

  unregister(name: string): void {
    // Check whether name exist
    if (!this.existenceValidator.validate(this.serviceStorage, name)) {
      return;
    }

    this.serviceStorage.getServices().delete(name);
    this.customerLogger.log(`${name} customer unregistered successfully`);
  }

  getService(name: string): Customer | undefined {
    if (!this.existenceValidator.validate(this.serviceStorage, name)) {
      return undefined;
    }

    return this.serviceStorage.getServices().get(name);
  }

  listServices(): void {
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

// customerMain();

// 3. Liskov substitution (LSP)
// The Liskov Substitution Principle states that subtypes must be substitutable for their base types without altering the correctness of the program. This means that objects of a superclass should be replaceable with objects of a subclass without causing errors or unexpected behavior.

// In TypeScript, we ensure this by designing classes and interfaces such that derived classes adhere to the expected behavior of the base class or interface.

// Exercise: Applying LSP in TypeScript
// Create an interface Bird with a method fly. Then, implement two classes: Eagle (a bird that can fly) and Penguin (a bird that cannot fly). Ensure the implementation adheres to the Liskov Substitution Principle.

// Steps:
// Define an interface Bird with appropriate methods.
// Implement classes Eagle and Penguin.
// Ensure the design does not violate LSP.

// Solution

// Abstractions

interface Bird {
  walk(): void;
}

interface FlyingBird extends Bird {
  // This interface inherits "walk()" from its parent

  fly(): void;
}

interface FlightlessBird extends Bird {
  // This interface inherits "walk()" from its parent

  runOrSwimVeryWell(): void;
}

abstract class AbstractBirdStorage {
  protected birds: Map<string, Bird> = new Map();

  abstract getBirds(): Map<string, Bird>;
}

abstract class AbstractBirdRegistry {
  constructor(
    protected birdStorage: AbstractBirdStorage,
    protected birdIsAbsentValidator: IBirdValidator,
    protected logger: AbstractBirdLogger
  ) {}

  abstract register(name: string, bird: Bird): void;
  abstract unregister(name: string): void;
  abstract getBird(name: string): Bird | undefined;
  abstract listBirds(): void;
}

// Utility abstractions
interface IBirdValidator {
  validate(birdStorage: AbstractBirdStorage, name: string): boolean;
}

type Level2 = "info" | "warn" | "error" | "debug";
abstract class AbstractBirdLogger {
  log( message: string, level: Level2 = "info", birdStorage?: AbstractBirdStorage,): void {
    const timeStamp = new Date().toISOString();

    console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
  }
}

// Concrete implementations (low-level)

// Flying birds

class Eagle implements FlyingBird {
  walk(): void {
    console.log("Eagle walks on grass");
  }

  fly(): void {
    console.log("Eagle flies high");
  }
}

class Hawk implements FlyingBird {
  walk(): void {
    console.log("Hawk walks on grass");
  }

  fly(): void {
    console.log("Hawk flies high");
  }
}

// Flightless birds

class Penguin implements FlightlessBird {
  walk(): void {
    console.log("Penguin walks on ice");
  }

  runOrSwimVeryWell(): void {
    console.log("Penguin swims swiftly");
  }
}

class Ostrich implements FlightlessBird {
  walk(): void {
    console.log("Ostrich walks on Savannah grassland");
  }

  runOrSwimVeryWell(): void {
    console.log("Ostrich runs very fast");
  }
}

// Storage of birds
class BirdStorage extends AbstractBirdStorage {
  // This class inherits "protected birds: Map<string, Bird> = new Map()" from its parent
  
  getBirds(): Map<string, Bird> {
    return this.birds;
  }
}

// Bird registry (high-level)
class BirdRegistry extends AbstractBirdRegistry {
  constructor(
    protected birdStorage: AbstractBirdStorage,
    protected birdIsAbsentValidator: IBirdValidator,
    protected logger: AbstractBirdLogger,
  ) {
    super(birdStorage, birdIsAbsentValidator, logger);
  }

  register(name: string, bird: Bird): void {
    // Check whether name already exists in the storage
    if (!this.birdIsAbsentValidator.validate(this.birdStorage, name)) {
      this.logger.log(`${name} ${errorMessages.ALREADY_EXIST}`, "error");
      return;
    }

    // Add bird and log message when the above condition does not check
    this.birdStorage.getBirds().set(name, bird);
    this.logger.log(`${name} registered successfully`);
  }

  unregister(name: string): void {
    // Check whether name already exists in the storage
    if (this.birdIsAbsentValidator.validate(this.birdStorage, name)) {
      this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
      return;
    }

    // Delete bird and log a message when the above condition does not check
    this.birdStorage.getBirds().delete(name);
    this.logger.log(`${name} unregistered successfully`);
  }

  getBird(name: string): Bird | undefined {
    if (this.birdIsAbsentValidator.validate(this.birdStorage, name)) {
      this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
      return;
    }

    // Return bird when the above condition does not check
    return this.birdStorage.getBirds().get(name);
  }

  listBirds(): void {
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

class BirdIsAbsentValidator implements IBirdValidator {
  validate(birdStorage: AbstractBirdStorage, name: string): boolean {
    // When a certain bird exists
    if (birdStorage.getBirds().get(name)) {    
      return false;
    }

    return true;
  }
}

// Loggers

class RegistryLogger extends AbstractBirdLogger {}

// Usage
const birdMain = () => {
  const birdRegistry = new BirdRegistry(
    new BirdStorage(),
    new BirdIsAbsentValidator(), 
    new RegistryLogger(),
  );

  birdRegistry.register("eagle", new Eagle());
  birdRegistry.register("eagle", new Eagle());
  birdRegistry.register("ostrich", new Ostrich());

  birdRegistry.unregister("eele");
  birdRegistry.unregister("eagle");

  birdRegistry.register("eagle", new Eagle());

  const eagle = birdRegistry.getBird("eagle") as Eagle;
  const ostrich = birdRegistry.getBird("ostrich") as Ostrich;

  eagle.fly();
  eagle.walk();
  console.log("");
  ostrich.walk();
  ostrich.runOrSwimVeryWell();

  birdRegistry.listBirds();
};

// birdMain();

// 4. Interface segregation
// The Interface Segregation Principle (ISP) states that a class should not be forced to implement interfaces it does not use. Instead, you should break down interfaces into smaller, more specific ones to ensure classes only implement what they actually need.

// This principle is one of the SOLID principles of object-oriented design and helps avoid bloated, "fat" interfaces.

// Exercise: Apply ISP in TypeScript

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

// Abstractions

interface IMachine {
  start(): void;
  stop(): void;
}

abstract class AbstractCar implements IMachine {
  constructor(
    protected manufacturer: string
  ) {}

  abstract start(): void;
  abstract stop(): void;
  abstract refuel(): void;
}

abstract class AbstractElectricScooter implements IMachine {
  constructor(
    protected manufacturer: string
  ) {}

  abstract start(): void;
  abstract stop(): void;
  abstract chargeBattery(): void;
}

// Logger abstraction
type MachineLogLevel = "info" | "warn" | "error" | "debug";
interface IMachineLogger {
  log(message: string, level?: MachineLogLevel): void;
}

// Machine storage abstraction
abstract class AbstractMachineStorage {
  protected machines: Map<string, IMachine> = new Map();

  abstract getMachines(): Map<string, IMachine>;
}

// Service(Machine) registry abstraction
abstract class AbstractMachineRegistry {
  constructor(
    protected machineStorage: AbstractMachineStorage
  ) {}

  abstract register(name: string, machine: IMachine): void;
  abstract unregister(name: string): void;
  abstract getMachine(name: string): IMachine | undefined;
  abstract listMachines(): void;
}

// Machine validator abstractions
interface IMachineValidator {
  validate(name: string, machineStorage: AbstractMachineStorage): boolean;
}

interface ILogLevelValidator {
  validate(level: MachineLogLevel): boolean;
}

// Concrete implementations (low-level)

class Car extends AbstractCar {
  constructor(
    protected manufacturer: string,
    protected logger: IMachineLogger,
  ) {
    super(manufacturer);
  }

  start(): void {
    this.logger.log("Car starts moving");
  }

  stop(): void {
    this.logger.log("Car has stopped");
  }

  refuel(): void {
    this.logger.log("Car is refueling diesel/gasoline");
  }
}

class ElectricScooter extends AbstractElectricScooter {
  constructor(
    protected manufacturer: string,
    protected logger: IMachineLogger,
  ) {
    super(manufacturer);
  }

  start(): void {
    this.logger.log("Scooter starts moving");
  }

  stop(): void {
    this.logger.log("Scooter has stopped");
  }

  chargeBattery(): void {
    this.logger.log("Scooter is recharging power");
  }
}

// Service(Machines) storage
class MachineStorage extends AbstractMachineStorage {
  // This class inherit "protected machines: Map<string, IMachine> = new Map()" from its parent

  getMachines(): Map<string, IMachine> {
    return this.machines;
  }
}

// Service(Machine) registry (high-level)
class MachineRegistry extends AbstractMachineRegistry {
  constructor(
    protected machineStorage: AbstractMachineStorage,
    protected nameIsAbsentValidator: IMachineValidator,
    protected emptyStorageValidator: IMachineValidator,
    protected logger: IMachineLogger,
  ) {
    super(machineStorage);
  }

  register(name: string, machine: IMachine): void {
    // Check whether passed name exists and return if it does throw an error message
    if (!this.nameIsAbsentValidator.validate(name, this.machineStorage)) {
      this.logger.log(`${name} ${errorMessages.ALREADY_EXIST}`, "error");
      return;
    }
    
    // Execute this when passed name does not exist
    this.machineStorage.getMachines().set(name, machine);
    this.logger.log(`${name} registered successfully`);
  }

  unregister(name: string): void {
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
  getMachine(name: string): IMachine | undefined {
    // When passed name does not exist, then throw an error message
    if (this.nameIsAbsentValidator.validate(name, this.machineStorage)) {
      this.logger.log(`${name} ${errorMessages.NO_EXISTENCE}`, "error");
      return undefined;
    }

    // Execute this when passed name exists
    return this.machineStorage.getMachines().get(name);
  }

  listMachines(): void {
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

class MachineRegistryLogger implements IMachineLogger {
  constructor(
    protected logLevelValidator: ILogLevelValidator = new InvalidLevelValidator()
  ) {}

  log(message: string, level: MachineLogLevel = "info"): void {
    const timeStamp = new Date().toISOString();

    if (!this.logLevelValidator.validate(level)) {
      console.error(`${timeStamp} Error: Invalid log level` );
      return;
    }

    console[level](`${timeStamp} ${level.toUpperCase()}: ${message}`);
  }
}

// Machine validator implementations

class NameIsAbsentValidator implements IMachineValidator {
  validate(name: string, machineStorage: AbstractMachineStorage): boolean {
    // Return false when a certain machine exists
    if (machineStorage.getMachines().has(name)) {
      return false;
    }

    // Return true otherwise
    return true;
  }
}

class EmptyStorageValidator implements IMachineValidator {
  validate(name: string = "", machineStorage: AbstractMachineStorage): boolean {
    if (machineStorage.getMachines().size !== 0) {
      return false;
    }

    return true;
  }
}

class InvalidLevelValidator implements ILogLevelValidator {
  validate(level: MachineLogLevel): boolean {
    if (!["info", "warn", "error", "debug"].includes(level)) {
      return false;
    }

    return true;
  }
}

// Usage
const carMain = () => {
  const machineRegistry = new MachineRegistry(
    new MachineStorage(),
    new NameIsAbsentValidator(),
    new EmptyStorageValidator(),
    new MachineRegistryLogger(),
  );

  machineRegistry.register("toyota prius", new Car("toyota", new MachineRegistryLogger));
  machineRegistry.register("toyota prius2", new Car("toyota", new MachineRegistryLogger));
  machineRegistry.register("hybrid scooter", new ElectricScooter("Baidu", new MachineRegistryLogger));
  machineRegistry.register("hybrid scooter", new ElectricScooter("Baidu", new MachineRegistryLogger));

  machineRegistry.unregister("toyota prius2");
  // machineRegistry.unregister("toyota prius2");

  const toyotaPrius = machineRegistry.getMachine("toyota prius") as Car;
  const hybridScooter = machineRegistry.getMachine("hybrid scooter") as ElectricScooter;

  toyotaPrius.start();
  toyotaPrius.stop();
  toyotaPrius.refuel();

  hybridScooter.start();
  hybridScooter.stop();
  hybridScooter.chargeBattery();

  machineRegistry.listMachines();
};

carMain();

// 5. Dependency inversion
// The Dependency Inversion Principle (DIP) is the "D" in the SOLID principles. It emphasizes designing systems where high-level modules (policies) are not directly dependent on low-level modules (details). Instead, both should depend on abstractions.

// Definition of DIP
// High-level modules should not depend on low-level modules. Both should depend on abstractions.
// Abstractions should not depend on details. Details should depend on abstractions.
// This promotes flexibility and scalability by decoupling high-level logic from low-level implementations.

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