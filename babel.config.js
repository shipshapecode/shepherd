module.exports = function(api) {
  api.cache(true);

  return {
    env: {
      development: {
        presets: [
          [
            '@babel/preset-env',
            {
              loose: true
            }
          ]
        ]
      },
      test: {
        presets: [
          [
            '@babel/preset-env'
          ]
        ],
        plugins: [
          'transform-es2015-modules-commonjs'
        ]
      }
    }
  };
};
