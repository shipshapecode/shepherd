import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import preprocess from 'svelte-preprocess';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: preprocess({}),
      compilerOptions: {
        dev: false
      },
      hot: false,
      emitCss: false
    })
  ],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./test/unit/setupTests.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './test/coverage',
      include: ['src/**/*.{ts,svelte}'],
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
  },
  optimizeDeps: {
    include: ['svelte']
  }
});
