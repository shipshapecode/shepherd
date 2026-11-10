// A consumer's unit tests often run tours in jsdom, which has no layout,
// ResizeObserver or IntersectionObserver, and by default no
// requestAnimationFrame. A tour must still run there without an unhandled
// rejection. Run `pnpm build` first.
import process from 'node:process';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';
import { packageDir } from '../../scripts/scorecard/lib.mjs';

const visual = process.argv.includes('--visual');
const dom = new JSDOM(
  '<!doctype html><html><body><div id="a">target</div></body></html>',
  { pretendToBeVisual: visual, url: 'http://localhost/' }
);
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (!(key in globalThis)) {
    try {
      globalThis[key] = dom.window[key];
    } catch {
      // Read-only on the Node global.
    }
  }
}
globalThis.window = dom.window;
globalThis.document = dom.window.document;

const errors = [];
process.on('unhandledRejection', (error) => errors.push(String(error)));

const { default: Shepherd } = await import(
  pathToFileURL(join(packageDir, 'dist/js/shepherd.mjs')).href
);
const pause = () => new Promise((done) => setTimeout(done, 30));
// The overlay's frame loop needs requestAnimationFrame.
const tour = new Shepherd.Tour({ useModalOverlay: visual });
tour.addStep({
  text: 'hi',
  arrow: true,
  attachTo: { element: '#a', on: 'bottom' }
});
tour.addStep({ text: 'auto', attachTo: { element: '#a', on: 'auto-start' } });
tour.addStep({ text: 'centered' });

const placements = [];
await tour.start();
await pause();
placements.push(tour.getCurrentStep().el?.dataset.popperPlacement);
await tour.next();
await pause();
placements.push(tour.getCurrentStep().el?.dataset.popperPlacement);
await tour.next();
await pause();
const { el } = tour.getCurrentStep();
placements.push(el?.dataset.popperPlacement);
const focused = dom.window.document.activeElement === el;
tour.complete();

console.log(JSON.stringify({ placements, focused, unhandled: errors }));
dom.window.close();
process.exit(errors.length || !focused ? 1 : 0);
