import autoprefixer from 'autoprefixer';
import { execaCommand } from 'execa';
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cssnanoPlugin from 'cssnano';
import { babel } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import svelte from 'rollup-plugin-svelte';
import { visualizer } from 'rollup-plugin-visualizer';
import { emitDts } from 'svelte2tsx';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');

const env = process.env.DEVELOPMENT ? 'development' : 'production';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const plugins = [
  svelte({
    preprocess: sveltePreprocess({
      typescript: true
    }),
    emitCss: true
  }),
  nodeResolve({
    browser: true,
    exportConditions: ['svelte'],
    extensions: ['.js', '.json', '.mjs', '.svelte', '.ts'],
    modulesOnly: true
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  babel({
    extensions: ['.cjs', '.js', '.ts', '.mjs', '.html', '.svelte']
  }),
  postcss({
    plugins: [autoprefixer, cssnanoPlugin],
    extract: 'css/shepherd.css'
  }),
  license({
    banner
  }),
  filesize(),
  visualizer()
];

// If we are running with --environment DEVELOPMENT, serve via browsersync for local development
if (process.env.DEVELOPMENT) {
  plugins.push(
    serve({ contentBase: ['.', 'dist', '../test/cypress/dummy'], open: true })
  );
  plugins.push(livereload());
}

export default [
  {
    input: 'src/shepherd.ts',

    output: {
      dir: 'tmp/esm',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      {
        name: 'Build Declarations',
        buildStart: async () => {
          console.log('Generating Svelte declarations for ESM');

          await emitDts({
            svelteShimsPath: import.meta.resolve(
              'svelte2tsx/svelte-shims-v4.d.ts'
            ),
            declarationDir: 'tmp/esm'
          });

          console.log('Rename .svelte.d.ts to .d.svelte.ts');

          await execaCommand(
            `renamer --find .svelte.d.ts --replace .d.svelte.ts tmp/esm/**`,
            {
              stdio: 'inherit'
            }
          );
        }
      },
      ...plugins,
      {
        name: 'After build tweaks',
        closeBundle: async () => {
          console.log('Copying CSS to the root');

          await execaCommand(`mkdir -p ./dist/css`, {
            stdio: 'inherit'
          });

          await execaCommand(
            `cp ./tmp/esm/css/shepherd.css ./dist/css/shepherd.css`,
            {
              stdio: 'inherit'
            }
          );

          console.log('Rollup TS declarations to one file');

          await execaCommand(
            `pnpm dts-bundle-generator --no-check -o ./dist/esm/shepherd.d.mts ./tmp/esm/shepherd.d.ts`,
            {
              stdio: 'inherit'
            }
          );

          console.log('Move shepherd.js from tmp to dist');

          await execaCommand(
            `mv ./tmp/esm/shepherd.mjs ./tmp/esm/shepherd.mjs.map ./dist/esm/`,
            {
              stdio: 'inherit'
            }
          );
        }
      }
    ]
  },
  {
    input: 'src/shepherd.ts',

    output: {
      dir: 'tmp/cjs',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      {
        name: 'Build Declarations',
        buildStart: async () => {
          console.log('Generating Svelte declarations for CJS');

          await emitDts({
            svelteShimsPath: import.meta.resolve(
              'svelte2tsx/svelte-shims-v4.d.ts'
            ),
            declarationDir: 'tmp/cjs'
          });

          console.log('Rename .svelte.d.ts to .d.svelte.ts');

          await execaCommand(
            `renamer --find .svelte.d.ts --replace .d.svelte.ts tmp/cjs/**`,
            {
              stdio: 'inherit'
            }
          );
        }
      },
      ...plugins,
      {
        name: 'After build tweaks',
        closeBundle: async () => {
          console.log('Rollup TS declarations to one file');

          await execaCommand(
            `pnpm dts-bundle-generator --no-check -o ./dist/cjs/shepherd.d.cts ./tmp/cjs/shepherd.d.ts`,
            {
              stdio: 'inherit'
            }
          );

          console.log('Move shepherd.js from tmp to dist');

          await execaCommand(
            `mv ./tmp/cjs/shepherd.cjs ./tmp/cjs/shepherd.cjs.map ./dist/cjs/`,
            {
              stdio: 'inherit'
            }
          );

          console.log('Fix CJS export default -> export =');

          const declarationFile = path.join(
            __dirname,
            'dist/cjs',
            'shepherd.d.cts'
          );
          let content = fs.readFileSync(declarationFile, 'utf8');
          content = content.replace(
            /export {[\n\r]+[ \t]+Shepherd as default,[\n\r]};/g,
            'export = Shepherd;'
          );
          fs.writeFileSync(declarationFile, content);
        }
      }
    ]
  }
];
