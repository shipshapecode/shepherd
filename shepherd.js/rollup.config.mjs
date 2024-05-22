import autoprefixer from 'autoprefixer';
import fs from 'fs';
import path from 'node:path';
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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const plugins = [
  svelte({
    preprocess: sveltePreprocess({
      typescript: true
    }),
    emitCss: true
  }),
  nodeResolve({
    browser: true,
    exportConditions: ['svelte'],
    extensions: ['.js', '.json', '.mjs', '.svelte', '.ts'],
    modulesOnly: true
  }),
  typescript(),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  babel({
    extensions: ['.cjs', '.js', '.ts', '.mjs', '.html', '.svelte']
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

export default [
  {
    input: 'src/shepherd.ts', // inputFiles,

    output: {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true
    },
    plugins
  },
  {
    input: 'src/shepherd.ts', // inputFiles,

    output: {
      dir: 'dist',
      entryFileNames: '[name].js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      ...plugins,
      {
        name: 'Build Declarations',
        closeBundle: async () => {
          console.log('Fix CJS export default -> export =');

          const declarationFile = path.join(
            __dirname,
            'dist',
            'shepherd.d.ts'
          );
          let content = fs.readFileSync(declarationFile, 'utf8');
          content = content.replace(
            /export default Shepherd/g,
            'export = Shepherd'
          );
          fs.writeFileSync(declarationFile, content);
        }
      }
    ]
  }
];
