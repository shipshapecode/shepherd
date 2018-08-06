/* global require, module, __dirname */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PACKAGE = require('./package.json');

const banner = ['/*!', PACKAGE.name, PACKAGE.version, '*/\n'].join(' ');

module.exports = {
  mode: 'development',
  entry: './src/js/shepherd.js',
  output: {
    filename: 'shepherd.js',
    path: path.resolve(__dirname, 'dist/js'),
    library: 'Shepherd',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.s[c|a]ss$/,
        use: ExtractTextPlugin.extract('css-loader', 'postcss-loader', 'sass-loader')
      }
    ]
  },
  externals: {
    'popper.js/dist/umd/popper': {
      amd: 'popper.js/dist/umd/popper',
      commonjs: 'popper.js/dist/umd/popper',
      commonjs2: 'popper.js/dist/umd/popper',
      root: 'Popper'
    }
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    // new ExtractTextPlugin('./dist/css/[name].css'),
    // new webpack.BannerPlugin(banner)
  ],
  devtool: 'source-map',
  target: 'web'
};
