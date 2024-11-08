import { greetings } from "./greeting";
import "./styles.css";
import chatGPT from "../chatGPT-logo.jpeg";
console.log(greetings);
const image = document.createElement("img");
image.style.width = '100px';
image.style.height = '100px';
image.src = `${chatGPT}`;
document.body.appendChild(image);
