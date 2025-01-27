const url = 'https://jsonplaceholder.typicode.com/posts';
const put_url = 'https://jsonplaceholder.typicode.com/posts/1';

// 1. Using the Fetch API

// 1.1 Fetch using only url (default GET Request)

// This is a simple use case where you only pass the URL of the resource you want to fetch. By default, the HTTP method is GET, and you can use this if you are just retrieving data.

// Example:

// fetch('https://api.example.com/data')
//   .then(response => response.json())  // Parse JSON response
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

// Exercise: Fetch Data from a URL using JavaScript (GET Request)
// Task: Write a JavaScript function that fetches data from a given URL using the default GET request. The function should log the response data to the console. If an error occurs during the fetch operation, the error should be caught and logged.

// Steps:

// Create a function named fetchData that takes a url parameter (string).
// Use the fetch API to make a GET request to the provided URL.
// Log the response data if the request is successful.
// Handle and log any errors that may occur during the fetch.

// Solution
const fetchData = (url) => {
  fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => {
    console.log(`Error: ${error.message}`);
  });
};

// fetchData(url);

// 1.2 Fetch using both url and Request object (custom Request)

// In this case, you provide a second argument to fetch() called the request object (or options object). This allows you to configure various aspects of the HTTP request, such as the HTTP method (POST, PUT, DELETE, etc.), headers, body content, and other options.

// Example:

// fetch('https://api.example.com/data', {
//   method: 'POST',  // Specify the HTTP method
//   headers: {
//     'Content-Type': 'application/json'  // Specify that we are sending JSON data
//   },
//   body: JSON.stringify({
//     name: 'John Doe',
//     age: 30
//   })  // Body contains the JSON data to be sent to the server
// })
//   .then(response => response.json())  // Parse JSON response
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

// Exercise: Fetch Data Using URL and Custom Request Object (POST Request)

// Task: Write a function that fetches data from a URL using a custom Request object. The function should send a POST request with a JSON payload. You will use the Request constructor to create a custom request object and make the fetch call.

// Steps:

// Create a function named fetchWithCustomRequest that takes a url and a payload as parameters.
// Use the Request constructor to create a custom request object, passing in the URL, request method, headers, and body (for a POST request).
// Use the fetch function to make the request using the custom Request object.
// Log the response data to the console, or log an error if the request fails.

// Steps:

// Create a function named fetchWithCustomRequest that takes a url and a payload as parameters.
// Use the Request constructor to create a custom request object, passing in the URL, request method, headers, and body (for a POST request).
// Use the fetch function to make the request using the custom Request object.
// Log the response data to the console, or log an error if the request fails.

// Solution
const fetchWithCustomRequest = (url, payload) => {
  const request = new Request(url, {
    method: "POST", // Specify POST method
    headers: {
      "Content-Type": "application/json", // Sending JSON data
    },
    body: JSON.stringify(payload), // Convert the payload object to JSON string 
  });

  fetch(request)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
};

const payload = { // The server might add id and/or creation timestamp to this payload
  title: 'foo',
  body: 'bar',
  userId: 1,
};

// The server might return
// {
//   id: 1,
//   title: 'foo',
//   body: 'bar',
//   userId: 1,
//   "createdAt": "2025-01-26T10:00:00Z",
//   "updatedAt": "2025-01-26T10:00:00Z"
// };
// fetchWithCustomRequest(url, payload);

// 2. Making a request

// In JavaScript, a request typically refers to an HTTP request, which is a way to communicate with a server, asking it to provide some data or to perform some action (such as creating or updating data). These requests are a crucial part of web development and are usually made using the fetch() API or older methods like XMLHttpRequest.

// Example: Making a GET Request with JavaScript
// Here's a basic example of how to make a GET request using the fetch() API in JavaScript to retrieve data from a server.

// Define the URL to fetch data from

// Making the GET request using fetch()
fetch(url)
  .then(response => {
    // Check if the response is successful
    // This code runs when the response is successful but throws an error due to network issue.
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse the response as JSON
  })
  .then(data => {
    // Log the fetched data to the console
    // console.log(data);
  })
  .catch(error => {
    // Handle errors in case of a failure
    console.error('There was a problem with the fetch operation:', error);
  });

// Exercise: Making a POST Request

// Now, let's extend the concept by making a POST request to send data to the server. For this example, we’ll use the same JSONPlaceholder API, which allows us to send mock data.

// Steps:
// Define the data (payload) you want to send to the server.
// Make a POST request to the server with the payload.
// The server will respond with the data you sent, including any automatically added properties like an ID.
const payload2 = {
  title: 'foo2',
  body: 'bar',
  userId: 1,
};

