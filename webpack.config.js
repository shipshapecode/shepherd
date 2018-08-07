/* global require, module, __dirname */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PACKAGE = require('./package.json');
const banner = ['/*!', PACKAGE.name, PACKAGE.version, '*/\n'].join(' ');
const glob = require('glob');
const sassArray = glob.sync('./src/css/shepherd-*.scss');
const entryObject = sassArray.reduce((acc, item) => {
  const name = item.replace('.scss', '').replace('./src/', '');
  acc[name] = item;
  return acc;
}, {});
entryObject['js/shepherd'] = './src/js/shepherd.js';
entryObject['js/shepherd.min'] = './src/js/shepherd.js';

module.exports = {
  mode: 'production',
  entry: entryObject,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
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
        include: [
          path.resolve(__dirname, 'src/css')
        ],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.min\.js$/,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.BannerPlugin(banner)
  ],
  devtool: 'source-map',
  target: 'web'
};
