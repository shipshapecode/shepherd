import setupTour from '../utils/setup-tour';
import tippy from 'tippy.js';

describe('Attaching tooltips to target elements in the DOM on each step', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;
    tippy.disableAnimations();

    cy.visit('/test/dummy/', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return Shepherd = contentWindow.Shepherd;
        }
      }
    });
  });

  describe('Adding/Removing class names to the target of the current step', () => {
    it('Adds the "shepherd-target" and "shepherd-enabled" classes upon showing a step', () => {
      const tour = setupTour(Shepherd);
      tour.start();

      cy.get('.hero-welcome')
        .should('have.class', 'shepherd-target')
        .and('have.class', 'shepherd-enabled');
    });

    it('Removes the "shepherd-target" and "shepherd-enabled" upon hiding a step', () => {
      const tour = setupTour(Shepherd);
      tour.start();
      tour.next();

      cy.get('.hero-welcome')
        .should('not.have.class', 'shepherd-target')
        .and('not.have.class', 'shepherd-enabled');
    });
  });
});
