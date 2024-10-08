// Closure
function makeAdding(firstNum) {
  // "first" is scoped within he makeAdding function
  const first = firstNum;

  return function resulting(secondNum) {
    // "second" is scoped within the resulting function
    const second = secondNum;
    return first + second;
  }
}

const add5 = makeAdding(5);
// add5 references to resulting function
console.log(add5(2));

// Closure 2
const makeAdder = (x) => {
  return (y) => {
    return x + y;
  }
};

const add1 = makeAdder(1);
console.log(add1(2));

// Practical closure
const makeSizer = (size) => {
  return () => {
    document.body.style.fontSize = `${size}px`;
  }
};

const buttons = document.querySelectorAll('button');
console.log(buttons);

for (let i = 0; i < buttons.length; i += 1) {
  const changeSize = makeSizer(+`${buttons[i].textContent}`);

  buttons[i].addEventListener('click', changeSize);
}

// Factory functions

//Constructor

// Function
function User(name) {
  this.name = name;
  this.discordName = `@${name}`;
}

// Class
class User2 {
  constructor(name) {
    this.name = name;
    this.discordName = `@${name}`;
  }
}

const user = new User('Ant');
const user2 = new User2('Bee');

console.log(user);
console.log(user2);

// Function(factory)
const createUser = (name) => {
  const discordName = `@${name}`;
  return {name, discordName};
};

// Destructuring

// Objects
const obj = {
  a: 1,
  b: 2
};
const {a, b} = obj;
// Arrays
const arr = [1, 2, 3, 4, 5];
const [zerothEle, firstEle] = arr;
let [x, y, ...rest] = [10, 20, 30, 40];
const obj2 = {
  a2: 1, 
  b2: {
    c2: 2
  }
};
// Binding and assignment
const { a2 } = obj2;
let {
  b2: {
    c2: d
  }
} = obj2;
let l, m, n;

([l, m, n] = arr);
({l, m, n = 4} = obj);
({l, m} = obj); // Properties' names do not match.

// Default value
const [a3 = 1] = []; // a3 = 1
const {b3 = 2} = {b3: undefined}; // b3 = 2
const {c = 2} = {c: null}; // c = null

// Rest property
const {a4, ...others} = {a4: 3, b4: 1, c4: 5};
const [first, ...others2] = [1, 2, 3];

// Array destructuring

// Basic variable assignment
const foo = ['one', 'two', 'three'];
const [red, yellow, green] = foo;

// Destructuring with more elements than the source
const bar = ['one', 'two'];
const [q, w, e] = bar;
// Swapping variables
let a5 = 1;
let b5 = 3;
const arr2 = [1, 2, 3];

[a5, b5] = [b5, a5];
[arr2[2], arr2[1]] = [arr2[1], arr2[2]];
// Parsing an array returned from a function
const f = () => [5, 2];
const [x1, y1] = f();
// Ignoring some returned values
const f1 = () => [5, 6, 7];
const [i, , p] = f1();
//Using a binding pattern as the rest property
const [a6, b6, ...{length}] = [1, 2, 3];
const [a7, b7, ...[c7, d7]] = [9, 8, 7, 6];
// Using array destructuring on any iterable
const [a8, b8] = new Map([[2, 4], [5, 7]]);

// Object destructuring

