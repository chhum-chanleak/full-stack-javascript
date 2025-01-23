// fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=Put_Your_Key_Here'
// )
// .then(response => console.log(response))
// .catch(error => console.log(error));

// console.log("Hello, world!");

const img = document.querySelector("img");
fetch('https://api.giphy.com/v1/gifs/translate?api_key=key_value&s=cats')
.then((response) => response.json())
.then((response) => {
  img.src = `${response.data.images.original.url}`;
  document.body.appendChild(img);
  console.log(response);
})
.catch((error) => console.log(error));