import setupTour from '../utils/setup-tour';
import overlayOpenings from '../utils/overlay-openings';

// End-to-end guard for #3484. Which ancestors crop a highlight depends on
// layout (line boxes, box generation), which happy-dom does not implement, so
// this is the only place the real behaviour is exercised.
describe('modal overlay clipping by overflow ancestors', () => {
  let Shepherd, tour;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/test/cypress/examples/overflow-clipping', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return (Shepherd = contentWindow.Shepherd);
        }
      }
    });
  });

  afterEach(() => {
    tour?.complete();
  });

  const startTour = (stepOptions) => {
    cy.document().then(() => {
      tour = setupTour(
        Shepherd,
        { scrollTo: false },
        () => [{ id: 'clipping', text: 'Clipping', ...stepOptions }],
        { useModalOverlay: true }
      );
      tour.start();
    });
    cy.wait(250);
  };

  /** The opening cut for `selector`, matched by its left edge. */
  const openingFor = (doc, selector) => {
    const rect = doc.querySelector(selector).getBoundingClientRect();
    return overlayOpenings(doc).find(({ x }) => Math.abs(x - rect.left) < 1);
  };

  it('crops a highlight inside a collapsed `overflow: hidden` ancestor', () => {
    startTour({
      attachTo: { element: '.anchor', on: 'bottom' },
      extraHighlights: ['.collapsed-item']
    });

    cy.document().then((doc) => {
      const [anchor, collapsed] = overlayOpenings(doc);

      expect(anchor.height).to.be.closeTo(40, 1);
      // Without treating `hidden` as cropping, this gets a full 80px hole
      // over content the user cannot see.
      expect(collapsed.height).to.equal(0);
    });
  });

  it('does not crop by an inline `overflow: hidden` ancestor', () => {
    startTour({ attachTo: { element: '.inline-item', on: 'bottom' } });

    cy.document().then((doc) => {
      expect(openingFor(doc, '.inline-item').height).to.be.closeTo(100, 1);
    });
  });

  it('does not crop by a `display: contents` ancestor', () => {
    startTour({ attachTo: { element: '.contents-item', on: 'bottom' } });

    cy.document().then((doc) => {
      expect(openingFor(doc, '.contents-item').height).to.be.closeTo(60, 1);
    });
  });
});
