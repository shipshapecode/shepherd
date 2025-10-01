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
    setupFiles: ['./setupTests.js'],
    coverage: {
      include: [
        '../../shepherd.js/src/*.ts',
        '../../shepherd.js/src/*.svelte',
        '../../shepherd.js/src/components/**/*.svelte',
        '../../shepherd.js/src/utils/*.ts',
        '../../shepherd.js/src/utils/*.svelte'
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
    include: ['svelte']
  }
});
