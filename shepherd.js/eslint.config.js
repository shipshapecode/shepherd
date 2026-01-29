import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import cypress from 'eslint-plugin-cypress/flat';
import globals from 'globals';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import svelteParser from 'svelte-eslint-parser';

export default [
  // Base config for all files
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020
      }
    },
    rules: {
      'max-lines': ['warn', { max: 500, skipBlankLines: true, skipComments: true }],
      'no-console': 'off',
      'prefer-const': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  },

  // Svelte files
  ...svelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parser: svelteParser
    },
    rules: {
      'svelte/no-at-html-tags': 'off',
      'svelte/valid-compile': 'off'
    }
  },

  // TypeScript files
  {
    files: ['**/*.ts'],
    ignores: ['vitest.config.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json'
      }
    },
    plugins: {
      '@typescript-eslint': ts
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      '@typescript-eslint/no-explicit-any': 'error',
      'no-unused-vars': 'off', // Use TypeScript version instead
      'prefer-rest-params': 'off'
    }
  },

  // Config files (vitest, babel, etc.)
  {
    files: ['vitest.config.ts', '**/*.config.*'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // Cypress test files
  {
    files: ['test/cypress/**/*.cy.js', 'test/cypress/utils/**/*.js'],
    ...cypress.configs.recommended,
    rules: {
      'cypress/no-unnecessary-waiting': 'off',
      'cypress/no-async-tests': 'off'
    }
  },

  // Cypress support files (uses CommonJS)
  {
    files: ['test/cypress/support/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // Vitest setup file (uses Node globals)
  {
    files: ['test/unit/setupTests.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // Node config files
  {
    files: [
      '.eslintrc.js',
      '.prettierrc.js',
      'rollup.config.mjs',
      'svelte.config.js',
      'eslint.config.js',
      'test/unit/babel.config.cjs'
    ],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // Ignore patterns
  {
    ignores: [
      'dev/',
      'dist/',
      'dummy/',
      'tmp/',
      'test/cypress/dummy/js/prism.js',
      'node_modules/',
      'coverage/',
      'test/coverage/',
      '.eslintrc.cjs'
    ]
  }
];
