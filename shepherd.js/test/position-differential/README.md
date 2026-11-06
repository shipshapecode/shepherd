# Position differential

Shepherd has its own positioning engine, `src/utils/position.ts`, which replaced
`@floating-ui/dom`. Nothing else in the repo holds the engine to stock behavior:
the scorecard's goldens are frozen and cover 197 cases in one page shape, and unit
tests run with no layout. This suite positions the same DOM with both, in real
Chromium, Firefox and WebKit, and fails on a difference that is not recorded.

```sh
pnpm test:position
```

It takes about three minutes and needs no build. It reads `src/`, not `dist/`.

## What it covers

Every fixture in `fixtures.js` runs in standards and quirks mode, under both
`strategy` values:

- **Shepherd's wiring.** `getFloatingUIOptions` from `src/utils/floating-ui.ts`
  against the options it used to build for stock. Each `USER_CONFIGS` entry adds
  what a consumer might pass in `floatingUIOptions`: stock middleware, boundaries,
  a `platform` spread from stock, and a `platform` whose methods are all async.
- **Stock middleware alone.** `RAW_CONFIGS` runs only stock middleware through the
  engine's `computePosition`, and compares all of `middlewareData`.
- **The tracker.** `autoUpdate` must react to a window or ancestor scroll, a resize
  of either element, a layout shift, a transform, and a shift after settling, and
  must do nothing while idle or after cleanup.

## Reading a failure

A failure names the browser, mode, fixture and config, with the first case that
differs and both results. Most likely the engine regressed, so follow that case.
`--browser`, `--fixture` and `--config` narrow a run, and `--json` saves all of it.

Only after you have read every new key and decided it is right:

```sh
node test/position-differential/run.mjs --update-known
```

## Known differences

`known-differences.json` records how many cases differ per browser, mode, fixture
and config. With no `floatingUIOptions`, a step can only reach the first row, the
second row, and the gutter fixtures in the last row. The rest need a consumer's own
boundary, or a DOM shape Shepherd does not build.

| Fixtures or configs | Difference | Why it stays |
| --- | --- | --- |
| `bodySlightlyNarrow`, `bodyNarrowerThanHtml` | Stock treats a `<body>` up to 25px narrower than the root as a scrollbar gutter and pulls the right edge in. The engine does not. | No gutter exists there. A real gutter is handled, by the root's own width. |
| `scaledBorderedContainer` | Under a scaled, bordered offset parent, `auto` placements that tie can pick another side or alignment. | Stock adds that parent's border unscaled, so its overflow numbers are off by the border. Both results sit against the target and in view. |
| `staticFloatingInTd`, `svgArrowNested` | The engine's arrow assumes the step is its offset parent. | `.shepherd-arrow` is always a direct child of a positioned step. A consumer's own `arrow()` is stock's. |
| `rootLayout` config | The engine treats `rootBoundary: 'layoutViewport'` as `'viewport'`. | They differ only while pinch-zoomed, or in Firefox quirks mode and iframes. |
| `rootRect`, `boundaryElement`, `boundaryRect`, `options` under `html*` and `gutter*Both` fixtures | A consumer's explicit `boundary` or `rootBoundary` is off by the root's left offset. | Needs both a custom boundary and a root offset by a margin or a left gutter. |
| `hideRef`, `hideEscaped`, `size`, `allReal` under `bodyOverflowOwnScroller`, `htmlMarginOverflowParent` | Stock `hide` and `size` report other offsets. Position and placement match. | Same root offset, or stock's body-width gutter, in numbers only those middleware read. |
| `scrolledXY`, `rtlOverflowX`, and gutter fixtures in quirks mode | Custom boundaries, or the gutter, against `<body>` in quirks mode. | Quirks mode with horizontal scrolling or `scrollbar-gutter`. |

## Other checks

Each needs `pnpm build` first and exercises the published `dist`:

```sh
node test/position-differential/dist-platform.mjs  # stock platform and middleware, through property mangling
node test/position-differential/cross-origin.mjs   # a tour inside a cross-origin iframe
node test/position-differential/jsdom.mjs          # a tour in jsdom, without and with --visual
```
