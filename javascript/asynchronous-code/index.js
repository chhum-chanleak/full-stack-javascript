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


// Promise.all() :

// Promise.all() is a method in JavaScript that takes an array (or iterable) of promises and returns a single promise. This promise:

// Resolves when all the promises in the array resolve.
// The resolution value is an array of the resolved values of the input promises, maintaining their order.

// Rejects as soon as any one promise in the array rejects.
// The rejection reason is the reason of the first rejected promise.

// Example 1: Handling Multiple Asynchronous Operations
const fetchUser = new Promise((resolve) => {
  setTimeout(() => {
    resolve("User data");
  }, 1000);
});

const fetchPosts = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Posts data");
  }, 1500);
});

const fetchComments = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Comments data");
  }, 500);
});

Promise.all([fetchUser, fetchPosts, fetchComments])
  .then((results) => {
    console.log(`All promises resolved: ${results}`)
  })
  .catch((error) => {
    console.log(`One of the promises rejected: ${error}`);
  });

// Example 1 output:
// All promises resolved: [ 'User data', 'Posts data', 'Comments data' ]

// Example 2: Handling Errors in Promise.all
const promise1 = Promise.resolve("Success 1");
const promise2 = Promise.reject("Error occurred");
const promise3 = Promise.resolve("Success 3");

Promise.all([promise1, promise2, promise3])
  .then((resolves) => {
    console.log(`All promises resolved: ${resolves}`);
  })
  .catch((error) => {
    console.log(`One of the promises rejected: ${error}`);
  });

// Example 2 output:
// One of the promises rejected: Error occurred

// Promise.race()

// Promise.race() takes an array (or iterable) of promises and returns a single promise. This promise:

// Resolves or rejects as soon as the first promise in the array settles (either resolves or rejects).
// The result (resolution or rejection) is the same as the first settled promise.

// Example 1: Fetching Data with a Timeout
const fetchData = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Data fetched successfully");
  }, 3000);
});

const timeout = new Promise((_, reject) => {
  setTimeout(() => {
    reject("Request timed out");
  }, 2000);
});

Promise.race([fetchData, timeout])
  .then((result) => {
    console.log(`Promise resolved: ${result}`);
  })
  .catch((error) => {
    console.log(`Promise rejected: ${error}`);
  });

// Exercise 1 output:
// Promise rejected: Request timed out

// Example 2: Resolving the Fastest Promise
const fastPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Fast promise resolved");
  }, 1000);
});

const slowPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Slow promise resolved");
  }, 3000);
});

Promise.race([fastPromise, slowPromise])
  .then((result) => {
    console.log(`Promise resolved: ${result}`);
  })
  .catch((error) => {
    console.log(`Promise rejected: ${error}`);
  });

// Example 2 output:
// Promise resolved: Fast promise resolved
