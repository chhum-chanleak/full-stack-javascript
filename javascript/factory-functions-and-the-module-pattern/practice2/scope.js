// 1. Global variable ===> Try your best to avoid creating global variables.
const first = 'wes';
let second = 'bos';
var age = 100;
// Works with window.sayHi();.
function sayHi() {
  console.log('hi');
}
// Does not work with window.sayHi2(); because of const
const sayHi2 = () => {
  console.log('hi2');
};

// 2. Functions scoping
const functionScoping = () => {
  // Private variable that can only be access to go() and getAge();.
  const age = 100; 
  
  const go = () => {
    // You can name variables the same thing , if they are NOT in the same scope, but it's not a good idea.
    const goAge = 200;
    const hair = 'blonde';

    console.log(hair); // output: 'blonde'
    console.log(goAge); // output: 200
  };

  const getAge = () => {
    return age;
  };

  return {go, getAge};
};

const functionScope = functionScoping();

functionScope.go(); // output: 'blonde' 200;
functionScope.getAge(); // output: 100

// 3. Block scoping

const blockScoping = () => {
  //const
  // Will throw a ReferenceError when called.
  const konst = () => { 
    if (1 === 1) {
      const cool = true;
    }
    console.log(cool); // Throws a ReferenceError
  };

  // var
  // output: true. 
  const war = () => {
    if (2 === 2) {
      var cool = true;
    }
      // output: true. Because any variable created using var is a function scope
      console.log(cool);
  };

  // let
  const lete = () => {
    let cool;

    if (3 === 3) {
      cool = true;
    }
    console.log(cool); // output: true
  };

  return { konst, war, lete };
};

const blockScope = blockScoping();

blockScope.war(); // output: true
//blockScope.konst(); // Throws a ReferenceError
blockScope.lete(); // output: true

// var is a function scope. You can access any variable you create using 'var' anywhere in the function.
const isCool = (name) => {
  if (name === 'wes') {
    if (1 === 1) {
      var cool = true;
    }
  }
  // output: true. Even if 'var cool' is in a nested block.
  console.log(cool);
};

// Which dog? Snickers or Sunny?
const dog = 'Snickers';

const logDog = () => {
  // output: 'Snickers'
  console.log(dog);
};

// output: 'Snickers'
const go = () => {
  const dog = 'Sunny';

  // output: 'Snickers'
  logDog();
};

go(); // output: 'Snickers'
