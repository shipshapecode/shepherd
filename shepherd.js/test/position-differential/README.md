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

- **Shepherd's wiring.** `getPositionConfig` from `src/utils/floating-ui.ts`
  against the stock middleware it stands for, built by `stockOptions`. Each
  `POSITION_CONFIGS` entry is a `positionOptions` a consumer might pass:
  `offset` maps to stock `offset()` first, `padding` to the `padding` of
  `flip()`, `autoPlacement()` and `shift()`, and `flip: false` drops `flip()`.
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
and config. Every `positionOptions` config hits the same rows as `none`, because
the differences come from the page, not the options.

| Fixtures | Difference | Why it stays |
| --- | --- | --- |
| `bodySlightlyNarrow`, `bodyNarrowerThanHtml`, and the `scrollbarGutter`, `gutterHidden`, `gutterStable` fixtures in quirks mode | Stock treats a `<body>` up to 25px narrower than the root as a scrollbar gutter and pulls the right edge in. The engine does not. | No gutter exists there. A real gutter is handled, by the root's own width. |
| `scaledBorderedContainer` | Under a scaled, bordered offset parent, `auto` placements that tie can pick another side or alignment. | Stock adds that parent's border unscaled, so its overflow numbers are off by the border. Both results sit against the target and in view. |
| `staticFloatingInTd`, `svgArrowNested` | The engine's arrow assumes the step is its offset parent. | `.shepherd-arrow` is always a direct child of a positioned step. |

## Other checks

Each needs `pnpm build` first and exercises the published `dist`:

```sh
node test/position-differential/dist-position.mjs  # each positionOptions key, through property mangling
node test/position-differential/cross-origin.mjs   # a tour inside a cross-origin iframe
node test/position-differential/jsdom.mjs          # a tour in jsdom, without and with --visual
```
