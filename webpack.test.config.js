/* global require, __dirname */
const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, './'),
    inline: true,
    open: true,
    openPage: '/test/unit',
    watchContentBase: true
  },
  entry: ['./test/unit/setup.js', './test/unit/run.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'test/unit/dist'),
    publicPath: 'test/unit/dist/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/
        ],
        use: [
          'babel-loader'
        ]
      }
    ]
  }
};