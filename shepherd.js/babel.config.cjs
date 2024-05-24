module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['@babel/preset-typescript'],
    plugins: [
      ['@babel/plugin-transform-typescript', { allowDeclareFields: true }]
    ],
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
      }
    }
  };
};