const fetchData2 = (url, payload) => {
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  fetch(request)
  .then((response) => {
    // Check for network issue
    if (!response.ok) {
      throw new Error("Network problem");
    }

    return response.json();
  }).then((data) => console.log(`${JSON.stringify(data)} 2`))
  .catch((error) => {
    console.error(`Error wih the POST request: ${error}`);
  });
};

// fetchData2(url, payload);

// 3. Setting the method

// In JavaScript, you can set the HTTP method (e.g., GET, POST, PUT, DELETE) for a request when using the fetch() API. The method determines the type of operation you're requesting the server to perform. By default, fetch() makes a GET request, but you can set a different method by passing an options object as the second argument to fetch().

// Example
const data = {
  title: 'foo3',
  body: 'bar',
  userId: 1
};

const options = {
  method: 'POST',  // Set the HTTP method to POST
  headers: {
    'Content-Type': 'application/json'  // Set the content type to JSON
  },
  body: JSON.stringify(data)  // Convert the data object to a JSON string
};

fetch(url, options)
  .then(response => response.json())  // Parse the response as JSON
  // .then(data => console.log(data))  // Log the response data
  .catch(error => console.error('Error:', error));  // Handle any errors

// Exercise: Setting the Method for a Fetch Request

// Task: Write a JavaScript function that fetches data from a given URL using the GET method, and another function that sends data to the same URL using the POST method.

// Steps:

// Create a function fetchWithGet that makes a GET request to the provided URL. Log the response data to the console.

// Solution:
const fetchWithGet = (url) => {
  fetch(url, {
    method: "Get", // Explicitly setting GET method
  })
  .then((response) => response.json())
  .then((data) => console.log(`3. ${JSON.stringify(data)}`))
  .catch((error) => console.log(`3. ${error}`));
};

// fetchWithGet(url);

// Create another function fetchWithPost that makes a POST request to the same URL. Send a JSON object in the body and log the server's response to the console.

const fetchWithPost = (url, option) => {
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });

  fetch(request)
  .then((response) => response.json())
  .then((data) => console.log(`3. POST: ${JSON.stringify(data)}`))
  .catch((error) => console.log(`3. POST: ${error}`));
};

// fetchWithPost(url, data);

// 4. Setting a body

// A request body is the data sent to a server in an HTTP request, typically in POST, PUT, or PATCH requests. It is used to send structured data (like JSON) to create or update a resource.

// Example 1: Request Body in a POST Request

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',  // Setting the HTTP method
  headers: {
    'Content-Type': 'application/json'  // Tell the server we are sending JSON
  },
  body: JSON.stringify({
    title: 'Hello World',
    body: 'This is a test post.',
    userId: 1
  })  // Convert JavaScript object to JSON string
})
.then(response => response.json())
// .then(data => console.log('Response:', data))
.catch(error => console.error('Error:', error));

// Exercise: Setting a Body in a Fetch Request

// Objective:
// Learn how to set the request body in a fetch() call when making POST, PUT, or PATCH requests in JavaScript.

// Task:

// Create a function sendPostRequest that sends a POST request with a JSON body.

// Solution

const sendPostRequest = (url, option) => {
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });

  fetch(request)
  .then((response) => response.json())
  .then((data) => console.log(`Response:`, data))
  .catch((error) => console.log(`4. ${error}`));
};

// sendPostRequest(url, {name: "apple", color: "red"});

// Create a function sendPutRequest that updates a resource using a PUT request.
// Ensure the server receives the request body correctly.

// Solution

const sendPutRequest = (url, option) => {
  const request = new Request(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(option),
  });

  fetch(request)
  .then((response) => response.json())
  .then((data) => console.log(`4. PUT:`, data))
  .catch((error) => console.log(`4. ${error}`));
};

// sendPutRequest(put_url, payload);

// 5. Setting headers

// Headers in an HTTP request provide metadata about the request, such as the format of the body, authentication tokens, accepted response types, etc. They help the server understand how to process the request properly.
// For example, Content-Type: Specifies the format of the request body (application/json, text/plain, etc.).
// Authorization: Used for authentication (Bearer <token>).
// Accept: Specifies what type of response the client expects (application/json, text/html, etc.).

// Example: Sending a POST Request with Headers
// In this example, we send a JSON payload to an API with the Content-Type header.

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'  // Tells the server we're sending JSON
  },
  body: JSON.stringify(payload)  // Convert object to JSON string
})
.then(response => response.json())
// .then(data => console.log('5. Response:', data))
.catch(error => console.error('5. Error:', error));

