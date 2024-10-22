// 1. Hello World of Generics.
function identity<Type>(arg: Type): Type {
  return arg;
}

// Explicitly set Type
let output = identity<string>("myString");
// Type argument inference
let output2 = identity("myString");

// 2. Working with Generic Type Variables
function loggingIdentity<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error.
  return arg;
}

// 3. Generic types
let myIdentity: <Input>(arg: Input) => Input = identity;
// Call signature
let myIdentity2: { <Type>(arg: Type): Type } = identity;
// Generic interfaces
interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

let myIdentity3: GenericIdentityFn = identity;

// Another Generic interface
interface GenericIdentityFn2<Type> {
  (arg: Type): Type;
}

let myIdentity4: GenericIdentityFn2<number> = identity;

// 4. Generic classes
// class GenericNumber<NumType> {
//   zeroValue: NumType;
//   add: (x: NumType, y: NumType) => NumType;
// }
 
// let myGenericNumber = new GenericNumber<number>();
// myGenericNumber.zeroValue = 0;
// myGenericNumber.add = function (x, y) {
//   return x + y;
// };

// let stringNumeric = new GenericNumber<string>();
// stringNumeric.zeroValue = "";
// stringNumeric.add = function (x, y) {
//   return x + y;
// };

// console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// 5. Generic constraints
interface Lengthwise {
  length: number;
}

function loggingIdentity2<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now we know it has a .length property, so no more error.
  return arg;
}

// 6. Using type parameters in generic constraints
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
  return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "b");
// getProperty(x, "f"); // Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.

// 7. Using class types in generics
function create<Type>(c: { new (): Type}): Type {
  return new c();
}

class BeeKeeper {
  hasMask: boolean = true;
}
 
class ZooKeeper {
  nametag: string = "Mikle";
}
 
class Animal {
  numLegs: number = 4;
}
 
class Bee extends Animal {
  numLegs = 6;
  keeper: BeeKeeper = new BeeKeeper();
}
 
class Lion extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}
 
function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}
 
createInstance(Lion).keeper.nametag;
createInstance(Bee).keeper.hasMask;

// 8. Generic parameter defaults
// declare function create2(): Container<HTMLDivElement, HTMLDivElement[]>;
// declare function create2<T extends HTMLElement>(element: T): Container<T, T[]>;
// declare function create2<T extends HTMLElement, U extends HTMLElement>(
//   element: T,
//   children: U[]
// ): Container<T, U[]>;

// declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
//   element?: T,
//   children?: U
// ): Container<T, U>;
 
// const div = create();      
// const div: Container<HTMLDivElement, HTMLDivElement[]> 
// const p = create(new HTMLParagraphElement());     
// const p: Container<HTMLParagraphElement, HTMLParagraphElement[]>

// 9. Variance annotations
interface Producer<T> {
  make(): T;
}

interface AnimalProducer {
  make(): Animal;
}

// A CatProducer can be used anywhere an Animal producer is expected.
// interface CatProducer {
//   make(): Cat;
// }

// Contravariant annotation
interface Consumer<in T> {
  consume: (arg: T) => void;
}

// Covariant annotation
interface Producer<out T> {
  make(): T;
}

// Invariant annotation
interface ProducerConsumer<in out T> {
  consume: (arg: T) => void;
  make(): T;
}

// DON'T DO THIS - variance annotation
// does not match structural behavior
interface Producer<in out T> {
  make(): T;
}
// Not a type error -- this is a structural
// comparison, so variance annotations are
// not in effect
const p: Producer<string | number> = {
    make(): number {
        return 42;
    }
}

// Error, this interface is definitely contravariant on T
// interface Foo<out T> {
//   consume: (arg: T) => void;
// }