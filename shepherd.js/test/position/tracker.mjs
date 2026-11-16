// Checks that autoUpdate reacts to every kind of movement, and stays quiet while
// idle and after cleanup, in real browsers.
//   node test/position/tracker.mjs [--browser chromium|firefox|webkit|all]
import process from 'node:process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import * as playwright from 'playwright-core';

const packageDir = join(dirname(fileURLToPath(import.meta.url)), '../..');
const ALL_BROWSERS = ['chromium', 'firefox', 'webkit'];
const args = process.argv.slice(2);
const browserArg = args[0] === '--browser' ? args[1] : 'all';
const browsers = browserArg === 'all' ? ALL_BROWSERS : [browserArg];
// The old differential runner took --fixture, --config and --json. Fail on
// them rather than pass without running what was asked for.
if (
  args.length !== (args[0] === '--browser' ? 2 : 0) ||
  !browsers.every((name) => ALL_BROWSERS.includes(name))
) {
  console.error(
    `Unsupported arguments: ${args.join(' ')}\nUsage: node test/position/tracker.mjs [--browser chromium|firefox|webkit|all]`
  );
  process.exit(2);
}

const ENGINE = (
  await build({
    stdin: {
      contents: `export { autoUpdate } from './src/utils/position.ts';`,
      resolveDir: packageDir,
      loader: 'ts'
    },
    bundle: true,
    format: 'iife',
    globalName: 'ENGINE',
    write: false,
    target: 'es2020',
    logLevel: 'error'
  })
).outputFiles[0].text;
const PAGE =
  '<html><head><meta charset="utf-8"><style>html,body{margin:0}</style></head><body></body></html>';
// In quirks mode <body> keeps its default margin.
const QUIRKS_PAGE =
  '<html><head><meta charset="utf-8"></head><body></body></html>';

async function runTracker() {
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
  reference.style.cssText =
    'width:100px;height:40px;background:#ccd;border:4px solid';
  inner.append(reference);
  // An inline reference, whose size no ResizeObserver reports.
  const line = document.createElement('div');
  line.style.cssText =
    'position:absolute;left:500px;top:100px;white-space:nowrap';
  const lead = document.createTextNode('x');
  const inline = document.createElement('span');
  inline.textContent = 'a long inline reference';
  line.append(lead, inline);
  page.append(line);
  const inlineFloating = document.createElement('div');
  inlineFloating.style.cssText =
    'position:absolute;left:0;top:0;width:10px;height:10px';
  document.body.append(inlineFloating);
  let inlineCount = 0;
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
  const measure = async (name, act, read = () => count) => {
    await tick();
    const before = read();
    act();
    await tick();
    results[name] = read() - before;
  };
  const cleanup = window.ENGINE.autoUpdate(reference, floating, () => count++);
  const cleanupInline = window.ENGINE.autoUpdate(
    inline,
    inlineFloating,
    () => inlineCount++
  );
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
  await measure('shrink', () => {
    reference.style.height = '20px';
  });
  // Stays within the box the reference had before it shrank.
  await measure('shiftAfterShrink', () => {
    scroller.style.top = '155px';
  });
  // Shrinks the border box and leaves the content box as it was.
  await measure('borderShrink', () => {
    reference.style.borderWidth = '0';
  });
  const readInline = () => inlineCount;
  await measure(
    'inlineTextShrink',
    () => {
      inline.textContent = 'short';
    },
    readInline
  );
  // Moves it within the box it had before its text shrank.
  await measure(
    'inlineShiftAfterShrink',
    () => {
      lead.data = 'xx';
    },
    readInline
  );
  cleanup();
  cleanupInline();
  await measure('afterCleanup', () => {
    window.scrollTo(0, 80);
    reference.style.width = '131px';
    floating.style.height = '33px';
    scroller.style.top = '90px';
  });
  return results;
}

const unexpected = [];
for (const browserName of browsers) {
  for (const mode of ['standards', 'quirks']) {
    const browser = await playwright[browserName].launch(
      // Classic scrollbars, because the viewport math depends on them.
      browserName === 'chromium'
        ? {
            ignoreDefaultArgs: ['--hide-scrollbars'],
            args: ['--disable-features=OverlayScrollbar']
          }
        : {}
    );
    const page = await browser.newPage({
      viewport: { width: 1000, height: 700 }
    });
    await page.route('http://tracker.test/**', (route) =>
      route.fulfill({
        contentType: 'text/html',
        body: mode === 'quirks' ? QUIRKS_PAGE : `<!doctype html>${PAGE}`
      })
    );
    await page.goto('http://tracker.test/');
    await page.addScriptTag({ content: ENGINE });
    const results = await page.evaluate(runTracker);
    await browser.close();

    for (const [name, reactions] of Object.entries(results)) {
      const quiet = name === 'idle' || name === 'afterCleanup';
      if (quiet ? reactions !== 0 : reactions < 1) {
        unexpected.push(`${browserName} ${mode} ${name}: ${reactions} updates`);
      }
    }
    console.log(`${browserName} ${mode}: ${JSON.stringify(results)}`);
  }
}

if (unexpected.length) {
  console.log(`\n${unexpected.length} unexpected:\n${unexpected.join('\n')}`);
  process.exitCode = 1;
} else {
  console.log('The tracker reacts to every movement and is quiet otherwise.');
}
