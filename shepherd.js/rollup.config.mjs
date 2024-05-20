import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'node:path';
import { globSync } from 'glob';
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
import typescript from '@rollup/plugin-typescript';

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const banner = ['/*!', pkg.name, pkg.version, '*/\n'].join(' ');

const env = process.env.DEVELOPMENT ? 'development' : 'production';

/**
 * Configures plugins to use for rollup
 * @param {boolean} esm Set to true to output in ESM format or false for CJS
 */
function getPlugins(esm = true) {
  const plugins = [
    svelte({
      preprocess: sveltePreprocess({ typescript: true }),
      emitCss: true
    }),
    nodeResolve({
      browser: true,
      exportConditions: ['svelte'],
      extensions: ['.js', '.json', '.mjs', '.svelte', '.ts'],
      modulesOnly: true
    }),
    typescript({
      compilerOptions: {
        declarationDir: esm ? 'dist/esm' : 'dist/cjs',
        module: esm ? 'esnext' : 'commonjs',
        moduleResolution: esm ? 'bundler' : 'node10'
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    babel({
      extensions: ['.js', '.mjs', '.html', '.svelte']
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

  return plugins;
}

const inputFiles = Object.fromEntries(
  globSync('src/**/*.ts').map((file) => [
    // This remove `src/` as well as the file extension from each
    // file, so e.g. src/nested/foo.js becomes nested/foo
    path.relative(
      'src',
      file.slice(0, file.length - path.extname(file).length)
    ),
    // This expands the relative paths to absolute paths, so e.g.
    // src/nested/foo becomes /project/src/nested/foo.js
    fileURLToPath(new URL(file, import.meta.url))
  ])
);

export default [
  {
    input: inputFiles,

    output: {
      dir: 'dist/esm',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true
    },
    plugins: getPlugins(true)
  }
  // {
  //   input: inputFiles,

  //   output: {
  //     dir: 'dist/cjs',
  //     entryFileNames: '[name].cjs',
  //     format: 'cjs',
  //     sourcemap: true
  //   },
  //   plugins: getPlugins(false)
  // }
];
