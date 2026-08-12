import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { bindAdvance } from '../../../src/utils/bind';
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
  });
});
