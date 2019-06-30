import setupTour from '../utils/setup-tour';
import tippy from 'tippy.js';

describe('Attaching tooltips to target elements in the DOM on each step', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;
    tippy.setDefaultProps({ duration: 0, delay: 0 });

    cy.visit('/test/dummy/', {
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
});
