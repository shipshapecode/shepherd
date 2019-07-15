module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env'
      ]
    ],
    env: {
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
