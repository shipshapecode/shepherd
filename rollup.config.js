import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import fs from 'fs';
import license from 'rollup-plugin-license';
import path from 'path';
import postcss from 'postcss';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
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
      sass({
        output: false
      }),
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
      sass({
        output(styles, styleNodes) {
          fs.mkdirSync('dist/css', { recursive: true }, (err) => {
            if (err) {
              throw err;
            }
          });

          styleNodes.forEach(({ id, content }) => {
            const scssName = id.substring(id.lastIndexOf('/') + 1, id.length);
            const name = scssName.split('.')[0];
            fs.writeFileSync(`dist/css/${name}.css`, content);
          });
        },
        processor: css => postcss([autoprefixer])
          .process(css)
          .then(result => result.css)
      }),
      progress(),
      filesize()
    ]
  }
];