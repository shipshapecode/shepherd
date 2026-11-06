// Positions the same DOM with stock @floating-ui/dom and with Shepherd's engine,
// in real browsers, and fails on any difference not in known-differences.json.
//   node test/position-differential/run.mjs
//     [--browser chromium|firefox|webkit|all] [--fixture name] [--config name]
//     [--json out.json] [--update-known]
import process from 'node:process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import * as playwright from 'playwright-core';

const here = dirname(fileURLToPath(import.meta.url));
const packageDir = join(here, '../..');
const knownFile = join(here, 'known-differences.json');
const args = process.argv.slice(2);
const flag = (name, fallback) =>
  args.includes(name) ? args[args.indexOf(name) + 1] : fallback;

const bundle = async (contents, globalName) => {
  const result = await build({
    stdin: { contents, resolveDir: packageDir, loader: 'ts' },
    bundle: true,
    format: 'iife',
    globalName,
    write: false,
    target: 'es2020',
    logLevel: 'error',
    loader: { '.css': 'empty' }
  });
  return result.outputFiles[0].text;
};

const STOCK = await bundle(`export * from '@floating-ui/dom';`, 'STOCK');
const ENGINE = await bundle(
  `export { computePosition, autoUpdate } from './src/utils/position.ts';
   export { getFloatingUIOptions } from './src/utils/floating-ui.ts';`,
  'ENGINE'
);
const FIXTURES = readFileSync(join(here, 'fixtures.js'), 'utf8');
const PAGE =
  '<html><head><meta charset="utf-8"><style>html,body{margin:0}</style></head><body></body></html>';
// In quirks mode <body> has its default margin, since several checks depend on it.
const QUIRKS_PAGE =
  '<html><head><meta charset="utf-8"></head><body></body></html>';

const ALL_PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
  'auto',
  'auto-start',
  'auto-end'
];
const CORE_PLACEMENTS = [
  'top',
  'bottom-start',
  'left-end',
  'right',
  'auto',
  'auto-end'
];
// Filled by the engine's own middleware only for what Shepherd reads, so stock's
// bookkeeping under these names is not compared when the engine's ran.
const ENGINE_MIDDLEWARE = ['flip', 'autoPlacement', 'shift'];

