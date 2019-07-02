import setupTour from '../utils/setup-tour';
import tippy from 'tippy.js';
import {
  elementIds as modalElementIds,
  classNames as modalClassNames
} from '../../../src/js/utils/modal';
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

      cy.get(`#${modalElementIds.modalOverlay}`).should('have.css', 'display', 'block');
      cy.get('body').should('have.class', modalClassNames.isVisible);
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

      cy.get(`#${modalElementIds.modalOverlay}`).should('have.css', 'display', 'none');
      cy.get('body').should('not.have.class', modalClassNames.isVisible);
    });
  });

  describe('hide', () => {
    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, { useModalOverlay: true });
    });

    it('removes shepherd-modal-is-visible class from the BODY', () => {
      tour.start();
      cy.get('body').should('have.class', modalClassNames.isVisible);

      setTimeout(() => {
        tour.hide();
        cy.get('body').should('not.have.class', modalClassNames.isVisible);
      }, 0);
    });
  });

  describe('highlight', () => {
    const steps = () => {
      return [
        {
          id: 'test-highlight',
          options: {
            attachTo: {
              element:'.hero-welcome',
              on:'bottom'
            },
            highlightClass: 'highlight',
            text: 'Testing highlight'
          }
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
