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