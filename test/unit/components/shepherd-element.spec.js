import { vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import ShepherdElement from '../../../shepherd.js/src/components/shepherd-element.svelte';
import { Step } from '../../../shepherd.js/src/step';
import { Tour } from '../../../shepherd.js/src/tour';

describe('components/ShepherdElement', () => {
  describe('arrow', () => {
    beforeEach(cleanup);

    it('arrows shown by default', async () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        attachTo: { element: testElement, on: 'top' }
      });

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(1);
    });

    it('arrow: false hides arrows', async () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        arrow: false,
        attachTo: { element: testElement, on: 'top' }
      });

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(0);
    });

    it('arrow: object with padding shows arrow', async () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        arrow: { padding: 10 },
        attachTo: { element: testElement, on: 'top' }
      });

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(1);
    });
    
    it('arrow: empty object shows arrow', async () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        arrow: {},
        attachTo: { element: testElement, on: 'top' }
      });

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(1);
    });
  });

  describe('handleKeyDown', () => {
    beforeEach(cleanup);

    it('exitOnEsc: true - ESC cancels the tour', async () => {
      const tour = new Tour();
      const step = new Step(tour, {});
      const stepCancelSpy = vi.spyOn(step, 'cancel');

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), {
        keyCode: 27
      });
      expect(stepCancelSpy).toHaveBeenCalled();
    });

    it('exitOnEsc: false - ESC does not cancel the tour', async () => {
      const tour = new Tour({ exitOnEsc: false });
      const step = new Step(tour, {});
      const stepCancelSpy = vi.spyOn(step, 'cancel');

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), {
        keyCode: 27
      });
      expect(stepCancelSpy).not.toHaveBeenCalled();
    });

    it('keyboardNavigation: true - arrow keys move between steps', async () => {
      const tour = new Tour();
      const step = new Step(tour, {});
      let propagateValue = 0;

      const tourBackStub = vi
        .spyOn(tour, 'back')
        .mockImplementation(() => {});
      const tourNextStub = vi
        .spyOn(tour, 'next')
        .mockImplementation(() => {});

      // Add a keystroke listener to a parent to test event propagation
      document.body.addEventListener('keydown', (event) => {
        // listen to ESC, KEY_RIGHT, KEY_LEFT
        if ([27, 37, 39].includes(event.keyCode)) {
          propagateValue += 1;
        }
      });

      expect(tourBackStub).not.toHaveBeenCalled();
      expect(tourNextStub).not.toHaveBeenCalled();

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), {
        keyCode: 39
      });
      expect(tourNextStub).toHaveBeenCalled();
      // There should be no event propagation
      expect(propagateValue).toBe(0);

      fireEvent.keyDown(container.querySelector('.shepherd-element'), {
        keyCode: 37
      });
      expect(tourBackStub).toHaveBeenCalled();
      // There should be no event propagation
      expect(propagateValue).toBe(0);

      tourBackStub.mockRestore();
      tourNextStub.mockRestore();
    });

    it('keyboardNavigation: false - arrow keys do not move between steps', async () => {
      const tour = new Tour({ keyboardNavigation: false });
      const step = new Step(tour, {});
      let propagateValue = 0;

      const tourBackStub = vi
        .spyOn(tour, 'back')
        .mockImplementation(() => {});
      const tourNextStub = vi
        .spyOn(tour, 'next')
        .mockImplementation(() => {});

      // Add a keystroke listener to a parent to test event propagation
      document.body.addEventListener('keydown', (event) => {
        // listen to ESC, KEY_RIGHT, KEY_LEFT
        if ([27, 37, 39].includes(event.keyCode)) {
          propagateValue += 1;
        }
      });

      expect(tourBackStub).not.toHaveBeenCalled();
      expect(tourNextStub).not.toHaveBeenCalled();

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), {
        keyCode: 39
      });
      expect(tourNextStub).not.toHaveBeenCalled();
      // There should be event propagation
      expect(propagateValue).toBe(1);

      fireEvent.keyDown(container.querySelector('.shepherd-element'), {
        keyCode: 37
      });
      expect(tourBackStub).not.toHaveBeenCalled();
      // There should be another event propagation
      expect(propagateValue).toBe(2);

      tourBackStub.mockRestore();
      tourNextStub.mockRestore();
    });
  });
});
