import setupTour from '../utils/setup-tour';
import { assert, expect } from 'chai';

describe('Modal mode', () => {
  let Shepherd;
  let tour;

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
      cy.get('.shepherd-modal-overlay-container').should('have.class', 'shepherd-modal-is-visible');
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
      cy.get('.shepherd-modal-overlay-container').should('not.have.class', 'shepherd-modal-is-visible');
    });
  });

  describe('hide', () => {
    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, { useModalOverlay: true });
    });

    it('removes shepherd-modal-is-visible class from the overlay', () => {
      tour.start();

      setTimeout(() => {
        cy.get('.shepherd-modal-overlay-container').should('have.class', 'shepherd-modal-is-visible');
        tour.hide();
      }, 0);

      cy.get('.shepherd-modal-overlay-container').should('not.have.class', 'shepherd-modal-is-visible');
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

  describe('Modal with multiple Tours', function () {
    it('only activates one SVG overall', async function () {
      const steps = [
        {
          id: 'test',
          title: 'This is a test step for our tour'
        },
        {
          id: 'test-2',
          title: 'This is a second test step for our tour'
        }
      ];
      tour = setupTour(Shepherd, {}, steps, {
        tourName: 'firstTour',
        useModalOverlay: true
      });
      // setup a second tour with a unique name
      setupTour(Shepherd, {}, null, {
        tourName: 'secondTour'
      });
      tour.start();

      setTimeout(() => {
        expect(cy.get('.shepherd-modal-overlay-container')).to.have.lengthOf(2);
        expect(cy.get('.shepherd-modal-is-visible')).to.have.lengthOf(1);
      }, 0);
    });
  });
});
