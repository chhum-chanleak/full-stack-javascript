"use strict";
// 1. Hello World of Generics.
function identity(arg) {
    return arg;
}
// Explicitly set Type
let output = identity("myString");
// Type argument inference
let output2 = identity("myString");
// 2. Working with Generic Type Variables
function loggingIdentity(arg) {
    console.log(arg.length); // Array has a .length, so no more error.
    return arg;
}
// 3. Generic types
let myIdentity = identity;
// Call signature
let myIdentity2 = identity;
let myIdentity3 = identity;
let myIdentity4 = identity;
function loggingIdentity2(arg) {
    console.log(arg.length); // Now we know it has a .length property, so no more error.
    return arg;
}
// 6. Using type parameters in generic constraints
function getProperty(obj, key) {
    return obj[key];
}
let x = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x, "b");
// getProperty(x, "f"); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
// 7. Using class types in generics
function create(c) {
    return new c();
}
class BeeKeeper {
    hasMask = true;
}
class ZooKeeper {
    nametag = "Mikle";
}
class Animal {
    numLegs = 4;
}
class Bee extends Animal {
    numLegs = 6;
    keeper = new BeeKeeper();
}
class Lion extends Animal {
    keeper = new ZooKeeper();
}
function createInstance(c) {
    return new c();
}
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;
// Not a type error -- this is a structural
// comparison, so variance annotations are
// not in effect
const p = {
    make() {
        return 42;
    }
};
// Error, this interface is definitely contravariant on T
// interface Foo<out T> {
//   consume: (arg: T) => void;
// }
