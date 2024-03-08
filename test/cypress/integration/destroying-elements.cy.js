import setupTour from '../utils/setup-tour';

describe('destroying-elements', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/examples/destroying-elements', {
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

    let initialPosition;
    let missingStepElementPosition;
    let finalPosition;

    cy.get('[data-shepherd-step-id="first"]').then((stepElement) => {
      initialPosition = stepElement.css(['position', 'top', 'left']);
      tour.next();

      return cy.get('.first');
    })
    .then((firstElement) => {
      // Remove the first element
      firstElement.remove();

      tour.back();
      cy.wait(250);

      return cy.get('[data-shepherd-step-id="first"]');
    })
    .then((stepElement2) => {
      missingStepElementPosition = stepElement2.css(['position', 'top', 'left']);
      expect(missingStepElementPosition).to.not.deep.equal(initialPosition);

      tour.next();

      return cy.document();
    })
    .then((document) => {
      // Create the first element again
      const first = document.createElement('div');
      first.className = 'first';
      first.textContent = 'First';
      document.body.appendChild(first);

      tour.back();

      cy.wait(250);

      return cy.get('[data-shepherd-step-id="first"]');
    })
    .then((stepElement3) => {
      finalPosition = stepElement3.css(['position', 'top', 'left']);
      expect(finalPosition).to.deep.equal(initialPosition);
    });

  });
});
