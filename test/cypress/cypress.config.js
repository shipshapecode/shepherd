const { defineConfig } = require('cypress');

module.exports = defineConfig({
  fixturesFolder: './fixtures',
  video: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:9002',
    specPattern: './integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: './support/index.js'
  }
});
