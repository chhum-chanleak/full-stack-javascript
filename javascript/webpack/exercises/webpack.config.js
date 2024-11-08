const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { watchFile } = require("fs");

module.exports = {
  // JavaScript bundling
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
    watchFile: [".src/template.html"],
  },
  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/template.html",
    }),
  ],
  // Loaders
  module: {
    rules: [
      // Now you can import 'css' directly to your html files.
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      // Now you can import images directly to your html files.
      {
        test: /\.html$/i,
        loader: "html-loader",
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  }
};