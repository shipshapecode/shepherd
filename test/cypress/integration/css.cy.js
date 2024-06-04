/*
 * The `.shepherd-modal-overlay-container` class is chosen for inspection
 * because the Svelte styles for the modal are added to the import graph as
 * soon as Shepherd's JS is imported at all:
 *
 * shepherd.ts -> tour.ts -> components/shepherd-modal.svelte
 */
describe('CSS Import Behavior', () => {
  it('includes project styles when explicitly imported', () => {
    cy.visit('/examples/css/with-css-import');
    cy.window().should('have.property', 'Shepherd');
    cy.get('[data-test-id="fake-modal-overlay"]').should('have.css', 'pointer-events', 'none');
  });

  it('DOES NOT include project styles without explicit import', () => {
    cy.visit('/examples/css/no-css-import');
    cy.window().should('have.property', 'Shepherd');
    cy.get('[data-test-id="fake-modal-overlay"]').should('not.have.css', 'pointer-events', 'none');
  });
});
