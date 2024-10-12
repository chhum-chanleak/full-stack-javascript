// 1. Introduction
// Anonymous object "{ name: string, age: number }".
function greet(person: { name: string, age: number }) {
  return `Hello ${person.name}`;
};
// Name object using interface.
interface Person {
  name: string;
  age: number;
}
function greet2(person: Person) {
  return `Hello ${person.name}`;
}
// Name object using type alias.
type PersonObject = {
  name: string,
  age: number,
};
function greet3(person: PersonObject) {
  return `Hello ${person.name}`;
}

// 2. Property modifiers
  // 2.1 Optional Properties
  interface PaintOptions {
    shape: WaveShaperNode;
    xPos?: number;
    yPos?: number;
  }
  function painShape(opts: PaintOptions) {
    // ...
  }

  // const shape = getShape();
  // paintShape({ shape });
  // paintShape({ shape, xPos: 100 });
  // paintShape({ shape, yPos: 100 });
  // paintShape({ shape, xPos: 100, yPos: 100 });

  function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log(`x coordinate at ${xPos}`);
    console.log(`y coordinate at ${yPos}`);
  }

  // 2.2 'readonly' properties
  interface SomeType {
    readonly prop: string;
  }

  function doSomething(obj: SomeType) {
    // We can read from 'obj.prop'.
    console.log(`prop has the value of ${obj.prop}`);
    // But we can't re-assign it.
    // obj.prop = "Hello"; // Not ok
  }

  interface Home {
    readonly resident: { name: string, age: number };
  }

  function visitForBirthday(home: Home) {
    // We can read and update properties from 'home.resident'.
    console.log(`Happy birthday ${home.resident.name}`);
    home.resident.age += 1;
  }

  function evict(home: Home) {
    // But we can't write to the 'resident' property itself on a "Home".
    // home.resident = { 
    //   name: "Victor the Evictor",
    //   age: 42,
    // }; // Cannot assign to 'resident' because it is a read-only property.
  }

  interface Person {
    name: string;
    age: number;
  }
  interface ReadonlyPeron{
    readonly name: string;
    readonly age: number;
  }

  let writablePerson: Person = {
    name: "Person McPersonface",
    age: 12,
  };

  // Works
  let readonlyPerson: ReadonlyPeron = writablePerson;

  console.log(readonlyPerson.age); // output: 12
  writablePerson.age += 1;
  console.log(readonlyPerson.age); // output: 13

  // 2.3 Index signatures
  interface StringArray {
    [index: number]: string;
  }

  // const myArray: StringArray = getStringArray();
  // const secondItem = myArray[1];

  interface Animal {
    name: string;
  }
  interface Dog extends Animal {
    breed: string;
  }

  // Error: indexing with a numeric string might get you a completely separate type
  interface NotOkay {
    // [x: number]: Animal;
    // 'number' index type 'Animal' is not assignable to 'string' index type 'Dog'.
    [x: string]: Dog;
  }

  // Do this instead
  // Note that when using both `number` and `string` indexers, the type returned from a numeric indexer must be a subtype of the type returned from the string indexer.
  // '[x: number] is a numeric indexer which has a return type of Dog'.
  // '[x: string0] is a string indexer which has a return type of Animal'.
  // For this to work, the return type of 'numeric indexer' (Dog) must be a subtype(child/sub class) of 'string indexer''s return type (Animal)
  interface Okay {
    [x: number]: Dog;
    [x: string]: Animal;
  }

  interface NumberDiction {
    [index: string]: number;

    length: number; // Ok
    // name: string; // Error: 'name' has a type of 'string' while its string indexer's return type has a type of 'number'.
    // Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
  }

  // Do this instead
  interface NumberOrStringDictionary {
    [index: string]: number | string;

    length: number; // Ok
    name: string; // Ok
  }

  interface ReadonlStringArray {
    readonly [index: number]: string;
  }

  // let myStringArray: ReadonlyStringArray = getReadonlyStringArray();

  // myStringArray = "Mallory";
  // Index signature in type 'ReadonlyStringArray' only permits reading.

