/**
 * Bounded exhaustive check of the Tour/Step lifecycle.
 *
 * For each scenario this replays every order of events up to `DEPTH`, from a
 * fresh tour, against the real `src/tour.ts` and `src/step.ts`. After each event
 * it lets promises settle and checks the properties in `checkScreen` and the
 * event listeners in `newWorld`. See .claude/skills/verify-tour-lifecycle/SKILL.md
 * for how to read the results.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { setImmediate } from 'node:timers';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { Shepherd, Tour } from '../../src/tour.ts';

const DEPTH = Number(process.env.VERIFY_DEPTH ?? 6);
const WAIT_MS = 10;
const report = (line) => process.stderr.write(`${line}\n`);
const BASELINE_PATH = resolve(import.meta.dirname, 'baseline.json');

const plainStep = (id) => ({ id, text: id });

const settle = (world, pending, index, kind) => ({
  name: `resolve-${kind}#${index}(run ${pending.run})`,
  run: () => {
    world[kind === 'beforeShowPromise' ? 'gates' : 'confirms'].splice(index, 1);
    pending.resolve(true);
  }
});

const SCENARIOS = [
  {
    // src/step.ts Step.show: waits on `beforeShowPromise`, then calls `_show`.
    name: 'beforeShowPromise',
    options: (world) => ({
      useModalOverlay: true,
      steps: [
        plainStep('first'),
        {
          id: 'gated',
          text: 'gated',
          beforeShowPromise: () =>
            new Promise((resolve) => {
              world.gates.push({ resolve, run: world.run });
            })
        },
        plainStep('last')
      ]
    }),
    actions: (world) =>
      world.gates.map((pending, i) =>
        settle(world, pending, i, 'beforeShowPromise')
      )
  },
  {
    // src/tour.ts Tour.show and src/utils/general.ts waitForAttachToElement.
    name: 'waitForElement',
    options: () => ({
      useModalOverlay: true,
      steps: [
        plainStep('first'),
        {
          id: 'waiting',
          text: 'waiting',
          attachTo: { element: '#late-target', on: 'bottom' },
          waitForElement: WAIT_MS
        },
        plainStep('last')
      ]
    }),
    actions: () => {
      const actions = [
        { name: 'timer-elapses', run: () => vi.advanceTimersByTime(WAIT_MS) }
      ];
      if (!document.getElementById('late-target')) {
        actions.push({
          name: 'target-appears',
          run: () => {
            const target = document.createElement('div');
            target.id = 'late-target';
            document.body.append(target);
          }
        });
      }
      return actions;
    }
  },
  {
    // src/tour.ts Tour.cancel: waits on the `confirmCancel` function.
    name: 'confirmCancel',
    confirms: true,
    options: (world) => ({
      useModalOverlay: true,
      confirmCancel: () =>
        new Promise((resolve) => {
          world.confirms.push({ resolve, run: world.run });
        }),
      steps: [plainStep('first'), plainStep('last')]
    }),
    actions: (world) =>
      world.confirms.flatMap((pending, i) => [
        {
          name: `answer-yes#${i}(run ${pending.run})`,
          run: () => {
            world.confirms.splice(i, 1);
            world.cancelAllowed = pending.run === world.run;
            pending.resolve(true);
          }
        },
        {
          name: `answer-no#${i}(run ${pending.run})`,
          run: () => {
            world.confirms.splice(i, 1);
            pending.resolve(false);
          }
        }
      ])
  },
  {
    // The same wait on the first step, so the tour has no popup right after start.
    name: 'beforeShowPromise-first',
    options: (world) => ({
      useModalOverlay: true,
      steps: [
        {
          id: 'gated',
          text: 'gated',
          beforeShowPromise: () =>
            new Promise((resolve) => {
              world.gates.push({ resolve, run: world.run });
            })
        },
        plainStep('last')
      ]
    }),
    actions: (world) =>
      world.gates.map((pending, i) =>
        settle(world, pending, i, 'beforeShowPromise')
      )
  }
];

function newWorld(scenario) {
  const world = {
    run: 0,
    gates: [],
    confirms: [],
    cancelAllowed: false,
    violations: []
  };

  const tour = new Tour(scenario.options(world));
  world.tour = tour;

  tour.on('active', () => {
    world.run += 1;
  });

  // `_done` emits the terminal event before it clears `activeTour`, so a running
  // tour is still active here.
  for (const event of ['cancel', 'complete']) {
    tour.on(event, () => {
      if (!tour.isActive()) {
        world.violations.push(
          `SingleEnding: "${event}" fired on a tour that had already ended`
        );
      }
      if (event === 'cancel' && scenario.confirms && !world.cancelAllowed) {
        world.violations.push(
          'SingleEnding: "cancel" ended a run that did not confirm it'
        );
      }
    });
  }

  return world;
}

/** What must be true of the page whenever events have settled. */
function checkScreen(world) {
  const { tour } = world;
  const popups = [...document.querySelectorAll('.shepherd-element')].filter(
    (popup) => !popup.hidden
  );
  const overlays = document.querySelectorAll(
    '.shepherd-modal-overlay-container'
  );
  const marked = [
    ...document.querySelectorAll('.shepherd-target, .shepherd-enabled')
  ].filter((el) => !el.classList.contains('shepherd-element'));

  if (!tour.isActive()) {
    if (popups.length) {
      world.violations.push(
        `ScreenMatchesTour: popup "${popups[0]?.dataset['shepherdStepId']}" visible after the tour ended`
      );
    }
    if (overlays.length) {
      world.violations.push(
        'ScreenMatchesTour: modal overlay still on the page after the tour ended'
      );
    }
    if (marked.length) {
      world.violations.push(
        'ScreenMatchesTour: page element still marked as a target after the tour ended'
      );
    }
    return;
  }

  const stray = popups.filter((popup) => popup !== tour.getCurrentStep()?.el);
  if (stray.length) {
    world.violations.push(
      `ScreenMatchesTour: popup "${stray[0]?.dataset['shepherdStepId']}" visible but current step is "${tour.getCurrentStep()?.id}"`
    );
  }
  if (overlays.length !== 1) {
    world.violations.push(
      `ScreenMatchesTour: ${overlays.length} modal overlays on the page`
    );
  }
}

