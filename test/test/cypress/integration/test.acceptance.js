import setupTour from '../utils/setup-tour';
import { assert } from 'chai';

let Shepherd;

describe('Shepherd Acceptance Tests', () => {
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

  describe('Step options', () => {
    describe('attachTo', () => {
      it('works with selectors', () => {
        const steps = () => {
          return [
            {
              text: 'Shepherd is a JavaScript library',
              attachTo: {
                element: '.hero-welcome',
                on: 'bottom'
              },
              classes: 'shepherd shepherd-transparent-text',
              id: 'welcome'
            }
          ];
        };

        const tour = setupTour(Shepherd, {
          cancelIcon: {
            enabled: false
          }
        }, steps);

        tour.start();

        // Step text should be visible
        cy.get('.shepherd-text')
          .contains('Shepherd is a JavaScript library').should('be.visible');

        cy.document().then((document) => {
          assert.deepEqual(document.querySelector('[data-test-hero-welcome]'), tour.getCurrentStep().target, 'hero welcome is the target');
        });
      });

      it('works with DOM elements', () => {
        cy.document().then((document) => {
          const heroIncludingElement = document.querySelector('[data-test-hero-including]');

          const steps = () => {
            return [
              {
                title: 'Including',
                text: 'Including Shepherd is easy!',
                attachTo: {
                  element: heroIncludingElement,
                  on: 'bottom'
                },
                id: 'including'
              }
            ];
          };
          const tour = setupTour(Shepherd, {
            cancelIcon: {
              enabled: false
            }
          }, steps);
          tour.start();
          // Step text should be visible
          cy.get('.shepherd-text')
            .contains('Including Shepherd is easy!').should('be.visible');
          assert.deepEqual(heroIncludingElement, tour.getCurrentStep().target, 'heroIncludingElement is the target');
        });
      });

      it('works when undefined', () => {
        const steps = () => {
          return [
            {
              id: 'undefined-attachto',
              title: 'Undefined attachTo',
              text: 'When attachTo is undefined, the step is centered.'
            }
          ];
        };
        const tour = setupTour(Shepherd, {
          cancelIcon: {
            enabled: false
          }
        }, steps);
        tour.start();
        // Step text should be visible
        cy.get('.shepherd-text')
          .contains('When attachTo is undefined, the step is centered.').should('be.visible');
        cy.document().then(() => {
          assert.deepEqual(undefined, tour.getCurrentStep().target, 'target is undefined');
        });
      });
    });

    describe('buttons', () => {
      beforeEach(() => {
        // This is a hack removing the extra page elements so the page does not scroll. Cypress hates scrolling for some reason.
        cy.document().then((document) => {
          const heroFollowup = document.querySelector('.hero-followup');
          heroFollowup.remove();
          const img = document.querySelector('img');
          img.remove();
        });
      });

      it('next/previous buttons work', () => {
        const tour = setupTour(Shepherd);
        tour.start();

        // Step one text should be visible
        cy.get('.shepherd-text')
          .contains('Shepherd is a JavaScript library')
          .should('exist')
          .and('be.visible');

        // Click next
        cy.contains('Next').click();

        // Step two text should be visible
        cy.get('.shepherd-text')
          .contains('Including Shepherd is easy!')
          .should('exist')
          .and('be.visible');

        // Click back
        cy.contains('Back').click();

        // Step one text should be visible again
        cy.get('.shepherd-text')
          .contains('Shepherd is a JavaScript library')
          .should('exist')
          .and('be.visible');
      });
    });

    describe('Cancel Link', () => {
      beforeEach(() => {
        // This is a hack removing the extra page elements so the page does not scroll. Cypress hates scrolling for some reason.
        cy.document().then((document) => {
          const heroFollowup = document.querySelector('.hero-followup');
          heroFollowup.remove();
          const img = document.querySelector('img');
          img.remove();
        });
      });

      it('Cancel link cancels the tour', () => {
        const tour = setupTour(Shepherd);
        tour.start();
        cy.get('.shepherd-element').should(
          'have.attr',
          'data-shepherd-step-id'
        );
        cy.get('.shepherd-cancel-icon').click();
        cy.get('.shepherd-element').should('not.exist');
      });

      it('Cancel link cancels the tour from another step', () => {
        const tour = setupTour(Shepherd);
        tour.start();
        cy.get('.shepherd-element').should(
          'have.attr',
          'data-shepherd-step-id'
        );
        // Click next
        cy.contains('Next').click();
        // Step two text should be visible
        cy.get('.shepherd-text').contains('Including Shepherd is easy!').should('be.visible');
        cy.get('.shepherd-cancel-icon:nth-child(2)').click();
        cy.get('.shepherd-element').should('not.exist');
      });

      it('Hides cancel link', () => {
        const tour = setupTour(Shepherd, {
          cancelIcon: {
            enabled: false
          }
        });
        tour.start();
        cy.get('.shepherd-cancel-icon')
          .should('not.be.visible');
      });

      it('Shows cancel link', () => {
        const tour = setupTour(Shepherd);
        tour.start();
        cy.get('.shepherd-cancel-icon')
          .should('be.visible');
      });
    });

    it('Default classes applied', () => {
      const tour = setupTour(Shepherd, {
        classes: 'test-defaults test-more-defaults'
      });
      tour.start();

      cy.get('.shepherd-element').should('have.class', 'test-defaults');
      cy.get('.shepherd-element').should('have.class', 'test-more-defaults');
    });

    describe('scrolling', () => {
      it('scrollTo:true scrolls', () => {
        cy.scrollTo(0, 0);
        const tour = setupTour(Shepherd, {
          scrollTo: true
        });
        tour.start();
        cy.document().get('body').should('have.prop', 'scrollTop').and('eq', 0);
        tour.next();
        cy.document().get('body').should('have.prop', 'scrollTop').and('gt', 0);
      });

      it('scrollTo:false does not scroll', () => {
        cy.scrollTo(0, 0);
        const tour = setupTour(Shepherd, {
          scrollTo: false
        });
        tour.start();
        cy.document().get('body').should('have.prop', 'scrollTop').and('eq', 0);
        tour.next();
        cy.document().get('body').should('have.prop', 'scrollTop').and('eq', 0);
      });
    });
  });

  describe('Steps: rendering', () => {
    describe('waiting for activation before creating and showing a step tooltip', () => {
      it('renders no steps before the tour has started', () => {
        cy.get('.shepherd-step-element').should('not.exist');
      });

      it('renders a step when the tour has started', () => {
        const tour = setupTour(Shepherd);

        tour.start();

        cy.get('.shepherd-step-element').should('exist');
        cy.get('.shepherd-step-element').should('have.length', 1);
      });
    });
  });
});
