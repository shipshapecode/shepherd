import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  arrow as floatingArrow,
  autoPlacement as floatingAutoPlacement,
  computePosition as floatingComputePosition,
  flip as floatingFlip,
  hide,
  limitShift,
  offset,
  shift as floatingShift,
  size
} from '@floating-ui/dom';
import {
  arrow,
  autoPlacement,
  autoUpdate,
  computePosition,
  flip,
  shift
} from '../../../src/utils/position.ts';

const PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end'
];
const VIEWPORTS = [
  { x: 0, y: 0, width: 1000, height: 700 },
  // Too small for the floating element on any side.
  { x: 50, y: 50, width: 200, height: 90 }
];
const FLOATING = { width: 300, height: 120 };
const REFERENCES = [
  { x: 440, y: 330, width: 120, height: 40 },
  { x: 0, y: 0, width: 120, height: 40 },
  { x: 880, y: 660, width: 120, height: 40 },
  { x: 996, y: 350, width: 8, height: 8 },
  { x: 5, y: 350, width: 4, height: 4 },
  { x: 100, y: 100, width: 700, height: 500 },
  // Scrolled out of view, where shifting must stop at the reference.
  { x: -600, y: 900, width: 120, height: 40 },
  { x: 1600, y: -300, width: 120, height: 40 }
];
const ARROW_PADDINGS = [0, 4, 40, 500];

/**
 * happy-dom has no layout, so geometry comes from a platform stub. Real
 * browsers are covered by the scorecard's parity goldens; this pins the
 * middleware logic against Floating UI's own for every placement.
 */
function stubPlatform(reference, rtl, viewport = VIEWPORTS[0]) {
  return {
    getElementRects: () => ({
      reference,
      floating: { x: 0, y: 0, ...FLOATING }
    }),
    getDimensions: () => ({ width: 16, height: 16 }),
    getClippingRect: () => viewport,
    getOffsetParent: () => window,
    getScale: () => ({ x: 1, y: 1 }),
    convertOffsetParentRelativeRectToViewportRelativeRect: ({ rect }) => rect,
    isElement: () => false,
    isRTL: () => rtl,
    getClientRects: () => []
  };
}

function elements() {
  const reference = document.createElement('div');
  const floating = document.createElement('div');
  const arrowElement = document.createElement('div');
  floating.append(arrowElement);
  // The engine reads the free space for the arrow from `clientWidth`.
  Object.defineProperty(floating, 'clientWidth', { value: FLOATING.width });
  Object.defineProperty(floating, 'clientHeight', { value: FLOATING.height });
  return { reference, floating, arrowElement };
}

const outcome = ({ x, y, placement, middlewareData: { arrow: data } }) => ({
  x,
  y,
  placement,
  arrowX: data?.x,
  arrowY: data?.y
});

