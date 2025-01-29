# async-and-await

1. The async keyword
  The async keyword is what lets the JavaScript engine know that you are declaring an asynchronous function. This is required to use await inside any function. When a function is declared with async, it automatically returns a promise; returning in an async function is the same as resolving a promise. Likewise, throwing an error will reject the promise.

2. The 'await' keyword
  'await' does the following: it tells JavaScript to wait for an asynchronous action to finish before continuing the function. It’s like a ‘pause until done’ keyword. The 'await' keyword is used to get a value from a function where you would normally use .then(). Instead of calling .then() after the asynchronous function, you would assign a variable to the result using 'await'. Then you can use the result in your code as you would in your synchronous code.

3. Error handling
  Handling errors in async functions is very easy. Promises have the .catch() method for handling rejected promises, and since async functions just return a promise, you can call the function, and append a .catch() method to the end. But there is another way: the mighty try/catch block! If you want to handle the error directly inside the async function, you can use try/catch with async/await syntax. If JavaScript throws an error in the try block, the catch block code will run instead (this can also be used for synchronous code).

  Syntax:
    <!-- 
    try {
      tryStatements
    } catch (exceptionVar) {
      catchStatements
    } finally {
      finallyStatements
    } 
    -->