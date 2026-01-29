import { defineConfig } from 'cypress';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  fixturesFolder: join(__dirname, 'fixtures'),
  video: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  e2e: {
    baseUrl: 'http://localhost:9002',
    specPattern: join(__dirname, 'integration/**/*.cy.{js,jsx,ts,tsx}'),
    supportFile: join(__dirname, 'support/index.js')
  }
});
