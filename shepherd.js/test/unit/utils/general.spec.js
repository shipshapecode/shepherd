import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Step } from '../../../src/step';
import {
  parseAttachTo,
  shouldCenterStep,
  parseExtraHighlights,
  resolveAttachToElement,
  waitForAttachToElement
} from '../../../src/utils/general';
import { getFloatingUIOptions } from '../../../src/utils/floating-ui';

describe('General Utils', function () {
  let optionsElement;

  beforeEach(() => {
    optionsElement = document.createElement('div');
    optionsElement.classList.add('options-test');
    document.body.appendChild(optionsElement);
  });

  afterEach(() => {
    document.body.removeChild(optionsElement);
  });

  describe('parseAttachTo()', function () {
    it('fails if element does not exist', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.element-does-not-exist', on: 'center' }
        }
      );

      const { element } = parseAttachTo(step);
      expect(element).toBeFalsy();
    });

    it('accepts callback function as element', function () {
      const callback = vi.fn();

      const step = new Step(
        {},
        {
          attachTo: { element: callback, on: 'center' }
        }
      );

      parseAttachTo(step);
      expect(callback).toHaveBeenCalled();
    });

    it('correctly resolves elements when given function that returns a selector', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: () => 'body', on: 'center' }
        }
      );

      const { element } = parseAttachTo(step);
      expect(element).toBe(document.body);
    });

    it('binds element callback to step', function () {
      const step = new Step(
        {},
        {
          attachTo: {
            element() {
              expect(this).toBe(step);
            },
            on: 'center'
          }
        }
      );

      parseAttachTo(step);
    });

    it('logs a console.error when a selector does not resolve and skipMissingElement is not set', function () {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const step = new Step(
        {},
        {
          attachTo: { element: '.element-does-not-exist', on: 'center' }
        }
      );

      parseAttachTo(step);

      expect(
        spy,
        'console.error is called when skipMissingElement is not set'
      ).toHaveBeenCalled();

      spy.mockRestore();
    });

    it('does not log a console.error when skipMissingElement is true', function () {
      const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const step = new Step(
        {},
        {
          attachTo: { element: '.element-does-not-exist', on: 'center' },
          skipMissingElement: true
        }
      );

      const { element } = parseAttachTo(step);

      expect(element, 'resolved element is still falsy').toBeFalsy();
      expect(
        spy,
        'console.error is not called when skipMissingElement is true'
      ).not.toHaveBeenCalled();

      spy.mockRestore();
    });
  });

  describe('resolveAttachToElement()', function () {
    it('resolves a selector string to the element', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.options-test', on: 'center' }
        }
      );

      const element = resolveAttachToElement(step);
      expect(element).toBe(optionsElement);
    });

    it('returns null for a selector matching nothing', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.element-does-not-exist', on: 'center' }
        }
      );

      const element = resolveAttachToElement(step);
      expect(element).toBeNull();
    });

    it('resolves a function returning an element', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: () => optionsElement, on: 'center' }
        }
      );

      const element = resolveAttachToElement(step);
      expect(element).toBe(optionsElement);
    });

    it('resolves a function returning a selector string', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: () => '.options-test', on: 'center' }
        }
      );

      const element = resolveAttachToElement(step);
      expect(element).toBe(optionsElement);
    });

    it('returns null when a function returns null', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: () => null, on: 'center' }
        }
      );

      const element = resolveAttachToElement(step);
      expect(element).toBeNull();
    });

    it('returns null when the step has no attachTo', function () {
      const step = new Step({}, {});

      const element = resolveAttachToElement(step);
      expect(element).toBeNull();
    });

    it('returns null for an invalid selector without throwing', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: ':::', on: 'center' }
        }
      );

      expect(() => resolveAttachToElement(step)).not.toThrow();
      expect(resolveAttachToElement(step)).toBeNull();
    });
  });

  describe('waitForAttachToElement()', function () {
    it('resolves immediately with the element when it already exists', async function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.options-test', on: 'center' }
        }
      );

      const element = await waitForAttachToElement(step, 1000);
      expect(element).toBe(optionsElement);
    });

    it('resolves with the element when appended later', async function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.added-later', on: 'center' }
        }
      );

      const promise = waitForAttachToElement(step, 1000);
      let addedElement;

      setTimeout(() => {
        addedElement = document.createElement('div');
        addedElement.classList.add('added-later');
        document.body.appendChild(addedElement);
      }, 20);

      const element = await promise;

      expect(
        element,
        'resolves with the element appended after the wait started'
      ).toBe(addedElement);

      document.body.removeChild(addedElement);
    });

    it('resolves with the element when an attribute change makes the selector match', async function () {
      const div = document.createElement('div');
      document.body.appendChild(div);

      const step = new Step(
        {},
        {
          attachTo: { element: '.added-later-class', on: 'center' }
        }
      );

      const promise = waitForAttachToElement(step, 1000);

      setTimeout(() => {
        div.classList.add('added-later-class');
      }, 20);

      const element = await promise;

      expect(
        element,
        'resolves with the element once its class matches the selector'
      ).toBe(div);

      document.body.removeChild(div);
    });

    it('resolves with null after timeout when the element never appears', async function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.never-appears-xyz', on: 'center' }
        }
      );

      const element = await waitForAttachToElement(step, 50);
      expect(element).toBeNull();
    });

    it('resolves with null immediately when missing and timeout is 0', async function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.never-appears-xyz', on: 'center' }
        }
      );

      const element = await waitForAttachToElement(step, 0);
      expect(element).toBeNull();
    });

    it('falls back to polling when MutationObserver is unavailable', async function () {
      vi.stubGlobal('MutationObserver', undefined);

      const step = new Step(
        {},
        {
          attachTo: { element: '.polled-for-xyz', on: 'center' }
        }
      );

      const promise = waitForAttachToElement(step, 1000);
      let addedElement;

      setTimeout(() => {
        addedElement = document.createElement('div');
        addedElement.classList.add('polled-for-xyz');
        document.body.appendChild(addedElement);
      }, 20);

      const element = await promise;

      expect(
        element,
        'polling resolves with the element without a MutationObserver'
      ).toBe(addedElement);

      document.body.removeChild(addedElement);
      vi.unstubAllGlobals();
    });

    it('resolves with null after timeout when polling and the element never appears', async function () {
      vi.stubGlobal('MutationObserver', undefined);

      const step = new Step(
        {},
        {
          attachTo: { element: '.never-appears-xyz', on: 'center' }
        }
      );

      const element = await waitForAttachToElement(step, 80);

      expect(element, 'polling gives up once the timeout expires').toBeNull();

      vi.unstubAllGlobals();
    });
  });

  describe('parseExtraHighlights()', function () {
    it('returns empty array if extraHighlights is not defined', function () {
      const step = new Step({}, {});

      const highlights = parseExtraHighlights(step);
      expect(highlights).toEqual([]);
    });

    it('returns empty array if extraHighlights is an empty array', function () {
      const step = new Step({}, { extraHighlights: [] });

      const highlights = parseExtraHighlights(step);
      expect(highlights).toEqual([]);
    });

    it('resolves extraHighlights selectors to HTMLElements', function () {
      const step = new Step({}, { extraHighlights: ['.options-test'] });

      const highlights = parseExtraHighlights(step);
      expect(highlights).toEqual([optionsElement]);
    });

    it('returns empty array if no elements match the extraHighlights selectors', function () {
      const step = new Step({}, { extraHighlights: ['.non-existent-class'] });

      const highlights = parseExtraHighlights(step);
      expect(highlights).toEqual([]);
    });
  });

  describe('floatingUIOptions', function () {
    it('middleware options are passed in last', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.options-test', on: 'right' },
          floatingUIOptions: {
            middleware: [
              {
                name: 'preventOverflow',
                options: {
                  altAxis: false
                }
              }
            ]
          }
        }
      );

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );
      // Shepherd pushes in flip and shift by default, so this is 3rd
      expect(floatingUIOptions.middleware[2].options.altAxis).toBe(false);
    });

    it('positioning strategy is explicitly set', function () {
      const step = new Step(
        {},
        {
          attachTo: { element: '.options-test', on: 'center' },
          options: {
            floatingUIOptions: {
              strategy: 'absolute'
            }
          }
        }
      );

      const floatingUIOptions = getFloatingUIOptions(
        step.options.attachTo,
        step
      );
      expect(floatingUIOptions.strategy).toBe('absolute');
    });
  });

  describe('shouldCenterStep()', () => {
    it('Returns true when resolved attachTo options are falsy', () => {
      const emptyObjAttachTo = {};
      const emptyArrAttachTo = [];
      const nullAttachTo = null; // FAILS Cannot read properties of null (reading 'element')
      const undefAttachTo = undefined; // FAILS Cannot read properties of undefined (reading 'element')

      expect(shouldCenterStep(emptyObjAttachTo)).toBe(true);
      expect(shouldCenterStep(emptyArrAttachTo)).toBe(true);
      expect(shouldCenterStep(nullAttachTo)).toBe(true);
      expect(shouldCenterStep(undefAttachTo)).toBe(true);
    });

    it('Returns false when element and on properties are truthy', () => {
      const testAttachTo = {
        element: '.pseudo',
        on: 'right'
      };

      expect(shouldCenterStep(testAttachTo)).toBe(false);
    });

    it('Returns true when element property is null', () => {
      const elementAttachTo = { element: null }; // FAILS

      expect(shouldCenterStep(elementAttachTo)).toBe(true);
    });
  });
});
