import setupTour from '../utils/setup-tour';

describe('Attaching tooltips to target elements in the DOM on each step', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/dummy/', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return Shepherd = contentWindow.Shepherd;
        }
      }
    });
  });

  describe('Adding/Removing class names to the target of the current step', () => {
    let tour;

    beforeEach(() => {
      tour = setupTour(Shepherd);
    });

    afterEach(() => {
      tour.complete();
    });

    it('Adds the "shepherd-target" and "shepherd-enabled" classes upon showing a step', () => {
      tour.start();

      cy.get('[data-test-hero-welcome]')
        .should('have.class', 'shepherd-target')
        .and('have.class', 'shepherd-enabled');
    });

    it('Removes the "shepherd-target" and "shepherd-enabled" upon hiding a step', () => {
      tour.start();
      tour.next();

      cy.get('[data-test-hero-welcome]')
        .should('not.have.class', 'shepherd-target')
        .and('not.have.class', 'shepherd-enabled');
    });
  });

  describe('Unique selectors with multiple Tours', function() {
    let firstTour, secondTour;

    beforeEach(() => {
      firstTour = setupTour(Shepherd, {}, null, {
        tourName: 'firstTour',
        defaultStepOptions: {
          classes: 'tour-test-1'
        }
      });
      // setup a second tour with a unique name
      secondTour = setupTour(Shepherd, {}, null, {
        tourName: 'secondTour',
        defaultStepOptions: {
          classes: 'tour-test-2'
        }
      });
    });

    afterEach(() => {
      firstTour.complete();
      secondTour.complete();
    });
    it('applies default classes only on each individual tour', async function() {
      firstTour.start();
      secondTour.start();

      cy.get('.shepherd-element').should('have.length', 2);
      cy.get('.test-tour-1.shepherd-element').should('have.length', 1);
      cy.get('.test-tour-2.shepherd-element').should('have.length', 1);
    });
  });
});
