module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'jest'
  ],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended'
  ],
  globals: {
    Cypress: false,
    Shepherd: false,
    assert: false,
    cy: false,
    document: false,
    Event: true,
    MouseEvent: true,
    expect: false,
    require: false,
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
