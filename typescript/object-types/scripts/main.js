"use strict";
// 1. Introduction
// Anonymous object "{ name: string, age: number }".
function greet(person) {
    return `Hello ${person.name}`;
}
;
function greet2(person) {
    return `Hello ${person.name}`;
}
function greet3(person) {
    return `Hello ${person.name}`;
}
function painShape(opts) {
    // ...
}
// const shape = getShape();
// paintShape({ shape });
// paintShape({ shape, xPos: 100 });
// paintShape({ shape, yPos: 100 });
// paintShape({ shape, xPos: 100, yPos: 100 });
function paintShape({ shape, xPos = 0, yPos = 0 }) {
    console.log(`x coordinate at ${xPos}`);
    console.log(`y coordinate at ${yPos}`);
}
function doSomething(obj) {
    // We can read from 'obj.prop'.
    console.log(`prop has the value of ${obj.prop}`);
    // But we can't re-assign it.
    // obj.prop = "Hello"; // Not ok
}
function visitForBirthday(home) {
    // We can read and update properties from 'home.resident'.
    console.log(`Happy birthday ${home.resident.name}`);
    home.resident.age += 1;
}
function evict(home) {
    // But we can't write to the 'resident' property itself on a "Home".
    // home.resident = { 
    //   name: "Victor the Evictor",
    //   age: 42,
    // }; // Cannot assign to 'resident' because it is a read-only property.
}
let writablePerson = {
    name: "Person McPersonface",
    age: 12,
};
// Works
let readonlyPerson = writablePerson;
console.log(readonlyPerson.age); // output: 12
writablePerson.age += 1;
console.log(readonlyPerson.age); // output: 13
function createSquare(config) {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}
// let mySquare = createSquare({ colour: "red", width: 100 });
// "colour": Unknown word.cSpell
// Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
// Do this instead
let mySquare2 = createSquare({ width: 100, opacity: 0.5 });
// Or this
let squareOptions = { colour: "red", width: 100 };
let mySquare3 = createSquare(squareOptions);
const cc = {
    color: "red",
    radius: 12,
};
const draw = function (circle) {
    console.log(`Color was ${circle.color}`);
    console.log(`Radius was ${circle.radius}`);
};
draw({ color: "blue", radius: 12 }); // Ok
let x = {
    contents: "Hello, world!",
};
// We could check 'x.contents'
if (typeof (x.contents) === "string") {
    console.log(x.contents.toLowerCase());
}
// or we could use a type assertion
console.log(x.contents.toLowerCase());
function setContents(box, newContents) {
    box.contents = newContents;
}
let box2;
// This also means that we can avoid overloads entirely by instead using generic functions.
function setContents2(box, newContents) {
    box.contents = newContents;
}
// 7.1 The 'Array' type 
// Array itself is a 'generic type'.
function doArray(value) {
    // ...
    console.log(value);
}
let myArrayType = ["Hello", "world!"];
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
function doStuff(values) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);
    // ...but we can't mutate values.
    // values.push("Hello"); // Property 'push' does not exist on type 'readonly string[]'.
}
// Unlike 'Array', there isn't a 'ReadonlyArray' constructor that we can use.
// new ReadonlyArray("red", "green", "blue"); // 'ReadonlyArray' only refers to a type, but is being used as a value here.
// But we can do this
const roArray = ["red", "green", "blue"];
function doAnotherStuff(values) {
    // We can read from "values"...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);
    // ...but we can't mutate "values".
    // values.push("Hello!"); // Property 'push' does not exist on type 'readonly string[]'.
}
let xx = [];
let yy = [];
xx = yy;
const doSomethingTuple = function (pair) {
    const a = pair[0];
    const b = pair[1];
    // const c = pair[2]; // Tuple type '[string, number]' of length '2' has no element at index '2'.
    // ...
};
doSomethingTuple(["Hello", 12]); // Ok
const doSomethingTuple2 = function (stringHash) {
    const [inputString, hash] = stringHash;
    console.log(inputString);
    console.log(hash);
};
const setCoordinate = function (coord) {
    const [x, y, z] = coord;
    console.log(`Provided coordinates had ${coord.length} dimensions.`);
};
const a = ["Hello", 1];
const b = ["World!", 2, false];
const c = ["!", 3, true, false, true];
const readButtonInput = function (args) {
    // ...
};
// The same as
const readButtonInput2 = function (name, version, ...input) {
    // ...
};
const readonlyTupleType = function (pair) {
    // pair[0] = "hello!";
    // Cannot assign to '0' because it is a read-only property.
};
// Initialize 'point' and set it to readonly using 'as const'.
let point = [3, 4];
const distanceFromOrigin = function ([x, y]) {
    return Math.sqrt((x ** 2) + (y ** 2));
};
// distanceFromOrigin(point); // Argument of type 'readonly [3, 4]' is not assignable to parameter of type '[number, number]'.
// The type 'readonly [3, 4]' is 'readonly' and cannot be assigned to the mutable type '[number, number]'.
