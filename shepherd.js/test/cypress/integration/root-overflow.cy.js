import setupTour from '../utils/setup-tour';
import overlayOpenings from '../utils/overlay-openings';

// End-to-end guard for #1984. Whether <body> crops anything depends on overflow
// propagation to the viewport, which happy-dom has no layout engine for, so
// this is the only place the real behaviour is exercised.
describe('modal overlay with overflow set on the root elements', () => {
  let Shepherd, tour;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/test/cypress/examples/root-overflow', {
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

  const startTour = (rootStyles, scrollTo) => {
    cy.document().then((doc) => {
      doc.getElementById('root-styles').textContent = rootStyles;

      tour = setupTour(
        Shepherd,
        {},
        () => [
          {
            attachTo: { element: '.target', on: 'bottom' },
            id: 'root-overflow',
            text: 'Below the initial viewport',
            scrollTo
          }
        ],
        { useModalOverlay: true }
      );
      tour.start();
    });
    cy.wait(250);
  };

  it('keeps the opening when body overflow propagates to the viewport', () => {
    // <html> is `overflow: visible`, so body's `auto` applies to the viewport
    // and body itself crops nothing, even though it is viewport sized.
    startTour('html, body { height: 100%; } body { overflow: auto; }', true);

    cy.document().then((doc) => {
      const target = doc.querySelector('.target').getBoundingClientRect();
      const [opening] = overlayOpenings(doc);

      expect(target.top).to.be.within(0, doc.defaultView.innerHeight - 40);
      expect(opening.y).to.be.closeTo(target.top, 1);
      expect(opening.height).to.be.closeTo(40, 1);
    });
  });

  it('keeps the opening when a propagated body overflow is `hidden`', () => {
    // #3484: body's computed overflow-y reads `hidden`, but it applies to the
    // viewport, which `scrollIntoView` can still scroll.
    startTour('body { height: 100vh; overflow: hidden; }', true);

    cy.document().then((doc) => {
      const target = doc.querySelector('.target').getBoundingClientRect();
      const [opening] = overlayOpenings(doc);

      expect(opening.y).to.be.closeTo(target.top, 1);
      expect(opening.height).to.be.closeTo(40, 1);
    });
  });

  it('still clips by body when body is a scroll container of its own', () => {
    // With <html> no longer `visible`, body keeps its overflow and is a real
    // scroll container whose rect crops the target below its fold.
    startTour(
      'html { height: 100%; overflow: hidden; } body { height: 100%; overflow: auto; }',
      false
    );

    cy.document().then((doc) => {
      const [opening] = overlayOpenings(doc);

      expect(opening.height).to.equal(0);
    });
  });
});
