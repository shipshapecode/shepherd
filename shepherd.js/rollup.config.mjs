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
    extensions: ['.js', '.json', '.mjs', '.jsx', '.ts', '.tsx'],
    preferBuiltins: false
  }),
  babel({
    extensions: ['.cjs', '.js', '.ts', '.mjs', '.jsx', '.tsx'],
    babelHelpers: 'bundled',
    presets: [
      ['@babel/preset-typescript', { jsxPragma: 'h' }],
      ['@babel/preset-env', { modules: false }]
    ],
    plugins: [
      ['@babel/plugin-transform-react-jsx', {
        pragma: 'h',
        pragmaFrag: 'Fragment'
      }]
    ],
    exclude: 'node_modules/**'
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env),
    preventAssignment: true
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
