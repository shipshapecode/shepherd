import setupTour from '../utils/setup-tour';
import tippy from 'tippy.js';
import {
  elementIds as modalElementIds,
  classNames as modalClassNames
} from '../../../src/js/utils/modal';
import { assert } from 'chai';

describe('Modal mode', () => {
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

  describe('Modal enabled', () => {
    let tour;

    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, {
        useModalOverlay: true
      });
    });

    afterEach(() => {
      tour.complete();
    });

    it('Displaying the modal during tours when modal mode is enabled', () => {
      tour.start();

      cy.get(`#${modalElementIds.modalOverlay}`).should('have.css', 'display', 'block');
      cy.get('body').should('have.class', modalClassNames.isVisible);
    });
  });

  describe('Modal disabled', () => {
    let tour;

    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, {
        useModalOverlay: false
      });
    });

    afterEach(() => {
      tour.complete();
    });

    it('Hiding the modal during tours when modal mode is not enabled', () => {
      tour.start();

      cy.get(`#${modalElementIds.modalOverlay}`).should('have.css', 'display', 'none');
      cy.get('body').should('not.have.class', modalClassNames.isVisible);
    });
  });

  describe('highlight', () => {
    let tour;

    const steps = () => {
      return [
        {
          id: 'test-highlight',
          options: {
            attachTo: '.hero-welcome bottom',
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

    afterEach(() => {
      tour.complete();
    });

    it('applying highlight classes to the target element', () => {
      tour.start();

      assert.isOk(tour.getCurrentStep().target.classList.contains('highlight'));
    });
  });
});
