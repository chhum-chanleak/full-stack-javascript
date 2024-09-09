// 1. Closures
const outer = () => {
  // Private variable
  let outVar = 'Hey, I am the OUTER var.';

  const inner = () => {
    const innerVar = "Hey, I am an INNER var.";

    console.log(innerVar);
    console.log(outVar);
  };

  return { inner };
};

const innerFn = outer();
// output: Hey, I am an INNER var.
// Hey, I am the OUTER var.
innerFn.inner();

// Examples of closures
const createGreeting = (greeting = '') => {
    const myGreet = greeting.toUpperCase();
    // This function references a variable(myGreet) that was created in the outer function(createGreeting) scope, that is what is referred to as  'closure'.
    return (name) => `${myGreet} ${name}.`;
};

const sayHowdy = createGreeting('Howdy');

sayHowdy('Chhum'); // output: 'HOWDY Chhum.'

// 2. Private variables
const createGame = (gameName) => {
  let score = 0; // Private variable

  const win = () => {
    score += 1;

    return `Your ${gameName} score is ${score}.`;
  };
  return { win };
};

const hockeyGame = createGame('Hockey');
const footballGame = createGame('Football');

hockeyGame.win(); // output: 'Your Hockey score is 1.'
footballGame.win(); // output: 'Your Football score is 2.'