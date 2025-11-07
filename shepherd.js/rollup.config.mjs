import autoprefixer from 'autoprefixer';
import { execaCommand } from 'execa';
import fs from 'fs';
import cssnanoPlugin from 'cssnano';
import { babel } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { sveltePreprocess } from 'svelte-preprocess';
import svelte from 'rollup-plugin-svelte';
import { visualizer } from 'rollup-plugin-visualizer';
import { emitDts } from 'svelte2tsx';
import terser from '@rollup/plugin-terser';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');

const isDev = process.env.DEVELOPMENT;
const env = isDev ? 'development' : 'production';

const plugins = [
  svelte({
    preprocess: sveltePreprocess({
      globalStyle: true,
      typescript: true
    }),
    emitCss: true
  }),
  nodeResolve({
    browser: true,
    exportConditions: ['svelte'],
    extensions: ['.js', '.json', '.mjs', '.svelte', '.ts'],
    modulesOnly: true,
    preferBuiltins: false
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
    preventAssignment: true
  }),
  babel({
    extensions: ['.cjs', '.js', '.ts', '.mjs', '.html', '.svelte']
  }),
  postcss({
    plugins: isDev ? [autoprefixer] : [autoprefixer, cssnanoPlugin],
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
    serve({ contentBase: ['.', 'dist', 'dev', 'dummy'], open: true })
  );
  plugins.push(livereload());
} else {
  plugins.push(
    terser({
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug']
      },
      mangle: {
        properties: false
      }
    })
  );
}

export default [
  {
    input: 'src/shepherd.ts',

    output: {
      dir: 'tmp/js',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true
    },
    // More aggressive tree shaking
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
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
            declarationDir: 'tmp/js'
          });

          console.log('Rename .svelte.d.ts to .d.svelte.ts');

          await execaCommand(
            `renamer --find .svelte.d.ts --replace .d.svelte.ts tmp/js/**`,
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

          await execaCommand(`mkdir -p ./dist/js`, {
            stdio: 'inherit'
          });

          await execaCommand(
            `cp ./tmp/js/css/shepherd.css ./dist/css/shepherd.css`,
            {
              stdio: 'inherit'
            }
          );

          console.log('Rollup TS declarations to one file');

          await execaCommand(
            `pnpm dts-bundle-generator --no-check -o ./dist/js/shepherd.d.mts ./tmp/js/shepherd.d.ts`,
            {
              stdio: 'inherit'
            }
          );

          console.log('Move shepherd.js from tmp to dist');

          await execaCommand(
            `mv ./tmp/js/shepherd.mjs ./tmp/js/shepherd.mjs.map ./dist/js/`,
            {
              stdio: 'inherit'
            }
          );
        }
      }
    ]
  }
];
