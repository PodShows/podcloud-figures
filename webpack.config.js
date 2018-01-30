var path = require("path")
var webpack = require("webpack")
var nodeExternals = require("webpack-node-externals")

module.exports = {
  target: "node",
  externals: [nodeExternals()],

  entry: {
    index: ["./src/index.js"]
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "podcloud-stats.js",
    publicPath: "/"
  },

  resolve: {
    extensions: [".js"]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader", "eslint-loader"]
      }
    ]
  }
}
