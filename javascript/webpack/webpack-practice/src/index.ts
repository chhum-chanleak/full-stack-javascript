// import one from "./one.svg";
import "./styles.css";
import  { greeting } from "./greeting";
import Icon from "./chatGPT-logo.jpeg";

console.log(greeting);
console.log("Hello, world!2");
console.log("Hello, world!3");
console.log("Hello, world!4");
console.log("Hello, world!2");
console.log(Icon);

const image: HTMLImageElement = document.createElement("img");

image.src = `${Icon}`;

document.body.appendChild(image);