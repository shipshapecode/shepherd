module.exports = function (api) {
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
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-typescript', { allowDeclareFields: true, isTSX: true, allExtensions: true }]
        ],
        plugins: [
          ['@babel/plugin-transform-react-jsx', { pragma: 'h' }]
        ]
      }
    }
  };
};
