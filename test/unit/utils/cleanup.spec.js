import { cleanupSteps } from '../../../src/js/utils/cleanup';

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
          attachTo: {
            element: '.first-attach-to',
            on: 'bottom'
          },
          canClickTarget: false
        },
        // Manually add the target. The tour would do this, if it were a real tour
        target: firstAttachElement
      },
      {
        options: {
          attachTo: {
            element: '.second-attach-to',
            on: 'bottom'
          },
          canClickTarget: false
        },
        // Manually add the target. The tour would do this, if it were a real tour
        target: secondAttachElement
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
});
