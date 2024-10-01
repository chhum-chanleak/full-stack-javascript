"use strict";
// 1. Narrowing
function padLeft(padding, input) {
    if (typeof (padding) === 'number') {
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
function getUsersOnlineMessage(numUsersOnline) {
    if (numUsersOnline) {
        return `There are ${numUsersOnline} online now!`;
    }
    return "Nobody's here. :(";
}
// both of these result in 'true'
// Boolean("hello"); // type: boolean, value: true
// !!"world"; // type: true,    value: true
// This kind of expression is always truthy.
function printAll(strs) {
    if (strs && typeof (strs) === "object") {
        for (const s of strs) {
            console.log(s);
        }
    }
    else if (typeof (strs) === "string") {
        console.log(strs);
    }
}
function multiplyAll(values, factor = 1) {
    if (!values) {
        return values;
    }
    else {
        return values.map((value) => value * factor);
    }
}
// 4. Equality narrowing
function example(x, y) {
    if (x === y) {
        // We can now call any 'string' method on 'x' or 'y'.
        x.toUpperCase();
        y.toUpperCase();
    }
    else {
        console.log(x);
        console.log(y);
    }
}
function printAll2(strs) {
    // Check whether 'strs' is null or undefined.
    if (strs !== null) {
        // If strs is an array
        if (typeof (strs) === 'object') {
            for (const s of strs) {
                console.log(s);
            }
        }
        else if (typeof (strs) === "string") {
            console.log(strs);
        }
    }
}
function multiplyValue(container, factor) {
    // '!=' removes both 'null' and 'undefined' from the type.
    if (container.value != null) {
        console.log(container.value);
        // Here container has a type of 'number'.
        container.value *= factor;
    }
}
function move(animal) {
    if ("swim" in animal) {
        // Here animal has a type of 'Fish'.
        return animal.swim();
    }
    // Now animal has a type of 'Bird'.
    return animal.fly();
}
// 6. 'instanceof' narrowing
function logValue(x) {
    // Remove type 'string' from x.
    if (x instanceof Date) {
        // Here x has a type of Date.
        console.log(x.toUTCString());
    }
    else {
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
    let x;
    x = Math.random() < 0.5;
    x; // In this line, x has a type of 'boolean';
    if (Math.random() < 0.5) { // This expression is truthy.
        x = "Hello";
        console.log(x);
    }
    else {
        x = 100;
        console.log(x);
    }
    return x; // The possible type of x depends on the condition above.
}
// 9. Using type predicates
function isFish(pet) {
    return pet.swim !== undefined;
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
function isNumber(value) {
    return typeof (value) === 'number';
}
function addNumbers(a, b) {
    // Check whether bother a and b are types of 'number'.
    if (isNumber(a) && isNumber(b)) {
        return a + b;
    }
    // Throw an error message when a and/or b are/is not numbers.
    throw new Error("Both a and b must be numbers.");
}
// 10. Assertion functions
// In TypeScript, an assertion function is a function that returns a type guard. A type guard is a way to narrow the type of a variable based on a runtime check.
function assertIsString(value) {
    if (typeof (value) !== 'string') {
        throw new Error("Value must be a string.");
    }
}
function greet(name) {
    assertIsString(name);
    return `Hello, ${name}.`;
}
