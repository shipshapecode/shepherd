import { defineConfig } from 'cypress';

export default defineConfig({
  fixturesFolder: './fixtures',
  video: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    baseUrl: 'http://localhost:9002',
    specPattern: './integration/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: './support/index.js'
  }
});
