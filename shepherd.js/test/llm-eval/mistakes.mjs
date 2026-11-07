// Mistakes a coding agent is expected to make, one per entry, from reading the
// API, types, docs and README cold, and from older Shepherd APIs in training
// data. Each is a whole small program, and the matrix records what really
// happens to it: does it work anyway, does tsc catch it, and does the runtime
// say what to do. `fix` is what a useful message has to mention.
//
//   node test/llm-eval/mistakes.mjs [--pkg <dir>] [--json <out>]
import process from 'node:process';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import { spawnSync } from 'node:child_process';
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

const CSS = `import 'shepherd.js/dist/css/shepherd.css';`;
const IMPORT = `import Shepherd from 'shepherd.js';\n${CSS}`;

const HTML = (script) => `<!doctype html><html><head><meta charset="utf-8">
<style>html, body { margin: 0; } .box { position: absolute; width: 120px; height: 40px; }</style>
<link rel="stylesheet" href="/bundle.css"></head><body>
<div id="a" class="box" style="left:500px;top:100px">A</div>
<div id="b" class="box" style="left:500px;top:400px">B</div>
${script}</body></html>`;

/** A two step tour; each mistake replaces one part of it. */
const program = ({
  head = IMPORT,
  make = 'new Shepherd.Tour()',
  tourOptions,
  step1 = '',
  attach = `attachTo: { element: '#a', on: 'bottom' },`,
  next = 'tour.next',
  done = 'tour.complete',
  nextButton
} = {}) => `${head}
const tour = ${tourOptions ? `new Shepherd.Tour(${tourOptions})` : make};
tour.addStep({
  title: 'First',
  text: 'one',
  ${attach}
  ${step1}
  buttons: [${nextButton ?? `{ text: 'Next', action: ${next} }`}]
});
tour.addStep({
  title: 'Second',
  text: 'two',
  attachTo: { element: '#b', on: 'bottom' },
  buttons: [{ text: 'Done', action: ${done} }]
});
tour.start();
`;

