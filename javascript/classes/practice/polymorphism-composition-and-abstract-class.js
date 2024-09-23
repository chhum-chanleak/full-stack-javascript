// 1. Polymorphism
// Polymorphism in JavaScript refers to the ability of objects of different types to be treated as if they were the same type. This allows you to write code that can work with objects of various classes without needing to know their exact type at compile time.

// Key aspects of polymorphism in JavaScript:

// Method overriding: When a derived class overrides a method of its base class, it provides its own implementation for that method. This means that when you call the method on an object of the derived class, the derived class's implementation will be executed, even though the object is of a type that could also have the base class's implementation.
// Dynamic typing: JavaScript's dynamic typing allows objects of different types to be assigned to the same variable, which is essential for polymorphism.
// instanceof operator: You can use the instanceof operator to check if an object is an instance of a particular class. This can be useful for determining which implementation of a method to call.
class Animal {
  speak() {
    console.log("Generic animal sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Woof!");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow!");
  }
}

const animals = [new Dog(), new Cat()];

for (let i = 0; i < animals.length; i += 1) {
  animals[i].speak();
} // output: Woof! Meow!

// In this example:

// Animal is the base class.
// Dog and Cat are derived classes that inherit from Animal.
// The speak() method is overridden in both Dog and Cat to provide specific sounds for each animal.
// The animals array contains objects of both Dog and Cat classes.
// When you call animal.speak() on each animal, the appropriate implementation for that specific animal is executed. This demonstrates polymorphism, as the same method call can result in different behavior depending on the actual type of the object.
// Additional points to consider:

// Duck typing: JavaScript often uses duck typing, where the focus is on the behavior of an object rather than its specific type. This can make polymorphism more flexible.
// Interfaces: While JavaScript doesn't have explicit interfaces, you can achieve similar behavior by defining common methods or properties that multiple classes implement.
// By understanding polymorphism in JavaScript, you can write more flexible, reusable, and maintainable code.

// 2. Composition
// Composition is a design principle in object-oriented programming that involves building objects by combining other objects. It's an alternative to inheritance, which creates a hierarchical relationship between classes.

// Key characteristics of composition:

// Object relationships: Composition establishes relationships between objects by creating references to other objects within a class.
// Flexibility: It offers greater flexibility compared to inheritance, as objects can be composed and decomposed dynamically.
// Reusability: Components can be reused in different contexts, promoting code modularity.
// Avoidance of the "Diamond Problem": Composition helps prevent inheritance-related issues like the "Diamond Problem."
class Engine {
  start() {
    console.log("Engine started");
  }
}

class Wheels {
  rotate() {
    console.log("Wheels rotating");
  }
}

class Car {
  constructor() {
    // A car has an engine and wheels.
    this.engine = new Engine();
    this.wheels = new Wheels();   

  }

  start() {
    this.engine.start();
    this.wheels.rotate();
  }
}

const myCar = new Car();
myCar.start(); // output: "Engine started" "Wheels rotating"

// In this example:

// Engine and Wheels are separate classes representing components of a car.
// The Car class contains references to Engine and Wheels objects.
// When the Car's start() method is called, it delegates the work to its engine and wheels components.
// Benefits of using composition:

// Flexibility: Objects can be composed in different ways to create various behaviors.
// Reusability: Components can be reused in different contexts.
// Modularity: Promotes code modularity and maintainability.
// Avoidance of the "Diamond Problem": Prevents inheritance-related issues.
// Clearer object relationships: Makes it easier to understand how objects are related to each other.
// In conclusion, composition is a powerful design principle that allows you to create flexible, reusable, and maintainable JavaScript applications. By understanding and applying composition, you can build more modular and scalable code.

// 3. Abstract class
// Abstract classes(TypeScript only), provide a blueprint for other classes to inherit from. They cannot be instantiated directly, but serve as a template for creating more concrete classes.

// Key Characteristics:
// Cannot be instantiated directly: Abstract classes cannot be used to create objects on their own.
// Contain abstract methods: Abstract methods are declared within abstract classes but have no implementation. Derived classes must provide concrete implementations for these methods.
// Inheritance: Other classes can inherit from abstract classes to acquire their structure and common methods.
// Template for derived classes: Abstract classes define a common interface or contract that derived classes must adhere to.

// Code below can only used in TypeScript files

// abstract class Shape {
//   abstract area(): number;
//   abstract perimeter(): number;

//   // Concrete method
//   display() {
//     console.log("This is a shape.");
//   }
// }

// abstract class Animal {
//   abstract makeSound(): void;
// }

// class Dog extends Animal {
//   makeSound() {
//     console.log("Woof!");
//   }
// }

// class Cat extends Animal {
//   makeSound() {
//     console.log("Meow!");
//   }
// }

// Purpose of abstract classes: Define a common structure and interface for related classes.
// Characteristics:
// Cannot be instantiated directly.
// Contain at least one abstract method.
// Derived classes must implement all abstract methods.
// Used as a blueprint for other classes.

// Code below can only used in TypeScript files

// abstract class Animal {
//   abstract makeSound(): void;
// }

// class Dog extends Animal {
//   makeSound() {
//     console.log("Woof!");
//   }
// }

// class Cat extends Animal {
//   makeSound() {
//     console.log("Meow!");
//   }
// }