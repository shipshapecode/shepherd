module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false
        }
      ]
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ]
        ],
        plugins: [
          'transform-es2015-modules-commonjs'
        ]
      }
    }
  };
};
