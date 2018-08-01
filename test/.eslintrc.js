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
    assert: false,
    Shepherd: false
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