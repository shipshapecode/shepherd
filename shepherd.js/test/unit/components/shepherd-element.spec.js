import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createShepherdElement } from '../../../src/components/shepherd-element.ts';
import { Step } from '../../../src/step';
import { Tour } from '../../../src/tour';

function fireKeyDown(el, keyCode) {
  el.dispatchEvent(new KeyboardEvent('keydown', { keyCode, bubbles: true }));
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
  });
});
