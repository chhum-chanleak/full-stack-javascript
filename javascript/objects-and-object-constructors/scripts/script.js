// Object constructor
function Person(name, age) {
  this.name = name,
  this.age = age,

  this.greet = function() {
    console.log(`Hello, my name is ${this.name}, I am ${this.age} years old.`);
  }
}
// Object constructor exercise
function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.info = function() {
    console.log(`${title} by ${author}, ${pages} pages, ${read}.`)
  }
}

const book = new Book('The lord of the ring', 'J.R.R. Tolkien', 295, 'Not read yet');
// All objects created using Book constructor will inherit sayHello();
Book.prototype.sayHello = () => {
  console.log('Hello, I am a book.');
};
book.sayHello();

const Cherry = new Person('Cherry', 29);

for (const prop in Cherry) {
  console.log(prop);
}

// Object as a design pattern

// Example one
const playerOneName = 'tim';
const playerTwoName = 'jenn';
const playerOneMarker = 'X';
const playerTwoMarker = 'O';
// Example two
const playerOne = {
  name: 'tim',
  marker: 'X'
};
const playerTwo = {
  name: 'jenn',
  marker: 'O'
};
const gameOver = ({name: winningPlayer}) => {
  console.log('Congratulations!');
  console.log(`${winningPlayer} is the winner!`);
};

// The prototype
console.log(Object.getPrototypeOf(Book.prototype) === Object.prototype); // true
Book.prototype.hasOwnProperty('valueOf'); // false
book.hasOwnProperty('valueOf'); // false
Object.prototype.hasOwnProperty('valueOf'); // true
const fruits = ['Apple', 'Banana', 'Watermelon', 'Orange'];
fruits.hasOwnProperty(3); //true
fruits.hasOwnProperty(4); // true
fruits.hasOwnProperty(5); // false

// Using hasOwnProperty to test for an own property's existence
const example = {};

example.hasOwnProperty('prop'); // false
example['prop'] = 'exist';
example.hasOwnProperty('prop'); // true (prop: 'exist)
// Direct vs. inherited properties
example.test = 'passed';
example.hasOwnProperty('test') // true
// The `in` operator will return true for direct or inherited properties:
'prop' in example; // true
'toString' in example; // true
'hasOwnProperty' in example; // true
// Iterating over the properties of an object
const buz = {
  fog: 'stack'
};

for (const prop in buz) {
  if (buz.hasOwnProperty(prop)) {
    console.log(`This is fog (${prop}) for sure. Value: ${buz[prop]}`);
  } else {
    console.log(prop); // toString or something else
  }
}
// Using hasOwnProperty as a property name
const foo = {
  hasOwnProperty() {
    return false;
  },
  bar: 'Here be dragons.'
};
foo.hasOwnProperty('bar'); // Re-implementation always returns false
// Use Object.hasOwn() method - recommended
Object.hasOwn(foo, 'bar'); // true
// Use the hasOwnProperty property from the Object prototype
Object.prototype.hasOwnProperty.call(foo, 'bar'); // true
// Use another Object's hasOwnProperty
// and call it with 'this' set to foo
({}).hasOwnProperty.call(foo, 'bar'); // true

// Objects created with Object.create(null) do not inherited from Object.prototype
const quux = Object.create(null);
quux['prop'] = 'exist';
// quux.hasOwnProperty('prop'); // Uncaught TypeError: quux.hasOwnProperty is not a function
// Use Object.hasOwn() instead
Object.hasOwn(quux, 'prop');

// Recommended method for prototypal inheritance
Person.prototype.sayName = function() {
  console.log(`Hello, I'm ${this.name}!`);
};

Book.prototype.getAuthor = function() {
  console.log(`The author of the book is ${this.author}`);
}
// Make Person objects inherit from Book
Object.setPrototypeOf(Person.prototype, Book.prototype);
// Don't do this!
// Person.prototype = Book.prototype'
