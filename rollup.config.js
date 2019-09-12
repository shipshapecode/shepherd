import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import visualizer from 'rollup-plugin-visualizer';

const pkg = require('./package.json');
const banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');

const env = process.env.DEVELOPMENT ? 'development' : 'production';

const plugins = [
  eslint({
    include: '**/*.js'
  }),
  svelte({
    preprocess: sveltePreprocess(),
    emitCss: true
  }),
  resolve({
    extensions: ['.js', '.json', '.svelte']
  }),
  commonjs(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  babel({
    extensions: ['.js', '.mjs', '.html', '.svelte']
  }),
  postcss({
    plugins: [
      require('autoprefixer'),
      require('cssnano')
    ],
    extract: 'dist/css/shepherd.css'
  })
];

// If we are running with --environment DEVELOPMENT, serve via browsersync for local development
if (process.env.DEVELOPMENT) {
  plugins.push(
    browsersync({
      host: 'localhost',
      watch: true,
      port: 3000,
      notify: false,
      open: true,
      server: {
        baseDir: 'demo',
        routes: {
          '/dist/css/shepherd.css': 'dist/css/shepherd.css',
          '/dist/js/shepherd.js': 'dist/js/shepherd.js',
          '/demo/js/prism.js': 'demo/js/prism.js',
          '/demo/js/welcome.js': 'demo/js/welcome.js',
          '/demo/css/prism.css': 'demo/css/prism.css',
          '/demo/css/welcome.css': 'demo/css/welcome.css',
          '/demo/sheep.svg': 'demo/sheep.svg'
        }
      }
    })
  );
}

plugins.push(license({ banner }));
plugins.push(filesize());
plugins.push(visualizer());

const rollupBuilds = [
  // Generate unminifed bundle
  {
    input: './src/js/shepherd.js',

    output: [
      {
        file: pkg.main,
        format: 'umd',
        name: 'Shepherd',
        sourcemap: true
      },
      {
        file: pkg.module,
        format: 'esm',
        sourcemap: true
      }
    ],
    plugins
  }
];

if (!process.env.DEVELOPMENT) {
  rollupBuilds.push(
    // Generate minifed bundle
    {
      input: './src/js/shepherd.js',
      output: [
        {
          file: 'dist/js/shepherd.min.js',
          format: 'umd',
          name: 'Shepherd',
          sourcemap: true
        },
        {
          file: 'dist/js/shepherd.esm.min.js',
          format: 'esm',
          sourcemap: true
        }
      ],
      plugins: [
        svelte({
          preprocess: sveltePreprocess(),
          emitCss: true
        }),
        resolve({
          extensions: ['.js', '.json', '.svelte']
        }),
        commonjs(),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env)
        }),
        babel({
          extensions: ['.js', '.mjs', '.html', '.svelte']
        }),
        postcss({
          plugins: [
            require('autoprefixer'),
            require('cssnano')
          ],
          extract: 'dist/css/shepherd.css'
        }),
        terser(),
        license({
          banner
        }),
        filesize(),
        visualizer()
      ]
    });
}

export default rollupBuilds;
