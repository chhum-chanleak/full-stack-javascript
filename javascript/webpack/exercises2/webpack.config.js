const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { watchFile } = require("fs");

module.exports = {
  // JavaScript
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // For debugging messages
  devtool: "eval-source-map",
  devServer: {
    watchFile: ["./src/template.html"],
  },
  // Array of plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],
  // Loaders
  module: {
    rules: [
      // You can now import css files directly to JavaScript file
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(jpeg|jpg|svg|png|gif)$/i,
        type: "asset/resource",
      }
    ],
  },  
};