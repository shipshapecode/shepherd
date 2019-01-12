import { cleanupSteps, cleanupStepEventListeners } from '../../../src/js/utils/cleanup';

describe('Cleanup Utils', function() {
  // Create some elements to use to attach to
  const firstAttachElement = document.createElement('div');
  firstAttachElement.classList.add('first-attach-to');
  firstAttachElement.style.pointerEvents = 'none';
  document.body.appendChild(firstAttachElement);

  const secondAttachElement = document.createElement('div');
  secondAttachElement.classList.add('second-attach-to');
  secondAttachElement.style.pointerEvents = 'none';
  document.body.appendChild(secondAttachElement);

  const mockedTour = {
    steps: [
      {
        options: {
          attachTo: '.first-attach-to bottom',
          canClickTarget: false
        }
      },
      {
        options: {
          attachTo: '.second-attach-to bottom',
          canClickTarget: false
        }
      }
    ]
  };

  describe('cleanupSteps', function() {
    it('cleans up steps and sets pointer-events to auto', () => {
      cleanupSteps(mockedTour);

      expect(firstAttachElement).toHaveStyle('pointer-events: auto');
      expect(secondAttachElement).toHaveStyle('pointer-events: auto');
    });
  });

  describe('cleanupStepEventListeners', function() {
    it('removes listeners', () => {
      const mock = {
        _onScreenChange() {}
      };

      cleanupStepEventListeners.call(mock);

      expect(mock._onScreenChange).toBe(null);
    });
  });
});