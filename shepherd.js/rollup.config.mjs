import { execa } from 'execa';
import fs from 'fs';
import { babel } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { visualizer } from 'rollup-plugin-visualizer';
import terser from '@rollup/plugin-terser';

const sh = execa({ stdio: 'inherit' });
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
    exclude: '**/node_modules/**'
  }),
  postcss({
    minimize: !isDev,
    extract: 'css/shepherd.css'
  }),
  license({
    banner
  }),
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
    })
  );
}

const sharedConfig = {
  input: 'src/shepherd.ts',
  // More aggressive tree shaking
  treeshake: {
    moduleSideEffects: (id) => id.endsWith('.css'),
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

          await sh`mkdir -p ./dist/css`;

          await sh`mkdir -p ./dist/js`;

          await sh`cp ./tmp/js/css/shepherd.css ./dist/css/shepherd.css`;

          console.log('Generating TypeScript declarations');

          await sh`npx tsc --declaration --emitDeclarationOnly --declarationDir tmp/js --skipLibCheck`;

          console.log('Rollup TS declarations to one file');

          await sh`pnpm dts-bundle-generator --no-check -o ./dist/js/shepherd.d.mts ./tmp/js/shepherd.d.ts`;

          console.log('Move shepherd.mjs from tmp to dist');

          await sh`mv ./tmp/js/shepherd.mjs ./tmp/js/shepherd.mjs.map ./dist/js/`;

          console.log('Copying README and LICENSE from root to shepherd.js');

          await sh`cp ../README.md ./README.md`;

          await sh`cp ../LICENSE.md ./LICENSE.md`;
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
      exports: 'named'
    },
    plugins: [
      ...plugins,
      {
        name: 'After CJS build tweaks',
        closeBundle: async () => {
          await sh`mkdir -p ./dist/cjs`;

          console.log('Move shepherd.cjs from tmp to dist');

          await sh`mv ./tmp/cjs/shepherd.cjs ./dist/cjs/`;

          console.log('Copy CJS declarations');

          await sh`cp ./dist/js/shepherd.d.mts ./dist/cjs/shepherd.d.cts`;
        }
      }
    ]
  },
  // Opt-in extras: neither ships unless a consumer imports it
  {
    input: 'src/motion.ts',
    output: [
      { file: 'dist/js/motion.mjs', format: 'es' },
      { file: 'dist/cjs/motion.cjs', format: 'cjs', exports: 'named' }
    ],
    plugins: [
      nodeResolve({ extensions: ['.ts'] }),
      babel({
        extensions: ['.ts'],
        babelHelpers: 'bundled',
        presets: ['@babel/preset-typescript']
      }),
      ...(isDev ? [] : [terser()]),
      {
        name: 'Motion declarations',
        closeBundle: () => {
          const types = fs
            .readFileSync('tmp/js/motion.d.ts', 'utf8')
            .replace(/\/\/# sourceMappingURL.*/, '');
          fs.writeFileSync(
            'dist/js/motion.d.mts',
            types.replace('./shepherd.ts', './shepherd.mjs')
          );
          fs.writeFileSync(
            'dist/cjs/motion.d.cts',
            types.replace('./shepherd.ts', './shepherd.cjs')
          );
        }
      }
    ]
  },
  {
    input: 'src/theme.css',
    output: { dir: 'tmp/theme' },
    plugins: [
      postcss({ minimize: !isDev, extract: 'theme.css' }),
      {
        name: 'Copy the theme to dist',
        closeBundle: () =>
          fs.copyFileSync('tmp/theme/theme.css', 'dist/css/theme.css')
      }
    ]
  }
];
