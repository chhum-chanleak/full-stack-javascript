"use strict";
// 1. Function type expressions
// greeter() takes a parameter with a type of "Function that does not return anything"
// '(a: string) => void' is a type(function type expression)
function greeter(fn) {
    fn("Hello, world!");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
function greeter2(fn) {
    console.log('Another hello, world!');
}
// functionName: (parameter: parameter type) => function return type = (parameter) => {
// ...
// }
const greet3 = (name) => {
    return name;
};
function doSomething(fn) {
    console.log(`${fn.description} returned ${fn(6)}`);
}
function myFunc(someArg) {
    return someArg > 3;
}
myFunc.description = "default description";
doSomething(myFunc);
function fn(ctor) {
    return new ctor("Hello, world!");
}
function fn2(ctor) {
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
function firstElement(arr) {
    return arr[0];
}
// s is of type 'string'
const s = firstElement(["a", "b"]);
// n is of type 'number'
const n = firstElement([1, 2, 3]);
// u is of type 'undefined'
const u = firstElement([]);
// 4.1 Inference
function map(arr, func) {
    return arr.map(func);
}
// Parameter 'n' is of type 'string'
// 'parsed' is of type 'number[]'
const parsed = map(["1", "2", "3"], (n) => parseInt(n));
// 4.2 Constraints
function longest(a, b) {
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
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
// const arr = combine([1, 2, 3], ["Hello"]); // Type 'string' is not assignable to type 'number'.
const arr = combine([1, 2], ['Hello']);
// Guidelines for Writing Good Generic Functions
// 4.5 Push Type Parameters Down
function firstElement1(arr) {
    return arr[0];
}
function firstElement2(arr) {
    return arr[0];
}
// a: number (good)
const a = firstElement1([1, 2]);
// b: any (bad)
const b = firstElement2([2, 3]);
// 4.6 Use Fewer Type Parameters
function filter1(arr, func) {
    return arr.filter(func);
}
// We’ve created a type parameter Func that doesn’t relate two values. That’s always a red flag, because it means callers wanting to specify type arguments have to manually specify an extra type argument for no reason.
function filter2(arr, func) {
    return arr.filter(func);
}
// 4.7 Type Parameters Should Appear Twice
// function greet4<Str extends string>(s: Str) {
//   console.log(`Hello, ${s}`);
// }
// Use this instead
function greet4(s) {
    console.log(`Hello ${s}`);
}
// 5. Optional parameters
// function f(n: number): void {
//   console.log(n.toFixed()); // 0 arguments
//   console.log(n.toFixed(3)); // 1 arguments
// }
// We can model this in TypeScript by marking the parameter as optional with ?:
// x have a type of 'number' or 'undefined'.
function f(x) {
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
function myForEach(arr, callback) {
    for (let i = 0; i < arr.length; i += 1) {
        callback(arr[i], i);
    }
}
myForEach([1, 2, 3], (a) => console.log(a));
myForEach([1, 2, 3], (a, i) => console.log(a, i));
function makeDate(mOrTimestamp, d, y) {
    // When parameters d and y are present.  
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else { // When parameters d and y are ignored.
        return new Date(mOrTimestamp);
    }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
function fn3() {
    // ...
}
function len(x) {
    return x.length;
}
len(""); // Ok
len([0]); // Ok
// len(Math.random() > 0.5 ? "Hello" : [0]); // No overload matches this call.
// Overload 1 of 2, '(s: string): number', gave the following error.
//   Argument of type 'number[] | "Hello"' is not assignable to parameter of type 'string'.
//     Type 'number[]' is not assignable to type 'string'.
// Overload 2 of 2, '(arr: any[]): number', gave the following error.
//   Argument of type 'number[] | "Hello"' is not assignable to parameter of type 'any[]'.
//     Type 'string' is not assignable to type 'any[]'.
// Do this instead
function len2(x) {
    return x.length;
}
// 7. Declaring 'this' in a function
const user = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
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
function ff(a) {
    a.b(); // ok
}
// function ff2(a: unknown) {
//   a.b();
// } // 'a' is of type 'unknown'.
function safeParse(s) {
    return JSON.parse(s);
}
// Need to be careful wih 'obj'!
// const obj = safeParse(someRandomString);
// 8.4 never
function fail(msg) {
    throw new Error(msg);
}
function ffn(x) {
    if (typeof (x) === 'string') {
        x; // 'x' has a type of 'string'.
        // Do something.
    }
    else if (typeof x === "number") {
        x; // 'x' has a type of 'number'.
        // Do something.
    }
    else {
        x; // has a type of 'never'.
    }
}
// 8.5 Function
function doSomething2(f) {
    return f(1, 2, 3);
}
// 9. Rest Parameters and Arguments
// 9.1 Rest Parameters
function multiply(n, ...m) {
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
const args2 = [8, 5];
const angle = Math.atan2(...args2);
// 9.2 Parameter Destructuring
function sum({ a, b, c }) {
    console.log(a + b + c);
}
function sum2({ d, e, f }) {
    console.log(d, +e + f);
}
const ff1 = () => {
    return true;
};
const ff2 = () => true;
const ff3 = function () {
    return true;
};
const v1 = ff1();
const v2 = ff2();
const v3 = ff3();
const src = [1, 2, 3];
const dst = [0];
src.forEach((item) => dst.push(item));
function fff() {
    // @ts-expect-error
    return true;
}
function fff2() {
    // @ts-expect-error
    return true;
}
