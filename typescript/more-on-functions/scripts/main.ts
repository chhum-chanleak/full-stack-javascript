// 1. Function type expressions

// greeter() takes a parameter with a type of "Function that does not return anything"
// '(a: string) => void' is a type(function type expression)
function greeter(fn: (a: string) => void) {
  fn("Hello, world!");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);

type GreetFunction = (a: string) => void;
function greeter2(fn: GreetFunction) {
  console.log('Another hello, world!');
}

// functionName: (parameter: parameter type) => function return type = (parameter) => {
  // ...
// }
const greet3: (name: string) => string = (name) => {
  return name;
}; 

// 2. Call Signatures
type DescribableFunction = {
  description: string;
  // function with a parameter 'someArg' of type number.
  // function return a value of type 'boolean'.
  // This is a 'call signature'.
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(`${fn.description} returned ${fn(6)}`);
}

function myFunc(someArg: number) {
  return someArg > 3;
}

myFunc.description = "default description";

doSomething(myFunc);

// 3. Construct signatures
type SomeConstructor = {
  // By putting 'new' keyword in front of a 'call signature', you have a 
  // 'construct signature'.
  new (s: string): {}; // '{}' is a type Object
};

function fn(ctor: SomeConstructor) {
  return new ctor("Hello, world!");
}

interface CallOrConstruct {
  // This is a 'call signature'.
  (n?: number): string;
  new (s: string): Date;
}

function fn2(ctor: CallOrConstruct) {
  // Passing an argument of type `number` to `ctor` matches it against
  // the first definition in the `CallOrConstruct` interface.
  console.log(ctor(10));
  // Similarly, passing an argument of type `string` to `ctor` matches it
  // against the second definition in the `CallOrConstruct` interface.
  console.log(new ctor("10"));
}

fn2(Date);

// 4. Generic functions
// Remember, generics are all about relating two or more values with the same type!
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

// s is of type 'string'
const s = firstElement(["a", "b"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type 'undefined'
const u = firstElement([]);

// 4.1 Inference
function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
  return arr.map(func);
}

// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));

// 4.2 Constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  }
  return b;
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' || 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOk = longest(10, 100); // Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.

// 4.3 Working with Constrained Values
// '{ length: number }' is the constraint
// function minimumLength<Type extends { length: number }>(obj: Type, minimum: number): Type {
//   if (obj.length >= minimum) {
//     return obj;
//   }
//   return { length: minimum };
// } Type '{ length: number; }' is not assignable to type 'Type'.
// '{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.

// 'arr' gets value { length: 6 }
// const arr = minimumLength([1, 2, 3], 6);
// and crashes here because arrays have
// a 'slice' method, but not the returned object!
// console.log(arr.slice(0));

// 4.4 Specifying Type Arguments
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// const arr = combine([1, 2, 3], ["Hello"]); // Type 'string' is not assignable to type 'number'.
const arr = combine<number | string>([1, 2], ['Hello']);

// Guidelines for Writing Good Generic Functions

// 4.5 Push Type Parameters Down
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}

function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

// a: number (good)
const a = firstElement1([1, 2]);
// b: any (bad)
const b = firstElement2([2, 3]);

// 4.6 Use Fewer Type Parameters
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}

// We’ve created a type parameter Func that doesn’t relate two values. That’s always a red flag, because it means callers wanting to specify type arguments have to manually specify an extra type argument for no reason.
function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func): Type[] {
  return arr.filter(func);
}

// 4.7 Type Parameters Should Appear Twice
// function greet4<Str extends string>(s: Str) {
//   console.log(`Hello, ${s}`);
// }
// Use this instead
function greet4(s: string): void {
  console.log(`Hello ${s}`);
}

// 5. Optional parameters
// function f(n: number): void {
//   console.log(n.toFixed()); // 0 arguments
//   console.log(n.toFixed(3)); // 1 arguments
// }

// We can model this in TypeScript by marking the parameter as optional with ?:
// x have a type of 'number' or 'undefined'.
function f(x?: number) {
  // ...
}
f(); // Ok
f(10); // Ok

// default parameter
function f2(x = 10) {
  // ...
}
// Note that when a parameter is optional, callers can always pass undefined, as this simply simulates a “missing” argument:
f2(undefined);

// 5.1 Optional Parameters in Callbacks
function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
  for (let i = 0; i < arr.length; i += 1) {
    callback(arr[i], i);
  }
}

myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));

// 6. Function Overloads