// Exercise: Fetch Data with Custom Headers

// Task:

// Write a function named fetchDataWithHeaders that:
// Takes a url as a parameter.
// Uses fetch() to send a GET request to the given URL.
// Includes a header:
// 'Accept': 'application/json' (indicating we expect JSON response).
// Logs the received response data.
// Handles and logs any errors.

// Solution

const fetchDataWithHeaders = (url) => {
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    }
  });

  fetch(request)
  .then((response) => response.json())
  // .then((data) => console.log("5. GET:", data))
  .catch((error) => console.log(`Error: ${error.message}`));
};

fetchDataWithHeaders(url);

// 6. Making POST requests

// A POST request is used to send data to a server, often to create or update a resource.

// Example: Sending JSON Data

fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ name: "Smart", role: "Developer" })
})
.then(response => response.json())
// .then(data => console.log("Success:", data))
.catch(error => console.error("Error:", error));

// Exercise: Making a POST Request in JavaScript

// You'll send a POST request to a fake API (https://jsonplaceholder.typicode.com/posts) and log the response.

// 📝 Instructions:
// Use fetch() to send a POST request.
// Set the Content-Type to application/json.
// Send the following data:
// {
//   "title": "Smart's API Test",
//   "body": "This is a test post.",
//   "userId": 1
// }
// Log the response data to the console

// Solution

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "title": "Smart's API Test",
    "body": "This is a test post.",
    "userId": 1
  }),
})
.then((response) => response.json())
// .then((data) => console.log(`6. POST:`, data))
.catch((error) => console.log(`6. Error`, error.message));

// 7. Making cross-origin requests

// A cross-origin request occurs when your web page tries to fetch resources (e.g., data, images, scripts) from a different domain (origin) than the one from which the page was loaded. For example, if you're serving a webpage from https://example.com and trying to make a request to https://api.example.com, that's a cross-origin request.

// CORS (Cross-Origin Resource Sharing) is a mechanism that allows or restricts web applications from making requests to domains other than their own.

// Example: Making a Cross-Origin GET Request with fetch()

// This fetches data from a different domain (cross-origin)
fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json()) // Parse the JSON response
// .then(data => console.log(data))    // Log the data from the API
.catch(error => console.error('Error:', error));  // Handle errors

// Exercise: Making a Cross-Origin POST Request

// Use fetch() to make a POST request to https://jsonplaceholder.typicode.com/posts.
// Send the following data in the body of the request:
// {
//   "title": "New Post",
//   "body": "This is a test post created by Smart.",
//   "userId": 1
// }
// Log the response data to the console.

// Solution

fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    "title": "New Post",
    "body": "This is a test post created by Smart.",
    "userId": 1
  }),
})
.then((response) => response.json())
// .then((data) => console.log(`7. POST:`, data))
.catch((error) => console.log(`7. ${error.message}`));

// 8. Credentials

// When making cross-origin requests, sometimes you need to send credentials (such as cookies or HTTP authentication information) along with the request. This can be required if the server needs to know who the user is or maintain the session.

// What are Credentials in HTTP Requests?
// Credentials include cookies, HTTP authentication (e.g., Basic Auth), and client certificates.
// CORS (Cross-Origin Resource Sharing) by default does not send credentials in cross-origin requests for security reasons.
// To send credentials (cookies, authentication) with a cross-origin request, you must set the credentials option to 'include' or 'same-origin'.
// Credentials Options:
// same-origin: Sends credentials (cookies) only if the request is to the same origin (domain, protocol, port).
// include: Sends credentials (cookies, HTTP authentication) with both same-origin and cross-origin requests.

// Credentials are cookies, TLS client certificates, or authentication headers containing a username and password.

// Example: Making a Cross-Origin Request with Credentials (credentials: 'include')

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: "Request with Credentials",
    body: "This is a test post with credentials.",
    userId: 1
  }),
  credentials: 'include'  // Include cookies and other credentials
})
.then(response => response.json())
// .then(data => console.log("Response with credentials:", data))
.catch(error => console.error("Error:", error));

// Exercise: Sending Credentials with a GET Request

// Task:

// Make a GET request to https://jsonplaceholder.typicode.com/posts with credentials (cookies).
// Set credentials: 'include' in the fetch() options.
// Log the response to the console.

// Hint:
// Since jsonplaceholder.typicode.com doesn't require authentication or set any cookies, this will be a demonstration of how you would include credentials in a request to a valid API that uses cookies.

// Solution

