// 2. Modules in TypeScript
// 2.1 ES Module Syntax
export default function helloWorld() {
    console.log("Hello, world!");
}
export var pi = 3.14;
export let squareOfTwo = 4;
export const phi = 1.61;
export class RandomNumberGenerator {
}
export const absolute = (num) => (num < 0) ? num * (-1) : num;
// 3. Additional import syntax
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
// 4. TypeScript Specific ES Module Syntax
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
