import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createShepherdElement } from '../../../src/components/shepherd-element.ts';
import { Step } from '../../../src/step';
import { Tour } from '../../../src/tour';

function fireKeyDown(el, keyCode, opts = {}) {
  el.dispatchEvent(
    new KeyboardEvent('keydown', { keyCode, bubbles: true, ...opts })
  );
}

describe('components/ShepherdElement', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('arrow', () => {
    it('arrows shown by default', () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        attachTo: { element: testElement, on: 'top' }
      });

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(1);

      cleanup();
    });

    it('arrow: false hides arrows', () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        arrow: false,
        attachTo: { element: testElement, on: 'top' }
      });

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(0);

      cleanup();
    });

    it('arrow: object with padding shows arrow', () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        arrow: { padding: 10 },
        attachTo: { element: testElement, on: 'top' }
      });

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(1);

      cleanup();
    });

    it('arrow: empty object shows arrow', () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        arrow: {},
        attachTo: { element: testElement, on: 'top' }
      });

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(1);

      cleanup();
    });
  });

  describe('handleKeyDown', () => {
    it('exitOnEsc: true - ESC cancels the tour', () => {
      const tour = new Tour();
      const step = new Step(tour, {});
      const stepCancelSpy = vi.spyOn(step, 'cancel');

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      fireKeyDown(element, 27);
      expect(stepCancelSpy).toHaveBeenCalled();

      cleanup();
    });

    it('exitOnEsc: false - ESC does not cancel the tour', () => {
      const tour = new Tour({ exitOnEsc: false });
      const step = new Step(tour, {});
      const stepCancelSpy = vi.spyOn(step, 'cancel');

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      fireKeyDown(element, 27);
      expect(stepCancelSpy).not.toHaveBeenCalled();

      cleanup();
    });

    it('keyboardNavigation: true - arrow keys move between steps', () => {
      const tour = new Tour();
      const step = new Step(tour, {});
      let propagateValue = 0;

      const tourBackStub = vi.spyOn(tour, 'back').mockImplementation(() => {});
      const tourNextStub = vi.spyOn(tour, 'next').mockImplementation(() => {});

      // Add a keystroke listener to a parent to test event propagation
      const propagateHandler = (event) => {
        if ([27, 37, 39].includes(event.keyCode)) {
          propagateValue += 1;
        }
      };
      document.body.addEventListener('keydown', propagateHandler);

      expect(tourBackStub).not.toHaveBeenCalled();
      expect(tourNextStub).not.toHaveBeenCalled();

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      fireKeyDown(element, 39);
      expect(tourNextStub).toHaveBeenCalled();
      // There should be no event propagation
      expect(propagateValue).toBe(0);

      fireKeyDown(element, 37);
      expect(tourBackStub).toHaveBeenCalled();
      // There should be no event propagation
      expect(propagateValue).toBe(0);

      tourBackStub.mockRestore();
      tourNextStub.mockRestore();
      document.body.removeEventListener('keydown', propagateHandler);
      cleanup();
    });

    it('keyboardNavigation: false - arrow keys do not move between steps', () => {
      const tour = new Tour({ keyboardNavigation: false });
      const step = new Step(tour, {});
      let propagateValue = 0;

      const tourBackStub = vi.spyOn(tour, 'back').mockImplementation(() => {});
      const tourNextStub = vi.spyOn(tour, 'next').mockImplementation(() => {});

      // Add a keystroke listener to a parent to test event propagation
      const propagateHandler = (event) => {
        if ([27, 37, 39].includes(event.keyCode)) {
          propagateValue += 1;
        }
      };
      document.body.addEventListener('keydown', propagateHandler);

      expect(tourBackStub).not.toHaveBeenCalled();
      expect(tourNextStub).not.toHaveBeenCalled();

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      fireKeyDown(element, 39);
      expect(tourNextStub).not.toHaveBeenCalled();
      // There should be event propagation
      expect(propagateValue).toBe(1);

      fireKeyDown(element, 37);
      expect(tourBackStub).not.toHaveBeenCalled();
      // There should be another event propagation
      expect(propagateValue).toBe(2);

      tourBackStub.mockRestore();
      tourNextStub.mockRestore();
      document.body.removeEventListener('keydown', propagateHandler);
      cleanup();
    });

    it('Tab key: prevents default when no focusable elements exist', () => {
      const tour = new Tour();
      // Step with no buttons, no cancel icon — dialog has no focusable children
      const step = new Step(tour, {});

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      const prevented = [];
      element.addEventListener(
        'keydown',
        (e) => {
          prevented.push(e.defaultPrevented);
        },
        { capture: false }
      );

      fireKeyDown(element, 9, { cancelable: true });
      expect(prevented[0]).toBe(true);

      cleanup();
    });

    it('Shift+Tab from first dialog element focuses last attachTo element', () => {
      const tour = new Tour();
      const attachToEl = document.createElement('div');
      const attachToBtn = document.createElement('button');
      attachToBtn.textContent = 'Attach Button';
      attachToEl.appendChild(attachToBtn);
      container.appendChild(attachToEl);

      const step = new Step(tour, {
        attachTo: { element: attachToEl, on: 'bottom' },
        buttons: [{ text: 'Next', action: () => {} }]
      });

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      // First focusable dialog element is the "Next" button
      const dialogBtn = element.querySelector('button.shepherd-button');
      expect(dialogBtn).toBeTruthy();
      dialogBtn.focus();

      const focusSpy = vi.spyOn(attachToBtn, 'focus');
      fireKeyDown(element, 9, { shiftKey: true });
      // The last focusable attachTo element (attachToBtn) should be focused
      expect(focusSpy).toHaveBeenCalled();

      focusSpy.mockRestore();
      cleanup();
    });

    it('Shift+Tab from first attachTo element focuses last dialog element', () => {
      const tour = new Tour();
      const attachToEl = document.createElement('button');
      attachToEl.textContent = 'Target';
      container.appendChild(attachToEl);

      const step = new Step(tour, {
        attachTo: { element: attachToEl, on: 'bottom' },
        buttons: [{ text: 'Next', action: () => {} }]
      });

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      // Focus the attachTo element (first focusable attach-to element)
      attachToEl.focus();

      const dialogBtn = element.querySelector('button.shepherd-button');
      const focusSpy = vi.spyOn(dialogBtn, 'focus');
      // Fire on the attachTo element since it also has the keydown listener
      fireKeyDown(attachToEl, 9, { shiftKey: true });
      expect(focusSpy).toHaveBeenCalled();

      focusSpy.mockRestore();
      cleanup();
    });

    it('forward Tab from last dialog element focuses first attachTo element', () => {
      const tour = new Tour();
      const attachToEl = document.createElement('button');
      attachToEl.textContent = 'Target';
      container.appendChild(attachToEl);

      const step = new Step(tour, {
        attachTo: { element: attachToEl, on: 'bottom' },
        buttons: [{ text: 'Next', action: () => {} }]
      });

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      // Focus the last dialog element (the button)
      const dialogBtn = element.querySelector('button.shepherd-button');
      dialogBtn.focus();

      const focusSpy = vi.spyOn(attachToEl, 'focus');
      fireKeyDown(element, 9);
      // First focusable attachTo element should receive focus
      expect(focusSpy).toHaveBeenCalled();

      focusSpy.mockRestore();
      cleanup();
    });

    it('forward Tab from last attachTo element focuses first dialog element', () => {
      const tour = new Tour();
      const attachToEl = document.createElement('button');
      attachToEl.textContent = 'Target';
      container.appendChild(attachToEl);

      const step = new Step(tour, {
        attachTo: { element: attachToEl, on: 'bottom' },
        buttons: [{ text: 'Next', action: () => {} }]
      });

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      // Focus the last attachTo element (the button itself, since it's the only one)
      attachToEl.focus();

      const dialogBtn = element.querySelector('button.shepherd-button');
      const focusSpy = vi.spyOn(dialogBtn, 'focus');
      // Fire on the attachTo element
      fireKeyDown(attachToEl, 9);
      expect(focusSpy).toHaveBeenCalled();

      focusSpy.mockRestore();
      cleanup();
    });

    it('unhandled key falls through to default case', () => {
      const tour = new Tour();
      const step = new Step(tour, {});

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      // Press an unrelated key (e.g. 'A' = keyCode 65) and ensure nothing breaks
      fireKeyDown(element, 65);
      // No error thrown, element is still in DOM
      expect(element.parentNode).toBe(container);

      cleanup();
    });
  });

  describe('accessible name', () => {
    function build(stepOptions, tourOptions) {
      const tour = new Tour(tourOptions);
      const step = new Step(tour, stepOptions);

      const { element, cleanup } = createShepherdElement({
        descriptionId: 'test-desc',
        labelId: 'test-label',
        step
      });
      container.appendChild(element);

      return { element, cleanup, step };
    }

    it('no title and no label leaves the dialog with no naming attribute', () => {
      const { element, cleanup } = build({ text: 'Lorem Ipsum' });

      expect(element).not.toHaveAttribute('aria-label');
      expect(element).not.toHaveAttribute('aria-labelledby');

      cleanup();
    });

    it('label sets aria-label when there is no title', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        label: 'Welcome tour'
      });

      expect(element.getAttribute('aria-label')).toBe('Welcome tour');
      expect(element).not.toHaveAttribute('aria-labelledby');

      cleanup();
    });

    it('label can be a function returning a string', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        label: () => 'Welcome tour'
      });

      expect(element.getAttribute('aria-label')).toBe('Welcome tour');

      cleanup();
    });

    it('label function is called with the step itself as `this`', () => {
      let seenThis;
      const { cleanup, step } = build({
        id: 'test-step',
        text: 'Lorem Ipsum',
        label: function () {
          seenThis = this;
          return 'Welcome tour';
        }
      });

      // Identity, not a shape match: `step.options` and any `{ id }` stand-in
      // must not satisfy this.
      expect(seenThis).toBe(step);

      cleanup();
    });

    it('label sets aria-label on a step attached to an element', () => {
      const testElement = document.createElement('div');
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        attachTo: { element: testElement, on: 'top' },
        label: 'Welcome tour'
      });

      expect(element.getAttribute('aria-label')).toBe('Welcome tour');

      cleanup();
    });

    it('label sets aria-label on a step with no text', () => {
      const { element, cleanup } = build({ label: 'Welcome tour' });

      expect(element.getAttribute('aria-label')).toBe('Welcome tour');
      expect(element).not.toHaveAttribute('aria-describedby');

      cleanup();
    });

    it('label is inherited from defaultStepOptions', () => {
      const { element, cleanup } = build(
        { text: 'Lorem Ipsum' },
        { defaultStepOptions: { label: 'Welcome tour' } }
      );

      expect(element.getAttribute('aria-label')).toBe('Welcome tour');

      cleanup();
    });

    it('a function label is inherited from defaultStepOptions', () => {
      const { element, cleanup } = build(
        { text: 'Lorem Ipsum' },
        { defaultStepOptions: { label: () => 'Welcome tour' } }
      );

      expect(element.getAttribute('aria-label')).toBe('Welcome tour');

      cleanup();
    });

    it('title wins over label when both are set', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        title: 'Test',
        label: 'Ignored'
      });

      expect(element.getAttribute('aria-labelledby')).toBe('test-label');
      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('a function label is never invoked when title wins', () => {
      const label = vi.fn(() => 'Ignored');
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        title: 'Test',
        label
      });

      // Not merely discarded — never called. A `label` that throws (an i18n
      // catalog that is not loaded yet, say) must not break a titled step.
      expect(label).not.toHaveBeenCalled();
      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('a throwing label does not break a titled step', () => {
      expect(() =>
        build({
          text: 'Lorem Ipsum',
          title: 'Test',
          label: () => {
            throw new Error('i18n not ready');
          }
        })
      ).not.toThrow();
    });

    it('title alone still sets aria-labelledby and no aria-label', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        title: 'Test'
      });

      expect(element.getAttribute('aria-labelledby')).toBe('test-label');
      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('empty string label does not emit an empty aria-label', () => {
      const { element, cleanup } = build({ text: 'Lorem Ipsum', label: '' });

      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('function returning an empty string does not emit an empty aria-label', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        label: () => ''
      });

      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('whitespace-only label does not emit an aria-label', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        label: '   '
      });

      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('function returning a whitespace-only string does not emit an aria-label', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        label: () => '\n\t '
      });

      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('a non-string label is ignored rather than stringified', () => {
      // `label` is typed `string | (() => string)`, but plain-JS consumers can
      // pass anything. Coercing would write names like `[object Object]`.
      const { element, cleanup } = build({ text: 'Lorem Ipsum', label: {} });

      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('a label function returning a non-string is ignored', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        label: () => 42
      });

      expect(element).not.toHaveAttribute('aria-label');

      cleanup();
    });

    it('a padded label is emitted with its surrounding whitespace intact', () => {
      const { element, cleanup } = build({
        text: 'Lorem Ipsum',
        label: '  Welcome tour  '
      });

      // Only the truthiness gate trims; the author's string is written as-is.
      expect(element.getAttribute('aria-label')).toBe('  Welcome tour  ');

      cleanup();
    });
  });
});
