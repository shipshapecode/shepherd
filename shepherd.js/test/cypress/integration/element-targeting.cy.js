import setupTour from '../utils/setup-tour';

describe('Attaching tooltips to target elements in the DOM on each step', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/test/cypress/dummy/', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return (Shepherd = contentWindow.Shepherd);
        }
      }
    });
  });

  describe('Adding/Removing class names to the target of the current step', () => {
    let tour;

    beforeEach(() => {
      tour = setupTour(Shepherd);
    });

    afterEach(() => {
      tour.complete();
    });

    it('Adds the "shepherd-target" and "shepherd-enabled" classes upon showing a step', () => {
      tour.start();

      cy.get('[data-test-hero-welcome]')
        .should('have.class', 'shepherd-target')
        .and('have.class', 'shepherd-enabled');
    });

    it('Removes the "shepherd-target" and "shepherd-enabled" upon hiding a step', () => {
      tour.start();
      tour.next();

      cy.get('[data-test-hero-welcome]')
        .should('not.have.class', 'shepherd-target')
        .and('not.have.class', 'shepherd-enabled');
    });
  });

  describe('Blocking clicks on the target with `canClickTarget: false`', () => {
    let tour;

    // A single step attached to the click-blocking fixture in the dummy page.
    //
    // That fixture is used instead of `.hero-welcome` on purpose. `pointer-events`
    // is an inherited property, so a child of a blocked target computes `none`
    // even with the descendant half of the rule deleted; and nothing on the page
    // competes with the rule's specificity. The fixture and its child each carry
    // their own competing `pointer-events: auto` declaration (see
    // dummy/css/welcome.css), so these assertions fail if the shipped rule loses
    // either its `... *` half or its 0-3-0 specificity.
    const clickBlockStep = (shepherd) => [
      {
        id: 'click-block',
        text: 'Click blocking fixture step',
        attachTo: {
          element: '[data-test-click-block-target]',
          on: 'top'
        },
        buttons: [
          {
            action: shepherd.cancel,
            text: 'Exit'
          }
        ]
      }
    ];

    afterEach(() => {
      tour.complete();
    });

    it('leaves the target and its children clickable when `canClickTarget` is not set', () => {
      tour = setupTour(Shepherd, {}, clickBlockStep);
      tour.start();

      cy.get('[data-test-click-block-target]')
        .should('have.class', 'shepherd-target')
        .and('have.css', 'pointer-events', 'auto');
      cy.get('[data-test-click-block-child]').should(
        'have.css',
        'pointer-events',
        'auto'
      );
    });

    it('blocks clicks on the target and its children when no classPrefix is set', () => {
      tour = setupTour(Shepherd, { canClickTarget: false }, clickBlockStep);
      tour.start();

      cy.get('[data-test-click-block-target]').should(
        'have.css',
        'pointer-events',
        'none'
      );
      cy.get('[data-test-click-block-child]').should(
        'have.css',
        'pointer-events',
        'none'
      );
    });

    // Regression test for #1298: `classPrefix` prefixes the `shepherd-enabled`
    // and `shepherd-target` classes, which the click-blocking rule used to
    // require, so `canClickTarget: false` silently did nothing.
    it('blocks clicks on the target and its children when a classPrefix is set', () => {
      tour = setupTour(Shepherd, { canClickTarget: false }, clickBlockStep, {
        classPrefix: 'my-tour-'
      });
      tour.start();

      cy.get('[data-test-click-block-target]')
        .should('have.class', 'my-tour-shepherd-target')
        .and('have.css', 'pointer-events', 'none');
      cy.get('[data-test-click-block-child]').should(
        'have.css',
        'pointer-events',
        'none'
      );
    });
  });

  describe('Unique selectors with multiple Tours', function () {
    let firstTour, secondTour;

    beforeEach(() => {
      firstTour = setupTour(Shepherd, {}, null, {
        tourName: 'firstTour',
        defaultStepOptions: {
          classes: 'tour-test-1'
        }
      });
      // setup a second tour with a unique name
      secondTour = setupTour(Shepherd, {}, null, {
        tourName: 'secondTour',
        defaultStepOptions: {
          classes: 'tour-test-2'
        }
      });
    });

    afterEach(() => {
      firstTour.complete();
      secondTour.complete();
    });
    it('applies default classes only on each individual tour', async function () {
      firstTour.start();
      secondTour.start();

      cy.get('.shepherd-element').should('have.length', 2);
      cy.get('.test-tour-1.shepherd-element').should('have.length', 1);
      cy.get('.test-tour-2.shepherd-element').should('have.length', 1);
    });
  });
});
