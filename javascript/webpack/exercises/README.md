1. Webpack
<!-- Webpack is one of the most popular JavaScript bundlers, if not the most popular one, and has been for a long time. Let’s get started with bundling!

We’ll first need to make a new directory for our practice app, then create a package.json file in it for npm to record information about packages we use (like Webpack). Run the following in your terminal: -->
npm init -y
npm install -D typescript
npx tsc --init
<!-- Once inside your new directory, we can go ahead and install Webpack, which involves two packages. -->
npm install --save-dev webpack webpack-cli
<!-- or -->
npm install -D webpack webpack-cli

2. src and dist
<!-- When dealing with Webpack (and often with any other bundler or build tool), we have two very important directories: src (short for “source”) and dist (short for “distribution”). We could technically call these directories whatever we want, but these names are conventions.

src is where we keep all of our website’s source code, essentially where all of our work will be done (with an exception being altering any configuration files in the root of the project). When we run Webpack to bundle our code, it will output the bundled files into the dist directory. The idea is that if someone were to fork or clone the project, they would not need the dist directory, as they’d just be able to run Webpack to build from src into their own dist. Similarly, to deploy our website, we would only need the dist code and nothing else. Keep that in mind! Work inside src, build into dist, then deploy from there! -->

3. Bundling JavaScript
<!-- Now that we’ve installed Webpack in our project directory, let’s create a src directory with two JavaScript files inside it: index.js and greeting.js. -->
mkdir src && touch src/index.js src/greeting.js

<!-- Inside our two JavaScript files, we’ll have the following: 
// greeting.js
export const greeting = "Hello, Odinite!";

// index.js
import { greeting } from "./greeting.js";

console.log(greeting);
-->

<!-- Back in your project root (so outside of src), create a webpack.config.js file that contains the following: 
-->

touch webpack.config.js

<!--
// webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
-->

<!-- With these files all in place, let’s run Webpack and see what happens! -->
npx webpack

4. Handling HTML
<!-- Run the following command to install HtmlWebpackPlugin (also as a dev dependency): -->
npm install --save-dev html-webpack-plugin
<!-- or -->
npm install -D html-webpack-plugin

<!-- We should also create a 'template.html' inside 'src' (you can name this file whatever you want) and fill that with the usual HTML boilerplate. We do not need to put a script tag in this file! HtmlWebpackPlugin will automatically add our output bundle as a script tag. We wouldn’t want to double up by including our own one as well! Inside our webpack.config.js, we can add a few little bits. -->

<!-- // webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
}; -->

5. Loading CSS
<!-- We don’t just need one new package for CSS, we need two. Gosh, what a greedy little thing… Let’s install them. -->
npm install --save-dev style-loader css-loader
<!-- or -->
npm install -D style-loader css-loader

<!-- Back in our webpack.config.js, we need to add these loaders so Webpack knows what to do. Since these aren’t plugins, they go in a separate section: -->
<!-- // webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}; -->

<!-- Now that Webpack knows what to do with imported CSS files, let’s add some CSS! Create a src/styles.css with the following: 

/* styles.css */
body {
  background-color: rebeccapurple;
}

import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);
-->

6. Loading images
<!-- There are three different ways you could be dealing with local image files: -->

6.1 Image files used in our CSS inside url()
<!-- Lucky us! css-loader already handles this for us, so there’s nothing extra to do for image paths in CSS! -->

6.2 Image files we reference in our HTML template, e.g. as the src of an <img>
<!-- We need to install and tell Webpack to use something called html-loader, which will detect image file paths in our HTML template and load the right image files for us. Without this, ./odin.png would just be a bit of text that will no longer reference the correct file once we run Webpack to build into dist. Let’s install it: -->
npm install --save-dev html-loader
<!-- or -->
npm install -D html-loader

<!-- Then, add the following object to the modules.rules array within webpack.config.js: 

{
  test: /\.html$/i,
  loader: "html-loader",
}
-->

6.3 Images we use in our JavaScript, where we will need to import the files
<!-- If we need to use a local image file in our JavaScript (such as when manipulating the DOM to create or edit img elements and set their src attribute), we need to import the images into our JavaScript module. Since images aren’t JavaScript, we need to tell Webpack that these files will be assets by adding an asset/resource rule. No need to install anything here. Just add the following object to the modules.rules array within webpack.config.js: 

{
  test: /\.(png|svg|jpg|jpeg|gif)$/i,
  type: "asset/resource",
}
-->

<!-- Then, in whatever JavaScript module we want to use that image in, we just have to default import it. 

import odinImage from "./odin.png";
   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);

-->

<!-- After all that, if we added both html-loader and the image asset/resource rule, our webpack.config.js would look something like this: 

// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
-->

7. Declare module type for image files
<!-- 
// filename.d.ts

declare module '*.png' {
  const value: number;
  export = value;
}

declare module '*.jpeg' {
  const value: number;
  export = value;
}

declare module '*.jpg' {
  const value: number;
  export = value;
}

declare module '*.svg' {
  const value: number;
  export = value;
}

declare module '*.webp' {
  const value: number;
  export = value;
} -->

8. Webpack dev server
<!-- During this lesson, did you get a bit annoyed with having to run npx webpack to rebundle with every change? Fortunately, there are multiple solutions for this, and we will focus on what we think is the most useful option: webpack-dev-server. Install it as follows: -->
npm install --save-dev webpack-dev-server
<!-- or -->
npm install -D webpack-dev-server

<!-- Once installed, in our webpack.config.js, we only need to add a couple more properties somewhere in the configuration object (the order of these properties does not matter):

// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/template.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
-->

<!-- Firstly, we add a source map by setting eval-source-map as a devtool option. If we don’t do this, any error messages we get won’t necessarily match up to the correct files and line numbers from our development code. -->

