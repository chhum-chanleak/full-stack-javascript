// Callbacks

// Exercise 1: Sum Array Elements with Callback
// Write a function sumArray that accepts an array of numbers and a callback function. The callback function should be used to compute the sum of the array elements. You can use a simple loop or the reduce method to calculate the sum.

// Solution 1
const sumArray = (arr, sumElements) => sumElements(arr);

const sumElements = (arr) => {
  let result = 0;

  for (let i = 0; i < arr.length; i += 1) {
    result += arr[i];
  }

  return result;
};

// console.log(sumArray([1, 2, 3, 4], sumElements));

// Exercise 2: Filter Even Numbers with Callback
// Create a function filterEvens that filters out even numbers from an array. It should accept an array of numbers and a callback function. The callback should be used to process the filtered numbers and log them.

// Solution 
const filterEvens = (arr, removeEvenNumbers) => removeEvenNumbers(arr);

const removeEvenNumbers = (arr) => {
  const oddNumbers = [];

  for (let i = 0; i < arr.length; i += 1) {
    (arr[i] % 2 !== 0) && oddNumbers.push(arr[i]);
  }

  return oddNumbers;
};

console.log(filterEvens([0, 1, 2, 3, 4, 5], removeEvenNumbers));

// Promises

// Exercise 1: Fetch User Data with a Promise
// Write a function fetchUserData that simulates an API call using a Promise. The function should accept a userId and return a Promise that resolves with a user object after 2 seconds. If the userId is invalid, the Promise should reject with an error message.

// Solution 1
const fetchUserData = (userID) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof userID.id === "number") {
        resolve(userID);
      }

      reject(new Error("Invalid user id"));
    }, 2000);
  });
};

// Resolved
fetchUserData({ id: 0, name: "andy"})
  .then(result => console.log(`Id: ${result.id}, Name: ${result.name}`))
  .catch(error => console.log(`${error}`));
// Rejected
fetchUserData({ id: "0", name: "andy"})
  .then(result => console.log(`Id: ${result.id}, Name: ${result.name}`))
  .catch(error => console.log(`${error}`)); 
// Error

// Exercise 2: Timeout Promise
// Create a function timeout that returns a Promise that resolves after a specified number of milliseconds. If the timeout duration is shorter than 3 seconds, then reject and throw an error message 'Time is too short to process data', the Promise should resolve otherwise.

// Solution 2
const timeout = (ms) => {
  return new Promise((resolve, reject) => {
    if (ms < 3000) reject(new Error("Timer is too short to process data"));

    setTimeout(() => resolve("Timer is long enough to process data"), ms);
  });
};

// Resolved
timeout(3000)
  .then(result => console.log(`Resolved: ${result}`))
  .catch(error => console.log(`Rejected: ${error}`));

// Rejected
timeout(2999)
  .then(result => console.log(`Resolved: ${result}`))
  .catch(error => console.log(`Rejected: ${error}`));
// Error

// fetch() exercises

// Exercise 1: Fetch data from alligator.json

// Solution 1
const fetchAlligators = () => {
  fetch("../data/alligators.json")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
};

fetchAlligators();

// Exercise 2: Fetch data from bears.json

// Solution 1
const fetchBears = () => {
  fetch("../data/bears.json")
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(`${error}`));
};

fetchBears();

// Read macrotask and microtask below and examples of Event Loop on the internet 2 times

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