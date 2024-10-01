// 1. Narrowing
function padLeft(padding: number | string, input: string): string {
  if (typeof(padding) === 'number') {
    // 'padding' here is shown to have 'number' type.
    return " ".repeat(padding) + input;
  }
  // Here it is shown to have 'string' type.
  return padding + input;  
}

// 2. 'typeof' type guards
// function printAll(strs: string | string[] | null) {
//   // If typeof strs is Array because an array is an "object" in JavaScript
//   if (typeof(strs) === "object") {
//     // This line causes an error because 'null' is also an object
//     for (const s of strs) { 
//       console.log(s);
//     }
//   } else if (typeof(strs) === "string") {
//     console.log(strs);
//   } else {
//     // Do nothing
//   }
// }

// 3. Truthiness narrowing
function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}

// both of these result in 'true'
// Boolean("hello"); // type: boolean, value: true
// !!"world"; // type: true,    value: true
// This kind of expression is always truthy.

function printAll(strs: string | string[] | null) {
  if (strs && typeof(strs) === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof(strs) === "string") {
    console.log(strs);
  }
}

function multiplyAll(values: number[] | undefined, factor: number = 1): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((value) => value * factor);
  }
}

// 4. Equality narrowing
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    y.toUpperCase();
  } else {
    console.log(x);
    console.log(y);
  }
}

function printAll2(strs: string | string[] | null) {
  // Check whether 'strs' is null or undefined.
  if (strs !== null) {
    // If strs is an array
    if (typeof(strs) === 'object') {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof(strs) === "string") {
      console.log(strs);
    }
  }
}

interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // '!=' removes both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
    // Here container has a type of 'number'.
    container.value *= factor;
  }
}

// 5. The 'in' operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () =>  void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    // Here animal has a type of 'Fish'.
    return animal.swim();
  }

  // Now animal has a type of 'Bird'.
  return animal.fly();
}

// 6. 'instanceof' narrowing
function logValue(x: Date | string) {
  // Remove type 'string' from x.
  if (x instanceof Date) {
    // Here x has a type of Date.
    console.log(x.toUTCString());
  } else {
    // Here x has type of string
    console.log(x.toUpperCase());
  }
}

// 7. Assignments
// x has a type of union type 'string | number'.
let x = Math.random() < 0.5 ? 10 : "Hello world!";

x = 1;
// TypeScript looks at the right side of the assignment and narrows the left side to type 'number'.
x;

x = "Goodbye!";
// Now x has a type of 'string'.
x;

// Type 'boolean' is not assignable to type 'string | number'.
// x = false; // Type boolean 'false' was NOT a part of initialized type 'string | number'.

// 8. Control flow analysis
function example2() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;
  x; // In this line, x has a type of 'boolean';

  if (Math.random() < 0.5) { // This expression is truthy.
    x = "Hello";
    console.log(x);
  } else {
    x = 100;
    console.log(x);
  }

  return x; // The possible type of x depends on the condition above.
}

// 9. Using type predicates
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Both calls to 'swim' and 'fly' are now okay.
// let pet = getSmallPet();

// if (isFish(pet)) {
//   pet.swim();
// } else {
//   pet.fly();
// }

// const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
// const underwater1: Fish[] = zoo.filter(isFish);
// // or, equivalently
// const underWater2: Fish[] = zoo.filter(isFish) as Fish[];

// // The predicate may need repeating for more complex examples.
// const underwater3: Fish[] = zoo.filter((pet): pet is Fish => {
//   if (pet.name === "sharkey") {
//     return false;
//   }
//   return isFish(pet);
// });

// Another example
function isNumber(value: any): value is number {
  return typeof(value) === 'number';
}

function addNumbers(a: any, b: any): number {
  // Check whether bother a and b are types of 'number'.
  if (isNumber(a) && isNumber(b)) {
    return a + b;
  }
  // Throw an error message when a and/or b are/is not numbers.
  throw new Error("Both a and b must be numbers.");
}

// 10. Assertion functions
// In TypeScript, an assertion function is a function that returns a type guard. A type guard is a way to narrow the type of a variable based on a runtime check.
function assertIsString(value: any): asserts value is string {
  if (typeof(value) !== 'string') {
    throw new Error("Value must be a string.");
  }
}

function greet(name: any): string {
  // This returns a type guard.
  assertIsString(name);
  // So 'name' under this line has a type of 'string'.
  return `Hello, ${name}.`;
}

// 11. Discriminated unions
interface Shape {
  kind: "circle" | "square";
  // Make radius optional because when it is not defined, the code still run.
  radius?: number; 
  // Make sideLength optional because when it is not defined, the code still run.
  sideLength?: number;
}

// function handleShape(shape: Shape) {
//// Oopsie!
// // This comparison appears to be unintentional because the types '"circle" | "square"' and '"rect"' have no overlap.
//   if (shape.kind === "rect") {
//     // ...
//   }
// }

function getArea(shape: Shape) {
  if (shape.kind === 'circle') {
    // 'shape.radius' is possibly 'undefined'.
    // Use '!' here for non-null assertion.
    return Math.PI * (shape.radius! ** 2);
  }
}

// Better version
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape2 = Circle | Square;

function getArea2(shape: Shape2) {
 switch (shape.kind) {
  case 'circle': return Math.PI * (shape.radius ** 2);
  case 'square': return shape.sideLength ** 2;
 }
}
  
// 12. The 'never' type
// When narrowing, you can reduce the options of a union to a point where you have removed all possibilities and have nothing left. In those cases, TypeScript will use a never type to represent a state which shouldn’t exist.

// 13. Exhaustiveness checking:
function getArea3(shape: Shape2) {
  switch (shape.kind) {
   case 'circle': return Math.PI * (shape.radius ** 2);
   case 'square': return shape.sideLength ** 2;
   default:
    // All types have been removed
    const _exhaustiveCheck: never = shape;
    return _exhaustiveCheck;
  }
 }