// Request with GET/HEAD cannot have 'body'
const fetchWithCredentials = (url, option) => {
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
    },
    credentials: "include",
  });

  fetch(request)
  .then((response) => response.json())
  .then((data) => console.log(`8. GET with credential`, data))
  .catch((error) => console.log(`8. ${error.message}`));
};

// fetchWithCredentials(url, payload);

// 9. Creating a Request object

// A Request object in JavaScript is part of the Fetch API and represents the request to be sent to the server. This object allows you to specify the HTTP method (GET, POST, etc.), headers, body, and other properties before sending the request to the server.

// The Request object is typically created when using the fetch() API, though you can manually create an instance of it as well.

// Example: Creating and Sending a Request Object

// Create a new Request object
const request9 = new Request('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',  // Specify the HTTP method (POST)
  headers: {
    'Content-Type': 'application/json',  // Specify the content type as JSON
  },
  body: JSON.stringify({  // Specify the body content in JSON format
    title: 'My New Post',
    body: 'This is the content of the new post.',
    userId: 1
  })
});

// Use the fetch API to send the Request object
fetch(request9)
.then(response => response.json())  // Parse the JSON response
// .then(data => console.log(data))    // Log the data received from the server
.catch(error => console.error('Error:', error));  // Handle any errors

// Exercise: Sending a GET Request with a Request Object

// Task:

// Create a Request object to make a GET request to https://jsonplaceholder.typicode.com/posts/1.
// Use the Request object to send the request to the server using fetch().
// Log the JSON data from the server to the console.
// Hint:
// A GET request doesn't need a body, so only set the method and headers as necessary.

// The Request() constructor takes the same arguments as fetch() itself. This means that instead of passing options into fetch(), you can pass the same options to the Request() constructor, and then pass that object to fetch().

// Solution

const request99 = new Request("https://jsonplaceholder.typicode.com/posts/1", {
  method: "GET",
  headers: {
    "Accept": "application/json",
  },
  credentials: "include",
});

fetch(request99)
.then((response) => response.json())
// .then((data) => console.log("9. GET:", data))
.catch((error) => console.log(`9. ${error.message}`));

// 10. Canceling a request

// In JavaScript, you can cancel a request made using the Fetch API using a 'AbortController'. The 'AbortController' allows you to signal that a fetch request should be aborted before it completes. This is useful in scenarios like user navigation, timeouts, or when the user cancels an operation.

// AbortController:

// AbortController is used to create an abort signal.
// You attach the signal to a fetch request, and when you call abort() on the controller, the request is canceled.

// Example: Canceling a Fetch Request with 'AbortController'

// Create an 'AbortController' instance
const controller = new AbortController();
const signal = controller.signal;

// Create a fetch request with the abort signal
const fetchRequest = fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'GET',
  signal: signal  // Attach the abort signal
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => {
  if (error.name === 'AbortError') {
    console.log('Request was aborted');
  } else {
    console.log('Error:', error);
  }
});

// Simulate a situation where the request is canceled after 2 seconds
setTimeout(() => {
  controller.abort();  // Abort the request
}, 2000);

// Exercise: Implementing Request Cancellation in a Timeout Scenario

// Task:

// Create a GET request using fetch() to https://jsonplaceholder.typicode.com/posts/1.
// Attach an AbortController to the request.
// Simulate canceling the request after 3 seconds using controller.abort().
// In the catch block, check for the cancellation and log a custom message ('Request canceled due to timeout') to the console.
// Hint:
// Use setTimeout to simulate the cancellation and manage the request timing.

// Solution

// 11. Handling the response

// As soon as the browser has received the response status and headers from the server (and potentially before the response body itself has been received), the promise returned by fetch() is fulfilled with a Response object.

// 12. Checking response status

// The promise returned by fetch() will reject on some errors, such as a network error or a bad scheme. However, if the server responds with an error like 404, then fetch() fulfills with a Response, so we have to check the status before we can read the response body.

// 13. Checking the response type

// 14. Checking headers

// 15. Reading the response body

// The Response interface provides a number of methods to retrieve the entire body contents in a variety of different formats:
// Response.arrayBuffer()
// Response.blob()
// Response.formData()
// Response.json()
// Response.text()

// 16. Streaming the response body

// 17. Processing a text file line by line (You can skip this for it is too advanced)

// 18. Locked and disturbed streams (Probably too advanced to learn for now)

// The consequences of request and response bodies being streams are that:
// . If a reader has been attached to a stream using ReadableStream.getReader(), then the stream is locked, and nothing else can read the stream.
// . If any content has been read from the stream, then the stream is disturbed, and nothing else can read from the stream.