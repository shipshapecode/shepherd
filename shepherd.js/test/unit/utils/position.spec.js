import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  arrow as floatingArrow,
  autoPlacement as floatingAutoPlacement,
  computePosition as floatingComputePosition,
  flip as floatingFlip,
  limitShift,
  offset as floatingOffset,
  shift as floatingShift
} from '@floating-ui/dom';
import {
  arrow,
  autoPlacement,
  autoUpdate,
  flip,
  measure,
  offset,
  place,
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
 * happy-dom has no layout, so the engine's math runs on given measurements and
 * stock Floating UI on a platform returning the same ones. Real browsers are
 * covered by the scorecard's parity goldens and `pnpm test:position`.
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

const measurements = (floating, reference, rtl, viewport = VIEWPORTS[0]) => ({
  rects: { reference, floating: { x: 0, y: 0, ...FLOATING } },
  clip: viewport,
  origin: { x: 0, y: 0, scale: { x: 1, y: 1 } },
  rtl,
  floating
});

function elements() {
  const reference = document.createElement('div');
  const floating = document.createElement('div');
  const arrowElement = document.createElement('div');
  floating.append(arrowElement);
  // The engine reads the free space for the arrow from `clientWidth`.
  Object.defineProperty(floating, 'clientWidth', { value: FLOATING.width });
  Object.defineProperty(floating, 'clientHeight', { value: FLOATING.height });
  arrowElement.style.cssText = 'width: 16px; height: 16px';
  Object.defineProperty(arrowElement, 'offsetWidth', { value: 16 });
  Object.defineProperty(arrowElement, 'offsetHeight', { value: 16 });
  return { reference, floating, arrowElement };
}

const outcome = ({ x, y, placement, middlewareData: { arrow: data } }) => ({
  x,
  y,
  placement,
  arrowX: data?.x,
  arrowY: data?.y
});

/** Both engines, given the same geometry, with each side's own middleware. */
async function bothWays({ reference, rtl, viewport, placement, ours, theirs }) {
  const { reference: ref, floating, arrowElement } = elements();
  const engine = place(measurements(floating, reference, rtl, viewport), {
    placement: placement ?? 'bottom',
    strategy: 'absolute',
    middleware: ours(arrowElement)
  });
  const stock = await floatingComputePosition(ref, floating, {
    placement,
    platform: stubPlatform(reference, rtl, viewport),
    middleware: theirs(arrowElement)
  });
  return [outcome(engine), outcome(stock)];
}

const stockShift = (options) =>
  floatingShift({ limiter: limitShift(), crossAxis: true, ...options });

describe('utils/position', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('place()', () => {
    describe.each([false, true])('with rtl %s', (rtl) => {
      describe.each(VIEWPORTS)('in a $width x $height viewport', (viewport) => {
        it.each(REFERENCES)(
          'matches Floating UI with flip, shift, and arrow for $x,$y',
          async (reference) => {
            for (const placement of PLACEMENTS) {
              for (const padding of ARROW_PADDINGS) {
                const [ours, theirs] = await bothWays({
                  reference,
                  rtl,
                  viewport,
                  placement,
                  ours: (element) => [flip(), shift(), arrow(element, padding)],
                  theirs: (element) => [
                    floatingFlip(),
                    stockShift(),
                    floatingArrow({ element, padding })
                  ]
                });
                expect(ours, `${placement} ${padding}`).toEqual(theirs);
              }
            }
          }
        );

        it.each(REFERENCES)(
          'matches Floating UI with offset first for $x,$y',
          async (reference) => {
            for (const placement of PLACEMENTS) {
              for (const distance of [12, { mainAxis: 12, crossAxis: 7 }]) {
                const [ours, theirs] = await bothWays({
                  reference,
                  rtl,
                  viewport,
                  placement,
                  ours: (element) => [
                    offset(distance),
                    flip(),
                    shift(),
                    arrow(element, 40)
                  ],
                  theirs: (element) => [
                    floatingOffset(distance),
                    floatingFlip(),
                    stockShift(),
                    floatingArrow({ element, padding: 40 })
                  ]
                });
                expect(
                  ours,
                  `${placement} ${JSON.stringify(distance)}`
                ).toEqual(theirs);
              }
            }
          }
        );

        it.each(REFERENCES)(
          'matches Floating UI with padding for $x,$y',
          async (reference) => {
            for (const placement of PLACEMENTS) {
              const [ours, theirs] = await bothWays({
                reference,
                rtl,
                viewport,
                placement,
                ours: (element) => [flip(24), shift(24), arrow(element, 4)],
                theirs: (element) => [
                  floatingFlip({ padding: 24 }),
                  stockShift({ padding: 24 }),
                  floatingArrow({ element, padding: 4 })
                ]
              });
              expect(ours, placement).toEqual(theirs);
            }
          }
        );

        it.each(REFERENCES)(
          'matches Floating UI without flip for $x,$y',
          async (reference) => {
            for (const placement of PLACEMENTS) {
              const [ours, theirs] = await bothWays({
                reference,
                rtl,
                viewport,
                placement,
                ours: (element) => [shift(), arrow(element, 4)],
                theirs: (element) => [
                  stockShift(),
                  floatingArrow({ element, padding: 4 })
                ]
              });
              expect(ours, placement).toEqual(theirs);
            }
          }
        );
      });

      it.each(REFERENCES)(
        'matches Floating UI with autoPlacement for $x,$y',
        async (reference) => {
          for (const alignment of [undefined, 'start', 'end']) {
            for (const padding of [undefined, 24]) {
              const [ours, theirs] = await bothWays({
                reference,
                rtl,
                ours: () => [autoPlacement(alignment, padding), shift(padding)],
                theirs: () => [
                  floatingAutoPlacement({
                    crossAxis: true,
                    alignment,
                    padding
                  }),
                  stockShift({ padding })
                ]
              });
              expect(ours, `${alignment} ${padding}`).toEqual(theirs);
            }
          }
        }
      );
    });

    it('stops resetting a middleware that never settles', () => {
      const { floating } = elements();
      const fn = vi.fn(() => ({ reset: true }));

      place(measurements(floating, REFERENCES[0], false), {
        placement: 'bottom',
        strategy: 'absolute',
        middleware: [{ name: 'restless', fn }]
      });

      expect(fn).toHaveBeenCalledTimes(51);
    });
  });

  describe('measure()', () => {
    it('measures a modal dialog against the viewport where :popover-open is not supported', () => {
      const { reference, floating } = elements();
      const container = document.createElement('div');
      container.style.transform = 'translateX(10px)';
      container.append(floating);
      document.body.append(container, reference);
      vi.spyOn(container, 'getBoundingClientRect').mockReturnValue({
        x: 100,
        y: 100,
        width: 500,
        height: 500
      });
      vi.spyOn(reference, 'getBoundingClientRect').mockReturnValue({
        x: 300,
        y: 200,
        width: 10,
        height: 10
      });
      const inContainer = measure(reference, floating, 'absolute');
      vi.spyOn(floating, 'matches').mockImplementation((selector) => {
        if (selector.includes(':popover-open')) {
          throw new DOMException('Unknown selector', 'SyntaxError');
        }
        return selector === ':modal';
      });
      const asModal = measure(reference, floating, 'absolute');
      container.remove();
      reference.remove();

      expect(inContainer.rects.reference).toMatchObject({ x: 200, y: 100 });
      expect(asModal.rects.reference).toMatchObject({ x: 300, y: 200 });
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

    it('updates once immediately, then only when a rect changes', () => {
      const { reference, floating, rect } = stubbedRects();
      const update = vi.fn();

      const stop = autoUpdate(reference, floating, update);
      expect(update).toHaveBeenCalledTimes(1);

      window.dispatchEvent(new Event('resize'));
      const settled = update.mock.calls.length;
      window.dispatchEvent(new Event('resize'));
      expect(update).toHaveBeenCalledTimes(settled);

      rect.y = 200;
      window.dispatchEvent(new Event('resize'));
      expect(update).toHaveBeenCalledTimes(settled + 1);

      stop();
    });

    it('follows a layout shift that fires no event', () => {
      const observers = [];
      vi.stubGlobal(
        'ResizeObserver',
        class {
          constructor(callback) {
            observers.push(callback);
          }
          observe() {}
          disconnect() {}
        }
      );
      const { reference, floating, rect } = stubbedRects();
      const update = vi.fn();

      const stop = autoUpdate(reference, floating, update);
      observers.forEach((notify) => notify([]));
      const settled = update.mock.calls.length;

      rect.width = 300;
      observers.forEach((notify) => notify([]));
      expect(update).toHaveBeenCalledTimes(settled + 1);

      stop();
      vi.unstubAllGlobals();
    });

    it('updates when only the visual viewport gets shorter', () => {
      const viewport = Object.assign(new EventTarget(), {
        offsetLeft: 0,
        offsetTop: 0,
        width: 1024,
        height: 768
      });
      Object.defineProperty(window, 'visualViewport', {
        configurable: true,
        value: viewport
      });
      const { reference, floating } = stubbedRects();
      const update = vi.fn();

      const stop = autoUpdate(reference, floating, update);
      viewport.dispatchEvent(new Event('resize'));
      const settled = update.mock.calls.length;

      viewport.height = 400;
      viewport.dispatchEvent(new Event('resize'));
      expect(update).toHaveBeenCalledTimes(settled + 1);

      stop();
      delete window.visualViewport;
    });

    it('leaves no observer behind when the step leaves the page mid-check', () => {
      const observers = [];
      vi.stubGlobal(
        'IntersectionObserver',
        class {
          constructor(callback) {
            this.callback = callback;
            this.live = true;
            observers.push(this);
          }
          observe() {}
          disconnect() {
            this.live = false;
          }
        }
      );
      const { reference, floating, rect } = stubbedRects();
      document.body.append(floating);

      autoUpdate(reference, floating, () => {});
      floating.remove();
      rect.y = 400;
      observers.at(-1).callback([{ intersectionRatio: 1 }]);

      expect(observers.filter((observer) => observer.live)).toEqual([]);
      vi.unstubAllGlobals();
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

    it('wakes on a scroll in a framed target document', async () => {
      // A stand-in for a framed element, which neither observer accepts.
      vi.stubGlobal('ResizeObserver', undefined);
      vi.stubGlobal('IntersectionObserver', undefined);
      const { floating, rect } = stubbedRects();
      const targetWindow = new EventTarget();
      const reference = {
        ownerDocument: { defaultView: targetWindow },
        getBoundingClientRect: () => ({ ...rect })
      };
      const update = vi.fn();

      const stop = autoUpdate(reference, floating, update);
      await nextFrames(2);
      const settled = update.mock.calls.length;

      rect.y = 500;
      targetWindow.dispatchEvent(new Event('scroll'));
      expect(update).toHaveBeenCalledTimes(settled + 1);

      stop();
      rect.y = 600;
      targetWindow.dispatchEvent(new Event('scroll'));
      expect(update).toHaveBeenCalledTimes(settled + 1);
      vi.unstubAllGlobals();
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

    it('stops on its own once the element leaves the page', async () => {
      const { reference, floating, rect } = stubbedRects();
      document.body.append(floating);
      const removeListener = vi.spyOn(window, 'removeEventListener');
      const update = vi.fn();

      autoUpdate(reference, floating, update);
      await nextFrames(2);
      floating.remove();
      await nextFrames(2);
      const settled = update.mock.calls.length;

      rect.y = 700;
      window.dispatchEvent(new Event('scroll'));
      await nextFrames(3);

      expect(update).toHaveBeenCalledTimes(settled);
      expect(removeListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        true
      );
      removeListener.mockRestore();
    });

    it('waits for a container that attaches late', () => {
      const { reference, floating, rect } = stubbedRects();
      floating.remove();
      const update = vi.fn();

      const stop = autoUpdate(reference, floating, update);
      window.dispatchEvent(new Event('scroll'));
      document.body.append(floating);
      window.dispatchEvent(new Event('scroll'));
      const settled = update.mock.calls.length;

      rect.y = 800;
      window.dispatchEvent(new Event('scroll'));

      expect(update).toHaveBeenCalledTimes(settled + 1);
      stop();
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
