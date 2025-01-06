// Callbacks

// Exercise 1: Sum Array Elements with Callback
// Write a function sumArray that accepts an array of numbers and a callback function. The callback function should be used to compute the sum of the array elements. You can use a simple loop or the reduce method to calculate the sum.

// Solution 1

// Exercise 2: Filter Even Numbers with Callback
// Create a function filterEvens that filters out even numbers from an array. It should accept an array of numbers and a callback function. The callback should be used to process the filtered numbers and log them.

// Solution 2

// console.log(filterEvens([3, 2, 5, 10, -3], removeEvenNumbers));

// Promises

// Exercise 1: Fetch User Data with a Promise
// Write a function fetchUserData that simulates an API call using a Promise. The function should accept a userId and return a Promise that resolves with a user object after 2 seconds. If the userId is invalid, the Promise should reject with an error message.

// Solution 1

// Resolved

// Rejected
// Error

// Exercise 2: Timeout Promise
// Create a function timeout that returns a Promise that resolves after a specified number of milliseconds. If the timeout duration is short than 3 seconds, then reject and throw an error message 'Time is too short to process data', the Promise should resolve otherwise.

// Solution 2

// Resolved

// Rejected

// Error

// fetch() exercises

// Exercise 1: Fetch data from alligator.json

// Solution 1

// fetchAlligators();

// Exercise 2: Fetch data from bears.json

// Solution 1

// fetchBears();

// Read 2 macrotask and microtask below and examples of Event Loop on the internet

// Macrotasks:
  // setTimeout()
  // setInterval()
  // setImmediate() (Node.js)
  // I/O tasks (Node.js)
  // UI rendering (browser)
// Microtasks:
  // Promises (then(), catch(), finally())
  // queueMicrotask()
  // MutationObserver (browser)
  // Object.observe() (deprecated)