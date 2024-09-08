// Working with prototype
const animal = {
  jumps: null
};
const rabbit = {
  jumps: true
};

Object.setPrototypeOf(rabbit, animal);

console.log(rabbit.jumps); // output: true
delete rabbit.jumps;
console.log(rabbit.jumps); // output: null
delete animal.jumps;
console.log(rabbit.jumps); // output: undefined

// Searching algorithms
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

pockets.pen; // output: 3. Found in table
bed.glasses; // output: 1. Found in head.

// Getting glasses as pockets.glasses vs. head.glasses use relatively the same speed.

// Where does it write?
const animal2 = {
  eat() {
    this.full = true;
  }
};
const rabbit2 = {};

// Make rabbit2 inherit animal2
Object.setPrototypeOf(rabbit2, animal2);

// rabbit2 will get this.full = true because eat() references in animal2, but this.full = true is et in rabbit2 after eat() finishes executing.
rabbit2.eat();

// Why are both hamsters full?
const hamsters = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  }
};

const speedy = {
  stomach: [],
};

Object.setPrototypeOf(speedy, hamsters);

const lazy = {
  stomach: [],
};

Object.setPrototypeOf(lazy, hamsters);

speedy.eat('apple');
speedy.stomach; // ['apple']
lazy.stomach; // []
