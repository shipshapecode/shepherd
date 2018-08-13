// Karma configuration
// Generated on Wed Aug 01 2018 07:54:19 GMT-0400 (Eastern Daylight Time)
// const webpack = require('./webpack.config.js');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['chai', 'mocha'],

    // list of files / patterns to load in the browser
    files: [
      // 'src/js/*.js',
      'test/test.*.js',
      'docs/welcome/index.html'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    coverageIstanbulReporter: {
      dir: '../coverage',
      fixWebpackSourcePaths: true,
      reports: ['cobertura', 'lcov', 'html', 'text', 'text-summary'],
      skipFilesWithNoCoverage: true
    },

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/js/*.js': ['webpack', 'coverage'],
      'test/test.*.js': ['webpack']
    },

    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [
              /node_modules/,
              /test/
            ],
            use: [
              { loader: 'istanbul-instrumenter-loader', options: { esModules: true } },
              'babel-loader'
            ]
          },
          {
            test: /test.*\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
          }
        ]
      },
      plugins: [

      ]
    },

    // web server port
    port: 9876,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'ChromeHeadless', 'ChromeHeadlessNoSandbox'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['coverage-istanbul', 'mocha'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
