const path = require("path");

module.exports = {
  entry: "./src/ImmutableModel.js",
  output: {
    filename: "ImmutableModel.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
