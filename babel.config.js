module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env']
    ],
    plugins: [
      'add-module-exports',
      'lodash'
    ],
    env: {
      test: {
        plugins: ['istanbul']
      }
    }
  };
};