// Basic assignment
const user3 = {
  id: 42,
  ['isVerified']: true
};
const {id, isVerified} = user3;
// Assigning to new variable names
const o = {p2: 42, q2: true};
const {p2: foo2, q2: bar2} = o;
// Assigning to new variable names and providing default values
const {a9: aa = 10, b: bb = 5} = {a9: 3};
// Unpacking properties from objects passed as a function parameter
const user4 = {
  id: 42,
  displayName: 'jdoe',
  fullName: {
    firstName: 'Jane',
    lastName: 'Doe'
  }
};
const userId = ({id}) => id;
const userDisplayName = ({displayName: dName}) => dName;
const whoIs = ({displayName, fullName: {firstName: name}}) => `${displayName} is ${name}`;
// Setting a function parameter's default value
const drawChart = ({
  size = 'big',
  coords = {
    x: 0,
    y: 0
  },
  radius = 25
} = {}) => {
  console.log(size, coords, radius);
  // do some chart drawing
};
drawChart({
  coords: {
    x: 18, y: 30
  },
  radius: 30
});
// Nested object and array destructuring
const metadata = {
  title: "Scratchpad",
  translations: [
    {
      locale: "de",
      localizationTags: [],
      lastEdit: "2014-04-14T08:43:37",
      url: "/de/docs/Tools/Scratchpad",
      title: "JavaScript-Umgebung",
    },
  ],
  url: "/en-US/docs/Tools/Scratchpad",
};
const {
  title: englishTitle, // rename
  translations: [
    {
      title: localeTitle, // rename
    },
  ],
} = metadata;
// For of iteration and destructuring
const people = [
  {
    name: "Mike Smith",
    family: {
      mother: "Jane Smith",
      father: "Harry Smith",
      sister: "Samantha Smith",
    },
    age: 35,
  },
  {
    name: "Tom Jones",
    family: {
      mother: "Norah Jones",
      father: "Richard Jones",
      brother: "Howard Jones",
    },
    age: 25,
  },
];

for (const {
  name: n,
  family: {
    father: f
  }
} of people) {
  console.log(`Name: ${n}, Father: ${f}`);
}
// Computed object property names and destructuring
const key = 'z';
const {[key]: foo3} = {z: 'bar'};
// Invalid JavaScript identifier as a property name
const foo4 = {'fizz-buzz': true};
const {'fizz-buzz': fizzBuzz} = foo4;
// Destructuring primitive values
const {a10, toFixed} = 1; // undefined ƒ toFixed() { [native code] }
// Combined array and object destructuring
const props = [
  {id: 1, name: 'Fizz'},
  {id: 2, name: 'Buzz'},
  {id: 3, name: 'FizzBuzz'}
];
const [, , {name}] = props;
// The prototype chain is looked up when the object is deconstructed
const obj3 = {
  self: "123",
  __proto__: {
    prot: "456",
  },
};
const { self, prot } = obj3;

// Private variables and functions
const createUser2 = (name1) => {
  const discordName1 = `@${name1}`; // Private variable (surrounding state of closure)
  let reputation = 0; // Private variable (surrounding state of closure)
  const getReputation = () => reputation; // Closure
  const giveReputation = () => reputation++; // Closure

  return {name1, discordName1, getReputation, giveReputation};
};
const josh = createUser2('josh');
josh.giveReputation();
josh.giveReputation(); // { discordName: "@josh", reputation: 2 }

// Prototypal inheritance with factories
const createPlayer = (name, level) => {
  const {getReputation, giveReputation} = createUser2(name);

  const increaseLevel = () => level++;
  return {name, getReputation, giveReputation, increaseLevel};
};

// Object.assign();

// Use Object.assign to create a new object that has all user's properties and increaseLevel
const createPlayer2 = (name, level) => {
  const user = createUser2(name);

  const increaseLevel = () => level++;
  // {}(empty Object) is the target object, user(object) and {increaseLevel}(object) are the source object
  return Object.assign({}, user, {increaseLevel});
};

// Demo: Object.assign();
const target = {a: 1, b: 2};
const source = {b: 4, c: 5};

const returnedTarget = Object.assign(target, source); // {a: 1, b: 4, c: 5}, b is overwritten and now target has been modified
returnedTarget === target; // true;
// Cloning an object
const obj4 = {a: 1};
const copy = Object.assign({}, obj4);

copy; //{a: 1}
// Warning for Deep Clone
const obj5 = { a: 0, b: { c: 0 } };
const obj6 = Object.assign({}, obj5);
console.log(obj2); // { a: 0, b: { c: 0 } }

obj5.a = 1;
console.log(obj5); // { a: 1, b: { c: 0 } }
console.log(obj6); // { a: 0, b: { c: 0 } }

obj6.a = 2;
console.log(obj5); // { a: 1, b: { c: 0 } }
console.log(obj6); // { a: 2, b: { c: 0 } }

