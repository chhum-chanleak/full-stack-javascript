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
 