// 1. The 'typeof' type operator
// Prints "string"
console.log(typeof "Hello, world!");

let s = "Hello";
let n: typeof s;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;

function f() {
  return { x: 10, y: 3 };
}
// type P = ReturnType<f>; // No
type P = ReturnType<typeof f>; // Yes
