import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const floatingUIMock = vi.hoisted(() => ({
  autoUpdate: vi.fn(() => vi.fn()),
  computePosition: vi.fn(),
  updateCallbacks: []
}));

vi.mock('@floating-ui/dom', async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    autoUpdate: floatingUIMock.autoUpdate,
    computePosition: floatingUIMock.computePosition
  };
});

import { arrow, autoUpdate, offset, shift } from '@floating-ui/dom';
import { Step } from '../../../src/step';
import {
  getFloatingUIOptions,
  mergeTooltipConfig,
  setupTooltip
} from '../../../src/utils/floating-ui';

describe('Floating UI Utils', function () {
  let targetElement;
  let stepElement;

  /**
   * Names of the middleware, in execution order. Falsy entries are preserved so
   * that ordering assertions still line up when the user passes them in.
   */
  const middlewareNames = ({ middleware }) =>
    middleware.map((item) => (item ? item.name : item));

  const createStep = (options) => {
    const step = new Step({}, { arrow: true, ...options });
    // `addArrow()` only returns the arrow element when the step is rendered.
    step.el = stepElement;
    return step;
  };

  beforeEach(() => {
    targetElement = document.createElement('div');
    targetElement.classList.add('floating-ui-test');
    document.body.appendChild(targetElement);

    stepElement = document.createElement('div');
    const arrowElement = document.createElement('div');
    arrowElement.classList.add('shepherd-arrow');
    stepElement.appendChild(arrowElement);
    document.body.appendChild(stepElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllTimers();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('getFloatingUIOptions()', function () {
    it('keeps user middleware and places the arrow middleware last', function () {
      const step = createStep({
        attachTo: { element: '.floating-ui-test', on: 'right' },
        floatingUIOptions: {
          middleware: [offset(16), shift({ padding: 32 })]
        }
      });

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );

      expect(middlewareNames(floatingUIOptions)).toEqual([
        'flip',
        'shift',
        'offset',
        'shift',
        'arrow'
      ]);
    });

    it('does not append its own arrow when the user supplies one', function () {
      const userArrowElement = document.createElement('div');
      const step = createStep({
        attachTo: { element: '.floating-ui-test', on: 'right' },
        floatingUIOptions: {
          middleware: [arrow({ element: userArrowElement }), offset(16)]
        }
      });

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );

      const names = middlewareNames(floatingUIOptions);
      expect(names).toEqual(['flip', 'shift', 'arrow', 'offset']);
      expect(names.filter((name) => name === 'arrow')).toHaveLength(1);

      const arrowMiddleware = floatingUIOptions.middleware.find(
        ({ name }) => name === 'arrow'
      );
      expect(arrowMiddleware.options.element).toBe(userArrowElement);
    });

    it('adds the default middleware when the user supplies none', function () {
      const step = createStep({
        attachTo: { element: '.floating-ui-test', on: 'right' }
      });

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );

      expect(middlewareNames(floatingUIOptions)).toEqual([
        'flip',
        'shift',
        'arrow'
      ]);
      expect(floatingUIOptions.placement).toBe('right');
      expect(floatingUIOptions.strategy).toBe('absolute');

      const arrowMiddleware = floatingUIOptions.middleware.at(-1);
      expect(arrowMiddleware.options.element).toBe(
        stepElement.querySelector('.shepherd-arrow')
      );
      // Padding only applies to edge aligned placements.
      expect(arrowMiddleware.options.padding).toBe(0);
    });

    it('passes the arrow padding through for edge aligned placements', function () {
      const step = createStep({
        arrow: { padding: 10 },
        attachTo: { element: '.floating-ui-test', on: 'right-start' }
      });

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );

      const arrowMiddleware = floatingUIOptions.middleware.at(-1);
      expect(arrowMiddleware.name).toBe('arrow');
      expect(arrowMiddleware.options.padding).toBe(10);
    });

    it('defaults the arrow padding for edge aligned placements', function () {
      const step = createStep({
        attachTo: { element: '.floating-ui-test', on: 'right-start' }
      });

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );

      expect(floatingUIOptions.middleware.at(-1).options.padding).toBe(4);
    });

    it('does not add any middleware for a centered step', function () {
      const step = createStep({
        attachTo: { element: '.floating-ui-test' },
        floatingUIOptions: {
          middleware: [offset(16)]
        }
      });

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );

      expect(middlewareNames(floatingUIOptions)).toEqual(['offset']);
      expect(floatingUIOptions.placement).toBeUndefined();
    });

    it('tolerates falsy entries in the user middleware', function () {
      const step = createStep({
        attachTo: { element: '.floating-ui-test', on: 'right' },
        floatingUIOptions: {
          middleware: [false, offset(16), null, undefined]
        }
      });

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );

      expect(middlewareNames(floatingUIOptions)).toEqual([
        'flip',
        'shift',
        false,
        'offset',
        null,
        undefined,
        'arrow'
      ]);
    });
  });

  describe('autoUpdateOptions', function () {
    beforeEach(() => {
      autoUpdate.mockReset();
      autoUpdate.mockImplementation(() => vi.fn());
    });

    it('forwards `autoUpdateOptions` to `autoUpdate`', function () {
      const step = createStep({
        attachTo: { element: '.floating-ui-test', on: 'right' },
        autoUpdateOptions: { layoutShift: false }
      });

      setupTooltip(step);

      expect(autoUpdate).toHaveBeenCalledTimes(1);
      expect(autoUpdate).toHaveBeenCalledWith(
        targetElement,
        stepElement,
        expect.any(Function),
        { layoutShift: false }
      );
    });

    it('keeps tour `autoUpdateOptions` when a mounted step is updated', function () {
      const tour = {
        modal: { setupForStep() {} },
        options: {
          defaultStepOptions: {
            autoUpdateOptions: { layoutShift: false }
          }
        }
      };
      const step = new Step(tour, {
        arrow: true,
        attachTo: { element: '.floating-ui-test', on: 'bottom' },
        text: 'body'
      });

      step.show();
      autoUpdate.mockClear();

      step.updateStepOptions({
        autoUpdateOptions: { elementResize: true }
      });

      expect(step.options.autoUpdateOptions).toEqual({
        layoutShift: false,
        elementResize: true
      });
      expect(autoUpdate).toHaveBeenCalledWith(
        targetElement,
        expect.any(HTMLElement),
        expect.any(Function),
        { layoutShift: false, elementResize: true }
      );

      step.destroy();
    });

    it('applies `autoUpdateOptions` from `defaultStepOptions`, overridable per step', function () {
      const tour = {
        options: {
          defaultStepOptions: {
            autoUpdateOptions: { layoutShift: false, elementResize: false }
          }
        }
      };
      const step = new Step(tour, {
        arrow: true,
        attachTo: { element: '.floating-ui-test', on: 'right' },
        autoUpdateOptions: { elementResize: true }
      });
      step.el = stepElement;

      setupTooltip(step);

      expect(autoUpdate).toHaveBeenCalledWith(
        targetElement,
        stepElement,
        expect.any(Function),
        { layoutShift: false, elementResize: true }
      );
    });
  });

  describe('mergeTooltipConfig()', function () {
    it('deep merges `autoUpdateOptions` from tour and step options', function () {
      const { autoUpdateOptions } = mergeTooltipConfig(
        { autoUpdateOptions: { layoutShift: false, ancestorScroll: false } },
        { autoUpdateOptions: { ancestorScroll: true } }
      );

      expect(autoUpdateOptions).toEqual({
        layoutShift: false,
        ancestorScroll: true
      });
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
      floatingUIMock.computePosition.mockResolvedValue({
        middlewareData: {},
        placement: 'bottom',
        strategy: 'absolute',
        x: 12,
        y: 34
      });
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
      attachTo: { element: target, on: 'bottom' },
      floatingUIOptions: {}
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
