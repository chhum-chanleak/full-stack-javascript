// 1. Using the Fetch API

// 1.1 Fetch using only url (default GET Request)

// This is a simple use case where you only pass the URL of the resource you want to fetch. By default, the HTTP method is GET, and you can use this if you are just retrieving data.

// Example:

// fetch('https://api.example.com/data')
//   .then(response => response.json())  // Parse JSON response
//   .then(data => console.log(data))
//   .catch(error => console.error('Error:', error));

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

// 2. Making a request

// 3. Setting the method

// 4. Setting a body

// 5. Setting headers

// 6. Making POST requests

// 7. Making cross-origin requests

// 8. Credentials

// Credentials are cookies, TLS client certificates, or authentication headers containing a username and password.

// 9. Creating a Request object

// The Request() constructor takes the same arguments as fetch() itself. This means that instead of passing options into fetch(), you can pass the same options to the Request() constructor, and then pass that object to fetch().

// 10. Canceling a request

// To make a request cancelable, create an AbortController, and assign its AbortSignal to the request's signal property.

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

// 19. Expand on our little project here by adding a button that fetches a new image without refreshing the page.