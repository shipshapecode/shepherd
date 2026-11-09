// The published build with each `positionOptions` key, in real browsers, so
// property mangling cannot break what the source-level differential checks.
// Run `pnpm build` first.
import process from 'node:process';
import * as playwright from 'playwright-core';
import { packageDir, serve } from '../../scripts/scorecard/lib.mjs';

const server = await serve(packageDir);

async function runScenarios() {
  const { default: Shepherd } = await import('/dist/js/shepherd.mjs');
  const pageEl = document.getElementById('page');
  const run = async (options, on, left = 440, top = 330) => {
    const target = document.createElement('div');
    target.className = 'target';
    target.style.left = `${left}px`;
    target.style.top = `${top}px`;
    pageEl.replaceChildren(target);
    const tour = new Shepherd.Tour();
    tour.addStep({
      text: 'hi',
      arrow: true,
      attachTo: { element: target, on },
      ...options
    });
    await tour.start();
    const el = tour.getCurrentStep().el;
    const start = performance.now();
    while (!el.dataset.popperPlacement && performance.now() - start < 1500) {
      await new Promise(requestAnimationFrame);
    }
    const rect = el.getBoundingClientRect();
    const result = {
      placement: el.dataset.popperPlacement ?? null,
      position: el.style.position,
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      bottom: Math.round(rect.bottom)
    };
    tour.complete();
    return result;
  };
  const warnings = [];
  const warn = console.warn;
  console.warn = (...args) => warnings.push(args.join(' '));
  const removed = await run(
    { floatingUIOptions: { strategy: 'fixed' } },
    'bottom'
  );
  console.warn = warn;
  return {
    plain: await run({}, 'bottom'),
    offset: await run({ positionOptions: { offset: 20 } }, 'bottom'),
    fixed: await run({ positionOptions: { strategy: 'fixed' } }, 'bottom'),
    atTop: await run({}, 'right', 440, 0),
    padding: await run({ positionOptions: { padding: 40 } }, 'right', 440, 0),
    flipped: await run({}, 'right', 880),
    noFlip: await run({ positionOptions: { flip: false } }, 'right', 880),
    removed,
    warnings
  };
}

const checks = {
  'offset moves the step 20px further': (r) => r.offset.y - r.plain.y === 20,
  'strategy fixed is written': (r) => r.fixed.position === 'fixed',
  'a step that does not fit on the right flips': (r) =>
    r.flipped.placement === 'left',
  'flip: false keeps right': (r) => r.noFlip.placement === 'right',
  'padding keeps the step 40px from the edge': (r) =>
    r.atTop.y < 39 && r.padding.y >= 39,
  'floatingUIOptions is ignored and names positionOptions': (r) =>
    r.removed.position === 'absolute' &&
    r.warnings.some((text) => text.includes('positionOptions'))
};

let failed = false;
for (const name of ['chromium', 'firefox', 'webkit']) {
  const browser = await playwright[name].launch();
  const page = await browser.newPage({
    viewport: { width: 1000, height: 700 }
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${server.url}/page.html`);
  const out = await page.evaluate(runScenarios);
  const failures = Object.entries(checks)
    .filter(([, check]) => !check(out))
    .map(([label]) => label);
  failed ||= errors.length > 0 || failures.length > 0;
  console.log(
    name,
    failures.length ? `FAILED: ${failures.join('; ')}` : 'all checks pass',
    errors.length ? `errors: ${errors.join('; ')}` : ''
  );
  if (failures.length) console.log(' ', JSON.stringify(out));
  await browser.close();
}
await server.close();
process.exitCode = failed ? 1 : 0;