function makeDate(timestamp: number): Date; // overload signature
function makeDate(m: number, d: number, y: number): Date; // overload signature
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  // When parameters d and y are present.  
  if (d !== undefined && y !== undefined) {
    return  new Date(y, mOrTimestamp, d);
  } else { // When parameters d and y are ignored.
    return new Date(mOrTimestamp);
  }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); // No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.

// 6.1 Overload signatures and the implementation signature
function fn3(x: string): void; // Overload signature
function fn3() { // implementation signature
  // ...
}

// Expected to be able to call with zero arguments
// fn3(); // Expected 1 arguments, but got 0.
// function fn(x: boolean): void;
// Argument type isn't right
// function fn(x: string): void;
// This overload signature is not compatible with its implementation signature.
// function fn(x: boolean) {}

// 6.2 Writing good overloads
function len(s: string): number; // an overload signature
function len(arr: any[]): number; // another overload signature
function len(x: any) {
  return x.length;
}

len(""); // Ok
len([0]);// Ok
// len(Math.random() > 0.5 ? "Hello" : [0]); // No overload matches this call.
// Overload 1 of 2, '(s: string): number', gave the following error.
//   Argument of type 'number[] | "Hello"' is not assignable to parameter of type 'string'.
//     Type 'number[]' is not assignable to type 'string'.
// Overload 2 of 2, '(arr: any[]): number', gave the following error.
//   Argument of type 'number[] | "Hello"' is not assignable to parameter of type 'any[]'.
//     Type 'string' is not assignable to type 'any[]'.

// Do this instead
function len2(x: any[] | string) {
  return x.length;
}

// 7. Declaring 'this' in a function
const user = {
  id: 123,
  admin: false,
  becomeAdmin: function(): void {
    this.admin = true;
  },
};

// interface DB {
//  filterUsers(filter: (this: User) => boolean): User[];
// }
 
// const db = getDB();
// const admins = db.filterUsers(() => this.admin); // The containing arrow function captures the global value of 'this'.
// Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.

// interface DB {
//   filterUsers(filter: (this: User) => boolean): User[];
// }
 
// const db = getDB();
// const admins = db.filterUsers(() => this.admin);
// The containing arrow function captures the global value of 'this'.
// Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature.

// 8. Other Types to Know About

// 8.1 void
// 'void' is not the same as 'undefined'.
// The inferred return type is 'void'
function noop() {
  return;
}

// 8.2 object
// 'object' is not 'Object'. Always use object!

// 8.3 unknown
// The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value:
function ff(a: any) {
  a.b(); // ok
}

// function ff2(a: unknown) {
//   a.b();
// } // 'a' is of type 'unknown'.

function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// Need to be careful wih 'obj'!
// const obj = safeParse(someRandomString);

// 8.4 never
function fail(msg: string): never {
  throw new Error(msg);
}

function ffn(x: number | string): void {
  if (typeof(x) === 'string') {
    x; // 'x' has a type of 'string'.
    // Do something.
  } else if (typeof x === "number") {
    x; // 'x' has a type of 'number'.
    // Do something.
  } else {
    x; // has a type of 'never'.
  }
}

// 8.5 Function
function doSomething2(f: Function) {
  return f(1, 2, 3);
}

// 9. Rest Parameters and Arguments

// 9.1 Rest Parameters
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

// 'a' gets value [10, 20, 30, 40]
const aa = multiply(10, 1, 2, 3, 4);

// 9.2 Rest Arguments 
const arr22 = [1, 2, 3];
const arr33 = [4, 5, 6];
arr22.push(...arr33);

// Inferred type is number[] -- "an array with zero or more numbers",
// not specifically two numbers
const args = [8, 5];
// const angle = Math.atan2(...args);
// A spread argument must either have a tuple type or be passed to a rest parameter.

// Inferred as 2-length tuple
const args2 = [8, 5 ] as const;
const angle = Math.atan2(...args2);

// 9.2 Parameter Destructuring
function sum({ a, b, c }: { a: number, b: number, c: number }) {
  console.log(a + b + c);
}

// Same as prior example.
type DEF = { d: number, e: number, f: number };
function sum2({ d, e, f }: DEF) {
  console.log(d, + e + f);
}

// 10. Assignability of Functions

// 10.1 Return type 'void'
type voidFunc = () => void;

const ff1: voidFunc = () => {
  return true;
};
const ff2: voidFunc = () => true;
const ff3: voidFunc = function () {
  return true;
}

const v1 = ff1();
const v2 = ff2();
const v3 = ff3();

const src = [1, 2, 3];
const dst = [0];

src.forEach((item) => dst.push(item));

function fff(): void {
  // @ts-expect-error
  return true;
}

function fff2(): void {
  // @ts-expect-error
  return true;
}