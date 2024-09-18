// 1. Defining classes

// In JavaScript, you cannot use 'let' or 'const' to declare class fields. These keywords are used for variable declarations within functions or blocks, but not within class definitions.
// Declaration
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

const rect = new Rectangle(10, 40);

rect.height; // output: 10
rect.width; // output 40

// Expression; the class is anonymous but assigned to a variable
const Square = class {
  constructor (side) {
    this.side = side;
  }

  set mySide(value) {
    this.side = value;
  }

  get area() {
    return this.side * this.side;
  }

  get perimeter() {
    return this.side * 4;
  }
};

const square = new Square(8);

square.side; // output 8
square.area; // output: 64
square.perimeter; // output: 32
// Set square.side to 4
square.mySide = 4;
square.side; // output: 4

// Expression; the class has its own name
const Triangle = class Triangle2 {
  constructor(base, height) {
    this.base = base;
    this.height = height;
  }

  get area() {
    return 1/2 * (this.base * this.height);
  }
};

const triangle = new Triangle(10, 30);

triangle.base; // output: 10
triangle.height; // output: 30
triangle.area; // output: 150

// 2. Class body
class Animal {
  constructor(type, limbs, sound) {
    this.type = type;
    this.limbs = limbs;
    this.sound = sound;
  }

  // A. Kind
  // Method definition
  // Public method
  // makeSound is NOT enumerable.
  makeSound() {
    return this.sound;
  }

  // Method definitions are not constructable
  // Methods cannot be constructors! They will throw a TypeError if you try to instantiate them.
  
  // Using 'super' in method definitions
  // Only functions defined as methods have access to the 'super' keyword.

  // notAMethod: function () {
  //   console.log(super.prop); // SyntaxError: 'super' keyword unexpected here
  // },
}

const ant = new Animal('insect', 8, '???');

ant.makeSound(); // output: '???'

// Method definitions in classes
class BaseClass {
  // Class fields can be initialized directly in the class body.
  msg = "Hello, world!"; // This is a class field.

  basePublicMethod() {
    return this.msg;
  }
}

// 'extends' keyword is used for class inheritance.
class SubClass extends BaseClass {
  // Class fields can be initialized directly in the class body.
  test = '123';

  subPublicMethod() {
    return super.basePublicMethod();
  }

  // Computed property names
  // Call get2();
  ["get" + 2]() {
    return 2;
  }

  // Generator methods
  *g() {
    let index = 0;

    // The 'yield' keyword in JavaScript is used to create generators, which are functions that can be paused and resumed. This allows for efficient iteration over large data sets or performing asynchronous operations in a synchronous-like manner.
    while(true) {
      yield index += 1;
    }
  }

  // Async methods
  async f() {
    let somePromise;
    await somePromise;
  }

  // Async generator methods
  async *f() {
    yield 1;
    yield 2;
    yield 3;
  }

  // B. getter  
  // A getter must have exactly zero parameters.
  get message() {
    return 'No message.'; // Return msg from BaseClass(Parent).
  }

  get test() {
    return this.test;
  }

  get id() {
    return this.id;
  }

  // Parameters
  // prop: The name of the property to bind to the given function. In the same way as other properties in object initializers, it can be a string literal, a number literal, or an identifier.
  // expression: You can also use expressions for a computed property name to bind to the given function.

  // Defining 'static' getters
  // Static getters are methods defined directly on a class, rather than on its instances. They provide a way to retrieve class-level properties or computed values without creating an instance of the class.
  static get className() {
    return 'SubClass';
  }

  // Smart / self-overwriting / lazy getters
  // In the following example, the object has a getter as its own property. On getting the property, the property is removed from the object and re-added, but implicitly as a data property this time. Finally, the value gets returned.
  get notifier() {
    delete this.notifier;
    // you can reassign class fields within instance methods using the 'this' keyword. This allows you to modify the value of a field associated with the current instance.
    // Reassign 'test' class fields using 'this.test'
    this.test = 'This is a lazy getter.'
    return this.test;
  }

  // C. setter
  // A setter must have exactly one parameter.

  // Parameters
  // prop: The name of the property to bind to the given function. In the same way as other properties in object initializers, it can be a string literal, a number literal, or an identifier.
  // val: An alias for the variable that holds the value attempted to be assigned to prop.
  // expression: You can also use expressions for a computed property name to bind to the given function.
  set test(value) {
    this.test = value;
  }

  // D. Public class fields.
  // Public fields are writable, enumerable, and configurable properties. As such, unlike their private counterparts, they participate in prototype inheritance.
  // The name of a 'static' property (field or method) cannot be prototype.
  // The name of a class field (static or instance) cannot be constructor.

  // static
  // Static properties cannot be directly accessed on instances of the class. Instead, they're accessed on the class itself.
  // The name of a static property (field or method) cannot be prototype.
  // The name of a class field (static or instance) cannot be constructor.
  // These are called 'public static features'.
  // Public static fields are useful when you want a field to exist only once per class
  static classState;
  static staticProperty = "someValue";
  static staticMethod() {
    return "static method has been called.";
  }

  static greet() {
    console.log(`Hello, ${this.staticProperty}`);
  }
}

const obj = new SubClass();

obj.subPublicMethod(); // output: "Hello, world!"
obj.get2(); // output: 2

const value = obj.g();

// Execution: The first time next() is called on the generator object, the function executes until it reaches the first yield expression.
value.next().value; // output: 1
value.next().value; // output: 2
console.log(obj.message);

// Defining a getter on existing objects using defineProperty

// Define a getter called get3 that returns 3 for 'obj'
Object.defineProperty(obj, ["get" + 3], {
  get() {
    return 3;
  }
});

// Using a computed property name
const sound = 'woof';

Object.defineProperty(obj, sound, {
  get() {
    return 'dog sound';
  }
});

// Calling 'static' getter
SubClass.className; // output: 'SubClass'

// get vs defineProperty
// When using get the property will be defined on the instance's prototype, while using Object.defineProperty() the property will be defined on the instance it is applied to.
class Example {
  get hello() {
    return "Hello, world!";
  }
}

const obj2 = new Example();

obj2.hello; // output: "Hello, world!"
Object.getOwnPropertyDescriptor(obj2, "hello"); // output: undefined

// {set: undefined, enumerable: false, configurable: true, get: ƒ}
// configurable: true
// enumerable: false
// get: ƒ hello()
// set: undefined
Object.getOwnPropertyDescriptor(Object.getPrototypeOf(obj2), "hello");

// Defining a property and a setter on existing objects using defineProperty
Object.defineProperty(obj, 'id', {
  id: 7,

  set(value) {
    this.id = value;
  }
});

