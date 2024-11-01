import helloWorld, { pi as π, squareOfTwo, phi, type ID, absolute } from "./main.js";
import * as main from "./main.js";

helloWorld();
console.log(`Area of a circle with a radius of 2 meter: ${π * (2 ** 2)}.`);
console.log(phi);
console.log(absolute(-3));
console.log(main.squareOfTwo);

type Feline = main.Cat;
const lucy: Feline = {
  name: "Lucy",
  breed: "Orange",
};

const id: ID = "ABC123";