import setupTour from '../utils/setup-tour';
import overlayOpenings from '../utils/overlay-openings';

// End-to-end guard for #3478. The overlay opening for a target in a nested
// frame must be offset only by the frames between the target and the document
// Shepherd renders into, not by the frames hosting Shepherd itself. Unit tests
// can only mock the frame chain, so the arithmetic is checked here.
describe('modal overlay for targets inside iframes', () => {
  let tour;

  afterEach(() => {
    tour?.complete();
  });

  /** Waits for a same-origin frame's window to satisfy `isReady`. */
  const frameWindow = ($frame, isReady) =>
    cy
      .wrap($frame)
      .its('0.contentWindow')
      .should((win) => expect(isReady(win)).to.be.ok);

  const expectOpeningOnTarget = (shepherdWindow) => {
    const doc = shepherdWindow.document;
    const content = doc.getElementById('content');
    const frameRect = content.getBoundingClientRect();
    const targetRect = content.contentDocument
      .querySelector('.target')
      .getBoundingClientRect();
    const [opening] = overlayOpenings(doc);

    expect(opening.x).to.be.closeTo(frameRect.left + targetRect.left, 1);
    expect(opening.y).to.be.closeTo(frameRect.top + targetRect.top, 1);
    expect(opening.height).to.be.closeTo(40, 1);
  };

  const startTour = (shepherdWindow) => {
    const target = shepherdWindow.document
      .getElementById('content')
      .contentDocument.querySelector('.target');

    tour = setupTour(
      shepherdWindow.Shepherd,
      { scrollTo: false },
      () => [
        {
          attachTo: { element: target, on: 'bottom' },
          id: 'iframe-target',
          text: 'Inside an iframe'
        }
      ],
      { useModalOverlay: true }
    );
    tour.start();
  };

  const contentReady = (win) =>
    win.Shepherd &&
    win.document
      .getElementById('content')
      ?.contentDocument?.querySelector('.target');

  it('offsets the opening by the target frame when Shepherd is in the top document', () => {
    cy.visit('/test/cypress/examples/iframes/host.html');

    cy.window()
      .should((win) => expect(contentReady(win)).to.be.ok)
      .then((win) => {
        startTour(win);
        cy.wait(250).then(() => expectOpeningOnTarget(win));
      });
  });

  it('does not add the offset of the frame hosting Shepherd', () => {
    cy.visit('/test/cypress/examples/iframes/nested.html');

    cy.get('#host').then(($host) => {
      frameWindow($host, contentReady).then((win) => {
        startTour(win);
        cy.wait(250).then(() => expectOpeningOnTarget(win));
      });
    });
  });
});
