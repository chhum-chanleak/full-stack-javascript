// 1. Defining a module
(function() {
  
  // Declare private variable and/or functions

  return {
    // Declare public variable and/or functions
  }
})();

const HTMLChanger =(() => {
  const contents = 'contents';

  const changeHTML = () => {
    const element = document.querySelector('.module-pattern');

    element.textContent = contents;
  };

  const writeToDOM = (selector, message) => {
    const div = document.querySelector(selector);

    div.textContent = message;
  };

  return {
    callChangeHTML: function () {
      changeHTML();
      console.log(contents);
    },
    writeToDOM
  };
})();

HTMLChanger.callChangeHTML(); // output: 'contents';
HTMLChanger.contents; // undefined
HTMLChanger.writeToDOM('.module-pattern', 'Hello, world!'); // .module-pattern.textContent = 'Hello, world!';

// 2.Revealing module pattern
const Exposer = (() => {
  let privateVariable = 10;

  const privateMethod = () => {
    console.log("Inside a private method!");
    privateVariable += 1;
  };

  const methodToExpose = () => {
    console.log("This is a method I want to expose!");
  };

  const anotherMethodIWantToExpose = () => {
    privateMethod();
  };

  const getPrivateVariable = () => privateVariable;

  return {
    first: methodToExpose,
    second: anotherMethodIWantToExpose,
    getPrivateVariable
  }
})();

Exposer.first(); // output: This is a method I want to expose!
Exposer.second(); // output: Inside a private method!
Exposer.getPrivateVariable(); // output: 11
Exposer.methodToExpose; // output: undefined

// Another example
const createSupplier = (() => {
  const name = "General Motors";
  const field = 'automobile';
  const year = "2001"; 

  // Private method
  const getSupplierYear = () => year;

  return {
    name,
    field,
    getYear: getSupplierYear,
  }
})();

createSupplier.name; // output: "General Motors";
createSupplier.field; // output: "automobile"
createSupplier.year; // output: undefined
createSupplier.getYear(); // output: '2001'

