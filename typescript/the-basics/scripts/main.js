"use strict";
console.log("Hello, world!");
// Explicity types
function greet(person, date) {
    console.log(`Hello ${person}, today is ${date}`);
}
greet("Brendan", new Date());
let msg = "Hello, world!";
// Erased types
// "use strict";
// function greet(person, date) {
//     console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
// }
// greet("Maddison", new Date());
// Notice two things here:
// Our person and date parameters no longer have type annotations.
// Our “template string” - that string that used backticks (the ` character) - was converted to plain strings with concatenations.
// Downleveling
// console.log(`Hello ${person}, today is ${date}`);
// console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
// Why did this happen?
// Template strings are a feature from a version of ECMAScript called ECMAScript 2015 (a.k.a. ECMAScript 6, ES2015, ES6, etc. - don’t ask). TypeScript has the ability to rewrite code from newer versions of ECMAScript to older ones such as ECMAScript 3 or ECMAScript 5 (a.k.a. ES5). This process of moving from a newer or “higher” version of ECMAScript down to an older or “lower” one is sometimes called downleveling.
// By default TypeScript targets ES5, an extremely old version of ECMAScript. We could have chosen something a little bit more recent by using the target option. Running with --target es2015 changes TypeScript to target ECMAScript 2015, meaning code should be able to run wherever ECMAScript 2015 is supported. So running tsc --target es2015 hello.ts gives us the following output:
// function greet(person, date) {
//   console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }
// greet("Maddison", new Date());
// noImplicitAny
// Recall that in some places, TypeScript doesn’t try to infer types for us and instead falls back to the most lenient type: any. This isn’t the worst thing that can happen - after all, falling back to any is just the plain JavaScript experience anyway.
// However, using any often defeats the purpose of using TypeScript in the first place. The more typed your program is, the more validation and tooling you’ll get, meaning you’ll run into fewer bugs as you code. Turning on the noImplicitAny flag will issue an error on any variables whose type is implicitly inferred as any.
// strictNullChecks
// By default, values like null and undefined are assignable to any other type. This can make writing some code easier, but forgetting to handle null and undefined is the cause of countless bugs in the world - some consider it a billion dollar mistake! The strictNullChecks flag makes handling null and undefined more explicit, and spares us from worrying about whether we forgot to handle null and undefined.
