import { defineConfig } from 'vitest/config';
import solid from 'vite-plugin-solid';
import { resolve } from 'path';

export default defineConfig({
  plugins: [solid()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./setupTests.js'],
    coverage: {
      provider: 'v8',
      include: [
        '../../shepherd.js/src/**/*.ts',
        '../../shepherd.js/src/**/*.tsx'
      ],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/tmp/**',
        '**/*.spec.*',
        '**/*.test.*'
      ],
      reporter: ['text', 'lcov', 'html']
    }
  },
  resolve: {
    alias: {
      'shepherd.js': '../../shepherd.js/src'
    },
    conditions: ['browser']
  },
  define: {
    'import.meta.vitest': undefined,
    'import.meta.env.SSR': false
  },
  optimizeDeps: {
    include: ['solid-js']
  }
});
