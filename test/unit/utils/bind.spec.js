import { vi } from 'vitest';

import { bindAdvance } from '../../../shepherd.js/src/utils/bind';
import { Step } from '../../../shepherd.js/src/step';

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

    it('calls `removeEventListener` when destroyed', () => {
      return new Promise((done) => {
        const bodySpy = vi.spyOn(document.body, 'removeEventListener');
        const step = new Step(tourProto, {
          advanceOn: { event: advanceOnEventName }
        });

        step.isOpen = () => true;

        bindAdvance(step);
        step.trigger('destroy');

        expect(bodySpy).toHaveBeenCalled();
        bodySpy.mockRestore();

        done();
      });
    });
  });
});
