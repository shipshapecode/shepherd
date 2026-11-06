// Interleaved browser benchmark of built packages. Run it on an otherwise idle
// machine; samples alternate between sides so drift affects both equally.
//
//   node scripts/scorecard/perf.mjs <pkgDirA> [<pkgDirB> ...] [--samples 15]
import process from 'node:process';
import { resolve } from 'node:path';
import { chromium } from 'playwright-core';
import { median, round, serve } from './lib.mjs';

const CPU_THROTTLE = 4;
const STEPS = 10;

async function metrics(cdp) {
  const { metrics: list } = await cdp.send('Performance.getMetrics');
  return Object.fromEntries(list.map(({ name, value }) => [name, value]));
}

async function journey(steps) {
  const page = document.getElementById('page');
  for (let i = 0; i < steps; i++) {
    const target = document.createElement('div');
    target.className = 'target';
    target.id = `t${i}`;
    target.style.left = `${100 + ((i * 97) % 700)}px`;
    target.style.top = `${100 + ((i * 131) % 500)}px`;
    page.append(target);
  }

  const importStart = performance.now();
  const { default: Shepherd } = await import('/dist/js/shepherd.mjs');
  const importMs = performance.now() - importStart;

  const positioned = (el) =>
    new Promise((done) => {
      if (el.dataset.popperPlacement) return done();
      const observer = new MutationObserver(() => {
        if (el.dataset.popperPlacement) {
          observer.disconnect();
          done();
        }
      });
      observer.observe(el, { attributes: true });
    });

  const tour = new Shepherd.Tour({ useModalOverlay: true });
  let shown = 0;
  tour.on('show', () => shown++);
  for (let i = 0; i < steps; i++) {
    tour.addStep({
      id: `s${i}`,
      arrow: true,
      title: `Step ${i}`,
      text: 'Some explanatory text for this step of the tour.',
      attachTo: { element: `#t${i}`, on: 'bottom' },
      buttons: [{ text: 'Next' }]
    });
  }

  const startStart = performance.now();
  await tour.start();
  await positioned(tour.getCurrentStep().el);
  const startMs = performance.now() - startStart;

  const nextTimes = [];
  for (let i = 1; i < steps; i++) {
    const nextStart = performance.now();
    await tour.next();
    await positioned(tour.getCurrentStep().el);
    nextTimes.push(performance.now() - nextStart);
  }
  nextTimes.sort((a, b) => a - b);
  window.__tour = tour;
  return {
    importMs,
    startMs,
    nextMs: nextTimes[nextTimes.length >> 1],
    shown
  };
}

async function scrollFrames(frames) {
  for (let i = 0; i < frames; i++) {
    window.scrollBy(0, i % 2 ? -8 : 8);
    await new Promise(requestAnimationFrame);
  }
}

async function cycles(count) {
  const { default: Shepherd } = await import('/dist/js/shepherd.mjs');
  for (let i = 0; i < count; i++) {
    const tour = new Shepherd.Tour({ useModalOverlay: true });
    tour.addStep({
      arrow: true,
      text: 'x',
      attachTo: { element: '#t0', on: 'bottom' }
    });
    await tour.start();
    await new Promise(requestAnimationFrame);
    tour.complete();
  }
  await new Promise((done) => setTimeout(done, 500));
}

async function sample(browser, url) {
  const context = await browser.newContext({
    viewport: { width: 1000, height: 700 }
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${url}/page.html`);
  const cdp = await context.newCDPSession(page);
  await cdp.send('Performance.enable');
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: CPU_THROTTLE });

  const start = await metrics(cdp);
  await page.evaluate(scrollFrames, 60);
  const control = await metrics(cdp);
  const before = control;
  const timing = await page.evaluate(journey, STEPS);
  const afterJourney = await metrics(cdp);
  await page.evaluate(scrollFrames, 60);
  const afterScroll = await metrics(cdp);
  await page.evaluate(() => window.__tour.complete());

  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  await page.evaluate(cycles, 5);
  await cdp.send('HeapProfiler.collectGarbage');
  const warm = await metrics(cdp);
  await page.evaluate(cycles, 30);
  await cdp.send('HeapProfiler.collectGarbage');
  const cold = await metrics(cdp);
  await context.close();

  return {
    importMs: timing.importMs,
    startMs: timing.startMs,
    nextMs: timing.nextMs,
    journeyLayouts: afterJourney.LayoutCount - before.LayoutCount,
    journeyStyleRecalcs:
      afterJourney.RecalcStyleCount - before.RecalcStyleCount,
    journeyTaskMs: (afterJourney.TaskDuration - before.TaskDuration) * 1e3,
    scrollLayouts: afterScroll.LayoutCount - afterJourney.LayoutCount,
    scrollTaskMs: (afterScroll.TaskDuration - afterJourney.TaskDuration) * 1e3,
    controlScrollLayouts: control.LayoutCount - start.LayoutCount,
    controlScrollTaskMs: (control.TaskDuration - start.TaskDuration) * 1e3,
    leakedNodesPerCycle: (cold.Nodes - warm.Nodes) / 30,
    leakedListenersPerCycle:
      (cold.JSEventListeners - warm.JSEventListeners) / 30,
    leakedHeapKbPerCycle:
      (cold.JSHeapUsedSize - warm.JSHeapUsedSize) / 30 / 1024,
    stepsShown: timing.shown,
    errors: errors.length
  };
}

const args = process.argv.slice(2);
const flagAt = args.indexOf('--samples');
const samples = flagAt >= 0 ? Number(args[flagAt + 1]) : 15;
const dirs = args
  .filter((_, i) => flagAt < 0 || (i !== flagAt && i !== flagAt + 1))
  .map((dir) => resolve(dir));
if (!dirs.length) {
  console.error('usage: perf.mjs <pkgDir> [<pkgDir> ...] [--samples N]');
  process.exit(2);
}

const browser = await chromium.launch();
const servers = await Promise.all(dirs.map(serve));
const runs = dirs.map(() => []);
for (let i = 0; i < samples; i++) {
  for (let d = 0; d < dirs.length; d++) {
    runs[d].push(await sample(browser, servers[d].url));
  }
}
await browser.close();
await Promise.all(servers.map((server) => server.close()));

const report = dirs.map((dir, d) => {
  const summary = { dir, samples, cpuThrottle: CPU_THROTTLE };
  for (const key of Object.keys(runs[d][0])) {
    const values = runs[d].map((run) => run[key]);
    summary[key] = {
      median: round(median(values)),
      min: round(Math.min(...values)),
      max: round(Math.max(...values))
    };
  }
  return summary;
});
console.log(JSON.stringify(report, null, 1));
