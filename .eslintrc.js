module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ship-shape/recommended'
  ],
  env: {
    browser: true
  },
  rules: {
    'complexity': [2, 6],
    'no-console': 'off'
  },
  overrides: [
    // node files
    {
      files: [
        'gulpfile.js',
        'karma.conf.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
