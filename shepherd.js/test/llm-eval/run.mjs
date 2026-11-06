// Grades solution files by running them in a real browser. See README.md.
//
//   node test/llm-eval/run.mjs <solutionsDir> [--pkg <dir>] [--json <out>] [--task <id>]
//   node test/llm-eval/run.mjs --write-prompts <dir>
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { chromium } from 'playwright-core';
import {
  bundle,
  createDriver,
  createWorkspace,
  defaultPkgDir,
  serve,
  typecheck,
  writeEntry
} from './lib.mjs';
import { promptFor, TASKS } from './tasks.mjs';

async function gradeTask(browser, task, solutionsDir, pkgDir) {
  const result = { id: task.id, pass: false, checks: [], console: [] };
  const ext = task.extensions.find((candidate) =>
    existsSync(join(solutionsDir, `${task.id}.${candidate}`))
  );
  if (!ext) {
    result.failure = 'no solution file';
    return result;
  }
  const source = readFileSync(join(solutionsDir, `${task.id}.${ext}`), 'utf8');
  const workspace = createWorkspace(pkgDir);

  let html = source;
  let files = { ...task.files };
  try {
    if (ext !== 'html') {
      const solutionPath = writeEntry(workspace, `solution.${ext}`, source);

      if (task.typecheck) {
        const errors = typecheck(workspace, solutionPath);
        result.checks.push({
          name: 'passes tsc --strict',
          pass: errors.length === 0,
          error: errors.join('\n') || undefined
        });
      }

      const entry = task.entry
        ? writeEntry(
            workspace,
            `entry.${task.entryExt}`,
            task.entry(solutionPath)
          )
        : solutionPath;
      const built = await bundle(workspace, entry);
      if (built.error) {
        result.checks.push({ name: 'builds', pass: false, error: built.error });
        result.failure = `build: ${built.error}`;
        return result;
      }
      files = { ...files, ...built.files };
      const link = built.files['/bundle.css']
        ? '<link rel="stylesheet" href="/bundle.css">'
        : '';
      html = task.html
        .replace('</head>', `${link}</head>`)
        .replace(
          '</body>',
          '<script type="module" src="/bundle.js"></script></body>'
        );
    }

    const server = await serve({ html, files, pkgDir });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 800 }
    });
    const page = await context.newPage();
    page.setDefaultTimeout(3000);
    page.on('console', (message) => {
      if (['error', 'warning'].includes(message.type())) {
        result.console.push(`${message.type()}: ${message.text()}`);
      }
    });
    page.on('pageerror', (error) => {
      result.console.push(`pageerror: ${error.message}`);
    });
    try {
      await page.goto(server.url);
      for (const [name, run] of task.check(createDriver(page))) {
        try {
          await run();
          result.checks.push({ name, pass: true });
        } catch (error) {
          result.checks.push({
            name,
            pass: false,
            error: error.message.split('\n')[0]
          });
          break;
        }
      }
    } finally {
      await context.close();
      await server.close();
    }
  } finally {
    rmSync(workspace, { recursive: true, force: true });
  }
  result.pass = result.checks.every((check) => check.pass);
  return result;
}

/** Copies exactly what `npm pack` would publish, so agents read the real thing. */
function copyPublishedFiles(from, to) {
  const run = spawnSync(
    'npm',
    ['pack', '--dry-run', '--json', '--ignore-scripts', '--silent'],
    { cwd: from, encoding: 'utf8' }
  );
  const [info] = JSON.parse(run.stdout);
  for (const { path } of info.files) {
    mkdirSync(dirname(join(to, path)), { recursive: true });
    cpSync(join(from, path), join(to, path));
  }
}

function parseArgs(argv) {
  const options = { positional: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) options[argv[i].slice(2)] = argv[++i];
    else options.positional.push(argv[i]);
  }
  return options;
}

const options = parseArgs(process.argv.slice(2));

if (options['write-prompts']) {
  const dir = resolve(options['write-prompts']);
  mkdirSync(dir, { recursive: true });
  for (const task of TASKS) {
    writeFileSync(join(dir, `${task.id}.md`), promptFor(task));
  }
  console.log(`Wrote ${TASKS.length} prompts to ${dir}`);
  process.exit(0);
}

if (options['write-sandbox']) {
  const dir = resolve(options['write-sandbox']);
  const pkgDir = resolve(options.pkg ?? defaultPkgDir);
  copyPublishedFiles(pkgDir, join(dir, 'node_modules/shepherd.js'));
  copyPublishedFiles(
    resolve(defaultPkgDir, '../packages/react'),
    join(dir, 'node_modules/react-shepherd')
  );
  mkdirSync(join(dir, 'prompts'), { recursive: true });
  mkdirSync(join(dir, 'solutions'), { recursive: true });
  for (const task of TASKS) {
    writeFileSync(join(dir, 'prompts', `${task.id}.md`), promptFor(task));
  }
  console.log(`Wrote a sandbox to ${dir}`);
  process.exit(0);
}

const solutionsDir = options.positional[0] && resolve(options.positional[0]);
if (!solutionsDir || !existsSync(solutionsDir)) {
  console.error(
    'usage: run.mjs <solutionsDir> [--pkg dir] [--json out] [--task id]'
  );
  process.exit(2);
}
const pkgDir = resolve(options.pkg ?? defaultPkgDir);
const tasks = options.task
  ? TASKS.filter((task) => task.id === options.task)
  : TASKS;

const browser = await chromium.launch();
const results = [];
for (const task of tasks) {
  const result = await gradeTask(browser, task, solutionsDir, pkgDir);
  results.push(result);
  const failed = result.checks.find((check) => !check.pass);
  const reason =
    result.failure ?? (failed && `${failed.name}: ${failed.error}`);
  console.log(
    `${result.pass ? 'PASS' : 'FAIL'}  ${task.id}${reason ? `\n      ${reason}` : ''}`
  );
}
await browser.close();

const passed = results.filter((result) => result.pass).length;
console.log(`\n${passed}/${results.length} tasks passed`);
if (options.json) {
  mkdirSync(dirname(resolve(options.json)), { recursive: true });
  writeFileSync(
    options.json,
    `${JSON.stringify({ pkgDir, passed, total: results.length, results }, null, 1)}\n`
  );
}
process.exit(passed === results.length ? 0 : 1);
