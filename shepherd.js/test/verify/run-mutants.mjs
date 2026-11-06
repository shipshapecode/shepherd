// Runs the explorer against each broken variant in mutants.mjs. A mutant counts
// as caught only when a test fails, not when the run errors for another reason.
import { spawnSync } from 'node:child_process';
import process from 'node:process';
import { MUTANTS } from './mutants.mjs';

const runVerifier = (mutant) => {
  const { VERIFY_MUTANT: _ignored, ...env } = process.env;
  const result = spawnSync(
    './node_modules/.bin/vitest',
    ['run', '--config', 'test/verify/vitest.config.mjs'],
    {
      encoding: 'utf8',
      env: mutant ? { ...env, VERIFY_MUTANT: mutant } : env
    }
  );
  return result;
};

// A failure without any mutant would make every mutant look caught.
const clean = runVerifier();
if (clean.status !== 0) {
  console.log(clean.stdout + clean.stderr);
  console.log('The unmutated verifier fails, so mutant results mean nothing.');
  process.exit(1);
}

const survivors = [];

for (const name of Object.keys(MUTANTS)) {
  const result = runVerifier(name);
  const output = result.stdout + result.stderr;

  if (output.includes('is stale')) {
    survivors.push(name);
    console.log(`STALE     ${name}: its source text no longer exists`);
  } else if (/Tests\s+\d+ failed/.test(output)) {
    console.log(`caught    ${name}`);
  } else {
    survivors.push(name);
    console.log(`SURVIVED  ${name}`);
  }
}

if (survivors.length) {
  console.log(
    `\n${survivors.length} mutant(s) not caught: ${survivors.join(', ')}`
  );
  process.exit(1);
}
console.log(`\nAll ${Object.keys(MUTANTS).length} mutants caught.`);
