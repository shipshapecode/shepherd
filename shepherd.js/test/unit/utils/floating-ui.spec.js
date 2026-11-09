import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const floatingUIMock = vi.hoisted(() => ({
  autoUpdate: vi.fn(),
  computePosition: vi.fn(),
  updateCallbacks: []
}));

vi.mock('../../../src/utils/position.ts', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    autoUpdate: floatingUIMock.autoUpdate,
    computePosition: floatingUIMock.computePosition
  };
});

import { Step } from '../../../src/step';
import {
  getPositionConfig,
  setupTooltip
} from '../../../src/utils/floating-ui';
import { arrow, flip, place, shift } from '../../../src/utils/position';

describe('Floating UI Utils', function () {
  let targetElement;
  let stepElement;

  const middlewareNames = ({ middleware }) =>
    middleware.map(({ name }) => name);

  const createStep = (options) => {
    const step = new Step({}, { arrow: true, ...options });
    // The arrow middleware is only added once the step is rendered.
    step.el = stepElement;
    return step;
  };

  const configFor = (options) => {
    const step = createStep(options);
    return getPositionConfig(step.options.attachTo, step);
  };

  /** Where the arrow lands for a narrow target by the viewport's left edge. */
  const arrowAt = (config) =>
    place(
      {
        rects: {
          reference: { x: 2, y: 300, width: 4, height: 4 },
          floating: { x: 0, y: 0, width: 300, height: 120 }
        },
        clip: { x: 0, y: 0, width: 1000, height: 700 },
        origin: { x: 0, y: 0, scale: { x: 1, y: 1 } },
        rtl: false,
        floating: stepElement
      },
      config
    ).middlewareData.arrow;

  const arrowWithPadding = (placement, padding) =>
    arrowAt({
      placement,
      strategy: 'absolute',
      middleware: [flip(), shift(), arrow(stepElement.firstChild, padding)]
    });

  beforeEach(() => {
    targetElement = document.createElement('div');
    targetElement.classList.add('floating-ui-test');
    document.body.appendChild(targetElement);

    stepElement = document.createElement('div');
    Object.defineProperty(stepElement, 'clientWidth', { value: 300 });
    Object.defineProperty(stepElement, 'clientHeight', { value: 120 });
    const arrowElement = document.createElement('div');
    arrowElement.classList.add('shepherd-arrow');
    arrowElement.style.cssText = 'width: 16px; height: 16px';
    stepElement.appendChild(arrowElement);
    document.body.appendChild(stepElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('getPositionConfig()', function () {
    it('counts the theme gap as offset, on top of positionOptions', () => {
      const step = createStep({
        attachTo: { element: 'body', on: 'bottom' },
        positionOptions: { offset: 4 }
      });
      step.el.style.setProperty('--shepherd-gap', '16px');

      const { middleware } = getPositionConfig(step.options.attachTo, step);
      const offsetMiddleware = middleware.find((m) => m.name === 'offset');
      const { y } = offsetMiddleware.fn({
        x: 0,
        y: 0,
        placement: 'bottom',
        middlewareData: {},
        rects: { reference: {}, floating: {} }
      });

      expect(y).toBe(20);
      step.el.style.removeProperty('--shepherd-gap');
    });

    it('flips, shifts, and places the arrow last by default', function () {
      const config = configFor({
        attachTo: { element: '.floating-ui-test', on: 'right' }
      });

      expect(middlewareNames(config)).toEqual(['flip', 'shift', 'arrow']);
      expect(config.placement).toBe('right');
      expect(config.strategy).toBe('absolute');
    });

    it('offsets before anything else measures the step', function () {
      const config = configFor({
        attachTo: { element: '.floating-ui-test', on: 'right' },
        positionOptions: { offset: 12 }
      });

      expect(middlewareNames(config)).toEqual([
        'offset',
        'flip',
        'shift',
        'arrow'
      ]);
    });

    it('keeps attachTo.on when flip is false', function () {
      const config = configFor({
        attachTo: { element: '.floating-ui-test', on: 'top' },
        positionOptions: { flip: false }
      });

      expect(middlewareNames(config)).toEqual(['shift', 'arrow']);
      expect(config.placement).toBe('top');
    });

    it('chooses a side with autoPlacement for auto placements', function () {
      const config = configFor({
        attachTo: { element: '.floating-ui-test', on: 'auto-start' },
        positionOptions: { flip: false }
      });

      expect(middlewareNames(config)).toEqual([
        'autoPlacement',
        'shift',
        'arrow'
      ]);
    });

    it('passes strategy through', function () {
      const config = configFor({
        attachTo: { element: '.floating-ui-test', on: 'right' },
        positionOptions: { strategy: 'fixed' }
      });

      expect(config.strategy).toBe('fixed');
    });

    it('ignores the arrow padding for placements without an alignment', function () {
      const config = configFor({
        arrow: { padding: 40 },
        attachTo: { element: '.floating-ui-test', on: 'bottom' }
      });

      expect(arrowAt(config)).toEqual(arrowWithPadding('bottom', 0));
      expect(arrowAt(config)).not.toEqual(arrowWithPadding('bottom', 40));
    });

    it('passes the arrow padding through for edge aligned placements', function () {
      const config = configFor({
        arrow: { padding: 40 },
        attachTo: { element: '.floating-ui-test', on: 'bottom-start' }
      });

      expect(arrowAt(config)).toEqual(arrowWithPadding('bottom-start', 40));
      expect(arrowAt(config)).not.toEqual(arrowWithPadding('bottom-start', 4));
    });

    it('defaults the arrow padding for edge aligned placements', function () {
      const config = configFor({
        attachTo: { element: '.floating-ui-test', on: 'bottom-start' }
      });

      expect(arrowAt(config)).toEqual(arrowWithPadding('bottom-start', 4));
      expect(arrowAt(config)).not.toEqual(arrowWithPadding('bottom-start', 0));
    });

    it('positions an SVG arrow', function () {
      const svgArrow = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg'
      );
      svgArrow.classList.add('shepherd-arrow');
      stepElement.replaceChildren(svgArrow);
      const config = configFor({
        attachTo: { element: '.floating-ui-test', on: 'right' }
      });

      expect(middlewareNames(config)).toEqual(['flip', 'shift', 'arrow']);
    });

    it('adds no middleware for a centered step', function () {
      const config = configFor({
        attachTo: { element: '.floating-ui-test' },
        positionOptions: { offset: 16 }
      });

      expect(config.middleware).toEqual([]);
    });
  });

  describe('setupTooltip()', function () {
    beforeEach(() => {
      vi.useFakeTimers();

      floatingUIMock.updateCallbacks.length = 0;
      floatingUIMock.autoUpdate.mockImplementation(
        (_target, _stepElement, update) => {
          floatingUIMock.updateCallbacks.push(update);
          update();

          return vi.fn();
        }
      );
      floatingUIMock.computePosition.mockReturnValue({
        middlewareData: {},
        placement: 'bottom',
        strategy: 'absolute',
        x: 12,
        y: 34
      });
    });

    it('reads the theme gap again on every reposition', () => {
      const { step, stepElement } = createTooltipFixture();
      const gapOf = (call) =>
        call[2].middleware
          .find((m) => m.name === 'offset')
          ?.fn({
            x: 0,
            y: 0,
            placement: 'bottom',
            middlewareData: {},
            rects: { reference: {}, floating: {} }
          }).y ?? 0;

      setupTooltip(step);
      stepElement.style.setProperty('--shepherd-gap', '24px');
      floatingUIMock.updateCallbacks[0]();

      const calls = floatingUIMock.computePosition.mock.calls;
      expect(gapOf(calls.at(-1))).toBe(24);
      stepElement.style.removeProperty('--shepherd-gap');
    });

    it('only focuses the step element after the first render', async () => {
      const { input, step, stepElement } = createTooltipFixture();
      const focusSpy = vi.spyOn(stepElement, 'focus');

      setupTooltip(step);

      await flushPositioning();

      expect(focusSpy).toHaveBeenCalledTimes(1);

      input.focus();
      expect(document.activeElement).toBe(input);

      floatingUIMock.updateCallbacks[0]();

      await flushPositioning();

      expect(focusSpy).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(input);
    });

    it('focuses the step in the frame after it is positioned', async () => {
      const { step, stepElement } = createTooltipFixture();

      setupTooltip(step);
      await vi.advanceTimersByTimeAsync(20);

      expect(document.activeElement).toBe(stepElement);
    });

    it('reports a step it could not position, and still focuses it', async () => {
      const { step, stepElement } = createTooltipFixture();
      const cause = new Error('no platform');
      floatingUIMock.computePosition.mockImplementationOnce(() => {
        throw cause;
      });
      const consoleError = vi.spyOn(console, 'error');

      setupTooltip(step);
      await vi.advanceTimersByTimeAsync(20);

      expect(consoleError).toHaveBeenCalledWith(expect.any(String), cause);
      expect(document.activeElement).toBe(stepElement);
    });

    it('focuses each fresh tooltip setup once', async () => {
      const first = createTooltipFixture();
      const firstFocusSpy = vi.spyOn(first.stepElement, 'focus');

      setupTooltip(first.step);

      await flushPositioning();

      expect(firstFocusSpy).toHaveBeenCalledTimes(1);

      const second = createTooltipFixture();
      const secondFocusSpy = vi.spyOn(second.stepElement, 'focus');

      setupTooltip(second.step);

      await flushPositioning();

      expect(secondFocusSpy).toHaveBeenCalledTimes(1);

      floatingUIMock.updateCallbacks[1]();

      await flushPositioning();

      expect(secondFocusSpy).toHaveBeenCalledTimes(1);
    });
  });
});

function createTooltipFixture() {
  const target = document.createElement('div');
  const input = document.createElement('input');
  target.appendChild(input);
  document.body.appendChild(target);

  const stepElement = document.createElement('div');
  document.body.appendChild(stepElement);

  const step = {
    cleanup: null,
    el: stepElement,
    options: {
      arrow: false,
      attachTo: { element: target, on: 'bottom' }
    },
    shepherdElementComponent: {
      element: stepElement
    },
    _getResolvedAttachToOptions() {
      return this.options.attachTo;
    }
  };

  return { input, step, stepElement, target };
}

async function flushPositioning() {
  await Promise.resolve();
  await vi.advanceTimersByTimeAsync(300);
  await Promise.resolve();
}
