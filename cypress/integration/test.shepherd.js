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