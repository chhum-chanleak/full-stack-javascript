// 1. Write a JavaScript program to create a class called "Person" with properties for name, age and country. Include a method to display the person's details. Create two instances of the 'Person' class and display their details.
class notPerson {
  name;
  age;
  country;

  constructor(name, age, country) {
    this.name = name;
    this.age = age;
    this.country = country;
  }

  showInfo() {
      console.log(`Hello, this is ${this.name}, ${this.age} years old. From ${this.country}`);
  }
}

const ahmed = new notPerson('Ahmed Ahmed', 12, 'Egypt');
const li = new notPerson('Li Li', 13, 'China');

// 2. Write a JavaScript program to create a class called 'Rectangle' with properties for width and height. Include two methods to calculate rectangle area and perimeter. Create an instance of the 'Rectangle' class and calculate its area and perimeter.
class Rectangle {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

const boulder = new Rectangle(2, 4);

// 3. Write a JavaScript program that creates a class called 'Vehicle' with properties for make, model, and year. Include a method to display vehicle details. Create a subclass called 'Car' that inherits from the 'Vehicle' class and includes an additional property for the number of doors. Override the display method to include the number of doors.
class Vehicle {
  model;
  year;

  constructor(model, year) {
    this.model = model;
    this.year = year;
  }

  showDetails() {
    console.log(`${this.model}, ${this.year}`);
  }
}

// Is-a relationship
class Car extends Vehicle {
  numberOfDoors;

  constructor(model, year, numberOfDoors) {
    super(model, year);
    this.numberOfDoors = numberOfDoors;
  }

  // Polymorphism because showDetails() of Car(child) overrides showDetails() of Vehicle(parent)
  showDetails() {
    console.log(`Model: ${this.model}, Launch-Date: ${this.year}, Number of doors:${this.numberOfDoors}`);
  }
}

const truck = new Car('Tesla', '2019', 2);

// 4. Write a JavaScript program that creates a class called "BankAccount" with properties for account number and balance. Include methods to deposit and withdraw money from the account. Create some instances of the "BankAccount" class, deposit some money, and withdraw a portion of it.
class BankAccount {
  accountNum;
  balance;

