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