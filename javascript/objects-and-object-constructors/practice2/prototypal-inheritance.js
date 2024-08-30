// Working with prototype
const animal = {
  jumps: null
};
const rabbit = {
  jumps:true
};
Object.setPrototypeOf(rabbit, animal);

console.log(rabbit.jumps); // true
delete rabbit.jumps;
console.log(rabbit.jumps); // null
delete animal.jumps;
console.log(rabbit.jumps); // undefined

// Searching algorithm
const head = {
  glasses: 1
};
const table = {
  pen: 3
};
const bed = {
  sheet: 1,
  pillow: 2
};