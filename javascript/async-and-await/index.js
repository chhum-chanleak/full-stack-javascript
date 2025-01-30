const endpoint = "https://jsonplaceholder.typicode.com/posts";

const fetchPost = async (url) => {

  try {
    const response = await fetch(url);
    const posts = await response.json();

    console.log("GET: ", posts);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
};

// fetchPost(endpoint);

// Async/wait

// Async functions
async function f() {
  return 1;
}

// f()
// .then((data) => console.log(data));

// Explicitly return a promise
async function fPromise() {
  return new Promise((resolve) => {
    resolve(2);
  });
}

// fPromise()
// .then((data) => console.log(data));

// Await

// Syntax:
// const value = await promise; 

async function fAwait() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done!");
    }, 1500);
  });

  let result = await promise;

  console.log(result);
}

// fAwait();

async function showAvatar() {

  // read our JSON
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement('img');
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait 3 seconds
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

// showAvatar();

// Exercise: Rewrite "rethrow" with async/await
// Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.
// And get rid of the recursion in favour of a loop in demoGithubUser: with async/await that becomes easy to do.

// class HttpError extends Error {
//   constructor(response) {
//     super(`${response.status} for ${response.url}`);
//     this.name = 'HttpError';
//     this.response = response;
//   }
// }

// function loadJson(url) {
//   return fetch(url)
//     .then(response => {
//       if (response.status == 200) {
//         return response.json();
//       } else {
//         throw new HttpError(response);
//       }
//     });
// }

// // Ask for a user name until github returns a valid user
// function demoGithubUser() {
//   let name = prompt("Enter a name?", "iliakan");

//   return loadJson(`https://api.github.com/users/${name}`)
//     .then(user => {
//       alert(`Full name: ${user.name}.`);
//       return user;
//     })
//     .catch(err => {
//       if (err instanceof HttpError && err.response.status == 404) {
//         alert("No such user, please reenter.");
//         return demoGithubUser();
//       } else {
//         throw err;
//       }
//     });
// }

// demoGithubUser();

// Solution

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {

  try {
    const response = await fetch(url);

    if (response.status === 200) {
      return response.json();
    }

    throw new HttpError(response);

  } catch (error) {
   console.log(`Error: `, error.message) ;
  }  
};

async function demoGithubUser() {
  const name = prompt("Enter a name: ", "apple");

  try {
    const user = await loadJson(`https://api.github.com/users/${name}`);

    console.log(`Full name: ${user.name}`);
    return user;
  } catch(error) {
    if (error instanceof HttpError && error.response.status === 404) {
      console.log("No such user, please re-enter.");
      return demoGithubUser();
    } else {
      throw error;
    }
  }  
};

// Exercise: Call async from non-async
// We have a “regular” function called f. How can you call the async function wait() and use its result inside of f?

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return 10;
}

// function f() {
//   // ...what should you write here?
//   // we need to call async wait() and wait to get 10
//   // remember, we can't use "await"
// }

// Solution

function nonAsync() {
  wait().then((result) => console.log("10 + 2 = ", result + 2));
}

nonAsync();