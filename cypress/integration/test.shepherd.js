import setupTour from '../utils/setup-tour';

let Shepherd;

describe('Shepherd Acceptance Tests', () => {
  beforeEach(() => {
    Shepherd = null;

    cy.visit('http://localhost:8080/cypress/dummy/', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return Shepherd = contentWindow.Shepherd;
        }
      }
    });
  });

  it('attachTo works with selectors and DOM elements', () => {
    cy.document().then((document) => {
      const heroIncludingElement = document.querySelector('.hero-including');

      const steps = function(shepherd) {
        return [
          {
            id: 'welcome',
            options: {
              text: ['Shepherd is a javascript library for guiding users through your app. It uses <a href="https://popper.js.org/">Popper.js</a>, another open source library, to position all of its steps.', 'Popper makes sure your steps never end up off screen or cropped by an overflow. Try resizing your browser to see what we mean.'],
              attachTo: {
                element: '.hero-welcome',
                on: 'bottom'
              },
              classes: 'shepherd shepherd-transparent-text',
              buttons: [
                {
                  action: shepherd.cancel,
                  classes: 'shepherd-button-secondary',
                  text: 'Exit'
                }, {
                  action: shepherd.next,
                  classes: 'shepherd-button-example-primary',
                  text: 'Next'
                }
              ]
            }
          },
          {
            id: 'including',
            options: {
              title: 'Including',
              text: 'Including Shepherd is easy! Just include popper.js, shepherd.js, and a Shepherd theme file.',
              attachTo: {
                element: heroIncludingElement,
                on: 'bottom'
              },
              buttons: [
                {
                  action: shepherd.back,
                  classes: 'shepherd-button-secondary',
                  text: 'Back'
                }, {
                  action: shepherd.next,
                  classes: 'shepherd-button-example-primary',
                  text: 'Next'
                }
              ]
            }
          }
        ];
      };
      const tour = setupTour(Shepherd, {
        showCancelLink: false
      }, steps);
      tour.start();
      // Step one text should be visible
      cy.get('.shepherd-text')
        .contains('Shepherd is a javascript library').should('be.visible');
      cy.contains('Next').click();
      // Step two text should be visible
      cy.get('.shepherd-text')
        .contains('Including Shepherd is easy!').should('be.visible');
    });
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

  it('Cancel link cancels the tour', () => {
    const tour = setupTour(Shepherd);
    tour.start();
    cy.get('body').should('have.class', 'shepherd-active');
    cy.get('.shepherd-cancel-link').click();
    cy.get('body').should('not.have.class', 'shepherd-active');
  });

  it.skip('Defaults classes applied', () => {
    const tour = setupTour(Shepherd, {
      classes: 'test-defaults test-more-defaults'
    });
    tour.start();
    cy.get('.shepherd-element').should('have.class', 'test-defaults');
    cy.get('.shepherd-element').should('have.class', 'test-more-defaults');
  });

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