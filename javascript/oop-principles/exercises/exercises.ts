// SOLID principles
// 1. Single responsibility (SRP)
// The Single Responsibility Principle (SRP) is one of the key principles in object-oriented design, part of the SOLID principles. It states that a class should have only one reason to change, meaning that a class should only have one job or responsibility. By following SRP, we ensure that our code is more maintainable, easier to understand, and less prone to bugs.

// Key Ideas:
// Single Responsibility: A class or module should focus on one task.
// Changeability: If a class has more than one responsibility, it could change for multiple reasons, which makes maintenance difficult.

// Example in TypeScript:
// Let's consider an example where we have a class that violates SRP, followed by a refactored version that adheres to it.

// Violating SRP:
// In this example, a User class handles both user data and user-related notifications (i.e., two responsibilities).

// Example:
class UserNo {
  constructor(private name: string, private email: string) {}

  // Responsibility 1: Handling user data
  getUserInfo() {
    return `User: ${this.name}, Email: ${this.email}`;
  }

  // Responsibility 2: Sending notifications
  sendEmail(message: string) {
    console.log(`Sending email to ${this.email}: ${message}`);
  }
}

const userNo = new UserNo("John Doe", "john@example.com");

console.log(userNo.getUserInfo());
userNo.sendEmail("Hello John, welcome!");

// In this case, the User class violates SRP because it handles two responsibilities: user data and sending emails.

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
// In the following code, the InvoiceProcessor class handles two types of invoices (Credit and Debit) and has conditional logic inside it. To add a new type of invoice, we would need to modify the existing class, violating the OCP.

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

processorNo.processInvoice(creditInvoiceNo);
processorNo.processInvoice(debitInvoiceNo);

// To add a new invoice type (e.g., refund), we’d have to modify the InvoiceProcessor class.
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

processorYes.processInvoice(creditInvoiceYes);
processorYes.processInvoice(debitInvoiceYes);
processorYes.processInvoice(refundInvoiceYes);

// Explanation of Refactor:
// Invoice is now an abstract class with a process() method.
// Different invoice types (CreditInvoice, DebitInvoice, RefundInvoice) implement the process() method, each with its own behavior.
// The InvoiceProcessor class now only interacts with the abstract Invoice class, allowing us to add new types of invoices by extending the Invoice class, without modifying the InvoiceProcessor class.
// This adheres to the Open-Closed Principle because:

// The InvoiceProcessor class is closed for modification (no need to change it).
// We can extend it with new invoice types without modifying the original InvoiceProcessor class.

// Exercise: Refactor Code to Follow OCP
// You are given the following code that calculates discounts for different types of customers. It violates OCP because adding a new customer type requires modifying the DiscountCalculator class.
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

const calculator = new DiscountCalculator();
console.log(calculator.calculateDiscount(regularCustomer));
console.log(calculator.calculateDiscount(premiumCustomer));

// Objective:
// Refactor this code so that you can add new customer types (e.g., vip) without modifying the DiscountCalculator class.
// Use the Open-Closed Principle by introducing polymorphism and extending the DiscountCalculator class with new customer types.

// Once you’ve completed the refactor, the DiscountCalculator class should remain unchanged when adding new customer types.

// 3. Liskov substitution
// 4. Interface segregation
// 5. Dependency inversion