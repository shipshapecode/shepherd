import autoprefixer from 'autoprefixer';
import babel from 'rollup-plugin-babel';
import fs from 'fs';
import postcss from 'postcss';
import progress from 'rollup-plugin-progress';
import filesize from 'rollup-plugin-filesize';
import multiEntry from "rollup-plugin-multi-entry";
import resolve from 'rollup-plugin-node-resolve';
import sass from 'rollup-plugin-sass';
import serve from 'rollup-plugin-serve';

export default [
  {
    input: ['./test/unit/setup.js', './test/unit/run.js'],
    output: {
      file: 'test/unit/dist/bundle.js',
      format: 'umd'
    },
    plugins: [
      multiEntry(),
      babel({
        exclude: 'node_modules/**'
      }),
      resolve(),
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
      serve({
        contentBase: './',
        open: true,
        openPage: '/test/unit'
      }),
      progress(),
      filesize()
    ]
  }
];