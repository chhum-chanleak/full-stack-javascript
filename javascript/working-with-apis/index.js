
fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=Put_Your_Key_Here'
)
.then(result => console.log(result))
.catch(error => console.log(error));

console.log("Hello, world!");

fetch('https://api.giphy.com/v1/gifs/translate?api_key=Put_Your_Key_Here&s=cats')
.then((result) => console.log(result))
.catch(error => console.log(error));