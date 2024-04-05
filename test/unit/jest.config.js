// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

export default {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: [
    '../../shepherd.js/src/*.ts',
    '../../shepherd.js/src/*.svelte',
    '../../shepherd.js/src/components/**/*.svelte',
    '../../shepherd.js/src/utils/*.ts',
    '../../shepherd.js/src/utils/*.svelte'
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  extensionsToTreatAsEsm: ['.svelte', '.ts'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'svelte'],

  resetMocks: false,

  // The root directory that Jest should scan for tests and modules within
  rootDir: './',

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>'],

  // The path to a module that runs some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  testEnvironment: 'jsdom',

  // A map from regular expressions to paths to transformers
  transform: {
    '\\.[jt]s?$': 'babel-jest',
    '^.+\\.svelte$': [
      'svelte-jester',
      {
        preprocess: '../../shepherd.js/svelte.config.js',
        compilerOptions: {
          dev: false
        }
      }
    ],
    '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css'
  }
};
