module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      ['@babel/preset-env']
    ],
    plugins: [
      'add-module-exports'
    ],
    env: {
      test: {
        plugins: ['istanbul']
      }
    }
  };
};
