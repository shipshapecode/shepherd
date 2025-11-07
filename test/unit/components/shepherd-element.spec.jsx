import { vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/preact';
import { h } from 'preact';
import ShepherdElement from '../../../shepherd.js/src/components/shepherd-element';
import { Step } from '../../../shepherd.js/src/step';
import { Tour } from '../../../shepherd.js/src/tour';

describe('components/ShepherdElement', () => {
  describe('arrow', () => {
    afterEach(cleanup);

    it('arrows shown by default', async () => {
      const testElement = document.createElement('div');
      const tour = new Tour();
      const step = new Step(tour, {
        attachTo: { element: testElement, on: 'top' }
      });

      const { container } = render(
        <ShepherdElement
          classPrefix=""
          descriptionId="test-desc"
          labelId="test-label"
          step={step}
        />
      );

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

      const { container } = render(
        <ShepherdElement
          classPrefix=""
          descriptionId="test-desc"
          labelId="test-label"
          step={step}
        />
      );

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

      const { container } = render(
        <ShepherdElement
          classPrefix=""
          descriptionId="test-desc"
          labelId="test-label"
          step={step}
        />
      );

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

      const { container } = render(
        <ShepherdElement
          classPrefix=""
          descriptionId="test-desc"
          labelId="test-label"
          step={step}
        />
      );

      expect(
        container.querySelectorAll('.shepherd-element .shepherd-arrow').length
      ).toBe(1);
    });
  });

  describe('classes', () => {
    afterEach(cleanup);

    it('has .shepherd-has-title when there is a title', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        title: 'Test Title'
      });

      const { container } = render(
        <ShepherdElement
          classPrefix=""
          descriptionId="test-desc"
          labelId="test-label"
          step={step}
        />
      );

      expect(container.querySelector('.shepherd-element')).toHaveClass('shepherd-has-title');
    });

    it('does not have .shepherd-has-title when there is no title', () => {
      const tour = new Tour();
      const step = new Step(tour, {});

      const { container } = render(
        <ShepherdElement
          classPrefix=""
          descriptionId="test-desc"
          labelId="test-label"
          step={step}
        />
      );

      expect(container.querySelector('.shepherd-element')).not.toHaveClass('shepherd-has-title');
    });

    it('has .shepherd-has-cancel-icon when cancelIcon is enabled', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: { enabled: true }
      });

      const { container } = render(
        <ShepherdElement
          classPrefix=""
          descriptionId="test-desc"
          labelId="test-label"
          step={step}
        />
      );

      expect(container.querySelector('.shepherd-element')).toHaveClass('shepherd-has-cancel-icon');
    });
  });

  describe('keydown events', () => {
    afterEach(cleanup);

    it('cancels tour when ESC key is pressed and exitOnEsc is true', () => {
      const tour = new Tour({ exitOnEsc: true });
      const step = new Step(tour, {});
      const cancelSpy = vi.spyOn(step, 'cancel');

      const { container } = render(
        <ShepherdElement
          classPrefix=""
          descriptionId="test-desc"
          labelId="test-label"
          step={step}
        />
      );

      const dialog = container.querySelector('.shepherd-element');
      fireEvent.keyDown(dialog, { keyCode: 27 });

      expect(cancelSpy).toHaveBeenCalled();
    });
  });
});