describe('utils/position', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('computePosition()', () => {
    describe.each([false, true])('with rtl %s', (rtl) => {
      describe.each(VIEWPORTS)('in a $width x $height viewport', (viewport) => {
        it.each(REFERENCES)(
          'matches Floating UI with flip, shift, and arrow for $x,$y',
          async (reference) => {
            const { reference: ref, floating, arrowElement } = elements();
            const platform = stubPlatform(reference, rtl, viewport);

            for (const placement of PLACEMENTS) {
              for (const padding of ARROW_PADDINGS) {
                const ours = await computePosition(ref, floating, {
                  placement,
                  platform,
                  middleware: [
                    flip(),
                    shift(),
                    arrow({ element: arrowElement, padding })
                  ]
                });
                const theirs = await floatingComputePosition(ref, floating, {
                  placement,
                  platform,
                  middleware: [
                    floatingFlip(),
                    floatingShift({ limiter: limitShift(), crossAxis: true }),
                    floatingArrow({ element: arrowElement, padding })
                  ]
                });

                expect(outcome(ours), `${placement} ${padding}`).toEqual(
                  outcome(theirs)
                );
              }
            }
          }
        );

        it.each(REFERENCES)(
          'matches Floating UI with a consumer offset for $x,$y',
          async (reference) => {
            const { reference: ref, floating, arrowElement } = elements();
            const platform = stubPlatform(reference, rtl, viewport);
            const padding = 40;

            for (const placement of PLACEMENTS) {
              const distance = { mainAxis: 12, crossAxis: 7 };
              const ours = await computePosition(ref, floating, {
                placement,
                platform,
                middleware: [
                  flip(),
                  shift(),
                  offset(distance),
                  arrow({ element: arrowElement, padding })
                ]
              });
              const theirs = await floatingComputePosition(ref, floating, {
                placement,
                platform,
                middleware: [
                  floatingFlip(),
                  floatingShift({ limiter: limitShift(), crossAxis: true }),
                  offset(distance),
                  floatingArrow({ element: arrowElement, padding })
                ]
              });

              expect(outcome(ours), placement).toEqual(outcome(theirs));
            }
          }
        );
      });

      it.each(REFERENCES)(
        'matches Floating UI with autoPlacement for $x,$y',
        async (reference) => {
          const { reference: ref, floating } = elements();
          const platform = stubPlatform(reference, rtl);

          for (const alignment of [null, 'start', 'end']) {
            const ours = await computePosition(ref, floating, {
              platform,
              middleware: [autoPlacement({ alignment }), shift()]
            });
            const theirs = await floatingComputePosition(ref, floating, {
              platform,
              middleware: [
                floatingAutoPlacement({ crossAxis: true, alignment }),
                floatingShift({ limiter: limitShift(), crossAxis: true })
              ]
            });

            expect(outcome(ours), String(alignment)).toEqual(outcome(theirs));
          }
        }
      );
    });

    it('runs real Floating UI middleware unchanged', async () => {
      const { reference: ref, floating } = elements();
      const platform = stubPlatform(REFERENCES[1], false);
      const middleware = () => [
        offset({ mainAxis: 12, crossAxis: 3 }),
        floatingFlip({ padding: 8, fallbackAxisSideDirection: 'start' }),
        floatingShift({ padding: 24 }),
        size({ padding: 4, apply() {} }),
        hide()
      ];

      const ours = await computePosition(ref, floating, {
        placement: 'top',
        platform,
        middleware: middleware()
      });
      const theirs = await floatingComputePosition(ref, floating, {
        placement: 'top',
        platform,
        middleware: middleware()
      });

      expect(ours).toEqual(theirs);
    });

    it('skips falsy middleware entries', async () => {
      const { reference: ref, floating } = elements();
      const result = await computePosition(ref, floating, {
        placement: 'bottom',
        platform: stubPlatform(REFERENCES[0], false),
        middleware: [false, null, undefined]
      });

      expect(result.placement).toBe('bottom');
    });

    it('stops resetting a middleware that never settles', async () => {
      const { reference: ref, floating } = elements();
      const fn = vi.fn(() => ({ reset: true }));

      await computePosition(ref, floating, {
        platform: stubPlatform(REFERENCES[0], false),
        middleware: [{ name: 'restless', fn }]
      });

      expect(fn).toHaveBeenCalledTimes(51);
    });
  });

  describe('autoUpdate()', () => {
    function stubbedRects() {
      const { reference, floating } = elements();
      const rect = { x: 10, y: 20, width: 30, height: 40 };
      vi.spyOn(reference, 'getBoundingClientRect').mockImplementation(() => ({
        ...rect
      }));
      vi.spyOn(floating, 'getBoundingClientRect').mockImplementation(() => ({
        x: 0,
        y: 0,
        width: 1,
        height: 1
      }));
      return { reference, floating, rect };
    }

    const nextFrames = async (count) => {
      for (let i = 0; i < count; i++) {
        await new Promise((resolve) => requestAnimationFrame(resolve));
      }
    };

    it('updates once immediately, then only when a rect changes', async () => {
      const { reference, floating, rect } = stubbedRects();
      const update = vi.fn();

      const stop = autoUpdate(reference, floating, update);
      expect(update).toHaveBeenCalledTimes(1);

      await nextFrames(3);
      const settled = update.mock.calls.length;

      await nextFrames(3);
      expect(update).toHaveBeenCalledTimes(settled);

      rect.y = 200;
      await nextFrames(2);
      expect(update).toHaveBeenCalledTimes(settled + 1);

      stop();
    });

    it('wakes on a scroll anywhere in the document', async () => {
      const { reference, floating, rect } = stubbedRects();
      const scroller = document.createElement('div');
      document.body.append(scroller);
      const update = vi.fn();

      const stop = autoUpdate(reference, floating, update);
      await nextFrames(2);
      const settled = update.mock.calls.length;

      rect.y = 300;
      scroller.dispatchEvent(new Event('scroll'));
      expect(update).toHaveBeenCalledTimes(settled + 1);

      stop();
      scroller.remove();
    });

    it('stops checking once cleaned up', async () => {
      const { reference, floating, rect } = stubbedRects();
      const scroller = document.createElement('div');
      document.body.append(scroller);
      const update = vi.fn();

      const stop = autoUpdate(reference, floating, update);
      await nextFrames(2);
      stop();
      const settled = update.mock.calls.length;

      rect.y = 400;
      scroller.dispatchEvent(new Event('scroll'));
      await nextFrames(3);

      expect(update).toHaveBeenCalledTimes(settled);
      scroller.remove();
    });

    it('still positions once where requestAnimationFrame does not exist', () => {
      const { reference, floating } = stubbedRects();
      const update = vi.fn();
      const original = window.requestAnimationFrame;
      window.requestAnimationFrame = undefined;

      try {
        const stop = autoUpdate(reference, floating, update);
        expect(update).toHaveBeenCalledTimes(1);
        stop();
      } finally {
        window.requestAnimationFrame = original;
      }
    });
  });
});
