// What is this keyword?
const counter = {
  count: 0,

  next() {
    return this.count += 1;
  }
};

counter.next(); // output: 1
counter.count; // output: 1

const firstCounter = Object.create(counter);

firstCounter.next(); // output: 2
firstCounter.count; // output: 2

// Global context
this === window; // output: true
this.color = 'Red';
window.color; // output: 'Red'

// Function context
// 1. Simple function invocation
function show() {
  console.log(this === window); // output: true
}

show(); // output: true

// 'use strict' mode
function show2() {
  'use strict';
  console.log(this === undefined); // output: true
}

show2(); // output: true

function show3() {
  'use strict';
  console.log(this === undefined);

  function display() {
    console.log(this === undefined);
  }

  display();
}

show3(); // true, true

// 2. Method invocation
const car = {
  brand: 'Honda',

  getBrand() {
    return this.brand
  }
};

car.getBrand(); // output: 'Honda'

let brand = car.getBrand;
brand(); // output: undefined
// Create brand function using car.getBrand method.
brand = car.getBrand.bind(car);
brand(); // output: 'Honda'

const bike = {
  brand: 'Harley Davidson'
};

// Create brand2() using car.getBrand.bind() and use bike properties.
const brand2 = car.getBrand.bind(bike);
brand2(); // 'Harley Davidson'

// 3. Constructor invocation
function Car(brand) {
  // Make sure Car() is always invoked using constructor invocation.
  if (!new.target) {
    throw new Error ('Must use the "new" operator to call the function.');
  }
  this.brand = brand;
}

Car.prototype.getBrand = function() {
  return this.brand;
};

const car2 = new Car('Yamaha');

car2.getBrand(); // output: 'Yamaha'

// 4. Indirect invocation
function getBrand2(prefix) {
  console.log(`${prefix} ${this.brand}.`);
}

const honda = {
  brand: 'Honda'
};

const audi = {
  brand: 'Audi'
};

// Enable objects to use non-local function
getBrand2.call(honda, 'You have a');
getBrand2.call(audi, ['You have an']);

// Arrow functions
// 'this' is the 'window' object itself
const getThis = () => this; 

getThis() === window; // output: true

function Car2() {
  this.speed = 120;
}

Car2.prototype.getSpeed = () => this.speed;

const CAR2= new Car2();

CAR2.getSpeed(); // Returns 'undefined' because getSpeed() is defined using arrow function.

// Fix
Car2.prototype.getSpeed2 = function() {
  return this.speed;
}

CAR2.getSpeed2(); // 120

