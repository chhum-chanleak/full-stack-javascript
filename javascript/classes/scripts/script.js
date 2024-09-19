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
  // he super keyword in JavaScript is used to access properties and methods of the parent class from within a child class. It provides a way to call the parent class's constructor or methods, ensuring that the inheritance hierarchy is properly followed.

  // notAMethod: function () {
  //   console.log(super.prop); // SyntaxError: 'super' keyword unexpected here
  // },
}

const ant = new Animal('insect', 8, '???');

ant.makeSound(); // output: '???'

const PREFIX = 'prefix';

// Method definitions in classes
// Because instance fields of a class are added before the respective constructor runs, you can access the fields' values within the constructor. However, because instance fields of a derived class are defined after super() returns, the base class's constructor does not have access to the derived class's fields.
class BaseClass {
  // Class fields can be initialized directly in the class body.
  msg = "Hello, world!"; // This is a class field.
  constructor(name) {
    this.name = name;
  }

  basePublicMethod() {
    return this.msg;
  }
}

// 'extends' keyword is used for class inheritance.
class SubClass extends BaseClass {
  // Class fields can be initialized directly in the class body.
  // Fields are added one-by-one. Field initializers can refer to field values above it, but not below it
  // All instances of Person will have the same 'test = "123"'
  test = '123';

  constructor(name) {
    super(name);
  }

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
  field;
  fieldWithInitializer = "instance field";
  // Computed field names are only evaluated once, at class definition time. This means that each class always has a fixed set of field names, and two instances cannot have different field names via computed names.
  [`${PREFIX}Field`] = "prefixed field";

  // E. static
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

  // Calling 'static' members from another 'static' method
  // In order to call a static method or property within another 'static' method of the same class, you can use the 'this' keyword.  
  static greet() {
    console.log(`Hello, ${this.staticProperty}`);
  }

  // This is a 'non-static' method.
  // Calling 'static' members from a class constructor and other methods
  // Static members are not directly accessible using the this keyword from non-static methods. You need to call them using the class name: CLASSNAME.STATIC_METHOD_NAME() / CLASSNAME.STATIC_PROPERTY_NAME or by calling the method as a property of the constructor: this.constructor.STATIC_METHOD_NAME() / this.constructor.STATIC_PROPERTY_NAME
  callStaticMethodAndGreet() {
    console.log(SubClass.staticMethod()); // output: 'static method has been called.'
    this.constructor.greet(); // output: "Hello, someValue"
  }

  // F. Private properties
  // Private properties are counterparts of the regular class properties which are public, including class fields, class methods, etc. Private properties get created by using a hash '#' prefix and cannot be legally referenced outside of the class. The privacy encapsulation of these class properties is enforced by JavaScript itself. The only way to access a private property is via dot notation, and you can only do so within the class that defines the private property.

  // Private properties were not native to the language before this syntax existed. In prototypal inheritance, its behavior may be emulated with WeakMap objects or closures, but they can't compare to the '#' syntax in terms of ergonomics.
  // All private identifiers declared within a class must be unique. The namespace is shared between static and instance properties. The only exception is when the two declarations define a getter-setter pair.
  // The private identifier cannot be #constructor.
  // Most class properties have their private counterparts:
  // Private fields
  // Private methods
  // Private static fields
  // Private static methods
  // Private getters
  // Private setters
  // Private static getters
  // Private static setters
  // These are private fields(properties)
  #privateField;
  #privateFieldWithInitializer = 42;

  // You can use the 'in' operator to check whether an externally defined object possesses a private property. This will return true if the private field or method exists, and false otherwise.
  static getPrivateIni(object) {
    if (#privateFieldWithInitializer in object)  {
      return object.#privateFieldWithInitializer;
    }
  }

  //  Like their public counterparts, private instance fields: are added before the constructor runs in a base class, or immediately   after super() is invoked in a subclass, and are only available on instances of the class.

  // Private static fields
  // Like their public counterparts, private static fields:
  // are added to the class constructor at class evaluation time, and
  // are only available on the class itself.
  static #privateStaticField = 42;

  static publicStaticMethod() {
    return ClassWithPrivateStaticField.#privateStaticField;
  }
  // You are advised to always access private static fields through the class name, not through this, so inheritance doesn't break the method.

  // Private methods
  // Private methods include private instance methods and private static methods. Private methods are only accessible from inside the class declaration.

  // Unlike their public counterparts, private instance methods:
  // are installed immediately before the instance fields are installed, and
  // are only available on instances of the class, not on its .prototype property.
  #privateMethod() {
    return 42;
  }

  publicMethod() {
    return this.#privateMethod(); // Public method can call private method(this.#privateMethod)
  }

  // Private instance methods may be generator, async, or async generator functions. Private getters and setters are also possible, and follow the same syntax requirements as their public getter and setter counterparts.
  #message;

  get #decoratedMessage() {
    return `🎬${this.#message}🛑`;
  }
  set #decoratedMessage(msg) {
    this.#message = msg;
  }

  constructor() {
    this.#decoratedMessage = "hello world";
    console.log(this.#decoratedMessage);
  }
  // Unlike public methods, private methods are not accessible on the .prototype property of their class.


  // Private static methods
  // Like their public counterparts, private static methods:
  // are added to the class constructor at class evaluation time, and
  // are only available on the class itself.
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

// This is a best practice.
// even declaring an empty class field is beneficial, because it indicates the existence of the field, which allows type checkers as well as human readers to statically analyze the shape of the class.
// The code below seems repetitive, but consider the case where 'this' is dynamically mutated: the explicit field declaration makes it clear which fields will definitely be present on the instance.
class Person {
  name;
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Professor extends Person {
  name = `Professor ${this.name}`; // 'this.name' is inherited from the base class(Person).
}

const professor = new Professor('Radev', 54); 

professor.name; // output: "Professor Radev."

SubClass.getPrivateIni(obj); // output: true

// Simulating private constructors
// Many other languages include the capability to mark a constructor as private, which prevents the class from being instantiated outside of the class itself — you can only use static factory methods that create instances, or not be able to create instances at all. JavaScript does not have a native way to do this, but it can be accomplished by using a private static flag.

// Private constructors are used to prevent the creation of new instances of a class outside of the class itself. This is often done to enforce a singleton pattern, where only one instance of a class should exist throughout the application.
class PrivateConstructor {
static #isInternalConstructing = false;

constructor() {
  if (!PrivateConstructor.#isInternalConstructing) {
    throw new TypeError("PrivateConstructor is not constructable");
  }
  PrivateConstructor.#isInternalConstructing = false;
  // More initialization logic
}

static create() {
  PrivateConstructor.#isInternalConstructing = true;
  const instance = new PrivateConstructor();
  return instance;
}
}

new PrivateConstructor(); // TypeError: PrivateConstructor is not constructable
PrivateConstructor.create(); // PrivateConstructor {}