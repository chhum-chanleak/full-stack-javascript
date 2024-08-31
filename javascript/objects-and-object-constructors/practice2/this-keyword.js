// What is this keyword?
const counter = {
  count: 0,
  next() {
    return this.count += 1;
  }
};
counter.next();
counter.count; // 1

const firstCounter = Object.create(counter);
firstCounter.next();
firstCounter.count; // 2

// Global context
this === window; // true
this.color = 'Red';
window.color; // 'Red'

// Function context
// 1. Simple function invocation
function show() {
  console.log(this === window); // true
}
// 'use strict' mode
function show2() {
  'use strict';
  console.log(this === undefined); // Should be 'true'
}

show2(); // true

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
    return this.brand;
  }
};
car.getBrand(); // Honda

const brand = car.getBrand;
brand(); // undefined

const brand2 = car.getBrand.bind(car);
brand2(); // Honda

const bike = {
  brand: 'Harley Davidson'
};

const brand3 = car.getBrand.bind(bike);
brand3(); // 'Harley Davidson'
// 3. Constructor invocation
function Car(brand) {
  // Make sure Car() is always invoked using constructor invocation
  if (!new.target) {
    throw new Error('Must use the "new" operator to call the function.');
  }
  this.brand = brand;
}

Car.prototype.getBrand = function() {

  return this.brand;
};

const car2 = new Car('Yamaha');
car2.getBrand(); // Yamaha;
// 4. Indirect Invocation
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
const getThis = () => this;
getThis() === window; // true

function Car3() {
  this.speed = 120;
} 

Car3.prototype.getSpeed = () => this.speed;

const car3 = new Car3();
car3.getSpeed(); // Returns 'undefined' because getSpeed() is defined using arrow function

// Fix
Car3.prototype.getSpeed2 = function() {
  return this.speed;
};

car3.getSpeed2(); // 120
        

        