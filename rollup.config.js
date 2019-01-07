import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import license from 'rollup-plugin-license';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const PACKAGE = require('./package.json');
const banner = ['/*!', PACKAGE.name, PACKAGE.version, '*/\n'].join(' ');

export default [
  // Generate unminifed bundle
  {
    input: './src/js/shepherd.js',
    output: {
      file: 'dist/js/shepherd.js',
      format: 'umd',
      name: 'Shepherd'
    },
    plugins: [
      eslint(),
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
      license({
        banner
      }),
      progress(),
      filesize()
    ]
  },
  // Generate minifed bundle
  {
    input: './src/js/shepherd.js',
    output: {
      file: 'dist/js/shepherd.min.js',
      format: 'umd',
      name: 'Shepherd'
    },
    plugins: [
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
      uglify(),
      license({
        banner
      }),
      progress(),
      filesize()
    ]
  }
];