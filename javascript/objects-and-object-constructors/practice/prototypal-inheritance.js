// Working with prototype
const animal = {
  jumps: null,
};
const rabbit = {
  __proto__: animal,
  jumps: true,
};
console.log(rabbit.jumps); // true
delete rabbit.jumps;

console.log(rabbit.jumps); // null
delete animal.jumps;

console.log(rabbit.jumps); // undefined

// Searching algorithm
const head = {
  glasses: 1
};

const table = {
  pen: 3
};
Object.setPrototypeOf(table, head);

const bed = {
  sheet: 1,
  pillow: 2
};
Object.setPrototypeOf(bed, table);

const pockets = {
  money: 2000
};
Object.setPrototypeOf(pockets, bed);
// In modern engines, performance-wise, there’s no difference whether we take a property from an object or its prototype

// Where does it write?
const animal2 = {
  eat() {
    this.full = true;
  }
};

const rabbit2 = {

};
Object.setPrototypeOf(rabbit2, animal2);
rabbit2.eat(); // rabbit2 receives the full property because 'this' is an object before the dot(.)

// Why are both hamsters full?
const hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

const speedy = {};
const lazy = {};

Object.setPrototypeOf(speedy, hamster);
Object.setPrototypeOf(lazy, hamster);

// This one found the food
speedy.eat('apple'); // speedy = { stomach: ['apple']}'

// This one also has it, why? Fix please.
lazy.stomach // apple

// Fix
const hamster2 = {
  stomach: [],

  eat(food) {
    // assign to this.stomach instead of this.stomach.push
    this.stomach = [food];
  }
};
const speedy2 = {};
const lazy2 = {};
Object.setPrototypeOf(speedy2, hamster2);
Object.setPrototypeOf(lazy2, hamster2);

speedy2.eat('dates');

speedy.stomach // ['date']
lazy2.stomach // []
