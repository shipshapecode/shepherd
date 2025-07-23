import setupTour from '../utils/setup-tour';

describe('a11y', () => {
  let Shepherd;

  beforeEach(() => {
    Shepherd = null;

    cy.visit('/dummy/', {
      onLoad(contentWindow) {
        if (contentWindow.Shepherd) {
          return (Shepherd = contentWindow.Shepherd);
        }
      }
    });
  });

  describe('focus', () => {
    let tour;

    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, {
        useModalOverlay: true
      });
    });

    afterEach(() => {
      tour.complete();
    });

    it('shepherd-element should have focus on tour start', () => {
      tour.start();

      cy.document().then(() => {
        cy.wait(1000);
        cy.get('.shepherd-element').should('have.focus');
      });
    });
  });

  describe('focus trapping', () => {
    let tour;

    beforeEach(() => {
      // Remove extra elements to prevent scrolling issues
      cy.document().then((document) => {
        const heroFollowup = document.querySelector('.hero-followup');
        heroFollowup?.remove();
        const img = document.querySelector('img');
        img?.remove();
      });
    });

    afterEach(() => {
      tour?.complete();
    });

    describe('without attachTo element', () => {
      beforeEach(() => {
        // Create a tour without attachTo elements
        tour = new Shepherd.Tour({
          defaultStepOptions: {
            classes: 'shepherd-theme-arrows',
            scrollTo: true
          }
        });

        tour.addStep({
          title: 'Test Step',
          text: 'Testing focus trap without attachTo',
          buttons: [
            {
              text: 'Cancel',
              classes: 'shepherd-button-secondary cancel-button',
              action: tour.cancel
            },
            {
              text: 'Back',
              classes: 'shepherd-button-secondary back-button',
              action: tour.back
            },
            {
              text: 'Next',
              classes: 'shepherd-button-primary next-button',
              action: tour.next
            }
          ],
          cancelIcon: {
            enabled: true
          }
        });
      });

      it('tabs forward through dialog elements and wraps to first', () => {
        tour.start();

        cy.document().then(() => {
          cy.wait(1000);
          // Start should focus the dialog
          cy.get('.shepherd-element').should('have.focus');

          // Tab through dialog elements - start from body to get consistent behavior
          cy.focused().tab(); // to close button
          cy.get('.shepherd-cancel-icon').should('have.focus');

          cy.focused().tab(); // to cancel button
          cy.get('.cancel-button').should('have.focus');

          cy.focused().tab(); // to back button
          cy.get('.back-button').should('have.focus');

          cy.focused().tab(); // to next button
          cy.get('.next-button').should('have.focus');

          // Tab from last button should wrap to first (close button)
          cy.focused().tab();
          cy.get('.shepherd-cancel-icon').should('have.focus');
        });
      });

      it('tabs backward through dialog elements and wraps to last', () => {
        tour.start();

        cy.document().then(() => {
          cy.wait(1000);
          // Start at close button
          cy.focused().tab();
          cy.get('.shepherd-cancel-icon').should('have.focus');

          // Shift+tab should wrap to last button
          cy.focused().tab({ shift: true });
          cy.get('.next-button').should('have.focus');

          // Continue shift+tabbing backward
          cy.focused().tab({ shift: true });
          cy.get('.back-button').should('have.focus');

          cy.focused().tab({ shift: true });
          cy.get('.cancel-button').should('have.focus');

          cy.focused().tab({ shift: true });
          cy.get('.shepherd-cancel-icon').should('have.focus');
        });
      });

      it('prevents focus from escaping to page elements', () => {
        tour.start();

        cy.document().then(() => {
          cy.wait(1000);
          // Start at close button
          cy.get('body').tab();

          // Try to tab out of modal multiple times
          cy.focused().tab().tab().tab().tab().tab().tab();

          // Should still be within dialog elements
          cy.focused().should('satisfy', ($el) => {
            return $el.closest('.shepherd-element').length > 0;
          });
        });
      });
    });

    describe('with attachTo element', () => {
      beforeEach(() => {
        tour = setupTour(Shepherd, {}, null, {
          useModalOverlay: true
        });
      });

      it('includes attachTo element in focus trap and tabs in correct order', () => {
        tour.start();

        cy.document().then(() => {
          cy.wait(1000);

          // First tab must be from body to enter focus trap
          cy.focused().tab(); // to close button
          cy.get('.shepherd-cancel-icon').should('have.focus');

          cy.focused().tab();
          cy.get('[data-test-popper-link]').should('have.focus');

          cy.focused().tab();
          cy.get('.cancel-button').should('have.focus');

          cy.focused().tab();
          cy.get('.next-button').should('have.focus');

          // Tab from last dialog element should go to attachTo element
          cy.focused().tab();
          cy.get('.hero-welcome').should('have.focus');

          // Tab from attachTo should go back to first dialog element
          cy.focused().tab();
          cy.get('.shepherd-cancel-icon').should('have.focus');
        });
      });

      it('handles backward tabbing with attachTo element', () => {
        tour.start();

        cy.document().then(() => {
          cy.wait(1000);

          // First tab from body to enter focus trap
          cy.focused().tab();
          cy.get('.shepherd-cancel-icon').should('have.focus');

          // Shift+tab from first dialog element should go to attachTo
          cy.focused().tab({ shift: true });
          cy.get('.hero-welcome').should('have.focus');

          // Shift+tab from attachTo should go to last dialog element
          cy.focused().tab({ shift: true });
          cy.get('.next-button').should('have.focus');

          // Continue shift+tabbing backward through dialog
          cy.focused().tab({ shift: true });
          cy.get('.cancel-button').should('have.focus');

          cy.focused().tab({ shift: true });
          cy.get('[data-test-popper-link]').should('have.focus');

          cy.focused().tab({ shift: true });
          cy.get('.shepherd-cancel-icon').should('have.focus');
        });
      });

      it('maintains focus trap boundaries with attachTo element', () => {
        tour.start();

        cy.document().then(() => {
          cy.wait(1000);

          cy.get('body')
            .tab()
            .tab()
            .tab()
            .tab()
            .tab()
            .tab()
            .tab()
            .tab()
            .tab()
            .tab();

          // Should still be within dialog or attachTo element
          cy.focused().should('satisfy', ($el) => {
            const isInDialog = $el.closest('.shepherd-element').length > 0;
            const isAttachTo = $el.is('.hero-welcome');
            return isInDialog || isAttachTo;
          });
        });
      });

      it('handles attachTo element with focusable children', () => {
        tour = new Shepherd.Tour({
          defaultStepOptions: {
            cancelIcon: {
              enabled: true
            },
            classes: 'shepherd-theme-arrows',
            scrollTo: true
          },
          useModalOverlay: true
        });

        tour.addStep({
          title: 'Complex AttachTo Test',
          text: 'Testing with complex attachTo element',
          attachTo: {
            element: '#complex-attach-to',
            on: 'bottom'
          },
          buttons: [
            {
              text: 'Next',
              classes: 'next-button',
              action: tour.next
            }
          ]
        });

        tour.start();

        cy.document().then(() => {
          cy.wait(1000);

          cy.focused().tab();
          cy.get('.shepherd-cancel-icon').should('have.focus');

          cy.focused().tab();
          cy.get('.next-button').should('have.focus');

          // Tab to attachTo elements
          cy.focused().tab();
          cy.get('#complex-attach-to').should('have.focus'); // Parent first

          cy.focused().tab();
          cy.get('#nested-button-1').should('have.focus');

          cy.focused().tab();
          cy.get('#nested-input').should('have.focus');

          cy.focused().tab();
          cy.get('#nested-button-2').should('have.focus');

          // Tab from last attachTo child should go back to dialog
          cy.focused().tab();
          cy.get('.shepherd-cancel-icon').should('have.focus');
        });

        // Clean up the test element
        cy.get('#complex-attach-to').then(($el) => {
          $el.remove();
        });
      });
    });
  });

  describe('keydown events', () => {
    let tour;

    beforeEach(() => {
      tour = setupTour(Shepherd, {}, null, {
        useModalOverlay: true
      });

      // Remove extra elements to prevent scrolling issues
      cy.document().then((document) => {
        const heroFollowup = document.querySelector('.hero-followup');
        heroFollowup?.remove();
        const img = document.querySelector('img');
        img?.remove();
      });
    });

    afterEach(() => {
      tour.complete();
    });

    it('arrows trigger back/next', () => {
      tour.start();

      cy.get('.first-step').should('be.visible');
      cy.get('.first-step').trigger('keydown', { keyCode: 39 });
      cy.get('.second-step').should('be.visible');
      cy.get('.second-step').trigger('keydown', { keyCode: 37 });
      cy.get('.first-step').should('be.visible');
    });

    it('ESC cancels the tour', () => {
      tour.start();

      cy.get('.shepherd-element').should('have.attr', 'data-shepherd-step-id');
      cy.get('.shepherd-element').trigger('keydown', { keyCode: 27 });
      cy.get('.shepherd-element').should('not.exist');
    });

    it('Tab is focus trapped inside the modal', () => {
      tour.start();

      cy.document().then(() => {
        cy.wait(1000);
        // Tabbing out of the modal should not be possible and we test this by tabbing from the body
        cy.get('body').tab().tab().tab().tab().tab().tab();
        cy.get('.hero-welcome').should('have.focus');
      });
    });
  });
});
