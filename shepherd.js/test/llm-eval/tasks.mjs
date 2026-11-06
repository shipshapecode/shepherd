// The tasks a cold coding agent is given. Prompts are written the way a developer
// would ask: they state the outcome, and never mention a mistake being tested.
// Each `check` is a list of named assertions run in order in a real browser.
// A failed assertion stops its task, since later ones depend on the page state.
import { poll } from './lib.mjs';

const page = (body, head = '') => `<!doctype html>
<html><head><meta charset="utf-8"><title>Acme</title>
<style>
  html, body { margin: 0; font: 14px/1.4 Arial, sans-serif; }
  .box { position: absolute; }
</style>${head}</head>
<body>${body}</body></html>`;

const FIRST_TOUR_PAGE = page(`
  <nav id="sidebar" class="box" style="left:0;top:0;width:150px;height:500px;background:#eee">Sidebar</nav>
  <button id="new-project" class="box" style="left:500px;top:40px">New project</button>`);

const MODAL_PAGE = page(`
  <button id="delete" class="box" style="left:500px;top:200px;width:120px;height:40px"
    onclick="window.deleteClicks = (window.deleteClicks || 0) + 1">Delete</button>
  <script>
    window.tourEnded = [];
    window.onTourEnd = (outcome) => window.tourEnded.push(outcome);
  </script>`);

const DEFAULTS_PAGE = page(`
  <div style="height:5000px;position:relative">
    <div id="one" class="box" style="left:500px;top:100px;width:120px;height:40px;background:#ccd">One</div>
    <div id="two" class="box" style="left:500px;top:1500px;width:120px;height:40px;background:#ccd">Two</div>
    <div id="three" class="box" style="left:500px;top:3000px;width:120px;height:40px;background:#ccd">Three</div>
    <div id="four" class="box" style="left:500px;top:4500px;width:120px;height:40px;background:#ccd">Four</div>
  </div>`);

const ASYNC_PAGE = page(`
  <button id="open-settings" class="box" style="left:500px;top:40px">Settings</button>
  <div id="root"></div>
  <div id="footer" class="box" style="left:500px;top:600px;width:120px;height:40px;background:#ccd">Footer</div>
  <script>
    window.app = {
      calls: 0,
      openSettings() {
        window.app.calls++;
        return new Promise((resolve) => setTimeout(() => {
          document.getElementById('root').insertAdjacentHTML('beforeend',
            '<div id="settings-panel" class="box" style="left:500px;top:150px;width:120px;height:40px;background:#ccd">Panel</div>');
          setTimeout(() => {
            document.getElementById('root').insertAdjacentHTML('beforeend',
              '<div id="live-widget" class="box" style="left:500px;top:350px;width:120px;height:40px;background:#ccd">Live</div>');
          }, 1000);
          resolve();
        }, 300));
      }
    };
  </script>`);

const EVENTS_PAGE = page(`
  <button id="menu" class="box" style="left:500px;top:40px;width:120px;height:40px"
    onclick="document.getElementById('menu-item').style.display = 'block'">Menu</button>
  <div id="menu-item" class="box" style="display:none;left:500px;top:100px;width:120px;height:40px;background:#ccd">Item</div>
  <script>
    window.analytics = { calls: [], track(name, props) { this.calls.push([name, props]); } };
  </script>`);

const REACT_PAGE = page('<div id="root"></div>');

const JSON_PAGE = page(`
  <div id="plans" class="box" style="left:500px;top:40px;width:120px;height:40px;background:#ccd">Plans</div>
  <div id="usage" class="box" style="left:150px;top:300px;width:120px;height:40px;background:#ccd">Usage</div>
  <div id="billing" class="box" style="left:800px;top:600px;width:120px;height:40px;background:#ccd">Billing</div>`);

const TOUR_JSON = JSON.stringify([
  {
    id: 'plans',
    selector: '#plans',
    placement: 'bottom',
    title: 'Plans',
    body: 'Pick a plan.'
  },
  {
    id: 'usage',
    selector: '#usage',
    placement: 'right',
    title: 'Usage',
    body: 'See <b>usage</b>.'
  },
  {
    id: 'billing',
    selector: '#billing',
    placement: 'top',
    title: 'Billing',
    body: 'Manage billing.'
  }
]);

