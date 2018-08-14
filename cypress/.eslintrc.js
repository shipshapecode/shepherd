module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'mocha'
  ],
  extends: [
    'eslint:recommended',
    'plugin:mocha/recommended'
  ],
  globals: {
    Cypress: false,
    Shepherd: false,
    assert: false,
    cy: false,
    document: false,
    expect: false,
    window: false
  },
  env: {
    browser: false,
    mocha: true,
    node: true
  },
  rules: {
    'no-console': 'off'
  }
};