export const MISTAKES = [
  {
    id: 'control',
    why: 'Correct code. Proves the matrix can report a pass.',
    code: program()
  },
  {
    id: 'no-css-import',
    why: 'The JS import is the only thing most examples lead with; the stylesheet is a separate import.',
    code: program({ head: `import Shepherd from 'shepherd.js';` }),
    fix: /shepherd\.css/
  },
  {
    id: 'wrong-css-path',
    why: 'Older versions shipped theme files such as shepherd-theme-arrows.css.',
    code: program({
      head: `import Shepherd from 'shepherd.js';\nimport 'shepherd.js/dist/css/shepherd-theme-arrows.css';`
    }),
    fix: /dist\/css\/shepherd\.css/
  },
  {
    id: 'named-import',
    why: 'Named exports are the default habit, and the types do export a Tour name.',
    code: program({
      head: `import { Tour } from 'shepherd.js';\n${CSS}`,
      make: 'new Tour()'
    }),
    fix: /Shepherd\.Tour|default/
  },
  {
    id: 'cjs-require',
    why: 'require() of the package returns an object with `default`, not Shepherd.',
    code: program({
      head: `const Shepherd = require('shepherd.js');\n${CSS}`
    }),
    fix: /default/
  },
  {
    id: 'window-global',
    why: 'usage.md says "Shepherd exposes a single object onto the window".',
    code: program({ head: CSS }),
    fix: /import/
  },
  {
    id: 'steps-reference-tour',
    why: '`action: tour.next` inside the constructor reads tour before it exists.',
    code: `${IMPORT}
const tour = new Shepherd.Tour({
  steps: [
    {
      title: 'First',
      text: 'one',
      attachTo: { element: '#a', on: 'bottom' },
      buttons: [{ text: 'Next', action: tour.next }]
    },
    {
      title: 'Second',
      text: 'two',
      attachTo: { element: '#b', on: 'bottom' },
      buttons: [{ text: 'Done', action: tour.complete }]
    }
  ]
});
tour.start();
`,
    fix: /action\(\)|this\.next/
  },
  {
    id: 'arrow-this',
    why: 'Docs say action is bound to the tour, which an arrow function ignores.',
    code: program({ next: '() => this.next()' }),
    fix: /this|arrow/i
  },
  {
    id: 'action-string',
    why: 'Generated tours want plain data, and other tour libraries take names.',
    code: program({ next: `'next'`, done: `'complete'` }),
    fix: /this\.next|tour\.next/
  },
  {
    id: 'button-type',
    why: 'ember-shepherd and old examples use `type: "next"` on a button.',
    code: program({ nextButton: `{ text: 'Next', type: 'next' }` }),
    fix: /no `?action/
  },
  {
    id: 'active-tour-eager',
    why: '`Shepherd.activeTour.next` reads as natural, but is null until started.',
    code: program({ next: 'Shepherd.activeTour.next' }),
    fix: /activeTour|start/
  },
  {
    id: 'on-below',
    why: 'Other libraries name placements differently.',
    code: program({ attach: `attachTo: { element: '#a', on: 'below' },` }),
    fix: /bottom/
  },
  {
    id: 'on-bottom-left',
    why: 'CSS-style corner names instead of -start and -end.',
    code: program({
      attach: `attachTo: { element: '#a', on: 'bottom-left' },`
    }),
    fix: /bottom-start|-start/
  },
  {
    id: 'position-key',
    why: 'Intro.js and others call it position. Without `on` the step centers silently.',
    code: program({
      attach: `attachTo: { element: '#a', position: 'bottom' },`
    }),
    fix: /\bon\b/
  },
  {
    id: 'attach-to-string',
    why: 'Shepherd before v6 accepted the string form "#a bottom".',
    code: program({ attach: `attachTo: '#a bottom',` }),
    fix: /element/
  },
  {
    id: 'missing-target',
    why: 'A wrong selector, the most common runtime failure. Falls back to centered.',
    code: program({ attach: `attachTo: { element: '#nope', on: 'bottom' },` }),
    fix: /#nope[\s\S]*(waitForElement|skipMissingElement)/
  },
  {
    id: 'invalid-selector',
    why: 'An unescaped id or a generated selector that is not valid CSS.',
    code: program({ attach: `attachTo: { element: '#a[', on: 'bottom' },` }),
    fix: /#a\[/
  },
  {
    id: 'promise-not-function',
    why: 'beforeShowPromise reads as "a promise". Passing one runs it eagerly and skips the wait.',
    code: program({
      step1: `beforeShowPromise: new Promise((resolve) => setTimeout(() => { window.ready = true; resolve(); }, 300)),
  when: { show() { window.shownReady = window.ready === true; } },`
    }),
    fix: /beforeShowPromise/,
    extra: async (d) => {
      const waited = await d.page.evaluate(() => window.shownReady);
      if (!waited) throw new Error('the step did not wait for the promise');
    }
  },
  {
    id: 'stale-show-cancel-link',
    why: 'showCancelLink was replaced by cancelIcon in v6.',
    code: program({ step1: 'showCancelLink: true,' }),
    fix: /cancelIcon/,
    extra: async (d) => {
      const icons = await d
        .step('First')
        .locator('.shepherd-cancel-icon')
        .count();
      if (icons !== 1) throw new Error('no close icon');
    }
  },
  {
    id: 'stale-defaults',
    why: 'Tour option `defaults` became `defaultStepOptions` in v5.',
    code: program({ tourOptions: `{ defaults: { classes: 'mine' } }` }),
    fix: /defaultStepOptions/,
    extra: async (d) => {
      const has = await d
        .step('First')
        .evaluate((el) => el.classList.contains('mine'));
      if (!has) throw new Error('default classes were not applied');
    }
  },
  {
    id: 'stale-modal',
    why: 'Other libraries and old Shepherd examples use modal or overlay flags.',
    code: program({ tourOptions: `{ modal: true }` }),
    fix: /useModalOverlay/,
    extra: async (d) => {
      const visible = await d.page
        .locator('.shepherd-modal-is-visible')
        .count();
      if (visible !== 1) throw new Error('no visible overlay');
    }
  },
  {
    id: 'floating-ui-options',
    why: 'Shepherd 15 and earlier took Floating UI config in floatingUIOptions, which positionOptions replaced.',
    code: program({ step1: `floatingUIOptions: { strategy: 'fixed' },` }),
    fix: /positionOptions/,
    extra: async (d) => {
      const position = await d
        .step('First')
        .evaluate((el) => getComputedStyle(el).position);
      if (position !== 'fixed') throw new Error('the step is not fixed');
    }
  },
  {
    id: 'content-not-text',
    why: 'Most tour libraries call the body content or description.',
    code: program({ step1: `content: 'body copy',` }),
    fix: /\btext\b/,
    extra: async (d) => {
      const text = await d.step('First').innerText();
      if (!text.includes('body copy')) throw new Error('body was not rendered');
    }
  },
  {
    id: 'stale-react-wrapper',
    why: 'react-shepherd before v6 exported ShepherdTour and ShepherdTourContext.',
    code: `import { ShepherdTour } from 'react-shepherd';\nconsole.log(ShepherdTour);`,
    fix: /useShepherd|ShepherdJourneyProvider/,
    skipTsc: true
  },
  {
    id: 'ssr-module-scope',
    why: 'A module-level tour runs during server rendering, even in a client component.',
    server: `import Shepherd from 'shepherd.js';
const tour = new Shepherd.Tour();
tour.addStep({ text: 'hi' });
tour.on('complete', () => {});
tour.start();`
  }
];

async function exercise(browser, mistake, built, pkgDir, console_) {
  const server = await serve({
    html: HTML('<script type="module" src="/bundle.js"></script>'),
    files: { '/bundle.css': '', ...built.files },
    pkgDir
  });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();
  page.setDefaultTimeout(1500);
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type())) {
      console_.push(message.text());
    }
  });
  page.on('pageerror', (error) => console_.push(error.message));
  try {
    await page.goto(server.url);
    const d = createDriver(page);
    await d.expectStep('First');
    await d.expectStylesheet();
    await d.expectPlaced('First', '#a', 'bottom');
    await mistake.extra?.(d);
    await d.click('First', 'Next');
    await d.expectStep('Second');
    await d.click('Second', 'Done');
    await d.expectNoStep();
    return { works: true };
  } catch (error) {
    return { works: false, failure: error.message.split('\n')[0] };
  } finally {
    await context.close();
    await server.close();
  }
}

function runOnServer(workspace, source) {
  const path = writeEntry(workspace, 'server.mjs', source);
  const run = spawnSync(process.execPath, [path], {
    cwd: workspace,
    encoding: 'utf8'
  });
  const error = run.stderr.match(/^\w*Error: .*$/m)?.[0];
  return {
    works: run.status === 0,
    failure: error,
    console: error ? [error] : []
  };
}

function classify(mistake, row) {
  if (row.works) return 'WORKS';
  if (!mistake.fix) return 'BROKEN';
  if (row.console.some((text) => mistake.fix.test(text))) return 'DIAGNOSED';
  return row.console.length ? 'LOUD-UNHELPFUL' : 'SILENT';
}

async function main() {
  const args = process.argv.slice(2);
  const option = (name) => {
    const at = args.indexOf(`--${name}`);
    return at >= 0 ? args[at + 1] : undefined;
  };
  const pkgDir = resolve(option('pkg') ?? defaultPkgDir);
  const agentDocsPath = join(pkgDir, 'AGENTS.md');
  const agentDocs = existsSync(agentDocsPath)
    ? readFileSync(agentDocsPath, 'utf8')
    : null;
  const browser = await chromium.launch();
  const rows = [];
  const example = agentDocs?.match(/```js\n([\s\S]*?)```/)?.[1];
  const entries = example
    ? [
        ...MISTAKES,
        {
          id: 'agents-md-example',
          why: 'Not a mistake. The first example in AGENTS.md has to run as written.',
          code: example
        }
      ]
    : MISTAKES;
  for (const mistake of entries) {
    const workspace = createWorkspace(pkgDir);
    const row = { id: mistake.id, console: [] };
    try {
      if (mistake.server) {
        Object.assign(row, runOnServer(workspace, mistake.server));
      } else {
        const path = writeEntry(workspace, 'solution.ts', mistake.code);
        if (!mistake.skipTsc) {
          const tsErrors = typecheck(workspace, path);
          row.tsc = tsErrors.length ? tsErrors[0] : null;
        }
        const built = await bundle(workspace, path);
        if (built.error) {
          row.works = false;
          row.failure = 'does not build';
          row.console.push(built.error);
        } else {
          Object.assign(
            row,
            await exercise(browser, mistake, built, pkgDir, row.console)
          );
        }
      }
    } finally {
      rmSync(workspace, { recursive: true, force: true });
    }
    row.outcome = classify(mistake, row);
    row.tscCaught = Boolean(row.tsc);
    row.tscNamesFix = Boolean(row.tsc && mistake.fix?.test(row.tsc));
    row.agentDocsNameFix = Boolean(agentDocs && mistake.fix?.test(agentDocs));
    rows.push(row);
    console.log(
      `${row.outcome.padEnd(15)}${row.tsc === undefined ? '  -  ' : row.tscCaught ? ' tsc ' : '  .  '}${row.agentDocsNameFix ? 'docs ' : '  .  '}${mistake.id}`
    );
  }
  await browser.close();
  const tally = {};
  for (const { outcome } of rows) tally[outcome] = (tally[outcome] ?? 0) + 1;
  console.log(tally);
  const out = option('json');
  if (out) {
    mkdirSync(dirname(resolve(out)), { recursive: true });
    writeFileSync(out, `${JSON.stringify({ pkgDir, tally, rows }, null, 1)}\n`);
  }
}

await main();
