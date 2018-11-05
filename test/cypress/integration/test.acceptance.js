import setupTour from '../utils/setup-tour';
import { assert } from 'chai';
import tippy from 'tippy.js';

let Shepherd;

describe('Shepherd Acceptance Tests', () => {
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

  describe('Step options', () => {
    describe('attachTo', () => {
      it('works with selectors', () => {
        const steps = () => {
          return [
            {
              id: 'welcome',
              options: {
                text: ['Shepherd is a JavaScript library'],
                attachTo: {
                  element: '.hero-welcome',
                  on: 'bottom'
                },
                classes: 'shepherd shepherd-transparent-text'
              }
            }
          ];
        };

        const tour = setupTour(Shepherd, {
          showCancelLink: false
        }, steps);

        tour.start();

        // Step text should be visible
        cy.get('.shepherd-text')
          .contains('Shepherd is a JavaScript library').should('be.visible');

        cy.document().then((document) => {
          assert.deepEqual(document.querySelector('.hero-welcome'), tour.getCurrentStep().target, '.hero-welcome is the target');
        });
      });

      it('works with DOM elements', () => {
        cy.document().then((document) => {
          const heroIncludingElement = document.querySelector('.hero-including');

          const steps = () => {
            return [
              {
                id: 'including',
                options: {
                  title: 'Including',
                  text: 'Including Shepherd is easy!',
                  attachTo: {
                    element: heroIncludingElement,
                    on: 'bottom'
                  }
                }
              }
            ];
          };
          const tour = setupTour(Shepherd, {
            showCancelLink: false
          }, steps);
          tour.start();
          // Step text should be visible
          cy.get('.shepherd-text')
            .contains('Including Shepherd is easy!').should('be.visible');
          assert.deepEqual(heroIncludingElement, tour.getCurrentStep().target, 'heroIncludingElement is the target');
        });
      });

      it('works with Shadow DOM elements', () => {
        cy.document().then((document) => {
          const shadowDomElement = document.querySelector('#example-web-component').shadowRoot.querySelector('#shadow-dom-example-step-code');

          const steps = () => {
            return [
              {
                id: 'shadow-dom-selector',
                options: {
                  title: 'Select Shadow DOM',
                  text: 'Selecting Shadow DOM elements is easy!',
                  attachTo: {
                    element: ['#example-web-component', '#shadow-dom-example-step-code'],
                    on: 'bottom'
                  }
                }
              }
            ];
          };
          const tour = setupTour(Shepherd, {
            showCancelLink: false
          }, steps);
          tour.start();
          // Step text should be visible
          cy.get('.shepherd-text')
            .contains('Selecting Shadow DOM elements is easy!').should('be.visible');
          assert.deepEqual(shadowDomElement, tour.getCurrentStep().target, 'shadowDomElement is the target');
        });
      });

      it('works when undefined', () => {
        const steps = () => {
          return [
            {
              id: 'undefined-attachto',
              options: {
                title: 'Undefined attachTo',
                text: 'When attachTo is undefined, the step is centered.'
              }
            }
          ];
        };
        const tour = setupTour(Shepherd, {
          showCancelLink: false
        }, steps);
        tour.start();
        // Step text should be visible
        cy.get('.shepherd-text')
          .contains('When attachTo is undefined, the step is centered.').should('be.visible');
        cy.document().then((document) => {
          assert.deepEqual(document.body, tour.getCurrentStep().target, 'document.body is the target');
        });
      });
    });

    describe('buttons', () => {
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
      it('Cancel link cancels the tour', () => {
        const tour = setupTour(Shepherd);
        tour.start();
        cy.get('body').should('have.class', 'shepherd-active');
        cy.get('.shepherd-cancel-link').click();
        cy.get('body').should('not.have.class', 'shepherd-active');
      });

      it('Cancel link cancels the tour from another step', () => {
        const tour = setupTour(Shepherd);
        tour.start();
        cy.get('body').should('have.class', 'shepherd-active');
        // Click next
        cy.contains('Next').click();
        // Step two text should be visible
        cy.get('.shepherd-text')
          .contains('Including Shepherd is easy!').should('be.visible');
        cy.get('.shepherd-cancel-link:nth-child(2)').click();
        cy.get('body').should('not.have.class', 'shepherd-active');
      });

      it('Hides cancel link', () => {
        const tour = setupTour(Shepherd, {
          showCancelLink: false
        });
        tour.start();
        cy.get('.shepherd-cancel-link')
          .should('not.be.visible');
      });

      it('Shows cancel link', () => {
        const tour = setupTour(Shepherd);
        tour.start();
        cy.get('.shepherd-cancel-link')
          .should('be.visible');
      });
    });

    it.skip('Default classes applied', () => {
      const tour = setupTour(Shepherd, {
        classes: 'test-defaults test-more-defaults'
      });
      tour.start();
      cy.get('.shepherd-element').should('have.class', 'test-defaults');
      cy.get('.shepherd-element').should('have.class', 'test-more-defaults');
    });

    describe('scrollTo', () => {
      it('scrollTo:true scrolls', () => {
        const tour = setupTour(Shepherd, {
          scrollTo: true
        });
        tour.start();
        cy.get('.hero-scroll').should('have.prop', 'scrollTop').and('eq', 0);
        cy.contains('Next').click();
        cy.get('.hero-scroll').should('have.prop', 'scrollTop').and('gt', 0);
      });

      it('scrollTo:false does not scroll', () => {
        const tour = setupTour(Shepherd, {
          scrollTo: false
        });
        tour.start();
        cy.get('.hero-scroll').should('have.prop', 'scrollTop').and('eq', 0);
        cy.contains('Next').click();
        cy.get('.hero-scroll').should('have.prop', 'scrollTop').and('eq', 0);
      });
    });

    describe('overlay', () => {
      it('works and adds overlay elements', () => {
        const steps = () => {
          return [
            {
              id: 'welcome',
              options: {
                text: ['Shepherd is a JavaScript library'],
                attachTo: {
                  element: '.hero-welcome',
                  on: 'bottom'
                },
                overlay: true
              }
            }
          ];
        };

        const tour = setupTour(Shepherd, {
          showCancelLink: false
        }, steps);

        tour.start();

        // overlay elements should be visible
        cy.get('.shepherd-non-target').should('be.visible');
      });

      it('it adds one overlay when no attachTo', () => {
        const steps = () => {
          return [
            {
              id: 'welcome',
              options: {
                text: ['Shepherd is a JavaScript library'],
                overlay: true
              }
            }
          ];
        };

        const tour = setupTour(Shepherd, {
          showCancelLink: false
        }, steps);

        tour.start();

        // one overlay element should be visible
        cy.get('.shepherd-non-target').should('have.length', 1).should('be.visible');
      });

      it('it adds classes to overlay elements', () => {
        const steps = () => {
          return [
            {
              id: 'welcome',
              options: {
                text: ['Shepherd is a JavaScript library'],
                attachTo: {
                  element: '.hero-welcome',
                  on: 'bottom'
                },
                overlay: {
                  classes: 'class1 class2'
                }
              }
            }
          ];
        };

        const tour = setupTour(Shepherd, {
          showCancelLink: false
        }, steps);

        tour.start();

        // overlay elements should have classes
        cy.get('.shepherd-non-target')
          .should('be.visible')
          .should('have.class', 'class1')
          .should('have.class', 'class2');
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

    describe('Cleaning up', () => {
      it('renders no steps when the tour completes', () => {
        const tour = setupTour(Shepherd);

        tour.start();
        tour.complete();

        cy.get('.shepherd-step-element').should('not.exist');
      });
    });
  });
});
