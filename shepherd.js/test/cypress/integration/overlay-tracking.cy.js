import setupTour from '../utils/setup-tour';
import overlayOpenings from '../utils/overlay-openings';

// End-to-end guard for the overlay following its highlight without polling.
// Each change here fires no scroll or resize event, and what it does to the
// highlight depends on layout, which happy-dom does not implement.
describe('modal overlay tracking', () => {
  let Shepherd, tour;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/test/cypress/examples/overlay-tracking', {
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

  const startTour = (selector) => {
    cy.document().then(() => {
      tour = setupTour(
        Shepherd,
        { scrollTo: false },
        () => [
          {
            attachTo: { element: selector, on: 'bottom' },
            id: 'tracking',
            text: 'Tracking'
          }
        ],
        { useModalOverlay: true }
      );
      tour.start();
    });
    cy.wait(250);
  };

  it('re-crops when a scroll parent moves while its target stays put', () => {
    cy.document().then((doc) => {
      doc.querySelector('.scroller').scrollTop = 100;
    });
    startTour('.in-scroller');

    cy.document().then((doc) => {
      const scroller = doc.querySelector('.scroller');
      const target = doc.querySelector('.in-scroller');
      const { top } = target.getBoundingClientRect();
      expect(overlayOpenings(doc)[0].height).to.be.closeTo(40, 1);

      // The scroller's top edge moves 20px past the target, and the content
      // above the target moves up by as much, so only the crop changes.
      const shift = top - scroller.getBoundingClientRect().top + 20;
      scroller.style.top = `${100 + shift}px`;
      doc.querySelector('.content').style.paddingTop = `${200 - shift}px`;
    });
    cy.wait(150);

    cy.document().then((doc) => {
      const target = doc.querySelector('.in-scroller').getBoundingClientRect();
      const [opening] = overlayOpenings(doc);

      expect(target.top).to.be.closeTo(200, 1);
      expect(opening.y).to.be.closeTo(220, 1);
      expect(opening.height).to.be.closeTo(20, 1);
    });
  });

  it('shrinks with a target that loses its border', () => {
    startTour('.bordered');

    cy.document().then((doc) => {
      expect(overlayOpenings(doc)[0].height).to.be.closeTo(52, 1);
      doc.querySelector('.bordered').style.borderWidth = '0';
    });
    cy.wait(150);

    cy.document().then((doc) => {
      const [opening] = overlayOpenings(doc);

      expect(opening.height).to.be.closeTo(40, 1);
      expect(opening.width).to.be.closeTo(120, 1);
    });
  });

  it('follows an inline target whose text shrinks', () => {
    startTour('.inline');

    cy.document().then((doc) => {
      doc.querySelector('.inline').textContent = 'short';
    });
    cy.wait(150);

    cy.document().then((doc) => {
      const target = doc.querySelector('.inline').getBoundingClientRect();
      const [opening] = overlayOpenings(doc);

      expect(opening.x).to.be.closeTo(target.left, 1);
      expect(opening.width).to.be.closeTo(target.width, 1);
    });
  });

  it('asks for no frames while nothing moves', () => {
    startTour('.bordered');
    cy.wait(1000);

    cy.window().then((win) => {
      const { requestAnimationFrame } = win;
      let frames = 0;
      win.requestAnimationFrame = (callback) => {
        frames++;
        return requestAnimationFrame.call(win, callback);
      };

      cy.wait(1000).then(() => {
        win.requestAnimationFrame = requestAnimationFrame;
        expect(frames).to.equal(0);
      });
    });
  });
});
