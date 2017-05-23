const path = require('path')
const www = path.resolve(__dirname, 'www')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: www,
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: www
  }
}