// 3. Excess Property Checks
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string, area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width: 20,
  };
}

// let mySquare = createSquare({ colour: "red", width: 100 });
// "colour": Unknown word.cSpell
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?

// Do this instead
let mySquare2 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

// Or this
interface SquareConfig2 {
  color?: string;
  width?: number;
  // Here we’re saying that SquareConfig2 can have any number of properties, and as long as they aren’t 'color' or 'width', their types don’t matter.
  [propName: string]: unknown;
}

// Or this
let squareOptions = { colour: "red", width: 100 };
let mySquare3 = createSquare(squareOptions);

// In this example, it was the property 'width'. It will however, fail if the variable does not have any common object property. For example:
// let squareOptions = { colour: "red" };
// let mySquare = createSquare(squareOptions);
// Type '{ colour: string; }' has no properties in common with type 'SquareConfig'.

// 4. Extending types
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

// Don't
interface AddressWithUnit {
  name?: string;
  unit: string; // new fields
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

// Do
interface AddressWithUnit2 extends BasicAddress {
  unit: string // new fields
}

// extents multiply types(interfaces)
interface Colorful {
  color: string;
}
interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 12,
};

// 5. Intersection types
interface Colorful2 {
  color: string;
}
interface Circle2 {
  radius: number;
}

type ColorfulCircle2 = Colorful2 & Circle2;
type Draw = (param: ColorfulCircle2) => void;

