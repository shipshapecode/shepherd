import { cleanup, fireEvent, render } from '@testing-library/svelte';
import ShepherdElement from '../../../src/js/components/shepherd-element.svelte';
import { Step } from '../../../src/js/step';
import { spy, stub } from 'sinon';
import { Tour } from '../../../src/js/tour';

describe('components/ShepherdElement', () => {
  describe('arrow', () => {
    beforeEach(cleanup);

    it('arrows shown by default', async() => {
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

      expect(container.querySelectorAll('.shepherd-element .shepherd-arrow').length).toBe(1);
    });

    it('arrow: false hides arrows', async() => {
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

      expect(container.querySelectorAll('.shepherd-element .shepherd-arrow').length).toBe(0);
    });
  });

  describe('handleKeyDown', () => {
    beforeEach(cleanup);

    it('exitOnEsc: true - ESC cancels the tour', async() => {
      const tour = new Tour();
      const step = new Step(tour, {});
      const stepCancelSpy = spy(step, 'cancel');

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 27 });
      expect(stepCancelSpy.called).toBe(true);
    });

    it('exitOnEsc: false - ESC does not cancel the tour', async() => {
      const tour = new Tour({ exitOnEsc: false });
      const step = new Step(tour, {});
      const stepCancelSpy = spy(step, 'cancel');

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 27 });
      expect(stepCancelSpy.called).toBe(false);
    });

    it('keyboardNavigation: true - arrow keys move between steps', async() => {
      const tour = new Tour();
      const step = new Step(tour, {});
      let propagateValue = 0;

      const tourBackStub = stub(tour, 'back');
      const tourNextStub = stub(tour, 'next');

      // Add a keystroke listener to a parent to test event propagation
      document.body.addEventListener('keydown', (event) => {
        // listen to ESC, KEY_RIGHT, KEY_LEFT
        if ([27, 37, 39].includes(event.keyCode)) {
          propagateValue += 1;
        }
      });

      expect(tourBackStub.called).toBe(false);
      expect(tourNextStub.called).toBe(false);

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 39 });
      expect(tourNextStub.called).toBe(true);
      // There should be no event propagation
      expect(propagateValue).toBe(0);

      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 37 });
      expect(tourBackStub.called).toBe(true);
      // There should be no event propagation
      expect(propagateValue).toBe(0);

      tourBackStub.restore();
      tourNextStub.restore();
    });

    it('keyboardNavigation: false - arrow keys do not move between steps', async() => {
      const tour = new Tour({ keyboardNavigation: false });
      const step = new Step(tour, {});
      let propagateValue = 0;

      const tourBackStub = stub(tour, 'back');
      const tourNextStub = stub(tour, 'next');

      // Add a keystroke listener to a parent to test event propagation
      document.body.addEventListener('keydown', (event) => {
        // listen to ESC, KEY_RIGHT, KEY_LEFT
        if ([27, 37, 39].includes(event.keyCode)) {
          propagateValue += 1;
        }
      });

      expect(tourBackStub.called).toBe(false);
      expect(tourNextStub.called).toBe(false);

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 39 });
      expect(tourNextStub.called).toBe(false);
      // There should be event propagation
      expect(propagateValue).toBe(1);

      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 37 });
      expect(tourBackStub.called).toBe(false);
      // There should be another event propagation
      expect(propagateValue).toBe(2);

      tourBackStub.restore();
      tourNextStub.restore();
    });
  });
});