export const TASKS = [
  {
    id: 'first-tour',
    extensions: ['js', 'ts'],
    html: FIRST_TOUR_PAGE,
    prompt: `Add a three step product tour that starts as soon as the page loads.

1. Title "Welcome". Text "Thanks for joining." Not attached to anything, in the middle of the screen. Button: "Next".
2. Title "Projects". Text "Create projects here." Attached below \`#new-project\`. Buttons: "Back" and "Next".
3. Title "Navigation". Text "Everything else lives here." Attached to the right of \`#sidebar\`. Buttons: "Back" and "Done". "Done" finishes the tour.`,
    check: (d) => [
      ['first step opens', () => d.expectStep('Welcome')],
      ['default styling applied', () => d.expectStylesheet()],
      ['first step centered', () => d.expectCentered('Welcome')],
      [
        'Next advances',
        async () => {
          await d.click('Welcome', 'Next');
          await d.expectStep('Projects');
        }
      ],
      [
        'second step below target',
        () => d.expectPlaced('Projects', '#new-project', 'bottom')
      ],
      [
        'Back returns',
        async () => {
          await d.click('Projects', 'Back');
          await d.expectStep('Welcome');
          await d.click('Welcome', 'Next');
          await d.expectStep('Projects');
        }
      ],
      [
        'third step right of target',
        async () => {
          await d.click('Projects', 'Next');
          await d.expectStep('Navigation');
          await d.expectPlaced('Navigation', '#sidebar', 'right');
        }
      ],
      [
        'Done ends the tour',
        async () => {
          await d.click('Navigation', 'Done');
          await d.expectNoStep();
        }
      ]
    ]
  },
  {
    id: 'modal-focus',
    extensions: ['js', 'ts'],
    html: MODAL_PAGE,
    prompt: `Add a one step tour that starts on page load, explaining the \`#delete\` button before anyone uses it.

The step has the title "Careful" and the text "This cannot be undone.", placed above the button. Everything on the page except the button should be dimmed, and the button itself must not be clickable while the tour is open. The user closes the step with a close "×" in its header or the Escape key. Whichever way it is closed, call \`window.onTourEnd('cancelled')\` once. There are no other buttons.`,
    check: (d) => {
      const overlay = '.shepherd-modal-overlay-container';
      return [
        ['step opens', () => d.expectStep('Careful')],
        ['default styling applied', () => d.expectStylesheet()],
        [
          'step above target',
          () => d.expectPlaced('Careful', '#delete', 'top')
        ],
        [
          'page is dimmed',
          () =>
            poll(
              () =>
                d.page.locator(overlay).evaluate((el) => {
                  const style = getComputedStyle(el);
                  return (
                    el.classList.contains('shepherd-modal-is-visible') &&
                    style.position === 'fixed' &&
                    Number(style.opacity) > 0
                  );
                }),
              'a visible, fixed overlay'
            )
        ],
        [
          'overlay has an opening around the target',
          () =>
            poll(
              () =>
                d.page
                  .locator(`${overlay} path`)
                  .evaluate(
                    (el) =>
                      (el.getAttribute('d').match(/M/gi) ?? []).length >= 2
                  ),
              'a cut-out in the overlay path'
            )
        ],
        [
          'target cannot be clicked',
          async () => {
            const box = await d.page.locator('#delete').boundingBox();
            await d.page.mouse.click(
              box.x + box.width / 2,
              box.y + box.height / 2
            );
            const clicks = await d.page.evaluate(() => window.deleteClicks);
            if (clicks) throw new Error('the target received the click');
          }
        ],
        [
          'close icon ends the tour once',
          async () => {
            await d.step('Careful').locator('.shepherd-cancel-icon').click();
            await d.expectNoStep();
            const ended = await d.page.evaluate(() => window.tourEnded);
            if (ended.join() !== 'cancelled') {
              throw new Error(`onTourEnd calls: ${JSON.stringify(ended)}`);
            }
          }
        ],
        [
          'Escape ends the tour once',
          async () => {
            await d.page.reload();
            await d.expectStep('Careful');
            await poll(
              () =>
                d.page.evaluate(
                  () =>
                    document.activeElement?.closest('.shepherd-element') !==
                    null
                ),
              'focus moved into the step'
            );
            await d.page.keyboard.press('Escape');
            await d.expectNoStep();
            const ended = await d.page.evaluate(() => window.tourEnded);
            if (ended.join() !== 'cancelled') {
              throw new Error(`onTourEnd calls: ${JSON.stringify(ended)}`);
            }
          }
        ]
      ];
    }
  },
  {
    id: 'shared-defaults',
    extensions: ['js', 'ts'],
    html: DEFAULTS_PAGE,
    prompt: `Add a four step tour that starts on page load, with steps attached below \`#one\`, \`#two\`, \`#three\` and \`#four\`, titled "One", "Two", "Three" and "Four" (any text).

These things hold for every step, so configure them once instead of repeating them: the step element has the CSS class \`acme-step\`, the page scrolls so the target is on screen, there is a close "×" in the header, and there is a "Next" button.

Two exceptions: step "Two" has no close "×", and step "Four" has a "Finish" button that ends the tour instead of "Next".`,
    check: (d) => {
      const closeIcon = (title) =>
        d.step(title).locator('.shepherd-cancel-icon').count();
      const stepHas = async (title, selector, placed = true) => {
        await d.expectStep(title);
        const hasClass = await d
          .step(title)
          .evaluate((el) => el.classList.contains('acme-step'));
        if (!hasClass) throw new Error(`"${title}" lacks acme-step`);
        await d.expectInViewport(selector);
        if (placed) await d.expectPlaced(title, selector, 'bottom');
      };
      return [
        [
          'step One from defaults',
          async () => {
            await stepHas('One', '#one');
            await d.expectStylesheet();
            if ((await closeIcon('One')) !== 1) throw new Error('no ×');
          }
        ],
        [
          'step Two overrides the close icon',
          async () => {
            await d.click('One', 'Next');
            await stepHas('Two', '#two');
            if ((await closeIcon('Two')) !== 0) throw new Error('has ×');
          }
        ],
        [
          'step Three keeps the defaults',
          async () => {
            await d.click('Two', 'Next');
            await stepHas('Three', '#three');
            if ((await closeIcon('Three')) !== 1) throw new Error('no ×');
          }
        ],
        [
          'step Four overrides the buttons',
          async () => {
            await d.click('Three', 'Next');
            await stepHas('Four', '#four');
            await d.expectNoButton('Four', 'Next');
          }
        ],
        [
          'Finish ends the tour',
          async () => {
            await d.click('Four', 'Finish');
            await d.expectNoStep();
          }
        ]
      ];
    }
  },
  {
    id: 'async-targets',
    extensions: ['js', 'ts'],
    html: ASYNC_PAGE,
    prompt: `Add a tour that starts on page load. Every attached step goes below its target and has a "Next" button, except the last, which has "Done". Step titles are given in quotes; any text.

1. "Start", attached to \`#open-settings\`.
2. "Panel", attached to \`#settings-panel\`. That element does not exist until the settings panel is opened with \`window.app.openSettings()\`, which returns a promise that resolves once it is rendered. Only open the panel when the tour reaches this step.
3. "Live", attached to \`#live-widget\`. The app renders this element by itself, up to two seconds after the settings panel opens.
4. "Legacy", attached to \`#legacy-banner\`. This element exists for some accounts only. When it is not on the page, the tour leaves this step out.
5. "Bye", attached to \`#footer\`.`,
    check: (d) => [
      [
        'first step opens without opening settings',
        async () => {
          await d.expectStep('Start');
          await d.expectStylesheet();
          await d.expectPlaced('Start', '#open-settings', 'bottom');
          const calls = await d.page.evaluate(() => window.app.calls);
          if (calls !== 0) throw new Error(`openSettings called ${calls}x`);
        }
      ],
      [
        'second step waits for its promise and attaches',
        async () => {
          await d.click('Start', 'Next');
          await d.expectStep('Panel');
          await d.expectPlaced('Panel', '#settings-panel', 'bottom');
          const calls = await d.page.evaluate(() => window.app.calls);
          if (calls !== 1) throw new Error(`openSettings called ${calls}x`);
        }
      ],
      [
        'third step waits for a late element and attaches',
        async () => {
          await d.click('Panel', 'Next');
          await d.expectStep('Live');
          await d.expectPlaced('Live', '#live-widget', 'bottom');
        }
      ],
      [
        'absent step is left out',
        async () => {
          await d.click('Live', 'Next');
          await d.expectStep('Bye');
          await d.expectPlaced('Bye', '#footer', 'bottom');
        }
      ],
      [
        'Done ends the tour',
        async () => {
          await d.click('Bye', 'Done');
          await d.expectNoStep();
        }
      ]
    ]
  },
  {
    id: 'events-persist',
    extensions: ['js', 'ts'],
    html: EVENTS_PAGE,
    prompt: `Add a tour for first-time visitors that starts on page load. Once somebody has finished or dismissed it, it must not start again on later visits, including after a reload. Store that in \`localStorage\`.

1. id \`menu\`, title "Menu", attached below \`#menu\`. It has no buttons. It moves on when the user clicks \`#menu\`.
2. id \`item\`, title "Item", attached below \`#menu-item\`, with a "Done" button.

Pressing Escape dismisses the tour.

Report to analytics with \`window.analytics.track(name, props)\`:
- each time a step is shown: \`track('tour_step', { id })\` with the step's id
- when the tour ends: \`track('tour_finished', { outcome })\`, with \`'completed'\` after "Done" and \`'dismissed'\` after Escape.`,
    check: (d) => {
      const expectCalls = async (expected) => {
        const calls = await d.page.evaluate(() => window.analytics.calls);
        if (JSON.stringify(calls) !== JSON.stringify(expected)) {
          throw new Error(`analytics calls: ${JSON.stringify(calls)}`);
        }
      };
      return [
        [
          'first step opens and is tracked',
          async () => {
            await d.expectStep('Menu');
            await d.expectStylesheet();
            await d.expectPlaced('Menu', '#menu', 'bottom');
            await expectCalls([['tour_step', { id: 'menu' }]]);
          }
        ],
        [
          'clicking the target advances',
          async () => {
            await d.page.locator('#menu').click();
            await d.expectStep('Item');
            await d.expectPlaced('Item', '#menu-item', 'bottom');
          }
        ],
        [
          'completion is reported',
          async () => {
            await d.click('Item', 'Done');
            await d.expectNoStep();
            await expectCalls([
              ['tour_step', { id: 'menu' }],
              ['tour_step', { id: 'item' }],
              ['tour_finished', { outcome: 'completed' }]
            ]);
          }
        ],
        [
          'does not restart after completing',
          async () => {
            await d.page.reload();
            await d.stayClosed();
          }
        ],
        [
          'dismissal is reported and remembered',
          async () => {
            await d.page.evaluate(() => localStorage.clear());
            await d.page.reload();
            await d.expectStep('Menu');
            await poll(
              () =>
                d.page.evaluate(
                  () =>
                    document.activeElement?.closest('.shepherd-element') !==
                    null
                ),
              'focus moved into the step'
            );
            await d.page.keyboard.press('Escape');
            await d.expectNoStep();
            await expectCalls([
              ['tour_step', { id: 'menu' }],
              ['tour_finished', { outcome: 'dismissed' }]
            ]);
            await d.page.reload();
            await d.stayClosed();
          }
        ]
      ];
    }
  },
  {
    id: 'react-strict',
    extensions: ['tsx', 'jsx'],
    html: REACT_PAGE,
    entry: (solution) => `
      import { StrictMode } from 'react';
      import { createRoot } from 'react-dom/client';
      import App from ${JSON.stringify(solution)};
      createRoot(document.getElementById('root')).render(
        <StrictMode><App /></StrictMode>
      );`,
    entryExt: 'jsx',
    prompt: `This is a React 19 app using the \`react-shepherd\` package, which is installed alongside \`shepherd.js\`. Write the \`App\` component as this module's default export. It is rendered into the page inside \`<React.StrictMode>\`.

\`App\` renders:
- \`<div id="a" style={{ position: 'absolute', left: 500, top: 100 }}>A</div>\`
- \`<div id="b" style={{ position: 'absolute', left: 500, top: 300 }}>B</div>\`
- \`<button id="replay">Replay tour</button>\`, which runs the tour from the beginning
- \`<button id="bump">Bump</button>\` and \`<span id="count">\`, a counter in React state that \`Bump\` increments

The tour starts by itself when the app first mounts. Step "Step A" is below \`#a\` with a "Next" button, and step "Step B" is below \`#b\` with a "Done" button that ends it.`,
    check: (d) => [
      [
        'one step opens on mount',
        async () => {
          await d.expectStep('Step A');
          await d.page.waitForTimeout(300);
          await d.expectStep('Step A');
          await d.expectStylesheet();
          await d.expectPlaced('Step A', '#a', 'bottom');
        }
      ],
      [
        'a re-render leaves the tour alone',
        async () => {
          await d.page.locator('#bump').click();
          await poll(
            async () => (await d.page.locator('#count').innerText()) === '1',
            'the counter updated'
          );
          await d.expectStep('Step A');
        }
      ],
      [
        'tour survives a re-render and finishes',
        async () => {
          await d.click('Step A', 'Next');
          await d.expectStep('Step B');
          await d.expectPlaced('Step B', '#b', 'bottom');
          await d.page.locator('#bump').click();
          await d.expectStep('Step B');
          await d.click('Step B', 'Done');
          await d.expectNoStep();
        }
      ],
      [
        'a re-render does not restart a finished tour',
        async () => {
          await d.page.locator('#bump').click();
          await d.stayClosed();
        }
      ],
      [
        'replay runs it again',
        async () => {
          await d.page.locator('#replay').click();
          await d.expectStep('Step A');
          await d.click('Step A', 'Next');
          await d.expectStep('Step B');
          await d.click('Step B', 'Done');
          await d.expectNoStep();
        }
      ]
    ]
  },
  {
    id: 'typed-json',
    extensions: ['ts'],
    html: JSON_PAGE,
    files: { '/tour.json': TOUR_JSON },
    typecheck: true,
    entry: (solution) => `
      import { buildTour } from ${JSON.stringify(solution)};
      const steps = await (await fetch('/tour.json')).json();
      window.tour = buildTour(steps);
      window.tour.start();`,
    entryExt: 'js',
    prompt: `Our CMS serves tours as JSON. Write a TypeScript module exporting this function, which must pass \`tsc --strict\`:

\`\`\`ts
export interface ProductStep {
  id: string;
  selector: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  title: string;
  /** Trusted HTML from the CMS. */
  body: string;
}

export function buildTour(steps: ProductStep[]): Tour;
\`\`\`

\`Tour\` is the type of a Shepherd tour. \`buildTour\` returns the tour, and the caller starts it. Each step attaches to its \`selector\` at its \`placement\`, and keeps its \`id\`. Every step except the first has a "Back" button. Every step except the last has a "Next" button. The last step has a "Done" button that ends the tour.`,
    check: (d) => [
      [
        'first step opens with its id and placement',
        async () => {
          await d.expectStep('Plans');
          await d.expectStylesheet();
          await d.expectPlaced('Plans', '#plans', 'bottom');
          await d.expectNoButton('Plans', 'Back');
          const id = await d.page.evaluate(
            () => window.tour.getCurrentStep().id
          );
          if (id !== 'plans') throw new Error(`step id is ${id}`);
        }
      ],
      [
        'body renders as HTML',
        async () => {
          await d.click('Plans', 'Next');
          await d.expectStep('Usage');
          await d.expectPlaced('Usage', '#usage', 'right');
          const bold = await d.step('Usage').locator('b').count();
          if (bold !== 1) throw new Error('body was not rendered as HTML');
        }
      ],
      [
        'Back returns',
        async () => {
          await d.click('Usage', 'Back');
          await d.expectStep('Plans');
          await d.click('Plans', 'Next');
          await d.expectStep('Usage');
        }
      ],
      [
        'last step has Done, which ends the tour',
        async () => {
          await d.click('Usage', 'Next');
          await d.expectStep('Billing');
          await d.expectPlaced('Billing', '#billing', 'top');
          await d.expectNoButton('Billing', 'Next');
          await d.click('Billing', 'Done');
          await d.expectNoStep();
        }
      ]
    ]
  },
  {
    id: 'script-tag',
    extensions: ['html'],
    prompt: `This site has no build step and no bundler. Write a complete HTML page containing \`<button id="buy" style="position:absolute;left:500px;top:100px">Buy</button>\` and a one step tour that starts on page load: title "Buy now", text "Checkout is one click.", below \`#buy\`, with a "Got it" button that ends the tour.

The \`shepherd.js\` package is served as is at \`/node_modules/shepherd.js/\`, so its files are at the same paths as on disk. The page has no other server support and no internet access.`,
    check: (d) => [
      ['step opens', () => d.expectStep('Buy now')],
      ['default styling applied', () => d.expectStylesheet()],
      ['step below target', () => d.expectPlaced('Buy now', '#buy', 'bottom')],
      [
        'Got it ends the tour',
        async () => {
          await d.click('Buy now', 'Got it');
          await d.expectNoStep();
        }
      ]
    ]
  }
];

export function promptFor(task) {
  const file = `${task.id}.${task.extensions[0]}`;
  const delivery =
    task.extensions[0] === 'html'
      ? `Write your answer to \`${file}\`.`
      : `Write your answer to \`${file}\`${
          task.extensions.length > 1
            ? ` (or \`${task.id}.${task.extensions[1]}\`)`
            : ''
        }. It is compiled by a standard bundler that handles JavaScript, TypeScript, JSX and CSS imports, and it loads as a module script in the page below. You cannot edit the page.`;
  const html = task.html
    ? `\n\nThe page:\n\n\`\`\`html\n${task.html}\n\`\`\``
    : '';
  return `You are working in a project that has the \`shepherd.js\` npm package installed in \`node_modules\`. Treat this as production code.

${task.prompt}

${delivery}${html}
`;
}
