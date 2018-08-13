describe('Shepherd Acceptance Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs/welcome/');
  })

  it('next/previous buttons work', () => {
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