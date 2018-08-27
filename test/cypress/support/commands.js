// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

if(Cypress.env('coverage')) {
  afterEach(function() {
    const coverageFile = `${ Cypress.config('coverageFolder') }/out.json`;

    cy.window().then(win => {
      const coverage = win.__coverage__;

      if(!coverage) return;

      cy.task('coverage', coverage).then(map => {
        cy.writeFile(coverageFile, map);

        if(Cypress.env('coverage') === 'open') {
          cy.exec('nyc report --reporter=html');
        }
      });
    });
  });
}