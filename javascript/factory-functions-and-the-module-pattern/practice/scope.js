// 1. Global variables ===> Try your best to avoid creating global variables
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

  const age = 100; // private variable that can only be accesses to go() and getAge()

  const go = () => {
    const goAge = 200; // You can name variables the same thing, if they are NOT in the same scope, but it's not a good idea.
    const hair = 'blonde';
    console.log(hair); // hair
    console.log(goAge); // 200
  };

  const getAge = () => {
    return age;
  };

  return {getAge, go};
};

const functionScope = functionScoping();

functionScope.go(); // hair 200
functionScope.getAge(); // 100

// 3. Block scoping

const blockScoping = () => {
  // const
  const konst = () => { // Will throw a ReferenceError when called.

    if(1 === 1) {
      const cool = true;
    }
    console.log(cool); // Throws a ReferenceError
  };

    // var
  const war = () => { // true, when called.
    if (2 === 2) {
      var cool = true;
    }
    console.log(cool); // true, because any variable created using var is a function scope
  };

  // let
  const lete = () => { // Will throw a ReferenceError when called.
    let cool;

    if (3 === 3) {
      cool = true;
    }
    console.log(cool); // true;
  };

  return {konst, war, lete};
};

const blockScope = blockScoping();
blockScope.war();

// var is a function scope. You can access any variable you created using 'var' anywhere in the function.
const isCool = (name) => {
  if (name === 'wes') {
    if (1 === 1) {
      var cool = true;
    }
  }
  console.log(cool); // true, even if 'var cool is' in a nested block.
};

// Which dog? Snickers or Sunny?
const dog = 'snickers';

const logDog = () => {
  console.log(dog); // Snickers
};

const go = () => {
  const dog = 'Sunny';

  logDog(); // Snickers
};

go(); // Snickers

// 4. Lexical and static scoping
const greet = (name) => {

  const yell = () => {
    console.log(name.toUpperCase());
  };

  return {yell};
};

const greetApple = greet('apple');


