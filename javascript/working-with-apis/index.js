// fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=Put_Your_Key_Here'
// )
// .then(response => console.log(response))
// .catch(error => console.log(error));

// console.log("Hello, world!");

// Expand on our little project here by adding a button that fetches a new image without refreshing the page.
const addImage = (data) => {
  const ul = document.querySelector("ul.images");
  const listItem = document.createElement("li");
  const img = document.createElement("img");

  isAvailable(data);

  const img_url = `${data.data.images.original.url}`
  img.src = `${img_url}`;

  listItem.appendChild(img);
  ul.appendChild(listItem);
  console.log(data);
};

const isAvailable = (data) => {
  if (data.data && Array.isArray(data.data) && data.data.length === 0) {
    console.warn("API returned no results.");
  } else {
    console.log(`API data: ${JSON.stringify(data)}`);
  }
};

const fetchImages = (query) => {
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=insert_your_api_key_here&s=${query}`)
  .then((response) => response.json())
  .then(addImage)
  .catch((error) => console.log(error));
};

const addImageButton = document.querySelector("#add-image");
addImageButton.addEventListener("click", fetchImages);

const handleSearch = () => {
  const searchBar = document.querySelector("input[type='text']");
  fetchImages(searchBar.value);
  console.log(searchBar.value);
  searchBar.value = "";
};

const searchButton = document.querySelector("button[name='search']");
searchButton.addEventListener("click", handleSearch);
