# asynchronous-code

1. Callbacks:
  A callback function is a function passed into another function as an argument, which is then invoked inside the outer function to complete some kind of routine or action.
  Callbacks are just the name of a convention for using JavaScript functions. There isn't a special thing called a 'callback' in the JavaScript language, it's just a convention. Instead of immediately returning some result like most functions, functions that use callbacks take some time to produce a result. The word 'asynchronous', aka 'async' just means 'takes some time' or 'happens in the future, not right now'. Usually callbacks are only used when doing I/O, e.g. downloading things, reading files, talking to databases, etc.

2. How to avoid callback hell?
  1. Keep your code shallow
    Don't nest functions. Give them names and place them at the top level of your program
  2. Modularize
  3. Handle every single error

  With callbacks the most popular way to handle errors is the Node.js style where the first argument to the callback is always reserved for an error.
  <!-- var fs = require('fs')

  fs.readFile('/Does/not/exist', handleFile)

  function handleFile (error, file) {
    if (error) return console.error('Uhoh, there was an error', error)
    // otherwise, continue on and use `file` in your code
  } -->

3. When to Use try...catch?
  When you expect a function to throw errors: If the function is likely to throw an error (e.g., invalid input, file operations, network requests), it's a good idea to wrap that code in a try...catch block to handle errors gracefully.
  <!-- function parseJSON(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error("Invalid JSON:", error.message);
        return null;
    }
  } -->

4. Summary on how to avoid callback hell:
  1. Don't nest functions. Give them names and place them at the top level of your program
  2. Use function hoisting to your advantage to move functions 'below the fold'
  3. Handle every single error in every one of your callbacks. Use a linter like standard or node.js style to help you with this.
  4. Create reusable functions and place them in a module to reduce the cognitive load required to understand your code. Splitting your code into small pieces like this also helps you handle errors, write tests, forces you to create a stable and documented public API for your code, and helps with refactoring.

4. Here are some rules of thumb when creating a module:

  1. Start by moving repeatedly used code into a function

  2. When your function (or a group of functions related to the same theme) get  big enough, move them into another file and expose them using module.exports. You can load this using a relative require

  3. If you have some code that can be used across multiple projects give it it's own readme, tests and package.json and publish it to github and npm. There are too many awesome benefits to this specific approach to list here!

  4. A good module is small and focuses on one 
  
  5. Individual files in a module should not be longer than around 150 lines of JavaScript

  6. A module shouldn't have more than one level of nested folders full of 

  7. JavaScript files. If it does, it is probably doing too many things
  Ask more experienced coders you know to show you examples of good modules until you have a good idea of what they look like. If it takes more than a few minutes to understand what is happening, it probably isn't a very good module.

5. Promise, then, catch, finally:
  A 'Promise' in TypeScript (and JavaScript) is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. It allows you to write asynchronous code in a more readable and structured way, avoiding "callback hell."
  In TypeScript, a Promise constructor is used to create a new Promise object. The constructor takes a single function as an argument, known as the executor. This function accepts two parameters:
  resolve: A function to fulfill the promise.
  reject: A function to reject the promise.

  then() method is used in JavaScript and TypeScript to handle the resolved value of a Promise. It's part of the Promise API that allows you to chain operations that depend on the result of an asynchronous operation.

  The 'catch' callback is executed when the promise is rejected.

  All promise instances get a then method which allows you to react to the promise.  The first then method callback receives the result given to it by the resolve() call.

  The newly introduced finally callback is called regardless of success or failure

  In TypeScript, the type of the resolved value is specified when creating the Promise, and resolve and reject will use that type.

  For example:
  If you define a promise that resolves with a string, the resolve function must be passed a string value.
  If the promise resolves with a number, the resolve function must receive a number value.
  <!-- const stringPromise = new Promise<string>((resolve, reject) => {
    resolve("Hello, world!"); // Must resolve with a string
  });

  const numberPromise = new Promise<number>((resolve, reject) => {
      resolve(42); // Must resolve with a number
  }); -->

  You can also define custom rejection types by using TypeScript’s type system. For example, you might want to reject with a specific error type:
  <!-- interface CustomError {
    code: number;
    message: string;
  }

  const myPromise = new Promise<void>((resolve, reject) => {
      const error: CustomError = { code: 500, message: "Internal server error" };
      reject(error); // Rejecting with a custom error type
  });

  myPromise.catch((error: CustomError) => {
      console.log(error.code, error.message); // 500 Internal server error
  }); -->

Promise.all() and Promise.race()

Event loop:
  The event loop is a fundamental concept in JavaScript (and TypeScript since it is a superset of JavaScript). It ensures that non-blocking, asynchronous operations (like setTimeout, Promises, or I/O tasks) are executed properly while the main thread runs synchronous code.

  How the Event Loop Works:
    Call Stack: Holds the currently executing code.
    Web APIs: Manages asynchronous operations (e.g., timers, HTTP requests, DOM events).

  Task Queues:
    Callback Queue: Holds tasks from APIs like setTimeout or event listeners.
    Microtask Queue: Holds higher-priority tasks like Promises and queueMicrotask.
    The event loop checks if the call stack is empty and, if so, pushes tasks from the queues into the stack to execute them.

  Execution Order:
    Execute synchronous code in the call stack.
    Process all tasks in the Microtask Queue (e.g., Promise.then).
    Process one task from the Callback Queue (e.g., setTimeout callback).
    Repeat steps 2–3 until all tasks are completed.
  <!-- console.log("Start");

  setTimeout(() => {
      console.log("Timeout callback");
  }, 0);

  Promise.resolve()
      .then(() => {
          console.log("Promise.then");
      })
      .then(() => {
          console.log("Chained Promise");
      });

  console.log("End"); -->

  Execution Flow:
    console.log("Start") → Executed immediately (call stack).
    setTimeout → Registers the callback in the Callback Queue.
    Promise.resolve() → Registers .then in the Microtask Queue.
    console.log("End") → Executed immediately (call stack is now empty).

  Once the synchronous code finishes, then Microtask Queue is processed:
    "Promise.then" logs.
    "Chained Promise" logs.

  Callback Queue is processed:
    "Timeout callback" logs.

  Output:
    Start
    End
    Promise.then
    Chained Promise
    Timeout callback

  Key Points:
    Microtasks (like Promise.then) always execute before tasks from the Callback Queue.
    The event loop enables non-blocking asynchronous programming in a single-threaded environment.
    TypeScript’s type system doesn’t affect how the event loop works but helps in catching errors in asynchronous programming.

