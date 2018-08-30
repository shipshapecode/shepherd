import setupTour from '../utils/setup-tour';
import { assert } from 'chai';

let Shepherd;

describe('Shepherd Acceptance Tests', () => {
  beforeEach(() => {
    Shepherd = null;

    cy.visit('http://localhost:8080/test/dummy/', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return Shepherd = contentWindow.Shepherd;
        }
      }
    });
  });

  describe('attachTo', () => {
    it('works with selectors', () => {
      const steps = () => {
        return [
          {
            id: 'welcome',
            options: {
              text: ['Shepherd is a javascript library for guiding users through your app. It uses <a href="https://popper.js.org/">Popper.js</a>, another open source library, to position all of its steps.', 'Popper makes sure your steps never end up off screen or cropped by an overflow. Try resizing your browser to see what we mean.'],
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
        .contains('Shepherd is a javascript library').should('be.visible');
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
                text: 'Including Shepherd is easy! Just include popper.js, shepherd.js, and a Shepherd theme file.',
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
        .contains('Shepherd is a javascript library').should('be.visible');
      // Click next
      cy.contains('Next').click();
      // Step two text should be visible
      cy.get('.shepherd-text')
        .contains('Including Shepherd is easy!').should('be.visible');
      // Step one text should be hidden
      cy.get('.shepherd-text')
        .contains('Shepherd is a javascript library').should('not.be.visible');
      // Click back
      cy.contains('Back').click();
      // Step one text should be visible again
      cy.get('.shepherd-text')
        .contains('Shepherd is a javascript library').should('be.visible');
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

  it.skip('Defaults classes applied', () => {
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
});
