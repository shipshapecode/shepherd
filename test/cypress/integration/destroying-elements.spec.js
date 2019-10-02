import setupTour from '../utils/setup-tour';

describe('destroying-elements', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/test/examples/destroying-elements', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return Shepherd = contentWindow.Shepherd;
        }
      }
    });
  });

  it('recalculates positioning when element is removed and added', () => {
    const steps = () => {
      return [
        {
          attachTo: { element: '.first', on: 'bottom' },
          id: 'first',
          title: 'First step',
          text: 'this is fine the first time'
        },
        {
          attachTo: { element: '.second', on: 'bottom' },
          id: 'second',
          title: 'Second step',
          text: 'Please click the destroy button and then the create button. After the First element is created, please click back'
        }
      ];
    };

    const tour = setupTour(Shepherd, {
      cancelIcon: {
        enabled: false
      }
    }, steps);

    tour.start();

    cy.wait(250);

    cy.get('[data-shepherd-step-id="first"]').then((stepElement) => {
      const initialFirstStepTransform = stepElement[0].style.transform;

      cy.document().then((document) => {
        tour.next();

        // Remove the first element
        document.querySelector('.first').remove();

        tour.back();

        cy.wait(250);

        cy.get('[data-shepherd-step-id="first"]').then((stepElement2) => {
          const secondFirstStepTransform = stepElement2[0].style.transform;

          expect(initialFirstStepTransform).to.not.equal(secondFirstStepTransform);

          tour.next();

          // Create the first element again
          const first = document.createElement('div');
          first.className = 'first';
          first.textContent = 'First';
          document.body.appendChild(first);

          tour.back();

          cy.wait(250);

          cy.get('[data-shepherd-step-id="first"]').then((stepElement3) => {
            const finalFirstStepTransform = stepElement3[0].style.transform;
            expect(finalFirstStepTransform).to.equal(initialFirstStepTransform);
          });
        });
      });
    });
  });
});
