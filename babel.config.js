module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          corejs: 3,
          modules: false,
          useBuiltIns: 'entry'
        }
      ]
    ],
    plugins: [
      '@babel/plugin-transform-object-assign'
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              corejs: 3,
              modules: false,
              useBuiltIns: 'entry'
            }
          ]
        ],
        plugins: [
          'rewire-exports',
          'transform-es2015-modules-commonjs'
        ]
      }
    }
  };
};
