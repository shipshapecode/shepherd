import setupTour from '../utils/setup-tour';
import tippy from 'tippy.js';
import { assert } from 'chai';

describe('Modal mode', () => {
  let Shepherd;
  let tour;

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

  afterEach(() => {
    tour.complete();
  });

  describe('Modal enabled', () => {
    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, {
        useModalOverlay: true
      });
    });

    it('Displaying the modal during tours when modal mode is enabled', () => {
      tour.start();

      cy.get('.shepherd-modal-overlay-container').should('have.css', 'opacity', '0.5');
      cy.get('body').should('have.class', 'shepherd-modal-is-visible');
    });
  });

  describe('Modal disabled', () => {
    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, {
        useModalOverlay: false
      });
    });

    it('Hiding the modal during tours when modal mode is not enabled', () => {
      tour.start();

      cy.get('.shepherd-modal-overlay-container').should('have.css', 'opacity', '0');
      cy.get('body').should('not.have.class', 'shepherd-modal-is-visible');
    });
  });

  describe('hide', () => {
    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, { useModalOverlay: true });
    });

    it('removes shepherd-modal-is-visible class from the BODY', () => {
      tour.start();
      cy.get('body').should('have.class', 'shepherd-modal-is-visible');

      setTimeout(() => {
        tour.hide();
        cy.get('body').should('not.have.class', 'shepherd-modal-is-visible');
      }, 0);
    });
  });

  describe('highlight', () => {
    const steps = () => {
      return [
        {
          attachTo: {
            element: '.hero-welcome',
            on: 'bottom'
          },
          highlightClass: 'highlight',
          id: 'test-highlight',
          text: 'Testing highlight'
        }
      ];
    };

    beforeEach(() => {
      tour = setupTour(Shepherd, {}, steps, {
        useModalOverlay: true
      });
    });

    it('applying highlight classes to the target element', () => {
      tour.start();

      assert.isOk(tour.getCurrentStep().target.classList.contains('highlight'));
    });
  });
});
