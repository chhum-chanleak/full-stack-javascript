// 1. The "class" syntax
class MyClass {
  // Class methods
  constructor() {}
  method1() {}
  method2() {}
  method3() {}
  // ...
}

// Example
class User {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    console.log(this.name);
  }
}

// New object(user) is created.
const user = new User("notJon");

user.sayHi(); // output: notJon

// 2. What is a class?
typeof User; // output: function

// output: true
User.prototype.constructor === User;

// output: sayHi() {
//   console.log(this.name);
// }
User.prototype.sayHi; 

// There are exactly two methods in the prototype.
Object.getOwnPropertyNames(User.prototype); // output: ['constructor', 'sayHi']

// 3. Not just a syntactic sugar
// A function created by class is labelled by a special internal property [[IsClassConstructor]]: true.

// TypeError: Class constructor User cannot be invoked without 'new'
try {
  User();
} catch(error) {
  console.log(error);
}

// output: 
// class User {
//   constructor(name) {
//     this.name = name;
//   }

//   sayHi() {
//     console.log(this.name);
//   }
// }
User;

// 4. Class Expression
const otherClass =  class  MyClass{
  sayHi() {
    console.log(MyClass); // MyClass name is visible only inside the class.
  }
};

new otherClass().sayHi(); // Will output "class MyClass{}" definition.

// We can even make classes dynamically “on-demand”, like this:
function makeClass(phrase) {
  // Declare a class and return it.
  return class {
    sayHi() {
      console.log(phrase);
    }
  };
}

const Dog = makeClass("Woof woof");

new Dog().sayHi(); // output: "Woof woof";

// 5. Getters/setters
class Cat {
  constructor(name) {
    // Invoke the setter
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      console.log("Name is too short.");
      return;
    }
    this._name = value;
  }
}

let cat = new Cat("John");

cat.name; // output: "John"

cat = new Cat("");

// 6. Computed names [...]
class Bee {
  ["say" + "Hi"]() {
    console.log("Hello, world!");
  }
}

new Bee().sayHi(); // output: "Hello, world!"

// 7. Class fields
class Eel {
  name = 'Ego'; // Class field

  sayHi() {
    console.log(`Hello, ${this.name}`);
  }
}

const eel = new Eel();

eel.sayHi(); // output: "Hello, Ego"
eel.name; // output: "Ego"

// The important difference of class fields is that they are set on individual objects, not User.prototype
Eel.prototype.name // output: undefined

// We can also assign values using more complex expressions and function calls:
class Frog {
  // name = prompt("Name, please?", "John");
}

const frog = new Frog();

frog.name; // Activate a prompt for name

// 8. Making bound methods with class fields
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    console.log(this.value);
  }
}

const button = new Button("hello");

button.value; // output: 'hello'
button.click(); // output: 'hello'

// The problem is called "losing 'this'"
setTimeout(button.click, 1000); // output: undefined

// There are two approaches to fixing it:
// 1. Pass a wrapper-function, such as setTimeout(() => button.click(), 1000).
// 2. Bind the method to object, e.g. in the constructor.
class Keyboard {
  constructor(value) {
    this.value = value;
  }

  click = () => {
    console.log(this.value);
  };
}

const keyboard = new Keyboard('black');

keyboard.value; // output: "black"
keyboard.click(); // output: "black"
setTimeout(keyboard.click, 1000); // output: "black"

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

// Class
class anotherClock {
  // class fields
  timer = '';

  constructor({template}) {
    this.template = template;
  }

  render() {
    const date = new Date();

    const hours = date.getHours();
    // Example: 1 o'clock to 01 o'clock
    (hours < 0) && (hours = `${0}${hours}`);

    const mins = date.getMinutes();
    // Example: 01:2 min to 01:02
    (mins < 0) && (mins = `${0}${mins}`);

    const secs = date.getSeconds();
       // Example: 01:02:5 seconds to 01:02:05
    (secs < 0) && (secs = `${0}${secs}`);

    const output = this.template
    .replace('h', hours)
    .replace('m', mins)
    .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}

const clock = new anotherClock({template: 'h:m:s'});

clock.start(); // The starts ticking.
clock.stop(); // Stop the clock from ticking.