  constructor(accountNum, balance) {
    this.accountNum = accountNum;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Your current balance: $${this.balance}`);
  }

  withdraw(amount) {
    this.balance -= amount;
    console.log(`Your current balance: $${this.balance}`);
  } 
}

const savingAccount = new BankAccount('1', 2000);

// 5. Write a JavaScript program that creates a class called 'Shape' with a method to calculate the area. Create two subclasses, 'Circle' and 'Triangle', that inherit from the 'Shape' class and override the area calculation method. Create an instance of the 'Circle' class and calculate its area. Similarly, do the same for the 'Triangle' class.
class Shape {
  area() {

  }
}

class Circle extends Shape{
  pi = 3.14;
  radius;

  constructor(radius) {
    super();
    this.radius = radius;
  }

  // Polymorphism
  area() {
    return this.pi * (this.radius * this.radius);
  }
}

const orange = new Circle(4);

class Triangle extends Shape {
  base;
  height;

  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }

  // Polymorphism
  area() {
    return (1 / 2) * this.base * this.height;
  }
}

const pyramid = new Triangle(2, 4);

// 6. Write a JavaScript program that creates a class called 'Employee' with properties for name and salary. Include a method to calculate annual salary. Create a subclass called 'Manager' that inherits from the 'Employee' class and adds an additional property for department. Override the annual salary calculation method to include bonuses for managers. Create two instances of the 'Manager' class and calculate their annual salary.
class Employee {
  name;
  salary;

  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  annualSalary() {
    this.salary * 12;
    console.log(`The annual salary for $${this.name} is ${this.salary * 12}`);
  }
}

class Manager extends Employee {
  department;
  bonus = 200;

  constructor(name, salary, department) {
    super(name, salary);
    this.department = department;
  }

  // Polymorphism
  annualSalary() {
    (this.salary * 12) + this.bonus;
    console.log(`The annual salary for ${this.name} is $${(this.salary * 12) + this.bonus}`);
  }
}

const Chhum = new Manager('Chhum', 2000, 'IT');

// 7. Write a JavaScript program that creates a class `Book` with properties for title, author, and publication year. Include a method to display book details. Create a subclass called 'Ebook' that inherits from the 'Book' class and includes an additional property for book price. Override the display method to include the book price. Create an instance of the 'Ebook' class and display its details.
class Book {
  title;
  author;
  publishDate;

  constructor(title, author, publishDate) {
    this.title = title;
    this.author = author;
    this.publishDate = publishDate;
  }

  showDetails() {
    console.log(`
      title: ${this.title},
      author: ${this.author},
      publish-date: ${this.publishDate}
      `)
  }
}

class Ebook extends Book {
  price;

  constructor(title, author, publishDate, price) {
    super(title, author, publishDate);
    this.price = price;
  }

  // Polymorphism
  showDetails() {
    console.log(`
      title: ${this.title},
      author: ${this.author},
      publish-date: ${this.publishDate},
      price: $${this.price}
      `)
  }
}

const audioBook = new Ebook('How to think like a computer scientist.', 'Allen Downey', '06.06.2006', 14);

// 8. Write a JavaScript program that creates a class called 'Animal' with properties for species and sound. Include a method to make the animal's sound. Create a subclass called 'Dog' that inherits from the 'Animal' class and adds an additional property for color. Override the make sound method to include the dog's color. Create an instance of the 'Dog' class and make it make its sound.
class Animal {
  species;
  sound;

  constructor(species, sound) {
    this.species = species;
    this.sound = sound;
  }

  makeSound() {
    console.log(`${this.species} makes ${this.sound} noise.`);
  }
}

// Is-a relationship
class Dog extends Animal {
  color;

  constructor(species, sound, color) {
    super(species, sound);
    this.color = color;
  }

  makeSound() {
    console.log(`${this.species} with ${this.color} color makes ${this.sound} noise.`);
  }
}

const boxer = new Dog('Boxer', 'Woof', 'Brown');

// 9. Write a JavaScript program that creates a class called Bank with properties for bank names and branches. Include methods to add a branch, remove a branch, and display all branches. Create an instance of the Bank class and perform operations to add and remove branches.
 class Bank {
  names;
  branches;

  constructor(names, branches) {
    this.names = names;
    this.branches = branches;
  }

  addBranch(branch) {
    this.branches.push(branch);
    this.showBranches();
  }

  removeBranch(branch) {
    const newArray = [];

    for (let i = 0; i < this.branches.length; i += 1) {
      if (this.branches[i] !== branch) {
        newArray.push(this.branches[i]);
      }
    }
    this.branches = [...newArray];
    this.showBranches();
  }

  showBranches() {
    for (let i = 0; i < this.branches.length; i += 1) {
      console.log(`${this.branches[i]}`);
    }
  }
 }

 const bank = new Bank(['ABA', 'AC'], ['Phnom Penh', 'Phnom Rung']);

// 10. Write a JavaScript program that creates a class called Product with properties for product ID, name, and price. Include a method to calculate the total price by multiplying the price by the quantity. Create a subclass called PersonalCareProduct that inherits from the Product class and adds an additional property for the warranty period. Override the total price calculation method to include the warranty period. Create an instance of the PersonalCareProduct class and calculate its total price.
class Product {
  id;
  name;
  price;
  quantity;

  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  total() {
    return this.price * this.quantity;
  }
}

class PersonalCareProduct extends Product {
  warrantyPeriod;

  constructor(id, name, price, quantity, warrantyPeriod) {
    super(id, name, price, quantity);
    this.warrantyPeriod = warrantyPeriod;
  }

  // Polymorphism
  total() {
    return (this.price + this.warrantyPeriod) * this.quantity;
  }
}

const lotion = new PersonalCareProduct('01', 'Vaseline', 1000, 2, 200);

// 11. Write a JavaScript program that creates a class called BankAccount with properties for account number, account holder name, and balance. Include methods to deposit, withdraw, and transfer money between accounts. Create multiple instances of the BankAccount class and perform operations such as depositing, withdrawing, and transferring money.
class BankAccount2 {
  number;
  holder;
  #balance = 2000;

  constructor(number, holder) {
    this.number = number;
    this.holder = holder;
  }

  get balance() {
    return `$${this.#balance}`;
  }

  deposit(amount) {
    this.#balance += amount;
  }

  withdraw(amount) {
    this.#balance -= amount;
  }

  transfer(receiver, amount) {
    receiver.deposit(amount);
    this.withdraw(amount);
  }
}

const myAccount = new BankAccount2('71', 'Chum');
const sokha = new BankAccount2('99', 'Sokha');

// 12. Write a JavaScript program that creates a class called University with properties for university name and departments. Include methods to add a department, remove a department, and display all departments. Create an instance of the University class and add and remove departments.
class University {
  name;
  departments;

  constructor(name, departments) {
    this.name = name;
    this.departments = departments;
  }

  showDepartments() {
    for (let i = 0; i < this.departments.length; i += 1) {
      console.log(`${this.departments[i]}`);
    }
  }

  addDepartment(department) {
    this.departments.push(department);
  }

  removeDepartment(department) {
    const newArray = [];

    for (let i = 0; i < this.departments.length; i += 1) {
      if (this.departments[i] !== department) {
        newArray.push(this.departments[i]);
      }
    }
    this.departments = [...newArray];
  }
}

const university = new University('RUPP', ['Computer Science', 'Biochemistry', 'Mathematics', 'Physic']);



