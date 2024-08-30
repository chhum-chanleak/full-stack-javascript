// constructor functions

// Initialize a constructor function for a new Hero
const Hero = function(name, level) {
  this.name = name,
  this.level = level
};

const hero1 = new Hero('Ant', 1);

Object.getPrototypeOf(hero1) === Hero.prototype; // true

// Add greet method to the Hero prototype
Hero.prototype.greet = function() {
  console.log(`${this.name} says hello.`);
};

hero1.greet(); // 'Ant says hello.'

// Initialize Warrior constructor
const Warrior = function(name, level, weapon) {
  // Chain constructor with call()
  Hero.call(this, name, level);

  // Add a new property
  this.weapon = weapon;
};

Warrior.prototype.attack = function() {
  return `${this.name} attacks with the ${this.weapon}`;
};

const hero2 = new Warrior('Bee', 1, 'Stinger');

// Initialize Healer constructor
const Healer = function(name, level, spell) {
  // Chain constructor with call()
  Hero.call(this, name, level);

  // Add a new property
  this.spell = spell;
};

Healer.prototype.heal = function() {
  return `${this.name} casts ${this.spell}`;
};

const hero3 = new Healer('Cat', 1, 'Purr');

// Make Warrior and Heal inherit Hero
Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);

