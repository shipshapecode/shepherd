// Records where steps land in a real browser and compares against goldens
// captured from the Floating UI build, so a positioning change has to prove
// it lands in the same place.
//
//   node scripts/scorecard/parity.mjs [--browser chromium|firefox|webkit|all]
//   node scripts/scorecard/parity.mjs --update   (only on the baseline build)
import process from 'node:process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import * as playwright from 'playwright-core';
import { packageDir, scorecardDir, serve } from './lib.mjs';

const PLACEMENTS = [
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
const SPOTS = {
  center: { left: 440, top: 330 },
  topLeft: { left: 0, top: 0 },
  topRight: { left: 880, top: 0 },
  bottomLeft: { left: 0, top: 660 },
  bottomRight: { left: 880, top: 660 }
};
const CORE = ['top', 'bottom-start', 'left', 'right-end', 'auto'];

function buildCases() {
  const cases = [];
  for (const on of PLACEMENTS) {
    for (const spot of Object.keys(SPOTS)) {
      cases.push({ id: `window/${spot}/${on}`, context: 'window', spot, on });
    }
    cases.push({
      id: `scrolled/${on}`,
      context: 'scrolled',
      spot: 'center',
      on
    });
    cases.push({ id: `noArrow/${on}`, context: 'noArrow', spot: 'center', on });
  }
  for (const context of [
    'overflowParent',
    'transformedContainer',
    'fixedTarget',
    'strategyFixed',
    'rtl',
    'userOffset',
    'userShift',
    'arrowPadding',
    'mobileViewport'
  ]) {
    for (const on of CORE) {
      for (const spot of ['center', 'bottomRight']) {
        cases.push({ id: `${context}/${spot}/${on}`, context, spot, on });
      }
    }
  }
  cases.push({ id: 'centered/noAttachTo', context: 'centered' });
  cases.push({ id: 'centered/noOn', context: 'centeredNoOn', spot: 'center' });
  return cases;
}

async function runCase(cfg) {
  const { default: Shepherd } = await import('/dist/js/shepherd.mjs');
  const { offset, shift } =
    await import('/vendor/floating-ui-user-middleware.mjs');
  const page = document.getElementById('page');
  page.innerHTML = '';
  page.removeAttribute('style');
  document.documentElement.removeAttribute('dir');
  window.scrollTo(0, 0);

  const spot = {
    center: { left: 440, top: 330 },
    topLeft: { left: 0, top: 0 },
    topRight: { left: 880, top: 0 },
    bottomLeft: { left: 0, top: 660 },
    bottomRight: { left: 880, top: 660 }
  }[cfg.spot ?? 'center'];

  const target = document.createElement('div');
  target.className = 'target';
  target.style.left = `${spot.left}px`;
  target.style.top = `${spot.top}px`;
  const stepOptions = {
    arrow: true,
    text: 'A step with a sentence of text that wraps onto a second line here.',
    title: 'Parity',
    buttons: [{ text: 'Next' }]
  };
  const tourOptions = { useModalOverlay: true };

  if (cfg.context === 'scrolled') {
    target.style.top = `${spot.top + 500}px`;
    page.append(target);
    window.scrollTo(0, 500);
  } else if (cfg.context === 'overflowParent') {
    const host = document.createElement('div');
    Object.assign(host.style, {
      position: 'absolute',
      left: '300px',
      top: '200px',
      width: '400px',
      height: '300px',
      overflow: 'auto'
    });
    const inner = document.createElement('div');
    inner.style.cssText = 'position:relative;height:1200px;width:900px';
    target.style.left = cfg.spot === 'center' ? '140px' : '280px';
    target.style.top = cfg.spot === 'center' ? '300px' : '500px';
    inner.append(target);
    host.append(inner);
    page.append(host);
    host.scrollTop = cfg.spot === 'center' ? 200 : 300;
  } else if (cfg.context === 'transformedContainer') {
    const container = document.createElement('div');
    Object.assign(container.style, {
      position: 'absolute',
      left: '50px',
      top: '80px',
      width: '800px',
      height: '500px',
      transform: 'translate(10px, 10px)'
    });
    page.append(target, container);
    tourOptions.stepsContainer = container;
  } else if (cfg.context === 'fixedTarget') {
    target.style.position = 'fixed';
    page.append(target);
    window.scrollTo(0, 250);
  } else if (cfg.context === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    page.append(target);
  } else if (cfg.context !== 'centered') {
    page.append(target);
  }

  if (cfg.context === 'noArrow') stepOptions.arrow = false;
  if (cfg.context === 'arrowPadding') stepOptions.arrow = { padding: 16 };
  if (cfg.context === 'strategyFixed') {
    stepOptions.floatingUIOptions = { strategy: 'fixed' };
  }
  if (cfg.context === 'userOffset') {
    stepOptions.floatingUIOptions = { middleware: [offset(12)] };
  }
  if (cfg.context === 'userShift') {
    stepOptions.floatingUIOptions = { middleware: [shift({ padding: 24 })] };
  }
  if (cfg.context === 'centeredNoOn')
    stepOptions.attachTo = { element: target };
  else if (cfg.context !== 'centered') {
    stepOptions.attachTo = { element: target, on: cfg.on };
  }

  const tour = new Shepherd.Tour(tourOptions);
  tour.addStep(stepOptions);
  await tour.start();

  const el = tour.getCurrentStep().el;
  const deadline = performance.now() + 3000;
  while (!el.dataset.popperPlacement && performance.now() < deadline) {
    await new Promise(requestAnimationFrame);
  }
  await new Promise(requestAnimationFrame);
  await new Promise(requestAnimationFrame);

  const rect = el.getBoundingClientRect();
  const arrow = el.querySelector('.shepherd-arrow')?.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const result = {
    positioned: Boolean(el.dataset.popperPlacement),
    placement: el.dataset.popperPlacement ?? null,
    x: rect.x,
    y: rect.y,
    w: rect.width,
    h: rect.height,
    arrowX: arrow?.x ?? null,
    arrowY: arrow?.y ?? null,
    inViewport:
      rect.left >= -1 &&
      rect.top >= -1 &&
      rect.right <= innerWidth + 1 &&
      rect.bottom <= innerHeight + 1,
    overlapsTarget:
      cfg.context !== 'centered' &&
      cfg.context !== 'centeredNoOn' &&
      rect.left < targetRect.right - 1 &&
      rect.right > targetRect.left + 1 &&
      rect.top < targetRect.bottom - 1 &&
      rect.bottom > targetRect.top + 1
  };
  tour.complete();
  return result;
}

const TOLERANCE = 1;
const COORDS = ['x', 'y', 'w', 'h', 'arrowX', 'arrowY'];

function diff(golden, actual) {
  const out = [];
  if (golden.placement !== actual.placement) {
    out.push(`placement ${golden.placement} -> ${actual.placement}`);
  }
  for (const key of COORDS) {
    const a = golden[key];
    const b = actual[key];
    if ((a === null) !== (b === null)) out.push(`${key} ${a} -> ${b}`);
    else if (a !== null && Math.abs(a - b) > TOLERANCE) {
      out.push(`${key} ${a.toFixed(1)} -> ${b.toFixed(1)}`);
    }
  }
  return out;
}

export async function runParity({
  browser: browserName,
  update = false,
  pkgDir = packageDir
}) {
  const server = await serve(pkgDir);
  const browser = await playwright[browserName].launch();
  const results = {};
  const errors = [];
  try {
    const cases = buildCases();
    for (const viewport of [
      { width: 1000, height: 700 },
      { width: 375, height: 667 }
    ]) {
      const mobile = viewport.width === 375;
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      page.on('pageerror', (error) => errors.push(error.message));
      await page.goto(`${server.url}/page.html`);
      for (const cfg of cases) {
        if (mobile !== (cfg.context === 'mobileViewport')) continue;
        try {
          results[cfg.id] = await page.evaluate(runCase, cfg);
        } catch (error) {
          errors.push(`${cfg.id}: ${error.message.split('\n')[0]}`);
        }
      }
      await context.close();
    }
  } finally {
    await browser.close();
    await server.close();
  }

  const goldenPath = join(scorecardDir, 'golden', `parity.${browserName}.json`);
  if (update) {
    if (errors.length) throw new Error(`errors: ${errors.join('; ')}`);
    writeFileSync(goldenPath, `${JSON.stringify(results, null, 1)}\n`);
  }
  const golden = existsSync(goldenPath)
    ? JSON.parse(readFileSync(goldenPath, 'utf8'))
    : {};
  const mismatches = [];
  const byContext = {};
  let inViewportLost = 0;
  let overlapGained = 0;
  for (const [id, expected] of Object.entries(golden)) {
    const actual = results[id];
    const changes = actual ? diff(expected, actual) : ['missing'];
    const context = id.split('/')[0];
    if (changes.length) {
      mismatches.push({ id, changes });
      byContext[context] = (byContext[context] ?? 0) + 1;
    }
    if (actual && expected.inViewport && !actual.inViewport) inViewportLost++;
    if (actual && !expected.overlapsTarget && actual.overlapsTarget) {
      overlapGained++;
    }
  }
  return {
    browser: browserName,
    cases: Object.keys(results).length,
    goldenCases: Object.keys(golden).length,
    errors,
    mismatchCount: mismatches.length,
    byContext,
    inViewportLost,
    overlapGained,
    sample: mismatches.slice(0, 12)
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const browserArg = args.includes('--browser')
    ? args[args.indexOf('--browser') + 1]
    : 'chromium';
  const names =
    browserArg === 'all' ? ['chromium', 'firefox', 'webkit'] : [browserArg];
  let failed = false;
  for (const browser of names) {
    const report = await runParity({
      browser,
      update: args.includes('--update')
    });
    console.log(JSON.stringify(report, null, 1));
    failed ||= report.mismatchCount > 0 || report.errors.length > 0;
  }
  process.exit(failed ? 1 : 0);
}
