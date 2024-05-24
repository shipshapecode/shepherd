module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  extends: ['eslint:recommended', 'plugin:svelte/recommended'],
  env: {
    browser: true
  },
  rules: {
    'max-lines': [
      'warn',
      { max: 500, skipBlankLines: true, skipComments: true }
    ],
    'no-console': 'off',
    'prefer-const': 'off'
  },
  overrides: [
    // svelte files
    {
      files: ['**/*.svelte'],
      processor: 'svelte/svelte',
      rules: {
        'svelte/no-at-html-tags': 'off',
        'svelte/valid-compile': 'off'
      }
    },
    // Typescript files
    {
      parser: '@typescript-eslint/parser',
      files: ['**/*.ts'],
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' }
        ],
        'prefer-rest-params': 'off'
      }
    },
    // node files
    {
      files: [
        '.eslintrc.js',
        '.prettierrc.js',
        'babel.config.js',
        'rollup.config.mjs',
        'svelte.config.js'
      ],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