async function runFixture({
  name,
  only,
  ALL_PLACEMENTS,
  CORE_PLACEMENTS,
  ENGINE_MIDDLEWARE
}) {
  const { STOCK, ENGINE, FIXTURES, USER_CONFIGS, RAW_CONFIGS, stockOptions } =
    window;
  const round = (value) =>
    JSON.parse(
      JSON.stringify(value, (key, v) => {
        if (typeof v === 'number') {
          return Number.isFinite(v) ? Math.round(v * 100) / 100 : String(v);
        }
        return v && typeof v === 'object' && !Array.isArray(v)
          ? Object.fromEntries(
              Object.entries(v).sort(([a], [b]) => (a < b ? -1 : 1))
            )
          : v;
      })
    );
  const attempt = async (position) => {
    try {
      return round(await position());
    } catch (error) {
      return { threw: String(error.message).slice(0, 100) };
    }
  };
  const comparableData = (result, raw) => {
    if (result.threw) return result.threw;
    const data = { ...result.middlewareData };
    if (!raw) for (const key of ENGINE_MIDDLEWARE) delete data[key];
    if (data.arrow && !raw) {
      data.arrow = { x: data.arrow.x, y: data.arrow.y };
    }
    return JSON.stringify(data);
  };

  const fx = FIXTURES[name]();
  if (!fx) return { name, skipped: true };
  const { reference, floating, arrow } = fx;
  const out = { name, cases: 0, differences: [] };
  const compare = (config, strategy, on, stock, engine, raw) => {
    out.cases++;
    if (stock.threw && engine.threw) return;
    const dx = Math.abs(stock.x - engine.x);
    const dy = Math.abs(stock.y - engine.y);
    const coords =
      Boolean(stock.threw || engine.threw) ||
      dx > 0.01 ||
      dy > 0.01 ||
      stock.placement !== engine.placement;
    const stockData = comparableData(stock, raw);
    const engineData = comparableData(engine, raw);
    if (coords || stockData !== engineData) {
      out.differences.push({
        config,
        strategy,
        on,
        coords,
        over1px: Boolean(
          stock.threw ||
          engine.threw ||
          dx > 1 ||
          dy > 1 ||
          stock.placement !== engine.placement
        ),
        stock: {
          x: stock.x,
          y: stock.y,
          placement: stock.placement,
          threw: stock.threw
        },
        engine: {
          x: engine.x,
          y: engine.y,
          placement: engine.placement,
          threw: engine.threw
        },
        data: coords ? undefined : { stock: stockData, engine: engineData }
      });
    }
  };

  const strategies = fx.fixedOnly ? ['fixed'] : ['absolute', 'fixed'];
  for (const strategy of strategies) {
    if (!fx.keepPosition) floating.style.position = strategy;
    for (const [config, make] of Object.entries(USER_CONFIGS)) {
      if (only && only !== config) continue;
      for (const on of config === 'none' ? ALL_PLACEMENTS : CORE_PLACEMENTS) {
        const stock = await attempt(() =>
          STOCK.computePosition(
            reference,
            floating,
            stockOptions(STOCK, on, reference, arrow, strategy, make(STOCK, fx))
          )
        );
        const engine = await attempt(() =>
          ENGINE.computePosition(
            reference,
            floating,
            ENGINE.getFloatingUIOptions(
              { element: reference, on },
              {
                options: {
                  arrow: true,
                  floatingUIOptions: { strategy, ...make(STOCK, fx) }
                },
                el: floating
              }
            )
          )
        );
        compare(config, strategy, on, stock, engine, false);
      }
    }
    for (const [config, make] of Object.entries(RAW_CONFIGS)) {
      if (only && only !== config) continue;
      for (const on of CORE_PLACEMENTS) {
        const placement = on.startsWith('auto') ? undefined : on;
        const stock = await attempt(() =>
          STOCK.computePosition(reference, floating, {
            placement,
            strategy,
            middleware: make(STOCK, on, fx)
          })
        );
        const engine = await attempt(() =>
          ENGINE.computePosition(reference, floating, {
            placement,
            strategy,
            middleware: make(STOCK, on, fx)
          })
        );
        compare(config, strategy, on, stock, engine, true);
      }
    }
  }
  fx.closeDialog?.close();
  return out;
}

async function runTracker({ which }) {
  const lib = window[which];
  const page = document.createElement('div');
  page.style.cssText = 'height:3000px;position:relative';
  document.body.append(page);
  const scroller = document.createElement('div');
  scroller.style.cssText =
    'position:absolute;left:100px;top:100px;width:300px;height:200px;overflow:auto';
  page.append(scroller);
  const inner = document.createElement('div');
  inner.style.cssText = 'height:900px;position:relative';
  scroller.append(inner);
  const spacer = document.createElement('div');
  spacer.style.cssText = 'height:20px';
  inner.append(spacer);
  const reference = document.createElement('div');
  reference.style.cssText = 'width:100px;height:40px;background:#ccd';
  inner.append(reference);
  const floating = document.createElement('div');
  floating.style.cssText =
    'position:absolute;left:0;top:0;width:100px;height:50px;background:#fcc';
  document.body.append(floating);
  let count = 0;
  const tick = async () => {
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    await new Promise(requestAnimationFrame);
    // Longer than a settled tracker's heartbeat.
    await new Promise((done) => setTimeout(done, 250));
  };
  const results = {};
  const measure = async (name, act) => {
    await tick();
    const before = count;
    act();
    await tick();
    results[name] = count - before;
  };
  const cleanup = lib.autoUpdate(reference, floating, () => count++);
  results.initial = count;
  await measure('windowScroll', () => window.scrollTo(0, 37));
  await measure('ancestorScroll', () => {
    scroller.scrollTop = 11;
  });
  await measure('referenceResize', () => {
    reference.style.width = '111px';
  });
  await measure('floatingResize', () => {
    floating.style.height = '77px';
  });
  await measure('layoutShift', () => {
    spacer.style.height = '60px';
  });
  await measure('transformShift', () => {
    inner.style.transform = 'translateY(7px)';
  });
  await measure('outsideShift', () => {
    scroller.style.top = '140px';
  });
  await new Promise((done) => setTimeout(done, 1200));
  await measure('idle', () => {});
  await measure('settledShift', () => {
    scroller.style.top = '150px';
  });
  cleanup();
  await measure('afterCleanup', () => {
    window.scrollTo(0, 80);
    reference.style.width = '131px';
    floating.style.height = '33px';
    scroller.style.top = '90px';
  });
  window.scrollTo(0, 0);
  return results;
}

