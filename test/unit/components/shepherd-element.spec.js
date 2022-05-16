import { cleanup, fireEvent, render } from '@testing-library/svelte';
import ShepherdElement from '../../../src/js/components/shepherd-element.svelte';
import { Step } from '../../../src/js/step.js';
import { spy, stub } from 'sinon';
import { Tour } from '../../../src/js/tour.js';

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

      const tourBackStub = stub(tour, 'back');
      const tourNextStub = stub(tour, 'next');

      expect(tourBackStub.called).toBe(false);
      expect(tourNextStub.called).toBe(false);

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 39 });
      expect(tourNextStub.called).toBe(true);

      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 37 });
      expect(tourBackStub.called).toBe(true);

      tourBackStub.restore();
      tourNextStub.restore();
    });

    it('keyboardNavigation: false - arrow keys do not move between steps', async() => {
      const tour = new Tour({ keyboardNavigation: false });
      const step = new Step(tour, {});

      const tourBackStub = stub(tour, 'back');
      const tourNextStub = stub(tour, 'next');

      expect(tourBackStub.called).toBe(false);
      expect(tourNextStub.called).toBe(false);

      const { container } = render(ShepherdElement, {
        props: {
          step
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 39 });
      expect(tourNextStub.called).toBe(false);

      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 37 });
      expect(tourBackStub.called).toBe(false);

      tourBackStub.restore();
      tourNextStub.restore();
    });
  });
});