function enabledActions(scenario, world) {
  const { tour } = world;
  const lifecycle = [{ name: 'tour.start()', run: () => tour.start() }];

  if (tour.isActive()) {
    lifecycle.push(
      { name: 'tour.next()', run: () => tour.next() },
      { name: 'tour.back()', run: () => tour.back() },
      { name: 'tour.cancel()', run: () => tour.cancel() },
      { name: 'tour.complete()', run: () => tour.complete() }
    );
  }

  return [...lifecycle, ...scenario.actions(world)];
}

/** Drains promise callbacks and DOM observers. Timers only move on `timer-elapses`. */
const quiesce = () => new Promise((resolve) => setImmediate(resolve));

async function resetPage() {
  // Fire outstanding `waitForElement` timeouts, which disconnects their
  // MutationObservers, and let their callbacks finish before the next tour
  // exists, so one replay can't affect another.
  vi.advanceTimersByTime(WAIT_MS);
  Shepherd.activeTour = null;
  await quiesce();
  vi.clearAllTimers();
  document.body.innerHTML = '';
  document.body.className = '';
}

/** Replays `trace` on a fresh tour, returning the world and the names enabled next. */
async function replay(scenario, trace) {
  await resetPage();
  const world = newWorld(scenario);

  for (const name of trace) {
    const action = enabledActions(scenario, world).find((a) => a.name === name);
    if (!action) {
      throw new Error(`Replay diverged at "${name}" in ${trace.join(' > ')}`);
    }
    Promise.resolve(action.run()).catch((error) => {
      world.violations.push(`NoThrow: ${name} rejected with ${error}`);
    });
    await quiesce();
    world.cancelAllowed = false;
    checkScreen(world);
    if (world.violations.length) {
      break;
    }
  }

  return world;
}

async function explore(scenario) {
  const findings = new Map();
  let states = 0;

  const visit = async (trace) => {
    const world = await replay(scenario, trace);
    states += 1;

    if (world.violations.length) {
      // Stop at the first violation, so every trace counted is a shortest one
      // along its own path.
      for (const violation of new Set(world.violations)) {
        const key = `${scenario.name} / ${violation}`;
        const found = findings.get(key);
        if (!found) {
          findings.set(key, { key, count: 1, trace });
        } else {
          found.count += 1;
          if (trace.length < found.trace.length) {
            found.trace = trace;
          }
        }
      }
      return;
    }

    if (trace.length === DEPTH) {
      return;
    }

    for (const { name } of enabledActions(scenario, world)) {
      await visit([...trace, name]);
    }
  };

  await visit([]);
  return { findings: [...findings.values()], states };
}

