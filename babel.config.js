module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env']
    ],
    plugins: [
      'add-module-exports',
      'lodash',
      'transform-es2015-modules-commonjs'
    ],
    env: {
      test: {
        plugins: ['istanbul']
      }
    }
  };
};
