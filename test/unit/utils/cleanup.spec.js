import { cleanupSteps } from '../../../shepherd.js/src/utils/cleanup';

describe('Cleanup Utils', function() {
  // Create some elements to use to attach to
  const firstAttachElement = document.createElement('div');
  firstAttachElement.classList.add('first-attach-to');
  firstAttachElement.classList.add('shepherd-target-click-disabled');
  document.body.appendChild(firstAttachElement);

  const secondAttachElement = document.createElement('div');
  secondAttachElement.classList.add('second-attach-to');
  secondAttachElement.classList.add('shepherd-target-click-disabled');
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
    it('cleans up steps and removes shepherd-target-click-disabled class', () => {
      expect(firstAttachElement).toHaveClass('shepherd-target-click-disabled');
      expect(secondAttachElement).toHaveClass('shepherd-target-click-disabled');

      cleanupSteps(mockedTour);

      expect(firstAttachElement).not.toHaveClass('shepherd-target-click-disabled');
      expect(secondAttachElement).not.toHaveClass('shepherd-target-click-disabled');
    });
  });
});
