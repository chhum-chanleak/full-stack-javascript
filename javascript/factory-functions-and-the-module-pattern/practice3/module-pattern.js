// 1. Defining a module
(function() {
  
  // Declare private variables and/or functions

  return {
    // Declare public variables and/or functions
  };
})();

const HTMLChanger = (() => {
  const contents = 'contents';

  const changeHTML = () => {
    const element = document.querySelector('.module-pattern');

    element.textContent = contents;
    console.log(contents);
  };

  const writeToDom = (selector, message) => {
    const div = document.querySelector(selector);

    div.textContent = message;
  };

  return {
    callChangeHTML: changeHTML,
    writeToDom,
  }
})();

HTMLChanger.callChangeHTML(); // output: 'contents'
HTMLChanger.contents; // output: undefined
HTMLChanger.writeToDom('.module-pattern', 'Hello, world!'); // .module-pattern.textContent = 'Hello, world!';

// 2. Revealing module pattern
const Exposer = (() => {
  let privateVariable = 10;

  const privateMethod = () => {
    console.log("Inside a private method.");
    privateVariable += 1;
  };

  const methodToExpose = () => {
    console.log("This is a method I want to expose.");
  };

  const anotherMethodIWantToExpose = () => {
    privateMethod();
  };

  const getPrivateVariable = () => privateVariable;

  return {
    first: methodToExpose,
    second: anotherMethodIWantToExpose,
    getPrivateVariable,
  };
})();

Exposer.first(); // output: "This is a method I want to expose."
Exposer.second(); // output: "Inside a private method."
Exposer.getPrivateVariable(); // output: 11
Exposer.methodToExpose; // output: undefined

// Another example
const createSupplier = (() => {
  const name = "General Motors";
  const field = "automobile";
  const year = "2001"

  const getSupplierYear = () => year;

  return {
    name,
    field,
    getYear: getSupplierYear,
  };
})();

createSupplier.name; // output: "General Motors"
createSupplier.field; // output: "automobile"
createSupplier.year; // output: undefined
createSupplier.getYear(); // output: '2001'
