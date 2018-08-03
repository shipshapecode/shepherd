/* global require, module, __dirname */
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PACKAGE = require('./package.json');

const banner = ['/*!', PACKAGE.name, PACKAGE.version, '*/\n'].join(' ');

module.exports = {
  mode: 'production',
  entry: './src/js/shepherd.js',
  output: {
    filename: 'shepherd.js',
    path: path.resolve(__dirname, 'dist/js'),
    libraryTarget: 'umd',
    library: 'Shepherd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/js')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.s[c|a]ss$/,
        use: ExtractTextPlugin.extract('css-loader', 'postcss-loader', 'sass-loader')
      }
    ]
  },
  externals: {
    'popper.js': {
      amd: 'popper.js',
      commonjs: 'popper.js',
      root: 'Popper'
    }
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true
      })
    ]
  },
  plugins: [
    new ExtractTextPlugin('./dist/css/[name].css'),
    new webpack.BannerPlugin(banner)
  ],
  devtool: 'source-map',
  target: 'web'
};
