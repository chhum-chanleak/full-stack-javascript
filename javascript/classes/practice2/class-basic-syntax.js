// 1. The class syntax
class MyClass {
  // fields
  field;
  field2 = 'foo';
  field = 'bar';
  // Constructors
  constructor() {}
  method() {}
  method2() {}
  //...
}

// Example
// In JavaScript classes, the 'this' keyword refers to the current instance of the class. It's used to access and modify the properties and methods of the object being created.
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(`Hello, ${this.name}`);
  }
}

const Andy = new User('Andy');

// 2. What is a class?
typeof User; // output: function

User.prototype.constructor === User; // output: true

// output: sayHi() {
//   console.log(this.name);
// }
User.prototype.sayHi;

Object.getOwnPropertyNames(User.prototype); // output: ['constructor', 'sayHi'];

// 3. Not just a syntactic sugar
// A function created by a class is labeled by a special internal property [[IsClassConstructor]]: true;

// TypeError: Class constructor 'User' cannot be invoked without 'new' keyword.
try {
  User();
} catch(error) {
  console.log(error);
}

// 4. Class expression
const otherClass = class MyClass {
  sayHi() {
    console.log(MyClass); // MyClass name is visible only inside the class.
  }
};

new otherClass().sayHi(); // Will output "class MyClass{...}" definition.

// We can even make classes dynamically "on-demand", like this:
function makeClass(phrase) {
  // Declare a class and return it.
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

const Dog = makeClass('Woof woof');

// 5. Getters/setters
class Cat {
  constructor(name) {
    // Invoke the setter
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    return this._name = value;
  }
}

const cat = new Cat('John');

// 6. Computed names [...]
class Bee {
  ["say" + "Hi"]() {
    console.log("Hello, world!, Bee.");
  }
}

const bumble = new Bee();

// 7. Class fields
class Eel {
  name = 'Ego'; // Class field

  sayHi() {
    console.log(`Hello, this is ${this.name}`);
  }
}

const eel = new Eel();

// The important difference of class fields is that they are set on individual objects, not Eel.prototype
Eel.prototype.name // output: undefined

// We can also assign values using more complex expressions and function calls:
class Frog {
  // name = prompt("Name, please?", "John");
}

const frog = new Frog();

// 8. Making bound methods with class fields
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    console.log(this.value);
  }
}

const button = new Button("Alert");

// The problem is called "losing 'this'"
setTimeout(button.click, 1000); // output: undefined

// There are two approaches to fixing it:
// 1. Pass a wrapper-function, such as setTimeout(() => button.click(), 1000).
// 2. Bind the method to object, e.g. in the constructor.
class Keyboard {
  constructor(value) {
    this.value = value;
  }

  click = () => console.log(this.value);
}

const keyboard = new Keyboard("black");

// Exercise
// Rewrite the function below to class

// Function
// function Clock({ template }) {
  
//   let timer;

//   function render() {
//     let date = new Date();

//     let hours = date.getHours();
//     if (hours < 10) hours = '0' + hours;

//     let mins = date.getMinutes();
//     if (mins < 10) mins = '0' + mins;

//     let secs = date.getSeconds();
//     if (secs < 10) secs = '0' + secs;

//     let output = template
//       .replace('h', hours)
//       .replace('m', mins)
//       .replace('s', secs);

//     console.log(output);
//   }

//   this.stop = function() {
//     clearInterval(timer);
//   };

//   this.start = function() {
//     render();
//     timer = setInterval(render, 1000);
//   };

// }

// let clock = new Clock({template: 'h:m:s'});
// clock.start();

class Clock {
  timer;

  constructor({template}) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }

    let mins = date.getMinutes();
    if (mins < 10) {
      mins = `0${mins}`;
    }

    let secs = date.getSeconds();
    if (secs < 10) {
      secs = `0${secs}`;
    }

    const output = this.template
    .replace('h', `${hours}:`)
    .replace('m', `${mins}:`)
    .replace('s', secs);

    console.log(output);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }

  stop() {
    clearInterval(this.timer);
  }
}

const clock = new Clock({template: 'hms'});