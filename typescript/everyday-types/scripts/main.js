"use strict";
// The primitives: string, number, and boolean
// JavaScript has three very commonly used primitives: string, number, and boolean. Each has a corresponding type in TypeScript. As you might expect, these are the same names you’d see if you used the JavaScript typeof operator on a value of those types:
// string represents string values like "Hello, world"
// number is for numbers like 42. JavaScript does not have a special runtime value for integers, so there’s no equivalent to int or float - everything is simply number
// boolean is for the two values true and false
// Arrays
// To specify the type of an array like [1, 2, 3], you can use the syntax number[]; this syntax works for any type (e.g. string[] is an array of strings, and so on). You may also see this written as Array<number>, which means the same thing. We’ll learn more about the syntax T<U> when we cover generics.
// any
// TypeScript also has a special type, any, that you can use whenever you don’t want a particular value to cause typechecking errors.
// When a value is of type any, you can access any properties of it (which will in turn be of type any), call it like a function, assign it to (or from) a value of any type, or pretty much anything else that’s syntactically legal:
let obj = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
// obj.foo();
// obj();
obj.bar = 100;
obj = "hello";
const n = obj;
// The any type is useful when you don’t want to write out a long type just to convince TypeScript that a particular line of code is okay.
// noImplicitAny
// When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to any.
// You usually want to avoid this, though, because any isn’t type-checked. Use the compiler flag noImplicitAny to flag any implicit any as an error.
// Type Annotations on Variables
// When you declare a variable using const, var, or let, you can optionally add a type annotation to explicitly specify the type of the variable:
let myName = "Alice";
// TypeScript doesn’t use “types on the left”-style declarations like int x = 0; Type annotations will always go after the thing being typed.
// In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically infer the types in your code. For example, the type of a variable is inferred based on the type of its initializer:
// No type annotation needed -- 'myName2' inferred as type 'string'
let myName2 = "Alice";
// Functions
// Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.
// Parameter Type Annotations
// When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:
// Parameter type annotation
function greet(name) {
    console.log(`Hello, ${name.toUpperCase()}!!`);
}
// When a parameter has a type annotation, arguments to that function will be checked:
// Would be a runtime error if executed!
// greet(42);
greet('Chhum');
// Return Type Annotations
// You can also add return type annotations. Return type annotations appear after the parameter list:
function add(a, b) {
    return a + b;
}
add(9, 6); // output: 15
// Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its return statements. The type annotation in the above example doesn’t change anything. Some codebases will explicitly specify a return type for documentation purposes, to prevent accidental changes, or just for personal preference.
// Functions Which Return Promises
// If you want to annotate the return type of a function which returns a promise, you should use the Promise type:
async function getFavoriteNumber() {
    return 25;
}
// Anonymous Functions
// Anonymous functions are a little bit different from function declarations. When a function appears in a place where TypeScript can determine how it’s going to be called, the parameters of that function are automatically given types.
// Here’s an example:
// The inferred type of the array
// This process is called contextual typing
const names = ["Alice", "Bob", "Eve"];
// Contextual typing for function - parameter 'name' inferred to have type string.
names.forEach(function (name) {
    console.log(name.toUpperCase());
});
// Contextual typing also applies to arrow functions
names.forEach((name) => console.log(name.toUpperCase()));
// Even though the parameter name didn’t have a type annotation, TypeScript used the types of the forEach function, along with the inferred type of the array, to determine the type name will have.
// This process is called contextual typing because the context that the function occurred within informs what type it should have.
// Similar to the inference rules, you don’t need to explicitly learn how this happens, but understanding that it does happen can help you notice when type annotations aren’t needed. Later, we’ll see more examples of how the context that a value occurs in can affect its type.
// This process is called contextual typing because the context that the function occurred within informs what type it should have.
// Similar to the inference rules, you don’t need to explicitly learn how this happens, but understanding that it does happen can help you notice when type annotations aren’t needed. Later, we’ll see more examples of how the context that a value occurs in can affect its type.
// Object Types
// Apart from primitives, the most common sort of type you’ll encounter is an object type. This refers to any JavaScript value with properties, which is almost all of them! To define an object type, we simply list its properties and their types.
// For example, here’s a function that takes a point-like object:
// The parameter's type annotation is an object type
function printCoord(pt) {
    console.log(`The coordinate's x value is ${pt.x}`);
    console.log(`The coordinate's y value is ${pt.y}`);
}
printCoord({ x: 3, y: 7 });
// Here, we annotated the parameter with a type with two properties - x and y - which are both of type number. You can use , or ; to separate the properties, and the last separator is optional either way.
// The type part of each property is also optional. If you don’t specify a type, it will be assumed to be any.
// Optional Properties
// Object types can also specify that some or all of their properties are optional. To do this, add a ? after the property name:
function printName(obj) {
    if (obj.last === undefined) {
        console.log(`The name is ${obj.first}`);
    }
    else {
        console.log(`The name is ${obj.first} ${obj.last}.`);
    }
    // A safe alternative using modern JavaScript syntax:
    // console.log(obj.last?.toUpperCase());
}
// Both OK
printName({ first: 'Chhum' });
printName({ first: 'Chhum', last: 'Rothanak' });
// In JavaScript, if you access a property that doesn’t exist, you’ll get the value undefined rather than a runtime error. Because of this, when you read from an optional property, you’ll have to check for undefined before using it.
// Union Types
// TypeScript’s type system allows you to build new types out of existing ones using a large variety of operators. Now that we know how to write a few types, it’s time to start combining them in interesting ways.
// Defining a Union Type
// The first way to combine types you might see is a union type. A union type is a type formed from two or more other types, representing values that may be any one of those types. We refer to each of these types as the union’s members.
// Let’s write a function that can operate on strings or numbers:
function printId(id) {
    console.log(`Your ID is: ${id}`);
}
// Ok
printId(101);
// Ok
printId("202");
// Error
// printId({ myId: 2232}); // Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.
// Working with Union Types
// It’s easy to provide a value matching a union type - simply provide a type matching any of the union’s members. If you have a value of a union type, how do you work with it?
// TypeScript will only allow an operation if it is valid for every member of the union. For example, if you have the union string | number, you can’t use methods that are only available on string:
// function printId(id: number | string) {
//   console.log(id.toUpperCase()); 
// Property 'toUpperCase' does not exist on type 'string | number'.
//   Property 'toUpperCase' does not exist on type 'number'.
// }
// The solution is to narrow the union with code, the same as you would in JavaScript without type annotations. Narrowing occurs when TypeScript can deduce a more specific type for a value based on the structure of the code.
// For example, TypeScript knows that only a string value will have a typeof value "string":
function printId2(id) {
    if (typeof (id) === 'number') {
        // Here, id is of type 'number'
        console.log(id);
    }
    else {
        // In this branch, id is of type 'string'
        console.log(id.toUpperCase());
    }
}
// Another example is to use a function like Array.isArray:
function welcomePeople(x) {
    if (Array.isArray(x)) {
        // Here: 'x' is string[](array of strings)
        console.log(`Hello, ${x.join(" and ")}.`);
    }
    else {
        // Here: 'x' is 'string'
        console.log(`Welcome lone traveler ${x}.`);
    }
}
// Notice that in the else branch, we don’t need to do anything special - if x wasn’t a string[], then it must have been a string.
// Sometimes you’ll have a union where all the members have something in common. For example, both arrays and strings have a slice method. If every member in a union has a property in common, you can use that property without narrowing:
// Return type is inferred as number[] | string
function getFirstThree(x) {
    return x.slice(0, 3);
}
// Exactly the same as the earlier example
function printCoord2(pt) {
    console.log(`The coordinate's x value is ${pt.x}`);
    console.log(`The coordinate's y value is ${pt.y}`);
}
function printCoord3(pt) {
    console.log(`x-coordinate: ${pt.x}`);
    console.log(`y-coordinate: ${pt.y}`);
}
// Just like when we used a type alias above, the example works just as if we had used an anonymous object type. TypeScript is only concerned with the structure of the value we passed to printCoord - it only cares that it has the expected properties. Being concerned only with the structure and capabilities of types is why we call TypeScript a structurally typed type system.
// Differences Between Type Aliases and Interfaces
// Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.
// Extending an interface
// interface Animal {
//   name: string;
// }
// interface Bear extends Animal {
//   honey: boolean;
// }
// const bear = getBear();
// bear.name;
// bear.honey;
// Adding new fields to an existing interface
// interface Window {
//   title: string;
// }
// interface Window {
//   ts: TypeScriptAPI;
// }
// const src = 'const a = "Hello World"';
// window.ts.transpileModule(src, {});
// Extending a type via intersections
// type Animal = {
//   name: string;
// }
// type Bear = Animal & { 
//   honey: boolean;
// }
// const bear = getBear();
// bear.name;
// bear.honey;
// A type cannot be changed after being created
// type Window = {
//   title: string;
// }
// type Window = {
//   ts: TypeScriptAPI;
// }
//  // Error: Duplicate identifier 'Window'.
// Type Assertions
// Sometimes you will have information about the type of a value that TypeScript can’t know about.
// For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID.
// In this situation, you can use a type assertion to specify a more specific type:
const myCanvas = document.getElementById("main_canvas");
// Like a type annotation, type assertions are removed by the compiler and won’t affect the runtime behavior of your code.
// You can also use the angle-bracket syntax (except if the code is in a .tsx file), which is equivalent:
const myCanvas2 = document.getElementById("main_canvas");
// Reminder: Because type assertions are removed at compile-time, there is no runtime checking associated with a type assertion. There won’t be an exception or null generated if the type assertion is wrong.
// TypeScript only allows type assertions which convert to a more specific or less specific version of a type. This rule prevents “impossible” coercions like:
// const x = "hello" as number;
// Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.
// Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can use two assertions, first to any (or unknown, which we’ll introduce later), then to the desired type:
// const a = expr as any as T;
// Literal Types
// In addition to the general types string and number, we can refer to specific strings and numbers in type positions.
// One way to think about this is to consider how JavaScript comes with different ways to declare a variable. Both var and let allow for changing what is held inside the variable, and const does not. This is reflected in how TypeScript creates types for literals.
let changingString = "Hello, world!";
changingString = "Ola Mundo";
// Because `changingString` can represent any possible string, that
// is how TypeScript describes it in the type system
changingString;
const constantString = "Hello, world!";
function configuration(x) {
    // ...
}
// configure({ width: 100 });
// configure("auto");
// configure("automatic");
// Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'.
// There’s one more kind of literal type: boolean literals. There are only two boolean literal types, and as you might guess, they are the types true and false. The type boolean itself is actually just an alias for the union true | false.
// Literal Inference
// When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later. For example, if you wrote code like this:
// const obj = { counter: 0 };
// if (someCondition) {
//   obj.counter = 1;
// }
// TypeScript doesn’t assume the assignment of 1 to a field which previously had 0 is an error. Another way of saying this is that obj.counter must have the type number, not 0, because types are used to determine both reading and writing behavior.
// The same applies to strings:
// declare function handleRequest(url: string, method: "GET" | "POST"): void;
// const req = { url: "https://example.com", method: "GET" };
// handleRequest(req.url, req.method);
// Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
// In the above example req.method is inferred to be string, not "GET". Because code can be evaluated between the creation of req and the call of handleRequest which could assign a new string like "GUESS" to req.method, TypeScript considers this code to have an error.
// There are two ways to work around this.
// 1. You can change the inference by adding a type assertion in either location:
// Change 1:
// const req = { url: "https://example.com", method: "GET" as "GET"};
// Change 2
// handleRequest(req.url, req.method as "GET");
// Change 1 means “I intend for req.method to always have the literal type "GET"”, preventing the possible assignment of "GUESS" to that field after. Change 2 means “I know for other reasons that req.method has the value "GET"“.
// 2. You can use as const to convert the entire object to be type literals:
// const req = { url: "https://example.com", method: "GET" } as const;
// handleRequest(req.url, req.method);
// The as const suffix acts like const but for the type system, ensuring that all properties are assigned the literal type instead of a more general version like string or number.
// null and undefined
// JavaScript has two primitive values used to signal absent or uninitialized value: null and undefined.
// TypeScript has two corresponding types by the same names. How these types behave depends on whether you have the strictNullChecks option on.
// strictNullChecks
//  off
// With strictNullChecks off, values that might be null or undefined can still be accessed normally, and the values null and undefined can be assigned to a property of any type. This is similar to how languages without null checks (e.g. C#, Java) behave. The lack of checking for these values tends to be a major source of bugs; we always recommend people turn strictNullChecks on if it’s practical to do so in their codebase.
// strictNullChecks
//  on
// With strictNullChecks on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value. Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null:
function doSomething(x) {
    if (x === null) {
        // Do nothing
    }
    else {
        console.log(`Hello ${x.toUpperCase()}`);
    }
}
// Non-null Assertion Operator (Postfix !)
// TypeScript also has a special syntax for removing null and undefined from a type without doing any explicit checking. Writing ! after any expression is effectively a type assertion that the value isn’t null or undefined:
// In TypeScript, the question mark (?) after a parameter is used to indicate that the parameter is optional. This means that the parameter can be omitted when calling the function, and if it's omitted, its value will be undefined.
function liveDangerously(x) {
    // No error
    console.log(x.toFixed);
}
// The exclamation mark (!) in TypeScript is used to assert that a value is not null or undefined. This is known as a non-null assertion.
// Just like other type assertions, this doesn’t change the runtime behavior of your code, so it’s important to only use ! when you know that the value can’t be null or undefined.
// Enums
// Enums are a feature added to JavaScript by TypeScript which allows for describing a value which could be one of a set of possible named constants. Unlike most TypeScript features, this is not a type-level addition to JavaScript but something added to the language and runtime. Because of this, it’s a feature which you should know exists, but maybe hold off on using unless you are sure. You can read more about enums in the Enum reference page.
// Less Common Primitives
// It’s worth mentioning the rest of the primitives in JavaScript which are represented in the type system. Though we will not go into depth here.
// bigint
// From ES2020 onwards, there is a primitive in JavaScript used for very large integers, BigInt:
// Creating a bigint via the BigInt function
const oneHundred = BigInt(100);
// Creating a BigInt via the literal syntax
const anotherHundred = 100n;
// You can learn more about BigInt in the TypeScript 3.2 release notes.
// symbol
// There is a primitive in JavaScript used to create a globally unique reference via the function Symbol():
// In JavaScript, a symbol is a unique identifier that can be used as a property key on objects. It's a primitive data type, similar to strings, numbers, and booleans. Symbols are often used to create private or hidden properties on objects.
// const firstName = Symbol("name");
// const secondName = Symbol("name");
// In JavaScript, symbols are unique even if they have the same description.
// if (firstName === secondName) {
// This comparison appears to be unintentional because the types 'typeof firstName' and 'typeof secondName' have no overlap.
//   // Can't ever happen
// }
