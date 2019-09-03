import { expect } from 'chai';
import { render, cleanup, fireEvent } from '@testing-library/svelte';
import ShepherdElement from '../../../src/js/components/shepherd-element/index.svelte';
import { Step } from '../../../src/js/step.js';
import { spy, stub } from 'sinon';
import { Tour } from '../../../src/js/tour.js';

describe('components/ShepherdElement', () => {
  const styles = {
    content: ' shepherd-content',
    element: ' shepherd-element',
    header: ' shepherd-header',
    text: ' shepherd-text'
  };

  describe('handleKeyDown', () => {
    beforeEach(cleanup);

    it('exitOnEsc: true - ESC cancels the tour', async () => {
      const tour = new Tour();
      const step = new Step(tour, {});
      const stepCancelSpy = spy(step, 'cancel');

      const { container } = render(ShepherdElement, {
        props: {
          step,
          styles
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 27 });
      expect(stepCancelSpy.called).to.be.true;
    });

    it('exitOnEsc: false - ESC does not cancel the tour', async () => {
      const tour = new Tour({ exitOnEsc: false });
      const step = new Step(tour, {});
      const stepCancelSpy = spy(step, 'cancel');

      const { container } = render(ShepherdElement, {
        props: {
          step,
          styles
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 27 });
      expect(stepCancelSpy.called).to.be.false;
    });

    it('keyboardNavigation: true - arrow keys move between steps', async () => {
      const tour = new Tour();
      const step = new Step(tour, {});

      const tourBackStub = stub(tour, 'back');
      const tourNextStub = stub(tour, 'next');

      expect(tourBackStub.called).to.be.false;
      expect(tourNextStub.called).to.be.false;

      const { container } = render(ShepherdElement, {
        props: {
          step,
          styles
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 39 });
      expect(tourNextStub.called).to.be.true;

      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 37 });
      expect(tourBackStub.called).to.be.true;

      tourBackStub.restore();
      tourNextStub.restore();
    });

    it('keyboardNavigation: false - arrow keys do not move between steps', async () => {
      const tour = new Tour({ keyboardNavigation: false });
      const step = new Step(tour, {});

      const tourBackStub = stub(tour, 'back');
      const tourNextStub = stub(tour, 'next');

      expect(tourBackStub.called).to.be.false;
      expect(tourNextStub.called).to.be.false;

      const { container } = render(ShepherdElement, {
        props: {
          step,
          styles
        }
      });
      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 39 });
      expect(tourNextStub.called).to.be.false;

      fireEvent.keyDown(container.querySelector('.shepherd-element'), { keyCode: 37 });
      expect(tourBackStub.called).to.be.false;

      tourBackStub.restore();
      tourNextStub.restore();
    });
  });
});
