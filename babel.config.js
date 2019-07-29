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
        ],
        plugins: [
          '@babel/plugin-transform-object-assign',
          ['@babel/plugin-transform-react-jsx', { 'pragma': 'preact.h' }]
        ]
      },
      test: {
        presets: [
          [
            '@babel/preset-env'
          ]
        ],
        plugins: [
          '@babel/plugin-transform-object-assign',
          ['@babel/plugin-transform-react-jsx', { 'pragma': 'preact.h' }],
          'transform-es2015-modules-commonjs'
        ]
      }
    }
  };
};
