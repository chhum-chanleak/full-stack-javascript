import { greetings } from "./greetings";
import "./styles.css";
import GPT_LOGO from "./chatGPT-logo.jpeg";
console.log(greetings);
const image = document.createElement("img");
image.style.width = "100px";
image.style.height = "100px";
image.src = `${GPT_LOGO}`;
document.body.appendChild(image);
