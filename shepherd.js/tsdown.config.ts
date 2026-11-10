import {
  copyFile,
  mkdir,
  readFile,
  rename,
  rm,
  writeFile
} from 'node:fs/promises';
import { minify } from 'terser';
import { defineConfig, type TsdownPlugin, type UserConfig } from 'tsdown';
import pkg from './package.json' with { type: 'json' };

// Terser instead of the built-in minifier: only terser renames the internal
// `_` properties, which keeps the bundle about 150 bytes smaller gzipped.
const terser: TsdownPlugin = {
  name: 'terser',
  async renderChunk(code, chunk, { sourcemap }) {
    if (!/\.[cm]js$/.test(chunk.fileName)) return null;
    const result = await minify(code, {
      module: true,
      toplevel: true,
      sourceMap: Boolean(sourcemap),
      compress: {
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug']
      },
      mangle: {
        properties: {
          regex: /^_[a-zA-Z]/,
          // Called by test/cypress/integration/test.acceptance.cy.js
          reserved: ['_getResolvedAttachToOptions']
        }
      }
    });
    return { code: result.code!, map: result.map as string };
  }
};

// motion only imports types from the core, so its declarations point at the
// published entry instead of bundling a second copy of the core's.
const coreAsExternal: TsdownPlugin = {
  name: 'core-as-external',
  resolveId: (id) =>
    id === './shepherd.ts' ? { id: './shepherd.mjs', external: true } : null
};

export default defineConfig(({ watch }) => {
  const shared: UserConfig = {
    platform: 'browser',
    target: 'es2020',
    fixedExtension: true,
    // `pnpm build` empties dist; the builds below run in parallel and share it.
    clean: false,
    minify: false,
    sourcemap: false,
    banner: { js: `/*! ${pkg.name} ${pkg.version} */` },
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        watch ? 'development' : 'production'
      )
    },
    inputOptions: {
      // CJS defaults to Node; Shepherd only runs in the browser.
      platform: 'browser',
      treeshake: {
        moduleSideEffects: (id: string) => id.endsWith('.css'),
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },
    outputOptions: { exports: 'named' }
  };
  const minifier = watch ? [] : [terser];

  return [
    {
      ...shared,
      entry: ['src/shepherd.ts'],
      dts: { sourcemap: false },
      format: {
        esm: { outDir: 'dist/js', sourcemap: true },
        cjs: { outDir: 'dist/cjs' }
      },
      plugins: minifier,
      css: { fileName: 'shepherd.css', minify: !watch },
      hooks: {
        // tsdown writes CSS beside the JS; it ships once, from dist/css.
        'build:done': async ({ options }) => {
          const css = `${options.outDir}/shepherd.css`;
          if (options.format === 'cjs') return rm(css);
          await mkdir('dist/css', { recursive: true });
          await rename(css, 'dist/css/shepherd.css');
          await copyFile('../README.md', 'README.md');
          await copyFile('../LICENSE.md', 'LICENSE.md');
        }
      }
    },
    {
      ...shared,
      entry: ['src/motion.ts'],
      dts: { sourcemap: false },
      format: 'esm',
      outDir: 'dist/js',
      report: false,
      plugins: [coreAsExternal, ...minifier],
      hooks: {
        // tsdown's CJS declaration pass skips plugins, so derive it instead.
        'build:done': async () => {
          const types = await readFile('dist/js/motion.d.mts', 'utf8');
          await mkdir('dist/cjs', { recursive: true });
          await writeFile(
            'dist/cjs/motion.d.cts',
            types.replace('./shepherd.mjs', './shepherd.cjs')
          );
        }
      }
    },
    {
      ...shared,
      entry: ['src/motion.ts'],
      format: 'cjs',
      outDir: 'dist/cjs',
      dts: false,
      report: false,
      plugins: minifier
    },
    {
      entry: ['src/theme.css'],
      outDir: 'dist/css',
      clean: false,
      report: false,
      css: { fileName: 'theme.css', minify: !watch }
    }
  ];
});
