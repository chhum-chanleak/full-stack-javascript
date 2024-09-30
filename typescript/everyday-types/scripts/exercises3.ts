// Basic Types

// Type Inference:
// Create a variable and assign it a value. Let TypeScript infer its type.
// Try assigning a different type of value to the same variable and observe the compiler's response.

// Explicit Typing:
// Declare a variable with an explicit type and assign it a value.
// Try assigning a value of a different type and observe the compiler's response.

// Union Types:
// Create a variable with a union type (e.g., string | number).

// Assign different types of values to the variable and observe the compiler's response.
// id = true; // Type 'boolean' is not assignable to type 'string | number'.ts(2322)


// Intersection Types:
// Create an interface with properties.
// Create another interface with properties.
// Create an intersection type using the two interfaces.

// Create a variable with the intersection type and assign it an object that satisfies both interfaces.
// Literal Types:
// Create a variable with a literal type (e.g., "apple" | "banana").
// Try assigning a different value to the variable and observe the compiler's response.


// Advanced Types
// Generic Types:
// Generic types allow you to create reusable components that can work with different data types. They provide flexibility and type safety by allowing you to define functions, classes, and interfaces that can accept a wide range of arguments.

// Create a generic function that takes a generic type as a parameter.
// Use the generic type within the function.
// Call the function with different types of arguments.

// Type Alias:
// A type alias in TypeScript is a way to create a new name for an existing type. This can be useful for making your code more readable and maintainable, especially when dealing with complex type expressions.
// Create different type aliases

// Assign each type to different variables

// Type Assertion:
// A type assertion in TypeScript is a way to tell the compiler that a value is of a specific type, even if the compiler isn't sure. This can be useful when you have more information about a value than the compiler does.
// Create a function using type assertion

// If the argument type is anything other than 'string', it will output undefined.

// Literal Type:
// Literal types in TypeScript allow you to specify a specific value for a variable or property. This can be useful for ensuring that a value is limited to a specific set of possibilities.
// Create literal types

// Use the created literal types as with function

// Interface Types:
// Interfaces in TypeScript are a powerful tool for defining the structure of objects. They specify the properties and methods that an object must have, ensuring type safety and improving code readability.
// Create an interface with properties and methods.

// Create a class that implements the interface.

// Create instances of the class and use them where the interface is expected.

// Class Types:
// In TypeScript, a class is a blueprint for creating objects, providing a structured way to define properties and methods. It encapsulates data and behavior, promoting code organization and reusability.
// Create a class with properties and methods.
// class Person {
//   constructor(public name: string, public age: number) {}

//   greet() {
//     console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
//   }
// }

// const person1 = new Person("Alice", 30);
// person1.greet(); // Output: Hello, my name is Alice and I am 30 years old.
// Create instances of the class.

// Access properties and call methods on the instances.

// Enum Types:
// Enums (enumerations) are a way to define a set of named constants. They provide a more readable and maintainable way to represent a fixed set of values compared to using raw numbers or strings. Enums are often used to represent a finite set of related values.
// Create an enum type with different members.
// Access members of the enum by their name or index.

// Tuple Types:
// Tuples are a fixed-length array with elements of specified types. They provide a way to represent ordered collections of elements with known types.
// Tuples are useful for representing structured data, such as coordinate points, function return values, or configuration options.
// They provide a more type-safe alternative to arrays for scenarios where the element types and order are known in advance.
// Tuples can be used with other TypeScript features like generics and interfaces.
// Create a tuple type with specific elements.
// Access elements of the tuple by their index.
// Try modifying elements of the tuple and observe the compiler's response.