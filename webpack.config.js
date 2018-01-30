var path = require("path")
var webpack = require("webpack")
var nodeExternals = require("webpack-node-externals")

module.exports = {
  target: "node",
  node: {
    __dirname: false
  },

  externals: [nodeExternals()],

  entry: {
    index: ["./src/index.js"]
  },

  output: {
    path: path.join(__dirname, "dist"),
    filename: "podcloud-stats.js",
    library: "podcloud-stats",
    libraryTarget: "umd",
    umdNamedDefine: true
  },

  resolve: {
    extensions: [".js"]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DIST: true
    })
  ],

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