const draw: Draw = function(circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

draw({ color: "blue", radius: 12 }); // Ok
// Object literal may only specify known properties, but 'raidius' does not exist in type 'ColorfulCircle2'. Did you mean to write 'radius'?
// draw({ color: "blue", raidius: 12 });

// 6. Interface extension vs. intersection

// Incompatible interfaces
// interface Person3 {
//   name: string;
// }

// interface Person3 {
//   name: number; //Subsequent property declarations must have the same type.  Property 'name' must be of type 'string', but here has type 'number'.
// }

// Compatible interfaces, but produce a 'never' type:
interface Human {
  name: string;
}
interface Human2 {
  name: number
}

// Intersection type
type People = Human & Human2;

// const crowd: People;
// crowd.name; // 'crowd.name' has a type of 'never'.

// 7. Generic object types
interface Box {
  contents: unknown;
}

let x: Box = {
  contents: "Hello, world!",
};

// We could check 'x.contents'
if (typeof(x.contents) === "string") {
  console.log(x.contents.toLowerCase());
}

// or we could use a type assertion
console.log((x.contents as string).toLowerCase());

// or do this
interface NumberBox {
  contents: number;
}
interface StringBox {
  contents: string;
}
interface BooleanBox {
  contents: boolean;
}

function setContents(box: StringBox, newContents: string): void;
function setContents(box: NumberBox, newContents: number): void;
function setContents(box: BooleanBox, newContents: boolean): void;
function setContents(box: { contents: unknown }, newContents: unknown) {
  box.contents = newContents;
}

// or the best one yet
// '<Type>' is called 'type parameter'.
interface Box2<Type> {
  contents: Type;
}

let box2: Box2<string>;

interface Apple {
  // ...
}

// Same as '{ contents: Apple }'.
type AppleBox = Box2<Apple>;
// This also means that we can avoid overloads entirely by instead using generic functions.

function setContents2<Type>(box: Box2<Type>, newContents: Type) {
  box.contents = newContents;
}

type OrNull<Type> = Type | null;
type OneOrMany<Type> = Type | Type[];
type OneOrManyOrNull<Type> =  OrNull<OneOrMany<Type>>;

  // 7.1 The 'Array' type 
  // Array itself is a 'generic type'.
  function doArray(value: Array<string>) {
    // ...
    console.log(value);
  }

  let myArrayType: string[] = ["Hello", "world!"];

  // either of these work!
  doArray(myArrayType);
  doArray(new Array("Hello, world!2"));

  // interface Array<Type> {
  //   // All declarations of 'Array' must have identical type parameters.
  //   length: number;
    
  //   pop(): Type | undefined;

  //   push(...items: Type[]): number;
  // }

  // 7.2 The 'ReadonlyArray' type
  function doStuff(values: ReadonlyArray<string>) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);

    // ...but we can't mutate values.
    // values.push("Hello"); // Property 'push' does not exist on type 'readonly string[]'.
  }

  // Unlike 'Array', there isn't a 'ReadonlyArray' constructor that we can use.
  // new ReadonlyArray("red", "green", "blue"); // 'ReadonlyArray' only refers to a type, but is being used as a value here.

  // But we can do this
  const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

  function doAnotherStuff(values: readonly string[]) {
    // We can read from "values"...
    const copy= values.slice();
    console.log(`The first value is ${values[0]}`);

    // ...but we can't mutate "values".
    // values.push("Hello!"); // Property 'push' does not exist on type 'readonly string[]'.
  }

  let xx: readonly string[] = [];
  let yy: string[] = [];

  xx = yy;
  // 'xx' has a type of 'readonly string[]' so it cannot be assigned to mutable type 'string[]'.
  // yy = xx;

  // 7.3 Tuple types
  // A tuple type is another sort of Array type that knows exactly how many elements it contains, and exactly which types it contains at specific positions.
  type StringNumberPair = [string, number];
  type DoSomethingTuple = (param: [string, number]) => void;

  const doSomethingTuple: DoSomethingTuple = function(pair) {
    const a = pair[0];
    const b = pair[1];
    // const c = pair[2]; // Tuple type '[string, number]' of length '2' has no element at index '2'.
    // ...
  };

  doSomethingTuple(["Hello", 12]); // Ok

  const doSomethingTuple2: DoSomethingTuple = function(stringHash) {
    const [inputString, hash] = stringHash;

    console.log(inputString);
    console.log(hash);
  };

  interface StringNumberPair2 {
    // specialized properties
    length: 2;
    0: string;
    1: number;

    // Other 'Array< string | number>' members...
    slice(start?: number, end?: number): Array<string | number>;
  }

  type Either2dOr3d = [number, number, number?];
  type SetCoordinate = (coord: Either2dOr3d) => void;
  const setCoordinate: SetCoordinate = function(coord) {
    const [x, y, z] = coord;

    console.log(`Provided coordinates had ${coord.length} dimensions.`);
  };

  type StringNumberBooleans = [string, number, ...boolean[]];
  type StringBooleansNumber = [string, ...boolean[], number];
  type BooleansStringNumber = [...boolean[], string, number];

  const a: StringNumberBooleans = ["Hello", 1];
  const b: StringNumberBooleans = ["World!", 2, false];
  const c: StringNumberBooleans = ["!", 3, true, false, true];

  type ReadButtonInput = (...args: [string, number, ...boolean[]]) => void;
  const readButtonInput: ReadButtonInput = function(args) {
    // ...
  };

  // The same as
  const readButtonInput2: ReadButtonInput = function(name, version, ...input) {
    // ...
  };

  // 7.4 'readonly' Tuple Types
  type ReadonlyTupleType = (pair: readonly [string, number]) => void;
  const readonlyTupleType: ReadonlyTupleType = function(pair) {
    // pair[0] = "hello!";
    // Cannot assign to '0' because it is a read-only property.
  };

  // Initialize 'point' and set it to readonly using 'as const'.
  let point = [3, 4] as const;

  type DistanceFromOrigin = ([x, y]: [number, number]) => number;
  const distanceFromOrigin: DistanceFromOrigin = function([x, y]) {
    return Math.sqrt((x ** 2) + (y ** 2));
  };

  // distanceFromOrigin(point); // Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
  // The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.