beforeAll(() => {
  vi.useFakeTimers({
    toFake: [
      'setTimeout',
      'clearTimeout',
      'setInterval',
      'clearInterval',
      'requestAnimationFrame',
      'cancelAnimationFrame'
    ]
  });
});

afterAll(() => {
  vi.useRealTimers();
});

describe('harness reaches the behaviour it claims to check', () => {
  const screenAfter = async (scenario, trace) => {
    const world = await replay(scenario, trace);
    return {
      world,
      popups: [...document.querySelectorAll('.shepherd-element')].filter(
        (popup) => !popup.hidden
      )
    };
  };

  it('shows a gated step only once its promise resolves', async () => {
    const [scenario] = SCENARIOS;
    const before = await screenAfter(scenario, ['tour.start()', 'tour.next()']);
    expect(before.popups).toHaveLength(0);
    const after = await screenAfter(scenario, [
      'tour.start()',
      'tour.next()',
      'resolve-beforeShowPromise#0(run 1)'
    ]);
    expect(after.popups[0]?.dataset['shepherdStepId']).toBe('gated');
  });

  it('shows a waiting step when its target appears, and when the timer elapses', async () => {
    const scenario = SCENARIOS[1];
    const before = await screenAfter(scenario, ['tour.start()', 'tour.next()']);
    expect(before.popups).toHaveLength(0);
    for (const event of ['target-appears', 'timer-elapses']) {
      const after = await screenAfter(scenario, [
        'tour.start()',
        'tour.next()',
        event
      ]);
      expect(after.popups[0]?.dataset['shepherdStepId']).toBe('waiting');
    }
  });

  it('keeps a pending wait from one replay out of the next', async () => {
    const scenario = SCENARIOS[1];
    const trace = ['tour.start()'];
    const summarize = async () => {
      const { world, popups } = await screenAfter(scenario, trace);
      await quiesce();
      return {
        violations: world.violations,
        popups: popups.map((popup) => popup.dataset['shepherdStepId']),
        visible: [...document.querySelectorAll('.shepherd-element')].filter(
          (popup) => !popup.hidden
        ).length
      };
    };

    const alone = await summarize();
    await replay(scenario, ['tour.start()', 'tour.next()']);
    expect(await summarize()).toEqual(alone);
  });

  it('ends the tour on a confirmed cancel and keeps it on a refused one', async () => {
    const scenario = SCENARIOS[2];
    const yes = await screenAfter(scenario, [
      'tour.start()',
      'tour.cancel()',
      'answer-yes#0(run 1)'
    ]);
    expect(yes.world.tour.isActive()).toBe(false);
    expect(yes.popups).toHaveLength(0);
    const no = await screenAfter(scenario, [
      'tour.start()',
      'tour.cancel()',
      'answer-no#0(run 1)'
    ]);
    expect(no.world.tour.isActive()).toBe(true);
    expect(no.popups).toHaveLength(1);
  });
});

describe(`every order of events up to depth ${DEPTH}`, () => {
  it('matches the recorded findings', async () => {
    const all = [];
    let states = 0;

    for (const scenario of SCENARIOS) {
      const result = await explore(scenario);
      all.push(...result.findings);
      states += result.states;
    }

    all.sort((a, b) => a.key.localeCompare(b.key));
    const counts = Object.fromEntries(all.map((f) => [f.key, f.count]));

    report(`Explored ${states} event orders at depth ${DEPTH}.`);
    report(all.length ? `${all.length} finding group(s):` : 'No findings.');
    for (const finding of all) {
      report(
        `\n[${finding.key}] ${finding.count} trace(s)\n  e.g. ${finding.trace.join(' > ')}`
      );
    }

    if (process.env.VERIFY_RECORD) {
      writeFileSync(
        BASELINE_PATH,
        `${JSON.stringify({ [DEPTH]: counts }, null, 2)}\n`
      );
      return;
    }

    const baseline = JSON.parse(readFileSync(BASELINE_PATH, 'utf8'));
    expect(counts).toEqual(baseline[DEPTH] ?? {});
  });
});