obj6.b.c = 3;
console.log(obj5); // { a: 1, b: { c: 3 } }
console.log(obj6); // { a: 2, b: { c: 3 } }
// Deep Clone
// Use structuredClone(obj); for nested objects
const obj7 = { a: 0, b: { c: 0 } };
const obj8 = structuredClone(obj7);
obj7.a = 4;
obj7.b.c = 4;
console.log(obj8); // { a: 0, b: { c: 0 } }
//Merging objects
const o1 = {a: 1};
const o2 = {b: 2};
const o3 = {c: 3};

const o4 = Object.assign(o1, o2, o3); // o1 is modified

o4; // {a: 1, b: 2, c: 3};
o1 === o4;
// Merging objects with same properties
const ob = {a: 1, b: 1, c: 1};
const ob2 = {b: 2, c: 2};
const ob3 = {c: 3};

const ob4 = Object.assign({}, ob, ob2, ob3);

ob4; // {a: 1, b: 2, c: 3};
// Copying symbol-typed properties
const b1 = {a: 1};
const b2 = {[Symbol('foo')]: 2};

const b4 = Object.assign({}, b1, b2);

b4; // {a: 1, [Symbol('foo')]: 2}
Object.getOwnPropertySymbols(b4); // [Symbol(foo)]
// Properties on the prototype chain and non-enumerable properties cannot be copied
const c1 = Object.create(
  // foo is on obj's prototype chain because {foo: 1} is passed as first parameter.
  {foo: 1},
  {
    bar: {
      value: 2, // bar is  a non-enumerable property.
    },
    baz: {
      value: 3,
      enumerable: true, // baz is an own enumerable property.
    },
  },
);

const copy1 = Object.assign({}, c1);
// Primitives will be wrapped to objects
const v1 = 'abc';
const v2 = true;
const v3 = 10;
const v4 = Symbol('foo');

const v5 = Object.assign({}, v1, null, v2, undefined, v3, v4);
// Primitives will be wrapped, null and undefined will be ignored.
// Note, only string wrappers can have own enumerable properties.
v5; // {0: 'a', 1: 'b', 2: 'c'} from v1 = 'abc' because strings are enumerable. Numbers Boolean and Symbol are not enumerable.

// Exceptions will interrupt the ongoing copying task
const target1 = Object.defineProperty({}, 'foo', // foo is the property name
  {
  value: 1, // value: 1 is value of foo as {foo: 1}
  writable: false, // the property value cannot be changed.
}); // target1.foo is a read-only property

// TypeError: "foo" is read-only
// The Exception is thrown when assigning target.foo

// ===> Object.assign(target1, {bar: 2}, {foo2: 3, foo: 3, foo3: 3}, {baz: 4});
target1.bar; // 2, the first source was copied successfully.
target1.foo2; // 3, the first property of the second source was copied successfully.
target1.foo; // 1, exception is thrown here.
target1.foo3; // undefined, assign method has finished, foo3 will not be copied.
target1.baz; // undefined, the third source will not be copied either.

// Copying accessors
const obj9 = {
  foo: 1,

  get bar() {
    return 2;
  },

  get foo1() {
    return this.foo;
  }
};

let copy3 = Object.assign({}, obj);
console.log(copy);
// { foo: 1, bar: 2 }
// The value of copy.bar is obj.bar's getter's return value.

// This is an assign function that copies full descriptors
function completeAssign(target4, ...sources) {
  sources.forEach((source) => {
    const descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});

    // By default, Object.assign copies enumerable Symbols, too
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      const descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target4, descriptors);
  });
  return target4;
}

copy3 = completeAssign({}, obj);


// The module pattern: IIFEs
const calculator = (function() {
  const add = (a, b) => a + b;
  const sub = (a, b) => a - b;
  const mul = (a, b) => a * b;
  const div = (a, b) => a / b;
  
  return {add, sub, mul, div};
})();

calculator.add(1, 2); // 3
calculator.sub(3, 4); // -1
calculator.mul(3, 8); // 24
calculator.div(200, 4); // 50

console.log(a, b, x, y, rest);
console.log(zerothEle, firstEle);
console.log(a2, d);
console.log(l, m, n);
console.log(others, others2);
console.log(red, yellow, green);
console.log(q, w, e); // e = undefined
console.log(a5, b5);
console.log(arr2); // [1, 3, 2]
console.log(x1, y1, i, p);
console.log(a6, b6);
console.log(a7, b7, c7, d7);
console.log(a8, b8);