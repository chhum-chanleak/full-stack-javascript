// 1. Closures
const outer = () => {
  let outerVar = 'Hey, I am the OUTER var.'; // Private variable

  const inner = () => {
    const innerVar = "Hey, I am an INNER var.";

    console.log(innerVar);
    console.log(outerVar);
  };

  return inner;
};

const innerFn = outer();
innerFn();
// Examples of closures
const createGreeting = (greeting = '') => {
  const myGreet = greeting.toUpperCase();

  // This function references a variable(myGreet) that was created in the outer function
  // (createGreeting) scope, that is what is referred to as 'closure'.
  return (name) => `${myGreet} ${name}`; 
};

const SayHello = createGreeting('hello');

SayHello('Chhum'); // output: HELLO chhum;

// 2. Private variables
const createGame = (gameName) => {
  let score = 0;

  const win = () => {
    score += 1;
    return `Your ${gameName} score is ${score}.`;
  };
  return win;
};

const hockeyGame = createGame('Hockey');

hockeyGame(); // output: Your Hockey score is 1.

const footballGame = createGame('football');

footballGame(); // output: Your Hockey score is 1.
footballGame(); // output: Your Hockey score is 2.