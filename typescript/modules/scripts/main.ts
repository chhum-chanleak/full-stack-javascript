// 1. How JavaScript modules are defined
export {}; // This will make this file a module.

// 2. Modules in TypeScript
// 2.1 ES Module Syntax
export default function helloWorld() {
  console.log("Hello, world!");
}

export var pi = 3.14;
export let squareOfTwo = 4;
export const phi = 1.61;

export class RandomNumberGenerator {}

type Absolute = (num: number) => number;
export const absolute: Absolute = (num) => (num < 0) ? num * (-1) : num;

export type Cat = {
  name: string,
  breed: string,
};

export type ID = number | string;

// Additional import syntax
// *
// import { pi as π } from "./maths.js";

// *
// @filename: maths.ts
// export const pi = 3.14;
// export default class RandomNumberGenerator {}
 
// // @filename: app.ts
// import RandomNumberGenerator, { pi as π } from "./maths.js";
 
// RandomNumberGenerator;

// *
// You can take all of the exported objects and put them into a single namespace using * as name:
// @filename: app.ts
// import * as math from "./maths.js";
 
// console.log(math.pi);
// const positivePhi = math.absolute(math.phi);

// *
// You can import a file and not include any variables into your current module via import "./file":
// @filename: app.ts
// import "./maths.js";
 
// console.log("3.14");
// In this case, the 'import' does nothing. However, all of the code in 'maths.ts' was evaluated, which could trigger side-effects which affect other objects.

// TypeScript Specific ES Module Syntax

// *
// Types can be exported and imported using the same syntax as JavaScript values:
// @filename: animal.ts
// export type Cat = { breed: string; yearOfBirth: number };
 
// export interface Dog {
//   breeds: string[];
//   yearOfBirth: number;
// }
 
// // @filename: app.ts
// import { Cat, Dog } from "./animal.js";
// type Animals = Cat | Dog;

// *
// An import statement which can only import types:
// // @filename: animal.ts
// export type Cat = { breed: string; yearOfBirth: number };
// export type Dog = { breeds: string[]; yearOfBirth: number };
// export const createCatName = () => "fluffy";
 
// // @filename: valid.ts
// import type { Cat, Dog } from "./animal.js";
// export type Animals = Cat | Dog;
 
// // @filename: app.ts
// import type { createCatName } from "./animal.js";
// const name = createCatName(); // 'createCatName' cannot be used as a value because it was imported using 'import type'.

// *
// TypeScript 4.5 also allows for individual imports to be prefixed with type to indicate that the imported reference is a type:
// // @filename: app.ts
// import { createCatName, type Cat, type Dog } from "./animal.js";
 
// export type Animals = Cat | Dog;
// const name = createCatName();

// Together these allow a non-TypeScript transpiler like Babel, swc or esbuild to know what imports can be safely removed.

// ES Module Syntax with CommonJS Behavior
// TypeScript has ES Module syntax which directly correlates to a CommonJS and AMD require. Imports using ES Module are for most cases the same as the require from those environments, but this syntax ensures you have a 1 to 1 match in your TypeScript file with the CommonJS output:

// import fs = require("fs");
// const code = fs.readFileSync("hello.ts", "utf8");

// 3. CommonJS syntax
// CommonJS is the format which most modules on npm are delivered in. Even if you are writing using the ES Modules syntax above, having a brief understanding of how CommonJS syntax works will help you debug easier.

// Exporting:
// Identifiers are exported via setting the exports property on a global called module.
// function absolute(num: number) {
//   if (num < 0) return num * -1;
//   return num;
// }
 
// module.exports = {
//   pi: 3.14,
//   squareTwo: 1.41,
//   phi: 1.61,
//   absolute,
// };

// Then these files can be imported via a require statement:
// const maths = require("./maths");
// maths.pi;

// Or you can simplify a bit using the destructuring feature in JavaScript:
// const { squareTwo } = require("./maths");
// squareTwo;

// 3.1 CommonJS and ES Modules interop
// There is a mis-match in features between CommonJS and ES Modules regarding the distinction between a default 'import' and a module'namespace' object 'import'. TypeScript has a compiler flag to reduce the friction between the two different sets of constraints with esModuleInterop.

// 4. TypeScript’s Module Resolution Options
// Module resolution is the process of taking a string from the import or require statement, and determining what file that string refers to.

// TypeScript includes two resolution strategies: Classic and Node. Classic, the default when the compiler option module is not commonjs, is included for backwards compatibility. The Node strategy replicates how Node.js works in CommonJS mode, with additional checks for .ts and .d.ts.

// There are many TSConfig flags which influence the module strategy within TypeScript: moduleResolution, baseUrl, paths, rootDirs.

// For the full details on how these strategies work, you can consult the Module Resolution reference page.

// 5. TypeScript’s Module Output Options
// There are two options which affect the emitted JavaScript output:

// 'target' which determines which JS features are downleveled (converted to run in older JavaScript runtimes) and which are left intact
// module which determines what code is used for modules to interact with each other
// Which 'target' you use is determined by the features available in the JavaScript runtime you expect to run the TypeScript code in. That could be: the oldest web browser you support, the lowest version of Node.js you expect to run on or could come from unique constraints from your runtime - like Electron for example.

// All communication between modules happens via a 'module' loader, the compiler option 'module' determines which one is used. At runtime the 'module' loader is responsible for locating and executing all dependencies of a 'module' before executing it.

// For example, here is a TypeScript file using 'ES Modules' syntax, showcasing a few different options for 'module':
// import { valueOfPi } from "./constants.js";
 
// export const twoPi = valueOfPi * 2;

// ES2020:
// import { valueOfPi } from "./constants.js";
// export const twoPi = valueOfPi * 2;

// CommonJS:
// "use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.twoPi = void 0;
// const constants_js_1 = require("./constants.js");
// exports.twoPi = constants_js_1.valueOfPi * 2;

// UMD:
// (function (factory) {
//   if (typeof module === "object" && typeof module.exports === "object") {
//       var v = factory(require, exports);
//       if (v !== undefined) module.exports = v;
//   }
//   else if (typeof define === "function" && define.amd) {
//       define(["require", "exports", "./constants.js"], factory);
//   }
// })(function (require, exports) {
//   "use strict";
//   Object.defineProperty(exports, "__esModule", { value: true });
//   exports.twoPi = void 0;
//   const constants_js_1 = require("./constants.js");
//   exports.twoPi = constants_js_1.valueOfPi * 2;
// });

// 6. TypeScript namespaces
// TypeScript has its own module format called namespaces which pre-dates the ES Modules standard. This syntax has a lot of useful features for creating complex definition files, and still sees active use in DefinitelyTyped. While not deprecated, the majority of the features in namespaces exist in ES Modules and we recommend you use that to align with JavaScript’s direction. You can learn more about namespaces in the namespaces reference page