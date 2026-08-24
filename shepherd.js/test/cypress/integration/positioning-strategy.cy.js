import setupTour from '../utils/setup-tour';

// End-to-end guard for #3269. Unit tests run in happy-dom, which has no layout
// engine, so this is the only place where a step that drifts away from its
// target while scrolling actually fails a test.
describe('positioning strategy', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/test/cypress/examples/positioning-strategy', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return (Shepherd = contentWindow.Shepherd);
        }
      }
    });
  });

  /**
   * Vector from the target to the step, in viewport coordinates. If the step
   * tracks its target, this vector is identical at every scroll offset.
   */
  const offsetFromTarget = (targetSelector, stepId) => {
    return cy.get(targetSelector).then(($target) => {
      return cy.get(`[data-shepherd-step-id="${stepId}"]`).then(($step) => {
        const target = $target[0].getBoundingClientRect();
        const step = $step[0].getBoundingClientRect();

        return {
          dx: Math.round(step.left - target.left),
          dy: Math.round(step.top - target.top)
        };
      });
    });
  };

  const startTour = (floatingUIOptions) => {
    const tour = setupTour(Shepherd, { scrollTo: false }, () => [
      {
        attachTo: { element: '.page-target', on: 'bottom' },
        id: 'strategy',
        title: 'Strategy step',
        text: 'positioned against a target the page scrolls past',
        floatingUIOptions
      }
    ]);

    tour.start();
    cy.wait(250);

    return tour;
  };

  it('keeps a `fixed` strategy step locked to its target while the page scrolls', () => {
    startTour({ strategy: 'fixed' });

    cy.scrollTo(0, 700);
    cy.wait(250);

    cy.get('[data-shepherd-step-id="strategy"]').should(
      'have.css',
      'position',
      'fixed'
    );

    let before;

    offsetFromTarget('.page-target', 'strategy')
      .then((offset) => {
        before = offset;

        cy.scrollTo(0, 800);
        cy.wait(250);

        return offsetFromTarget('.page-target', 'strategy');
      })
      .then((after) => {
        // Before the fix, the step element was hardcoded to
        // `position: absolute` while `computePosition` returned
        // viewport-relative coordinates, so `after.dy` was `before.dy - 100` —
        // exactly the scroll delta.
        expect(after).to.deep.equal(before);
      });
  });

  it('keeps a default strategy step locked to its target while the page scrolls', () => {
    startTour(undefined);

    cy.scrollTo(0, 700);
    cy.wait(250);

    cy.get('[data-shepherd-step-id="strategy"]').should(
      'have.css',
      'position',
      'absolute'
    );

    let before;

    offsetFromTarget('.page-target', 'strategy')
      .then((offset) => {
        before = offset;

        cy.scrollTo(0, 800);
        cy.wait(250);

        return offsetFromTarget('.page-target', 'strategy');
      })
      .then((after) => {
        expect(after).to.deep.equal(before);
      });
  });

  it('tracks a target inside a scrolling container under the default strategy', () => {
    const tour = setupTour(Shepherd, { scrollTo: false }, () => [
      {
        attachTo: { element: '.overflow-target', on: 'bottom' },
        id: 'overflow',
        title: 'Overflow step',
        text: 'positioned against a target inside an overflow container'
      }
    ]);

    tour.start();

    cy.get('.overflow-container').scrollTo(0, 500);
    cy.wait(250);

    let before;

    offsetFromTarget('.overflow-target', 'overflow')
      .then((offset) => {
        before = offset;

        cy.get('.overflow-container').scrollTo(0, 600);
        cy.wait(250);

        return offsetFromTarget('.overflow-target', 'overflow');
      })
      .then((after) => {
        // `autoUpdate` recomputes on ancestor scroll, so the default
        // `absolute` strategy already follows a target inside an `overflow`
        // container. This is why the docs do not recommend `fixed` for that
        // case.
        expect(after).to.deep.equal(before);
      });
  });
});
