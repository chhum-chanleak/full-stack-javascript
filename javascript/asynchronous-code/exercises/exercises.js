// Callbacks

// Exercise 1: Sum Array Elements with Callback
// Write a function sumArray that accepts an array of numbers and a callback function. The callback function should be used to compute the sum of the array elements. You can use a simple loop or the reduce method to calculate the sum.

// Solution 1
const sumArray = (arr, sum) => {
  return sum(arr);
}

const sum = (arr) => {
  let result = 0;

  for (let i = 0; i < arr.length; i += 1) {
    result += arr[i];
  }

  return result;
};

// console.log(sumArray([3, 2, 5, 10, -3], sum));

// Exercise 2: Filter Even Numbers with Callback
// Create a function filterEvens that filters out even numbers from an array. It should accept an array of numbers and a callback function. The callback should be used to process the filtered numbers and log them.

// Solution 2
const filterEvens = (arr, removeEvenNumbers) => {
  return removeEvenNumbers(arr);
};

const removeEvenNumbers = (arr) => {
  const oddNumbers = [];

  for (let i = 0; i < arr.length; i += 1) {
    (arr[i] % 2 === 0) && oddNumbers.push(arr[i]);
  }

  return oddNumbers;
};

// console.log(filterEvens([3, 2, 5, 10, -3], removeEvenNumbers));

// Promises

// Exercise 1: Fetch User Data with a Promise
// Write a function fetchUserData that simulates an API call using a Promise. The function should accept a userId and return a Promise that resolves with a user object after 2 seconds. If the userId is invalid, the Promise should reject with an error message.

// Solution 1
const fetchUserData = (userId = {id: 1, name: "apple"}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof userId.id == "number") {
        resolve(userId);
      } else {
        reject(new Error("Invalid user id"));
      }
    }, 2000); // The Promise settles after 2 seconds
  });
};

// Resolved
fetchUserData({ id: 12, name: "jackfruit" })
  .then(result => console.log(`Id: ${result.id}, Name: ${result.name}`))
  .catch(error => console.log(`Error: ${error.message}`))  ;

// Rejected
fetchUserData({ id: "1", name: "coconut" })
  .then(result => console.log(`Id: ${result.id}, Name: ${result.name}`))
  .catch(error => console.log(`Error: ${error.message}`))  ;
// Error

// Exercise 2: Timeout Promise
// Create a function timeout that returns a Promise that resolves after a specified number of milliseconds. If the timeout duration is shorter than 3 seconds, then reject and throw an error message 'Time is too short to process data', the Promise should resolve otherwise.

// Solution 2
const timeout = (ms) => {
  return new Promise((resolve, reject) => {
    if (ms < 3000) {
      reject(new Error("Time is too short to process data"));
    }
    else {
      setTimeout(() => {
        resolve("Time is enough for data to get processed");
      }, ms);
    }
 // Invokes the callback after ms duration
  });
};

// Resolved
timeout(4000)
  .then(result => console.log(result))
  .catch(error => console.log(`Error: ${error.message}`));

// Rejected
timeout(2000)
  .then(result => console.log(result))
  .catch(error => console.log(`Error: ${error.message}`));
// Error

// fetch() exercises

// Exercise 1: Fetch data from alligator.json

// Solution 1
const fetchAlligators = () => {
  fetch("../data/alligators.json")
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
    })
};

// fetchAlligators();

// Exercise 2: Fetch data from bears.json

// Solution 1
const fetchBears = () => {
  fetch("../data/bears.json")
    .then(resp => resp.json())
    .then(data => console.log(data));
};

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