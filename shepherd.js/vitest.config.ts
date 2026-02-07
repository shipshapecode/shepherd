import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./test/unit/setupTests.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './test/coverage',
      include: ['src/**/*.ts'],
      exclude: [
        '**/*.spec.{js,ts}',
        '**/*.test.{js,ts}',
        '**/node_modules/**',
        '**/dist/**',
        '**/tmp/**',
        '**/test/**'
      ]
    }
  },
  resolve: {
    alias: {
      'shepherd.js': './src'
    },
    conditions: ['browser']
  },
  define: {
    'import.meta.vitest': undefined,
    'import.meta.env.SSR': false
  }
});
