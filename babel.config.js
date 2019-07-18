module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env'
      ]
    ],
    plugins: [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: 3
        }
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
