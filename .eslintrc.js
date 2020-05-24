module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ship-shape/recommended'
  ],
  env: {
    browser: true,
    es6: true
  },
  plugins: [
    'svelte3'
  ],
  rules: {
    'max-lines': ['warn', { max: 250, skipBlankLines: true, skipComments: true }],
    'no-console': 'off',
    'prefer-const': 'off'
  },
  overrides: [
    // svelte files
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    },
    // node files
    {
      files: [
        '.eslintrc.js',
        'babel.config.js',
        'jest.config.js',
        'rollup.config.js',
        'svelte.config.js',
        'tailwind.config.js'
      ],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2015
      },
      env: {
        node: true
      }
    }
  ]
};
