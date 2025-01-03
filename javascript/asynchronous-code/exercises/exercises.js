// Read 4 examples of Even Loop

// fetch() exercises

// Exercise 1
const fetchAlligators = () => {
  fetch("../data/alligators.json")
    .then(resp => resp.json())
    .then(data => {
      console.log(data);
    })

}

// fetchAlligators();

// Exercise 2
const fetchBears = () => {
  fetch("../data/bears.json")
};