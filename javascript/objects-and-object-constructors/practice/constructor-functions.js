// Initialize a constructor function for a new Hero
function Hero(name, level) {
  this.name = name;
  this.level = level;
}
const hero1 = new Hero('Ant', 1);

// Add greet method to the Hero prototype
Hero.prototype.greet = function() {
  console.log(`${this.name} says hello.`);
}

// Initialize Warrior constructor
function Warrior(name, level, weapon) {
  // Copy over properties from Hero into Warrior
  Hero.call(this, name, level);

  // Add new property
  this.weapon = weapon;
}
Warrior.prototype.attack = function() {
  console.log(`${this.name} attacks with the ${this.weapon}.`);
}

// Initialize Healer constructor
function Healer(name, level, spell) {
  // Copy over properties from Hero into Healer
  Hero.call(this, name, level);
  
  // Add new property
  this.spell = spell;  
}
Healer.prototype.heal = function() {
  console.log(`${this.name} casts ${this.spell}`);
}

const hero2 = new Warrior('Bee', 1, 'stinger');
const hero3 = new Healer('Cat', 1, 'purr');

Object.setPrototypeOf(Warrior.prototype, Hero.prototype);
Object.setPrototypeOf(Healer.prototype, Hero.prototype);