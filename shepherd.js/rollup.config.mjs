import autoprefixer from 'autoprefixer';
import { execaCommand } from 'execa';
import fs from 'fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cssnanoPlugin from 'cssnano';
import { babel } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';
import filesize from 'rollup-plugin-filesize';
import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import svelte from 'rollup-plugin-svelte';
import { visualizer } from 'rollup-plugin-visualizer';
import { emitDts } from 'svelte2tsx';

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
    emitCss: false
  }),
  nodeResolve({
    browser: true,
    exportConditions: ['svelte'],
    extensions: ['.js', '.json', '.mjs', '.svelte', '.ts'],
    modulesOnly: true
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  babel({
    extensions: ['.cjs', '.js', '.ts', '.mjs', '.html', '.svelte']
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
  // This first build is just to generate the CSS
  {
    input: 'src/shepherd.ts',

    output: {
      dir: 'dist',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true
    },
    plugins: [
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
      replace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),
      babel({
        extensions: ['.cjs', '.js', '.ts', '.mjs', '.html', '.svelte']
      }),
      postcss({
        plugins: [autoprefixer, cssnanoPlugin],
        extract: 'css/shepherd.css'
      })
    ]
  },
  {
    input: 'src/shepherd.ts',

    output: {
      dir: 'dist/esm',
      entryFileNames: '[name].mjs',
      format: 'es',
      sourcemap: true
    },
    plugins: [
      {
        name: 'Build Declarations',
        buildStart: async () => {
          console.log('Generating Svelte declarations for ESM');

          await emitDts({
            svelteShimsPath: import.meta.resolve(
              'svelte2tsx/svelte-shims-v4.d.ts'
            ),
            declarationDir: 'dist/esm'
          });

          console.log('Rename .svelte.d.ts to .d.svelte.ts');

          await execaCommand(
            `renamer --find .svelte.d.ts --replace .d.svelte.ts dist/esm/**`,
            {
              stdio: 'inherit'
            }
          );
        }
      },
      ...plugins
    ]
  },
  {
    input: 'src/shepherd.ts',

    output: {
      dir: 'dist/cjs',
      entryFileNames: '[name].cjs',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      {
        name: 'Build Declarations',
        buildStart: async () => {
          console.log('Generating Svelte declarations for CJS');

          await emitDts({
            svelteShimsPath: import.meta.resolve(
              'svelte2tsx/svelte-shims-v4.d.ts'
            ),
            declarationDir: 'dist/cjs'
          });

          console.log('Rename .svelte.d.ts to .d.svelte.cts');

          await execaCommand(
            `renamer --find .svelte.d.ts --replace .d.svelte.ts dist/cjs/**`,
            {
              stdio: 'inherit'
            }
          );
        }
      },
      copy({
        targets: [
          {
            src: 'dist/cjs/*.d.ts',
            dest: 'dist/cjs',
            rename: (name) => `${name}.cts`
          }
        ]
      }),
      ...plugins,
      {
        name: 'Build Declarations',
        closeBundle: async () => {
          console.log('Fix CJS export default -> export =');

          const declarationFile = path.join(
            __dirname,
            'dist/cjs',
            'shepherd.d.cts'
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
