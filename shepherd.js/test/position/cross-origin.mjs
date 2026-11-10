// A tour inside a cross-origin iframe, where reading `window.frameElement` past
// the frame's own document throws or returns null. Run `pnpm build` first.
import process from 'node:process';
import * as playwright from 'playwright-core';
import { packageDir, serve } from '../../scripts/scorecard/lib.mjs';

const server = await serve(packageDir);
const { port } = new URL(server.url);
let failed = false;

async function runTour() {
  const { default: Shepherd } = await import('/dist/js/shepherd.mjs');
  const target = document.createElement('div');
  target.className = 'target';
  target.style.left = '300px';
  target.style.top = '200px';
  document.getElementById('page').append(target);
  const tour = new Shepherd.Tour({ useModalOverlay: true });
  tour.addStep({
    text: 'hi',
    arrow: true,
    attachTo: { element: target, on: 'bottom' }
  });
  await tour.start();
  const el = tour.getCurrentStep().el;
  const start = performance.now();
  while (!el.dataset.popperPlacement && performance.now() - start < 3000) {
    await new Promise(requestAnimationFrame);
  }
  const rect = el.getBoundingClientRect();
  window.scrollTo(0, 40);
  await new Promise((done) => setTimeout(done, 100));
  const after = el.getBoundingClientRect();
  tour.complete();
  return {
    placement: el.dataset.popperPlacement,
    y: rect.y,
    yAfterScroll: after.y
  };
}

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
  // `localhost` and `127.0.0.1` are different origins for the same server.
  await page.goto(`http://localhost:${port}/page.html`);
  await page.evaluate((src) => {
    const frame = document.createElement('iframe');
    frame.src = src;
    frame.style.cssText = 'width:800px;height:600px;border:0';
    document.body.prepend(frame);
    return new Promise((done) => {
      frame.onload = done;
    });
  }, `http://127.0.0.1:${port}/page.html`);
  const frame = page.frames().find((f) => f !== page.mainFrame());
  const out = await frame.evaluate(runTour);
  const follows = Math.abs(out.y - 40 - out.yAfterScroll) <= 1;
  failed ||= errors.length > 0 || !out.placement || !follows;
  console.log(name, JSON.stringify(out), 'errors:', JSON.stringify(errors));
  await browser.close();
}
await server.close();
process.exitCode = failed ? 1 : 0;
