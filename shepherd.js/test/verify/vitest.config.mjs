import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.config.ts';
import { MUTANTS } from './mutants.mjs';

const mutantName = process.env.VERIFY_MUTANT;
const mutant = mutantName ? MUTANTS[mutantName] : undefined;

if (mutantName && !mutant) {
  throw new Error(`Unknown VERIFY_MUTANT: ${mutantName}`);
}

export default mergeConfig(
  baseConfig,
  defineConfig({
    root: fileURLToPath(new URL('../..', import.meta.url)),
    plugins: [
      {
        name: 'verify-mutant',
        enforce: 'pre',
        transform(code, id) {
          if (!mutant || !id.split('?')[0].endsWith(mutant.file)) {
            return null;
          }
          if (!code.includes(mutant.from)) {
            throw new Error(
              `Mutant ${mutantName} is stale: its source text is gone from ${mutant.file}`
            );
          }
          return code.replace(mutant.from, mutant.to);
        }
      }
    ],
    test: {
      include: ['test/verify/**/*.verify.js'],
      testTimeout: 600_000
    }
  })
);
