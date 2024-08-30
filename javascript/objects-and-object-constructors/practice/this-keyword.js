// What is 'this' keyword?
let counter = {
  count: 0,

  next() {
    return this.count++;
  }
};

let antCounter = {

};

let beeCounter = {

};
// Make antCounter and beeCounter inherit counter
Object.setPrototypeOf(antCounter, counter);
Object.setPrototypeOf(beeCounter, counter);

antCounter.next();

antCounter.count; // count = 1;
beeCounter.count; // count = 0;

// Global context
this === window; // true

this.color = 'Red';
window.color; // 'Red'

// Function context

// 1. Simple function invocation
const show = () => {
  console.log(this === window);
};

show(); // true;

const show2 = () => {
  "use strict";
  console.log(this === undefined);
};

show2(); // should be 'true'

// 2. Method invocation
const car = {
  brand: 'Honda',

  getBrand() {
    return this.brand;
  }
};
car.getBrand(); // Honda

const brand = car.getBrand;
// You get undefined instead of 'Honda' because when you call a method without specifying its object.
// So Javascript sets 'this' to the global object.
brand(); // undefined

// Fix
const brand2 = car.getBrand.bind(car);

brand2(); // 'Honda'

const bike = {
  brand: 'Harley Davidson'
};

// Set 'this' to the bike object
const brand3 = car.getBrand.bind(bike);

brand3(); // 'Harley Davidson'

// 3. Constructor invocation
function Car(brand) {  
  // Make sure that the Car() function is always invoked using constructor invocation
  if (!(this instanceof Car)) {
    throw Error('Must use the "new" operator to call the function.');
  }
  this.brand = brand;
}

Car.prototype.getBrand = function() {
  return this.brand;
}

const car2 = new Car('Nissan');
car2.getBrand(); // 'Nissan'

// Detect whether a function is invoked as a simple invocation or as a constructor
function Car2(brand) {
  if (!new.target) {
    throw Error('Must use the new operator to call the function');
  }
  this.brand = brand;
}

// 4. Indirect invocation
const getBrand = function(prefix) {
  console.log(`${prefix} ${this.brand}.`);
};

const honda = {
  brand: 'Honda'
};

const audi = {
  brand: 'Audi'
};

getBrand.call(honda, "It's a");
getBrand.apply(audi, ["It's a"]);

// Arrow functions
const getThis = () => this;

getThis() === window; // true

// Since an arrow function does not create its own execution context, defining a method using an arrow function will cause an issue.
function Car3() {
  this.speed = 120;
}

Car3.prototype.getSpeed = () => {
  return this.speed;
};

const car3 = new Car3();

car3.getSpeed(); // undefined

// Fix
Car3.prototype.getSpeed2 = function() {
  return this.speed;
};