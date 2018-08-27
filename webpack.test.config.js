/* global require, __dirname */
const path = require('path');

module.exports = {
  entry: ['./test/unit/setup.js', './test/unit/run.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'test/unit/dist'),
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