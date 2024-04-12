// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/web',
  transformIgnorePatterns: [
    '/node_modules/(?!(humanize-string|decamelize|@tremor|react-syntax-highlighter/dist/esm/styles/prism)/)',
  ],
};

module.exports = config;
