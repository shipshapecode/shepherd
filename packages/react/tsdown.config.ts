import { defineConfig } from 'tsdown';

// tsdown leaves every dependency and peer dependency external, subpaths such
// as react/jsx-runtime included, so neither React nor Shepherd is bundled.
export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['esm', 'cjs'],
  platform: 'neutral',
  target: 'es2021',
  dts: true
});
