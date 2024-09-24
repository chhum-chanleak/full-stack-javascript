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
  // the super keyword in JavaScript is used to access properties and methods of the parent class from within a child class. It provides a way to call the parent class's constructor or methods, ensuring that the inheritance hierarchy is properly followed.

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
    return 'No message.'; // Return 'No message.'
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
  // You are advised to always access private static fields through the class name, not through 'this', so inheritance doesn't break the method.

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

  // constructor() {
  //   this.#decoratedMessage = "hello world";
  //   console.log(this.#decoratedMessage);
  // }
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
Object.defineProperty(
  // Object to be modified
  obj,
  // Property that will be assign to first parameter(obj);
  ["get" + 3], {
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
// When using 'get', the property will be defined on the instance's prototype, while using Object.defineProperty() the property will be defined on the instance it is applied to.
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
// Even declaring an empty class field is beneficial, because it indicates the existence of the field, which allows type checkers as well as human readers to statically analyze the shape of the class.
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

  // static factory method
  static create() {
    PrivateConstructor.#isInternalConstructing = true;
    const instance = new PrivateConstructor();
    return instance;
  }
}

// new PrivateConstructor(); // TypeError: PrivateConstructor is not constructable
PrivateConstructor.create(); // PrivateConstructor {}

// Constructor
// The constructor method is a special method for creating and initializing an object created with a class. There can only be one special method with the name "constructor" in a class — a SyntaxError is thrown if the class contains more than one occurrence of a constructor method.

// A constructor can use the 'super' keyword to call the constructor of the super class.
class Circle {
  // A constructor
  constructor(radius) {
    this.radius = radius;
  }
}
// Alternatively, if your instance properties' values do not depend on the constructor's arguments, you can define them as class fields.

// Static initialization blocks
// Static initialization blocks allow flexible initialization of static properties, including the evaluation of statements during initialization, while granting access to the private scope.
// Static initialization blocks are declared within a class. It contains statements to be evaluated during class initialization. This permits more flexible initialization logic than static properties, such as using try...catch or setting multiple fields from a single value. Initialization is performed in the context of the current class declaration, with access to private state, which allows the class to share information of its private properties with other classes or functions declared in the same scope (analogous to "friend" classes in C++).
// Static initialization blocks are a special type of code block that is executed only once, when the class is first loaded by the JavaScript engine. They are primarily used to initialize static properties and perform other setup tasks that need to be done before any instances of the class are created.
// Any static initialization of a super class is performed first, before that of its sub classes.
// The scope of the variables declared inside the static block is local to the block. This includes var, function, const, and let declarations. var declarations will not be hoisted out of the static block.
var y = "Outer y";

class A {
  static field = "Inner y";
  static {
    console.log(y); // undefined <-- not 'Outer y'

    var y = this.field;
  }
}

// var y defined in static block is not hoisted
// outside the block
console.log(y); // 'Outer y'

// The 'this' inside a static block refers to the constructor object of the class. super.property can be used to access static properties of the super class. Note however that it is a syntax error to call super() in a class static initialization block, or to use the arguments object.

// Multiple blocks
// The code below demonstrates a class with static initialization blocks and interleaved static field initializers. The output shows that the blocks and fields are evaluated in execution order.
class MyClass3 {
  static field1 = console.log("static field1");
  static {
    console.log("static block1");
  }
  static field2 = console.log("static field2");
  static {
    console.log("static block2");
  }
}
// 'static field1'
// 'static block1'
// 'static field2'
// 'static block2'

// Note that any static initialization of a super class is performed first, before that of its sub classes.

// Using 'this' and 'super'
// The 'this' inside a static block refers to the constructor object of the class. This code shows how to access a public static field.
class A3 {
  static field = "static field";
  static {
    console.log(this.field);
  }
}
// output: 'static field'

// The 'super.property' syntax can be used inside a static block to reference static properties of a super class.
class B3 extends A3 {
  static {
    console.log(super.field);
  }
}
// output: 'static field'

// Key characteristics of static initialization blocks:
// Execution timing: They are executed before any instance of the class is created.
// Scope: They have access to static properties and methods of the class.
// Syntax: They are enclosed within curly braces {} and preceded by the static keyword.
class ClassWithSIB {
  static {
    // …
  }
}

// Multiple static blocks can be declared, and these can be interleaved with the declaration of static fields and methods (all static items are evaluated in declaration order).

// Methods
// Methods are defined on the prototype of each class instance and are shared by all instances. Methods can be plain functions, async functions, generator functions, or async generator functions. For more information, see method definitions.

// Static methods and fields
// The static keyword defines a static method or field for a class. Static properties (fields and methods) are defined on the class itself instead of each instance. Static methods are often used to create utility functions for an application, whereas static fields are useful for caches, fixed-configuration, or any other data that doesn't need to be replicated across instances.

// Field declarations
// With the class field declaration syntax, the constructor example can be written as:
class Circle2 {
  // class fields
  radius = 4;
  pi;
  // A constructor
  // The constructor method is a special method of a class for creating and initializing an object instance of that class.

  // There are some additional syntax restrictions:
  // A class method called constructor cannot be a getter, setter, async, or generator.
  // A class cannot have more than one constructor method.
  // The constructor follows normal method syntax, so parameter default values, rest parameters, etc. can all be used.
  constructor(radius) {
    this.radius = radius;
    this.pi = pi;
  }
}
// Using 'new' on a class goes through the following steps:

// 1. (If it's a derived class) The constructor body before the super() call is evaluated. This part should not access 'this' because it's not yet initialized.
// 2. (If it's a derived class) The super() call is evaluated, which initializes the parent class through the same process.
// 3. The current class's fields are initialized.
// 4. The constructor body after the super() call (or the entire body, if it's a base class) is evaluated.

// Polymorphism
// Overriding and Extending: Sub classes can override properties or methods inherited from the parent class by defining their own versions with the same name. This allows for customization and specialization of behavior. Additionally, sub classes can extend the parent class's functionality by adding new properties or methods.

// Class fields are similar to object properties, not variables, so we don't use keywords such as 'const' to declare them. In JavaScript, private properties use a special identifier syntax, so modifier keywords like 'public' and 'private' should not be used either.
// As seen above, the fields can be declared with or without a default value. Fields without default values default to undefined. By declaring fields up-front, class definitions become more self-documenting, and the fields are always present, which help with optimizations.

// Private properties
// Using private fields, the definition can be refined as below.
// It's an error to reference private fields from outside of the class; they can only be read or written within the class body. By defining things that are not visible outside of the class, you ensure that your classes' users can't depend on internals, which may change from version to version.
// In JavaScript, private properties are declared using the # prefix. This syntax ensures that these properties are only accessible within the class itself and its methods. This is known as encapsulation, a core principle of object-oriented programming that helps protect the internal state of an object and prevents unauthorized access.

// Private fields can only be declared up-front in a field declaration. They cannot be created later through assigning to them, the way that normal properties can.
class Rectangle2 {
  #height = 0;
  #width;
  constructor(height, width) {
    this.#height = height;
    this.#width = width;
  }
}

// Inheritance
// The 'extends' keyword is used in class declarations or class expressions to create a class as a child of another constructor (either a class or a function).
class Animal2 {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog2 extends Animal2 {
  // If there is a constructor present in the subclass, it needs to first call super() before using this. The super keyword can also be used to call corresponding methods of super class.
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }

  // speak() is overridden in subclass. This is action is called 'Polymorphism'.
  speak() {
    console.log(`${this.name} barks.`);
  }
}

const d = new Dog2("Mitzie");
d.speak(); // Mitzie barks.

// Evaluation order
// When a class declaration or class expression is evaluated, its various components are evaluated in the following order:

// 1. The extends clause, if present, is first evaluated. It must evaluate to a valid constructor function or null, or a TypeError is thrown.
// 2. The constructor method is extracted, substituted with a default implementation if constructor is not present. However, because the constructor definition is only a method definition, this step is not observable.
// 3. The class elements' property keys are evaluated in the order of declaration. If the property key is computed, the computed expression is evaluated, with the 'this' value set to the 'this' value surrounding the class (not the class itself). None of the property values are evaluated yet.
// 4. Methods and accessors are installed in the order of declaration. Instance methods and accessors are installed on the prototype property of the current class, and static methods and accessors are installed on the class itself. Private instance methods and accessors are saved to be installed on the instance directly later. This step is not observable.
// 5. The class is now initialized with the prototype specified by extends and implementation specified by constructor. For all steps above, if an evaluated expression tries to access the name of the class, a ReferenceError is thrown because the class is not initialized yet.
// 6. The class elements' values are evaluated in the order of declaration:
  // For each instance field (public or private), its initializer expression is saved. The initializer is evaluated during instance creation, at the start of the constructor (for base classes) or immediately before the super() call returns (for derived classes).
  // For each static field (public or private), its initializer is evaluated with 'this' set to the class itself(className.classField), and the property is created on the class.
// Static initialization blocks are evaluated with 'this' set to the class itself.
// 7. The class is now fully initialized and can be used as a constructor function.

// Examples
// Binding 'this' with instance and static methods
// When a static or instance method is called without a value for 'this', such as by assigning the method to a variable and then calling it, the this value will be undefined inside the method. This behavior is the same even if the "use strict" directive isn't present, because code within the class body is always executed in strict mode.
class Animal3 {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

const object5 = new Animal3();
object5.speak(); // the Animal3 object
const speak = object5.speak;
speak(); // undefined

Animal3.eat(); // class Animal3
const eat = Animal3.eat;
eat(); // undefined

// G. extends
// The extends keyword is used in class declarations or class expressions to create a class that is a child of another class.
// Ex: class ChildClass extends ParentClass { /* … */ }

class ParentClass4 {}
class ChildClass4 extends ParentClass4 {}

// Allows inheritance of static properties
Object.getPrototypeOf(ChildClass4) === ParentClass4;
// Allows inheritance of instance properties
Object.getPrototypeOf(ChildClass4.prototype) === ParentClass4.prototype;

// Species
// You might want to return Array objects in your derived array class MyArray. The species pattern lets you override default constructors.

// For example, when using methods such as Array.prototype.map() that return the default constructor, you want these methods to return a parent Array object, instead of the MyArray object. The Symbol.species symbol lets you do this:
class MyArray extends Array {
  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() {
    return Array;
  }
}

const a = new MyArray(1, 2, 3);
const mapped = a.map((x) => x * x);

console.log(mapped instanceof MyArray); // false
console.log(mapped instanceof Array); // true

// Mix-ins
// Abstract subclasses or mix-ins are templates for classes. A class can only have a single superclass, so multiple inheritance from tooling classes, for example, is not possible. The functionality must be provided by the superclass.
// A mix-in is a technique in object-oriented programming that allows you to add new methods or properties to an existing object or class without creating a new subclass. This is particularly useful when you want to share common functionality across multiple objects or classes without creating a complex inheritance hierarchy.

// A function with a superclass as input and a subclass extending that superclass as output can be used to implement mix-ins:
const calculatorMixin = (Base) =>
  class extends Base {
    calc() {}
};

const randomizerMixin = (Base) =>
  class extends Base {
    randomize() {}
};
// A class that uses these mix-ins can then be written like this:
class Foo {}
class Bar extends calculatorMixin(randomizerMixin(Foo)) {} // Foo is the superclass

// More class mix-ins example

// Step 1. Create a Mix-in Class:
// Define a class that contains the methods or properties you want to mix in.
// Example:
class Mixin {
  greet() {
      console.log('Hello!');
  }
}

// Step 2. Extend the Target Class:
// Create a new class that extends the target class you want to modify.
// Inside the constructor, use Object.assign() to apply the mix-in methods to the instance.
// Example:
class Person {
  constructor(name) {
      this.name = name;
  }
}

class GreetingPerson extends Person {
  constructor(name) {
      super(name);
      Object.assign(this, new Mixin());
  }
}

// Step 3. Use the Mix-in Methods:
// Create an instance of the extended class and call the mix-in methods.
// Example:
const personA = new GreetingPerson('Alice');
personA.greet(); // Output: Hello!

// Avoiding inheritance
// Inheritance is a very strong coupling relationship in object-oriented programming. It means all behaviors of the base class are inherited by the subclass by default, which may not always be what you want. For example, consider the implementation of a ReadOnlyMap:
class ReadOnlyMap extends Map {
  set() {
    // throw new TypeError("A read-only map must be set at construction time.");
  }
}
// It turns out that ReadOnlyMap is not constructible, because the Map() constructor calls the instance's set() method.
const m = new ReadOnlyMap([["a", 1]]); // TypeError: A read-only map must be set at construction time.