import setupTour from '../utils/setup-tour';

describe('a11y', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/test/dummy/', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return Shepherd = contentWindow.Shepherd;
        }
      }
    });
  });

  describe('focus', () => {
    let tour;

    beforeEach(() => {
      tour = setupTour(Shepherd);
    });

    afterEach(() => {
      tour.complete();
    });

    it('shepherd-element should have focus on tour start', () => {
      tour.start();

      cy.get('.shepherd-element').should('have.focus');
    });
  });

  describe('keydown events', () => {
    let tour;

    beforeEach(() => {
      tour = setupTour(Shepherd);
    });

    afterEach(() => {
      tour.complete();
    });

    it('arrows trigger back/next', () => {
      tour.start();

      cy.get('.first-step').should('be.visible');
      cy.get('.first-step').trigger('keydown', { keyCode: 39 });
      cy.get('.second-step').should('be.visible');
      cy.get('.second-step').trigger('keydown', { keyCode: 37 });
      cy.get('.first-step').should('be.visible');
    });

    it('ESC cancels the tour', () => {
      tour.start();

      cy.get('.shepherd-element').should('have.attr', 'data-shepherd-step-id');
      cy.get('.shepherd-element').trigger('keydown', { keyCode: 27 });
      cy.get('.shepherd-element').should('not.exist');
    });

    it('Tab is focus trapped inside the modal', () => {
      tour.start();

      cy.document().then(() => {
        cy.get('.shepherd-element').tab().tab().tab().tab().tab().tab();
        cy.get('[data-test-popper-link]').should('have.focus');
      });
    });
  });
});
