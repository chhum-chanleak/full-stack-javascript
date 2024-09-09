// 1. Global variable ===> Try your best to avoid creating global variables.
const first = 'wes';
let second = 'bos';
var age = 100;

// Works with window.sayHi();
function sayHi() {
  console.log('hi');
}
// sayHi2() and sayHi3() not work with window.sayHi2(); because of const
const sayHi2 = function() {
  console.log('hi2');
};

const sayHi3 = () => {
  console.log('hi3');
};

// 2. Functions scoping
const functionScoping = () => {
  // Private variable that can only be accessed by go() and getAge();.
  const age = 100;

  const go = () => {
    // You can name variables the same thing when they are NOT in the same scope, but it's not a good idea.
    const goAge = 200;
    const hair = 'blonde';

    console.log(hair);
    console.log(goAge);
  };

  const getAge = () => age;

  return { go, getAge };
};

const functionScope = functionScoping();
// output: 'blonde'
// 100
functionScope.go();
functionScope.getAge(); // output: 100
functionScope.age; // output: undefined

// 3. Block scoping
const blockScoping = () => {
  // const
  // Will throw a ReferenceError when called because const is a block scope.
  const konst = () => {
    if (1 === 1) {
      const cool = true;
    }
    console.log(cool);
  };

  // var
  // output: true. Because any variable created using var is a function scope.
  const war = () => {
    if (2 === 2) {
      var cool = true;
    }
    console.log(cool);
  };

  // let
  // output: true
  const lete = () => {
    let cool;

    if (3 === 3) {
      cool = true;
    }
    console.log(cool);
  };

  return { konst, war, lete };
};

const blockScope = blockScoping();

// blockScope.konst(); // Will throw a ReferenceError
blockScope.war(); // output: true
blockScope.lete(); // output: true

// var is a function scope. You can access any variable you created using 'var' anywhere in the function.
const isCool = (name) => {
  if (name === 'wes') {
    if (1 === 1) {
      var cool = true;
    }
  }
  // output: true. Even if 'var cool' is in a nested block.
  console.log(cool);
};

isCool('wes'); // output: true
isCool('noWes'); // output: undefined

// Which dog? Snickers or Sunny?
const dog = 'Snickers';

const logDog = () => {
  console.log(dog);
};

const go = () => {
  const dog = 'Sunny';

  logDog();
};

go(); // output: 'Snickers'