const browserArg = flag('--browser', 'all');
const browsers =
  browserArg === 'all' ? ['chromium', 'firefox', 'webkit'] : [browserArg];
const onlyFixture = flag('--fixture');
const onlyConfig = flag('--config');
const report = {};

for (const [browserName, mode] of browsers.flatMap((browserName) => [
  [browserName, 'standards'],
  [browserName, 'quirks']
])) {
  const browser = await playwright[browserName].launch(
    // Classic scrollbars, because the viewport math depends on them.
    browserName === 'chromium'
      ? {
          ignoreDefaultArgs: ['--hide-scrollbars'],
          args: ['--disable-features=OverlayScrollbar']
        }
      : {}
  );
  const context = await browser.newContext({
    viewport: { width: 1000, height: 700 }
  });
  const page = await context.newPage();
  await page.route('http://differential.test/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: mode === 'quirks' ? QUIRKS_PAGE : `<!doctype html>${PAGE}`
    })
  );
  const load = async () => {
    await page.goto('http://differential.test/');
    await page.addScriptTag({ content: STOCK });
    await page.addScriptTag({ content: ENGINE });
    await page.addScriptTag({ content: FIXTURES });
  };

  await load();
  const names = onlyFixture
    ? [onlyFixture]
    : await page.evaluate(() => Object.keys(window.FIXTURES));
  const byFixture = {};
  let cases = 0;
  let differences = 0;
  let coords = 0;
  let over1px = 0;
  for (const name of names) {
    await load();
    const result = await page.evaluate(runFixture, {
      name,
      only: onlyConfig,
      ALL_PLACEMENTS,
      CORE_PLACEMENTS,
      ENGINE_MIDDLEWARE
    });
    if (result.skipped) continue;
    cases += result.cases;
    differences += result.differences.length;
    coords += result.differences.filter((d) => d.coords).length;
    over1px += result.differences.filter((d) => d.over1px).length;
    for (const difference of result.differences) {
      const key = `${name}/${difference.config}`;
      (byFixture[key] ??= { count: 0, first: difference }).count++;
    }
  }

  const tracker = {};
  for (const which of ['STOCK', 'ENGINE']) {
    await load();
    tracker[which] = await page.evaluate(runTracker, { which });
  }
  await browser.close();

  report[`${browserName} ${mode}`] = {
    cases,
    differences,
    coords,
    over1px,
    byFixture,
    tracker
  };
  console.log(
    `${browserName} ${mode}: ${cases} cases, ${differences} differ, ${coords} in position or placement, ${over1px} by more than 1px`
  );
}

const known = JSON.parse(readFileSync(knownFile, 'utf8'));

const unexpected = [];
for (const [browserName, result] of Object.entries(report)) {
  for (const [key, { count, first }] of Object.entries(result.byFixture)) {
    const allowed = known[browserName]?.[key] ?? 0;
    if (count > allowed) {
      unexpected.push(
        `${browserName} ${key}: ${count} differ, ${allowed} known. First: ${JSON.stringify(first)}`
      );
    }
  }
  const { tracker } = result;
  for (const [name, reactions] of Object.entries(tracker.ENGINE)) {
    const quiet = name === 'idle' || name === 'afterCleanup';
    if (quiet ? reactions !== 0 : reactions < 1) {
      unexpected.push(
        `${browserName} tracker ${name}: ${reactions} updates, stock ${tracker.STOCK[name]}`
      );
    }
  }
}

if (args.includes('--update-known')) {
  const next = {};
  for (const [browserName, result] of Object.entries(report)) {
    next[browserName] = Object.fromEntries(
      Object.entries(result.byFixture)
        .map(([key, { count }]) => [key, count])
        .sort(([a], [b]) => (a < b ? -1 : 1))
    );
  }
  writeFileSync(knownFile, `${JSON.stringify(next, null, 2)}\n`);
  console.log(`Wrote ${knownFile}`);
} else if (unexpected.length) {
  console.log(`\n${unexpected.length} unexpected:\n${unexpected.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('Every difference is known.');
}

const jsonPath = flag('--json');
if (jsonPath) writeFileSync(jsonPath, JSON.stringify(report, null, 1));
