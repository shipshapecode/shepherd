import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globalSetup: ['./test/setup/dev-server.ts'],
    testTimeout: 30_000,
    hookTimeout: 120_000
  }
});
