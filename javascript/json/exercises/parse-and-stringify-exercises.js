// JSON.parse()
// The JSON.parse() method in JavaScript is used to convert a JSON string into a JavaScript object. Optionally, it allows a reviver function to modify the object’s structure during the parsing process.

// Example:
const jsonString = '{"name": "John", "age": 30}';
const parsedObject = JSON.parse(jsonString);

// Example with reviver:
const jsonString1 = '{"event": "Conference", "date": "2024-12-15T09:00:00.000Z"}';

const parsedObject1 = JSON.parse(jsonString, (key, value) => {
  if (key === "date") {
    return new Date(value);
  }
  return value;
});

// console.log(parsedObject.date instanceof Date); // true
// console.log(`The event "${parsedObject.event}" is on ${parsedObject.date.toDateString()}.`);

// console.log(parsedObject.name); // Output: John

// Exercise 1: Parse a JSON string into an array of objects
// Given a JSON string representing a list of users, parse it and print each user's name.
const jsonString2 = '[{ "name": "apple", "age": 1 }, { "name": "banana", "age": 2 }]';
const parsedObj2 = JSON.parse(jsonString2);

// Print each element of parsedObj2
// for (let i = 0; i < parsedObj2.length; i += 1) {
//   console.log(parsedObj2[i].name);
// }

// Exercise 2: Using a 'reviver' to modify parsed data
// Parse a JSON string containing dates and use the 'reviver' function to convert date strings into Date objects.
const meeting = '{ "topic": "climate-change", "date": "05.12.2024"}';

const reviver = (arrayOfObjects) => {

  for (let i = 0; i < arrayOfObjects.length; i += 1) {
    for (const key in arrayOfObjects[i]) {
      const value = arrayOfObjects[i][key];
  
      (key === "date") ? new Date() : value;
    }
  }
};

const date = JSON.parse(meeting, reviver(meeting))

// console.log(meeting);
// console.log(date.date);
// reviver(JSON.parse(jsonString2));

// JSON.stringify()
// The JSON.stringify() method converts a JavaScript object or value into a JSON string. It is used to serialize objects for storage, data transfer, or debugging. JSON.stringify() has three parameters such as 'value', 'replacer' and 'space', however, the second and third are optional. 

// 'value' parameter (required):
// The JavaScript 'value' (e.g., object, array, or primitive) to be converted into a JSON string.
// Example 'value':
const obj = { name: "Alice", age: 25, active: true };
const jsonString3 = JSON.stringify(obj);

// console.log(jsonString); // {"name":"Alice","age":25,"active":true}

// Exercise: Convert an Object to JSON String
// Write a function convertToJSON that takes an object and returns its JSON string using JSON.stringify() with just one parameter. Log the resulting JSON string to the console.

// 'replacer' parameter (optional):
// A function or array that filters or modifies the properties to be included in the JSON string:
// Example 'replacer' parameter:
const product = {
  name: "Laptop",
  price: 1000,
  discount: null,
  stock: undefined,
  category: "Electronics"
};

// Replacer function to exclude null and undefined values
const replacer = (key, value) => {
  if (value === null || value === undefined) {
    return undefined;  // Exclude null and undefined values
  }
  return value;  // Include all other values
};

const jsonString5 = JSON.stringify(product, replacer, 2);
// console.log(jsonString5);

// Exercise: Use JSON.stringify() with a Replacer Function
// Write a function filterSensitiveData that takes an object and returns a JSON string. Use a replacer function to exclude any properties that have the key password or ssn. The resulting JSON string should not contain these sensitive properties.

// 'space' parameter (optional):
// Adds indentation and formatting to the JSON string for readability:
// Example 'space' parameter:
const user = {
  name: "Alice",
  age: 25,
  email: "alice@example.com",
  address: {
    street: "123 Main St",
    city: "Wonderland",
    postalCode: "12345"
  }
};

const jsonString6 = JSON.stringify(user, null, 4);
// console.log(jsonString6);

// Exercise 'space' parameter: Format JSON with the 'space' Parameter
// Write a function called formatPersonData that accepts a person object with properties name, age, location, and contact. The function should return the formatted JSON string with 2 spaces of indentation.




