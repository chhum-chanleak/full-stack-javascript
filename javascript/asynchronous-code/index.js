// Callbacks

// Example 1
// A function that has a callback as a parameter is commonly referred to as a higher-order function.
const calculate = (num1, num2, logResult) => {
  const sum = num1 + num2;
  logResult(sum);
};

// This function will get passed as a callback function
const logResult = (result) => console.log(`Synchronous result: $${result}`);

// // Usage
// calculate(0, 1, logResult);

// Example 2
const processArray = (arr, doubleValue) => {
  return arr.map((item, index) => doubleValue(item, index));
};

// This function will get passed as a callback function
const doubleValue = (value, index) => {
  console.log(`Doubling value at index ${index}: ${value}`);  

  return value * 2;
};

// // Usage
// const numbers = [0, 1, 2];
// console.log(processArray(numbers, doubleValue));

// Promises

// Example 1
const myPromise = new Promise((resolve, reject) => {
  const success = true;

  if (success) {
    resolve(42); // Fulfill with the value 42
  } else {
    reject(new Error("Something went wrong")); // Reject with an error
  }
});

myPromise
  .then((value) => { // then(42)
    console.log("Resolved with value:", value);
  })
  .catch((error) => { // catch(new Error("Something went wrong"))
    console.error("Rejected with error:", error.message);
  });

// Example 2
const checkEvenOdd = (num) => {
  return new Promise((resolve, reject) => {
    // Simulating an asynchronous check (e.g. some complex logic)
    setTimeout(() => {
      if (typeof num !== "number") {
        reject(new Error("Input is not a number")); // Reject if input is not a number;
      } else if (num % 2 === 0) {
        resolve(`${num} is an even number`); // Resolve if the number is even
      } else {
        resolve(`${num} is an odd number`); // Resolve if the number is odd
      }
    }, 1500); // 1.5-second delay to simulate async behavior
  });
};

checkEvenOdd(7)
  .then((message) => {
    console.log(`Resolve: ${message}`);
  })
  .catch((error) => {
    console.log(`Rejected: ${error}`);
  });