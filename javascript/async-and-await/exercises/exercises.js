// Example: async and await

// In the example below, we’ll simulate an asynchronous function that fetches data and use async and await to handle the asynchronous behavior in a more readable way.

// Simulate an asynchronous function using a Promise
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: "John Doe", age: 30 };  // Simulating fetched data
      if (url === "valid-url") {
        resolve(data);  // Resolve with data if the URL is valid
      } else {
        reject("Invalid URL");  // Reject with an error message if the URL is invalid
      }
    }, 1000);  // Simulate network delay
  });
}

// Using async and await to fetch the data
async function getUserData() {
  try {
    const data = await fetchData("valid-url");  // Await the promise resolution
    console.log("Fetched Data:", data);
  } catch (error) {
    console.error("Error:", error);  // Handle error if the promise is rejected
  }
}

// getUserData();

// 1. Exercise: Build a To-Do List with Async/Await

// Task:

// Create a simple asynchronous function to simulate adding a task to a to-do list.
// Create another asynchronous function to simulate fetching the current list of tasks.
// Use async and await to manage these asynchronous operations and display the results.

// Solution

const todoList = [
];

const addTodo = async (todo) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (todoList.length) {
        todoList.push(todo);
        resolve(`Task ${JSON.stringify(todo)} added successfully.`);
      } else {
        reject("There is no task.");
      }      
    }, 2000);
  });

  return promise;
};

const getTodoList = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!todoList.length) {
        reject("There is no task.");
      } else {
        resolve(todoList);
      }
    }, 2000);
  });

  return promise;
};

const showTodoList = async () => {
  try {
    const data = await getTodoList();

    console.log("To do list: ");
    for (let i = 0; i < data.length; i += 1) {
      console.log(todoList[i]);
    }
  } catch(error) {
    console.log("Error:", error);
  }
};

// showTodoList();

// 2. Exercise: Fetch User Data (Simulated API Call)

// You need to create a function that simulates fetching user data with a delay of 1.5 seconds using setTimeout. Then, use async/await to retrieve and log the data.

// Instructions:

// Create an async function called getUserData2.
// Inside, return a Promise that resolves after 1.5 seconds with the following user object:
// { id: 1, name: "Alice", role: "Developer" }
// Create another async function called fetchAndDisplayUser.
// Use await to get the user data and log
// User Data: { id: 1, name: "Alice", role: "Developer" }

// Solution

const getUserData2 = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: "Alice", role: "Developer" });
    }, 1500);
  });

  return promise;
};

const fetchAndDisplayUser = async () => {
  const data = await getUserData2();

  console.log("User Data:", data);
};

// fetchAndDisplayUser();

// 3. Exercise: Simulate an API Call for Weather Data

// You need to create a function that simulates fetching weather data with a delay of 2 seconds. Then, use async/await to retrieve and display the data.

// Instructions:
// Create an async function called getWeatherData.
// Inside, return a Promise that resolves after 2 seconds with the following weather object:
// { temperature: 25, condition: "Sunny", city: "Berlin" }
// Create another async function called fetchAndDisplayWeather.
// Use await to get the weather data and log
// Weather Data: { temperature: 25, condition: "Sunny", city: "Berlin" }

// Solution

const getWeatherData = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ temperature: 25, condition: "Sunny", city: "Berlin" });
    }, 2000);
  });

  return promise;
};

const fetchAndDisplayWeather = async () => {
  const data = await getWeatherData();

  console.log("Weather Data:", data);
};

// fetchAndDisplayWeather();

// 4. Exercise: Simulate a Product Fetching API
// You need to create a function that simulates fetching product data with a delay of 1.5 seconds. Then, use async/await to retrieve and display the data.

// Instructions:
// Create an async function called getProductData.
// Inside, return a Promise that resolves after 1.5 seconds with the following product object:
// { id: 101, name: "Laptop", price: 999.99 }
// Create another async function called fetchAndDisplayProduct.
// Use await to get the product data and log
// Product Data: { id: 101, name: "Laptop", price: 999.99 }

// Solution

const getProductData = async () => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 101, name: "Laptop", price: 999.99 });
    }, 1500);
  });

  return promise;
};

const fetchAndDisplayProduct = async () => {
  const data = await getProductData();

  console.log("Product Data:", data);
};

// fetchAndDisplayProduct();

