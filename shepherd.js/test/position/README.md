# Position checks in real browsers

Shepherd positions steps with its own engine, `src/utils/position.ts`. Unit tests
run in happy-dom, which has no layout, so these scripts drive Chromium, Firefox
and WebKit through Playwright.

```sh
pnpm test:position
```

`tracker.mjs` checks that `autoUpdate` reacts to a window or ancestor scroll, a
resize of either element, a layout shift, a transform, and a shift after
settling, and that it does nothing while idle or after cleanup. It reads `src/`
and needs no build. `--browser` narrows a run.

## Other checks

Each needs `pnpm build` first and exercises the published `dist`:

```sh
node test/position/dist-position.mjs  # each positionOptions key, through property mangling
node test/position/cross-origin.mjs   # a tour inside a cross-origin iframe
node test/position/jsdom.mjs          # a tour in jsdom, without and with --visual
```

## Where placement is checked

- `test/unit/utils/position.spec.js` compares the engine with stock Floating UI's
  results for the same geometry and middleware, stored in `position.stock.json`.
- The scorecard's parity goldens hold 197 placements per browser, captured from
  the last Floating UI build of Shepherd.
