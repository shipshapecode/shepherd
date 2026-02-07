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
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');

const isDev = process.env.DEVELOPMENT;
const env = isDev ? 'development' : 'production';

const plugins = [
  nodeResolve({
    browser: true,
    extensions: ['.js', '.json', '.mjs', '.ts'],
    preferBuiltins: false
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
    preventAssignment: true
  }),
  babel({
    extensions: ['.cjs', '.js', '.ts', '.mjs'],
    babelHelpers: 'bundled',
    presets: ['@babel/preset-typescript'],
    exclude: 'node_modules/**'
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

const sharedConfig = {
  input: 'src/shepherd.ts',
  // More aggressive tree shaking
  treeshake: {
    moduleSideEffects: false,
    propertyReadSideEffects: false,
    unknownGlobalSideEffects: false
  }
};

export default [
  // ESM build
  {
    ...sharedConfig,
    output: {
      dir: 'tmp/js',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      ...plugins,
      {
        name: 'After ESM build tweaks',
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

          console.log('Generating TypeScript declarations');

          await execaCommand(
            `npx tsc --declaration --emitDeclarationOnly --declarationDir tmp/js --skipLibCheck`,
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

          console.log('Move shepherd.mjs from tmp to dist');

          await execaCommand(
            `mv ./tmp/js/shepherd.mjs ./tmp/js/shepherd.mjs.map ./dist/js/`,
            {
              stdio: 'inherit'
            }
          );

          console.log('Copying README and LICENSE from root to shepherd.js');

          await execaCommand(`cp ../README.md ./README.md`, {
            stdio: 'inherit'
          });

          await execaCommand(`cp ../LICENSE.md ./LICENSE.md`, {
            stdio: 'inherit'
          });
        }
      }
    ]
  },
  // CJS build
  {
    ...sharedConfig,
    output: {
      dir: 'tmp/cjs',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named'
    },
    plugins: [
      ...plugins,
      {
        name: 'After CJS build tweaks',
        closeBundle: async () => {
          await execaCommand(`mkdir -p ./dist/cjs`, {
            stdio: 'inherit'
          });

          console.log('Move shepherd.cjs from tmp to dist');

          await execaCommand(
            `mv ./tmp/cjs/shepherd.cjs ./tmp/cjs/shepherd.cjs.map ./dist/cjs/`,
            {
              stdio: 'inherit'
            }
          );

          console.log('Copy CJS declarations');

          await execaCommand(
            `cp ./dist/js/shepherd.d.mts ./dist/cjs/shepherd.d.cts`,
            {
              stdio: 'inherit'
            }
          );
        }
      }
    ]
  }
];
