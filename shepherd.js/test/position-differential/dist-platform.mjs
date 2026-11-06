// The published build with a consumer's own @floating-ui/dom platform and
// middleware, in real browsers. Guards `_c` against property mangling, which the
// source-level differential cannot see. Run `pnpm build` first.
import process from 'node:process';
import { build } from 'esbuild';
import * as playwright from 'playwright-core';
import { packageDir, serve } from '../../scripts/scorecard/lib.mjs';

const bundled = await build({
  stdin: {
    contents: `export * from '@floating-ui/dom';`,
    resolveDir: packageDir,
    loader: 'js'
  },
  bundle: true,
  format: 'iife',
  globalName: 'STOCK',
  write: false,
  target: 'es2020',
  logLevel: 'error'
});
const STOCK = bundled.outputFiles[0].text;
const server = await serve(packageDir);

async function runScenarios() {
  const { default: Shepherd } = await import('/dist/js/shepherd.mjs');
  const pageEl = document.getElementById('page');
  const run = async (floatingUIOptions, on) => {
    const target = document.createElement('div');
    target.className = 'target';
    target.style.left = '880px';
    target.style.top = '330px';
    pageEl.replaceChildren(target);
    const tour = new Shepherd.Tour();
    tour.addStep({
      text: 'hi',
      arrow: true,
      attachTo: { element: target, on },
      floatingUIOptions
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
      x: rect.x,
      y: rect.y
    };
    tour.complete();
    return result;
  };
  const { platform, offset, flip, shift, hide, size, inline, autoPlacement } =
    window.STOCK;
  return {
    engine: await run({}, 'right'),
    stockPlatform: await run({ platform }, 'right'),
    stockPlatformAuto: await run({ platform }, 'auto'),
    shadowDomRecipe: await run(
      {
        platform: {
          ...platform,
          getOffsetParent: (element) => platform.getOffsetParent(element)
        }
      },
      'right'
    ),
    stockMiddleware: await run(
      { middleware: [offset(12), flip(), shift(), hide(), size(), inline()] },
      'top'
    ),
    stockAutoPlacement: await run(
      { middleware: [autoPlacement({ allowedPlacements: ['left', 'top'] })] },
      'bottom'
    ),
    partialPlatform: await run(
      { platform: { getOffsetParent: platform.getOffsetParent } },
      'left'
    )
  };
}

let failed = false;
for (const name of ['chromium', 'firefox', 'webkit']) {
  const browser = await playwright[name].launch();
  const page = await browser.newPage({
    viewport: { width: 1000, height: 700 }
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  await page.goto(`${server.url}/page.html`);
  await page.addScriptTag({ content: STOCK });
  const out = await page.evaluate(runScenarios);
  const positioned = Object.values(out).every((result) => result.placement);
  failed ||= errors.length > 0 || !positioned;
  console.log(
    name,
    positioned ? 'all positioned' : 'NOT ALL POSITIONED',
    'errors:',
    JSON.stringify([...new Set(errors)]).slice(0, 300)
  );
  console.log(' ', JSON.stringify(out));
  await browser.close();
}
await server.close();
process.exitCode = failed ? 1 : 0;
