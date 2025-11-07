import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [],
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./setupTests.js'],
    deps: {
      optimizer: {
        web: {
          enabled: true,
          include: ['preact', 'preact/hooks', '@testing-library/preact']
        }
      }
    },
    coverage: {
      enabled: true,
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
      'shepherd.js': '../../shepherd.js/src',
      'react': 'preact/compat',
      'react-dom': 'preact/compat'
    },
    conditions: ['browser']
  },
  define: {
    'import.meta.vitest': undefined,
    'import.meta.env.SSR': false
  },
  optimizeDeps: {
    include: ['preact']
  }
});
