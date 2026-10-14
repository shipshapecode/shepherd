import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { bindAdvance, bindAdvanceAfter } from '../../../src/utils/bind';
import { Step } from '../../../src/step';

describe('Bind Utils', function () {
  describe('bindAdvance()', () => {
    let event, link;
    let hasAdvanced = false;

    const advanceOnSelector = 'test-selector';
    const advanceOnEventName = 'test-event';
    const tourProto = {
      next() {
        hasAdvanced = true;
      }
    };

    beforeEach(() => {
      event = new Event(advanceOnEventName);

      link = document.createElement('a');
      link.classList.add(advanceOnSelector);
      link.textContent = 'Click Me 👋';

      document.body.appendChild(link);
    });

    afterEach(() => {
      link.remove();
    });

    it('triggers the `advanceOn` option via object', () => {
      const step = new Step(tourProto, {
        advanceOn: {
          selector: `.${advanceOnSelector}`,
          event: advanceOnEventName
        }
      });

      step.isOpen = () => true;

      bindAdvance(step);
      link.dispatchEvent(event);

      expect(link.classList.contains(advanceOnSelector)).toBe(true);
      expect(hasAdvanced, '`next()` triggered for advanceOn').toBe(true);
    });

    it('captures events attached to no element', () => {
      const step = new Step(tourProto, {
        advanceOn: { event: advanceOnEventName }
      });

      step.isOpen = () => true;

      bindAdvance(step);
      document.body.dispatchEvent(event);

      expect(hasAdvanced, '`next()` triggered for advanceOn').toBeTruthy();
    });

    it('should support bubbling events for nodes that do not exist yet', () => {
      const event = new Event('blur');

      const step = new Step(tourProto, {
        text: 'Lorem ipsum dolor: <a href="https://example.com">sit amet</a>',
        advanceOn: {
          selector: 'a[href="https://example.com"]',
          event: 'blur'
        }
      });

      step.isOpen = () => true;

      bindAdvance(step);
      document.body.dispatchEvent(event);

      expect(hasAdvanced, '`next()` triggered for advanceOn').toBeTruthy();
    });

    it('returns a cleanup function that calls `removeEventListener`', () => {
      const bodySpy = vi.spyOn(document.body, 'removeEventListener');
      const step = new Step(tourProto, {
        advanceOn: { event: advanceOnEventName }
      });

      step.isOpen = () => true;

      const cleanup = bindAdvance(step);
      expect(cleanup, 'bindAdvance returned a cleanup function').toBeTypeOf(
        'function'
      );

      cleanup();

      expect(bodySpy).toHaveBeenCalledWith(
        advanceOnEventName,
        expect.any(Function),
        true
      );
      bodySpy.mockRestore();
    });

    it('removes the listener bound to a selector', () => {
      const step = new Step(tourProto, {
        advanceOn: {
          selector: `.${advanceOnSelector}`,
          event: advanceOnEventName
        }
      });

      step.isOpen = () => true;

      const cleanup = bindAdvance(step);
      const linkSpy = vi.spyOn(link, 'removeEventListener');

      cleanup();

      expect(linkSpy).toHaveBeenCalledWith(
        advanceOnEventName,
        expect.any(Function)
      );
      linkSpy.mockRestore();
    });

    // `console.error` is already replaced with a mock in setupTests.js
    it('returns undefined when there is nothing to bind', () => {
      expect(
        bindAdvance(new Step(tourProto, { advanceOn: {} })),
        'no event name passed'
      ).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith(
        'advanceOn was defined, but no event name was passed.'
      );

      expect(
        bindAdvance(
          new Step(tourProto, {
            advanceOn: { selector: '.does-not-exist', event: 'click' }
          })
        ),
        'selector matched no element'
      ).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith(
        'No element was found for the selector supplied to advanceOn: .does-not-exist'
      );
    });

    describe('conditional advancing with value', () => {
      let select, input;

      beforeEach(() => {
        hasAdvanced = false;
        select = document.createElement('select');
        select.innerHTML = '<option value="option1">Option 1</option><option value="option2">Option 2</option>';
        document.body.appendChild(select);

        input = document.createElement('input');
        input.type = 'text';
        document.body.appendChild(input);
      });

      afterEach(() => {
        select.remove();
        input.remove();
      });

      it('advances when select value matches expected value', () => {
        const step = new Step(tourProto, {
          advanceOn: {
            selector: 'select',
            event: 'change',
            value: 'option2'
          }
        });

        step.isOpen = () => true;

        const cleanup = bindAdvance(step);
        select.value = 'option1';
        select.dispatchEvent(new Event('change'));
        expect(hasAdvanced).toBe(false);

        select.value = 'option2';
        select.dispatchEvent(new Event('change'));
        expect(hasAdvanced).toBe(true);

        cleanup?.();
      });

      it('advances when input value matches expected string', () => {
        const step = new Step(tourProto, {
          advanceOn: {
            selector: 'input',
            event: 'input',
            value: 'expected'
          }
        });

        step.isOpen = () => true;

        const cleanup = bindAdvance(step);
        input.value = 'wrong';
        input.dispatchEvent(new Event('input'));
        expect(hasAdvanced).toBe(false);

        input.value = 'expected';
        input.dispatchEvent(new Event('input'));
        expect(hasAdvanced).toBe(true);

        cleanup?.();
      });

      it('advances when value matches regex', () => {
        const step = new Step(tourProto, {
          advanceOn: {
            selector: 'input',
            event: 'input',
            value: /^test/ 
          }
        });

        step.isOpen = () => true;

        const cleanup = bindAdvance(step);
        input.value = 'wrong';
        input.dispatchEvent(new Event('input'));
        expect(hasAdvanced).toBe(false);

        input.value = 'test123';
        input.dispatchEvent(new Event('input'));
        expect(hasAdvanced).toBe(true);

        cleanup?.();
      });

      it('advances when value matches custom function', () => {
        const step = new Step(tourProto, {
          advanceOn: {
            selector: 'input',
            event: 'input',
            value: (val) => val.length > 5
          }
        });

        step.isOpen = () => true;

        const cleanup = bindAdvance(step);
        input.value = 'short';
        input.dispatchEvent(new Event('input'));
        expect(hasAdvanced).toBe(false);

        input.value = 'long enough';
        input.dispatchEvent(new Event('input'));
        expect(hasAdvanced).toBe(true);

        cleanup?.();
      });

      it('advances when value matches any in array', () => {
        const step = new Step(tourProto, {
          advanceOn: {
            selector: 'select',
            event: 'change',
            value: ['option1', 'option2']
          }
        });

        step.isOpen = () => true;

        const cleanup = bindAdvance(step);
        select.value = 'option1';
        select.dispatchEvent(new Event('change'));
        expect(hasAdvanced).toBe(true);

        cleanup?.();
      });

      it('does not advance when checked state does not match', () => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        document.body.appendChild(checkbox);

        const step = new Step(tourProto, {
          advanceOn: {
            selector: 'input[type="checkbox"]',
            event: 'change',
            checked: true
          }
        });

        step.isOpen = () => true;

        const cleanup = bindAdvance(step);
        checkbox.checked = false;
        checkbox.dispatchEvent(new Event('change'));
        expect(hasAdvanced).toBe(false);

        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
        expect(hasAdvanced).toBe(true);

        checkbox.remove();
        cleanup?.();
      });

      it('advances when both value and checked conditions match', () => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = 'agree';
        document.body.appendChild(checkbox);

        const step = new Step(tourProto, {
          advanceOn: {
            selector: 'input[type="checkbox"]',
            event: 'change',
            value: 'agree',
            checked: true
          }
        });

        step.isOpen = () => true;

        const cleanup = bindAdvance(step);
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('change'));
        expect(hasAdvanced).toBe(true);

        checkbox.remove();
        cleanup?.();
      });
    });
  });

  describe('bindAdvanceAfter()', () => {
    let hasAdvanced = false;

    const tourProto = {
      next() {
        hasAdvanced = true;
      }
    };

    beforeEach(() => {
      hasAdvanced = false;
    });

    it('advances when promise resolves', async () => {
      const step = new Step(tourProto, {
        advanceAfter() {
          return Promise.resolve();
        }
      });

      step.isOpen = () => true;

      bindAdvanceAfter(step);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(hasAdvanced).toBe(true);
    });

    it('advances when custom promise resolves', async () => {
      let resolveFn;
      const promise = new Promise((resolve) => {
        resolveFn = resolve;
      });

      const step = new Step(tourProto, {
        advanceAfter() {
          return promise;
        }
      });

      step.isOpen = () => true;

      const cleanup = bindAdvanceAfter(step);
      expect(hasAdvanced).toBe(false);

      resolveFn();
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(hasAdvanced).toBe(true);
      cleanup?.();
    });

    it('does not advance if step is not open when promise resolves', async () => {
      let resolveFn;
      const promise = new Promise((resolve) => {
        resolveFn = resolve;
      });

      const step = new Step(tourProto, {
        advanceAfter() {
          return promise;
        }
      });

      step.isOpen = () => false;

      bindAdvanceAfter(step);
      resolveFn();
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(hasAdvanced).toBe(false);
    });

    it('logs error when promise rejects', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error');

      const step = new Step(tourProto, {
        advanceAfter() {
          return Promise.reject(new Error('Test error'));
        }
      });

      step.isOpen = () => true;

      bindAdvanceAfter(step);
      await new Promise((resolve) => setTimeout(resolve, 10));

      expect(hasAdvanced).toBe(false);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Error in advanceAfter:',
        expect.any(Error)
      );
      consoleErrorSpy.mockRestore();
    });

    it('returns cleanup function', () => {
      const step = new Step(tourProto, {
        advanceAfter() {
          return Promise.resolve();
        }
      });

      step.isOpen = () => true;

      const cleanup = bindAdvanceAfter(step);
      expect(cleanup).toBeTypeOf('function');
      cleanup?.();
    });

    it('returns undefined when advanceAfter is not a function', () => {
      const step = new Step(tourProto, {
        advanceAfter: 'not a function'
      });

      const cleanup = bindAdvanceAfter(step);
      expect(cleanup).toBeUndefined();
    });
  });
});
