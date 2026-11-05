---
name: verify-tour-lifecycle
description: Exhaustively check Shepherd's tour and step lifecycle against every order of events up to a bound. Use when changing tour or step show, hide, start, cancel, complete, or destroy logic, beforeShowPromise, waitForElement, confirmCancel, or modal overlay setup and teardown in shepherd.js, or when asked to verify tour races or state.
---

# Verify the tour lifecycle

Ordinary tests check the event orders someone thought to write. This check replays **every** order of events up to 6 events, from a fresh tour, against the real `src/tour.ts` and `src/step.ts`, and checks the page after each event.

## What it promises

- **ScreenMatchesTour.** Once events settle, a running tour shows at most its current step's popup and one overlay, and an ended tour leaves no popup, overlay, or target marking. *Harm if broken: a popup for the wrong step, or a page left dimmed with no way to dismiss it.*
- **SingleEnding.** A run ends once, and a cancel only ends the run that confirmed it. *Harm if broken: `cancel` handlers run twice, or a late confirmation kills a tour the user restarted.*
- **NoThrow.** No lifecycle call rejects.

## Does your change touch it?

Run the check if you changed any of these. The check was last confirmed to describe them at the sync commit below.

| File | Covered code |
| --- | --- |
| `shepherd.js/src/tour.ts` | `start`, `next`, `back`, `show`, `_showStep`, `cancel`, `complete`, `_done`, `_setupActiveTour`, `setupModal`, `_updateStateBeforeShow` |
| `shepherd.js/src/step.ts` | `show`, `_show`, `hide`, `destroy`, `_setupElements`, `_teardownElements`, `_updateStepTargetOnHide` |
| `shepherd.js/src/utils/general.ts` | `waitForAttachToElement`, `resolveAttachToElement` |
| `shepherd.js/src/components/shepherd-modal.ts` | `hide`, `show`, `destroy`, `setupForStep` |

**Sync commit:** `29bfbe42f3223acde0263a3ccc761c93c70aa9e2`

To see what changed since then, run this from the repo root:

```sh
git log --oneline 29bfbe42f3223acde0263a3ccc761c93c70aa9e2..HEAD -- shepherd.js/src/tour.ts shepherd.js/src/step.ts shepherd.js/src/utils/general.ts shepherd.js/src/components/shepherd-modal.ts
```

Move the sync commit forward only after you confirm the scenarios and this table still describe the code at the new commit. A passing run alone does not confirm that.

## Run it

From `shepherd.js/`, using the binary directly because `pnpm exec` triggers a full package build:

```sh
./node_modules/.bin/vitest run --config test/verify/vitest.config.mjs   # about 5 seconds
node test/verify/run-mutants.mjs                                        # about 3 minutes
```

Vitest is pinned by the repo's lockfile. `pnpm test:unit` and CI do not run this check, because the filename is `*.verify.js`.

Run the mutants too when you change the check or the guards they remove. Each one removes a guard in memory, leaving the files on disk alone, and every one must print `caught`. `STALE` means the source text it targets has moved, so update `test/verify/mutants.mjs`. `SURVIVED` means the check has gone blind to that guard.

## Read the result

A pass means the findings are **exactly** those recorded in `test/verify/baseline.json`, which is empty at the sync commit. Check that file before treating a pass as "no findings". The run prints every finding and one shortest trace for it, such as:

```
[beforeShowPromise / ScreenMatchesTour: popup "gated" visible after the tour ended] 34 trace(s)
  e.g. tour.start() > tour.next() > tour.cancel() > resolve-beforeShowPromise#0(run 1)
```

Read the trace as a story: the tour starts, the user moves to the gated step, the tour is cancelled, and then the step's `beforeShowPromise` resolves.

| What failed | What it means | What to do |
| --- | --- | --- |
| A test under `harness reaches the behaviour it claims to check` | Your change broke the harness or basic behaviour | Fix this first. The exhaustive result can't be trusted until it passes. |
| `matches the recorded findings`, with a new key or a higher count | Most likely a regression | Follow the trace in the code. If the trace can happen in a real app, it is a bug in your change. |
| `matches the recorded findings`, with a key gone or a lower count | A finding may be fixed, or a scenario may no longer reach it | Replay the old trace to see which. |

It's a modeling error, not a product bug, only if the trace can't happen in a real app, or if the harness's fake promise or timer behaves differently from the real one. Say which and why, then fix the harness. Never change a property to make a real trace pass.

Fixing a finding lets exploration continue past where it used to stop, so other counts can rise and new keys can appear. Read each one before accepting it.

### Update the baseline

Only after you've read every changed key and decided the new behaviour is right:

```sh
VERIFY_RECORD=1 ./node_modules/.bin/vitest run --config test/verify/vitest.config.mjs
```

Recording to make a regression pass hides the bug. Put the reason for any change to `baseline.json` in the commit message.

To look deeper once, run this without recording. It takes about 90 seconds and needs the larger heap, because the run exhausts Node's default limit. The baseline has no entry for depth 7, so any finding fails the run. Depth 7 found nothing at the sync commit.

```sh
NODE_OPTIONS=--max-old-space-size=8192 VERIFY_DEPTH=7 ./node_modules/.bin/vitest run --config test/verify/vitest.config.mjs
```

## Guards this check protects

There are no open findings at the sync commit, so `baseline.json` is empty and any finding is new. These guards closed earlier findings:

- **`_showGeneration`** in `Tour` and `Step.show`. A pending `waitForElement` or `beforeShowPromise` does nothing if a newer `show()` happened or the tour ended. Without it, `tour.start() > tour.next() > tour.cancel() > resolve` brings back the ended tour's popup and dimmed overlay.
- **Restart teardown** in `Tour.start` and `Tour.setupModal`. Starting a running tour hides the current step and destroys the old modal. Without it, `tour.start() > tour.start() > tour.cancel()` leaves the page dimmed.
- **`_runGeneration`** in `Tour.cancel`. A `confirmCancel` answer does nothing if the run that asked has ended or restarted. Without it, `tour.start() > tour.cancel() > tour.complete() > tour.start() > answer-yes` ends the new run.

## What this does not cover

- **Bound.** Orders of at most 6 events, in tours of 2 or 3 steps with one asynchronous step. A longer sequence or a larger tour is not checked.
- **Events left out.** `tour.show(id)`, `tour.hide()`, `removeStep`, `updateStepOptions`, `showOn`, `skipMissingElement`, `advanceOn`, keyboard handling, and direct `step.*` calls.
- **One tour at a time.** A second `Tour` started during the first is not modeled.
- **Timing granularity.** Promise callbacks settle fully between events, so each event's follow-up work is treated as one step. Two promises resolving in the same tick are not interleaved with each other's callbacks.
- **Environment.** The DOM is happy-dom, with timers and `requestAnimationFrame` faked. This checks lifecycle logic only, not positioning, scrolling, CSS, focus restoration, or real browser behaviour.
- **User handlers.** Event handlers and step callbacks that themselves call tour methods are not modeled.

## Files

All of these are in `shepherd.js/test/verify/`:

- `tour-lifecycle.verify.js` holds the scenarios, the properties (`checkScreen`, and the listeners in `newWorld`), and the explorer.
- `baseline.json` holds the recorded finding counts.
- `mutants.mjs` and `run-mutants.mjs` hold and run the broken variants.
- `vitest.config.mjs` holds the config and applies the mutants.

To cover new behaviour, add a scenario to `SCENARIOS`, add a mutant that proves it can fail, and add to the coverage table above.
