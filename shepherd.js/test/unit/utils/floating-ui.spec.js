import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { arrow, offset, shift } from '@floating-ui/dom';
import { Step } from '../../../src/step';
import { getFloatingUIOptions } from '../../../src/utils/floating-ui';

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
    document.body.removeChild(targetElement);
    document.body.removeChild(stepElement);
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
});
