import babel from 'rollup-plugin-babel';
import browsersync from 'rollup-plugin-browsersync';
import commonjs from 'rollup-plugin-commonjs';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import svelte from 'rollup-plugin-svelte';
import visualizer from 'rollup-plugin-visualizer';

const pkg = require('./package.json');
const banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');

const env = process.env.DEVELOPMENT ? 'development' : 'production';

const plugins = [
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
      require('tailwindcss'),
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
        routes: {
          '/dist/css/shepherd.css': 'dist/css/shepherd.css',
          '/dist/js/shepherd.js': 'dist/js/shepherd.js',
          '/landing/js/prism.js': 'landing/js/prism.js',
          '/landing/js/welcome.js': 'landing/js/welcome.js',
          '/landing/css/prism.css': 'landing/css/prism.css',
          '/landing/css/welcome.css': 'landing/css/welcome.css',
          '/landing/sheep.svg': 'landing/sheep.svg'
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
        compiler(),
        license({
          banner
        }),
        filesize(),
        visualizer()
      ]
    });
}

export default rollupBuilds;
