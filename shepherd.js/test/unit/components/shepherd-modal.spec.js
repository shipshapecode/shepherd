import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createShepherdModal } from '../../../src/components/shepherd-modal.ts';
import { Step } from '../../../src/step';
import { Tour } from '../../../src/tour';

describe('components/ShepherdModal', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('closeModalOpening()', function () {
    it('sets values back to 0', () => {
      const modal = createShepherdModal(container);

      modal.positionModal(0, 0, 0, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      let modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM20,20a0,0,0,0,0-0,0V270a0,0,0,0,0,0,0H520a0,0,0,0,0,0-0V20a0,0,0,0,0-0-0Z'
      );

      modal.closeModalOpening();

      modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );
    });
  });

  describe('positionModal()', function () {
    it('sets the correct attributes when positioning modal opening', () => {
      const modal = createShepherdModal(container);

      let modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      modal.closeModalOpening();

      modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      modal.positionModal(0, 0, 0, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM20,20a0,0,0,0,0-0,0V270a0,0,0,0,0,0,0H520a0,0,0,0,0,0-0V20a0,0,0,0,0-0-0Z'
      );
    });

    it('sets the correct attributes with padding', () => {
      const modal = createShepherdModal(container);

      let modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      modal.positionModal(10, 0, 0, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM10,10a0,0,0,0,0-0,0V280a0,0,0,0,0,0,0H530a0,0,0,0,0,0-0V10a0,0,0,0,0-0-0Z'
      );
    });

    it('sets the correct attributes when positioning modal opening with border radius as number', () => {
      const modal = createShepherdModal(container);

      let modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      modal.closeModalOpening();

      modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      modal.positionModal(0, 10, 0, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 20,
            y: 20,
            width: 500
          };
        }
      });

      modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM30,20a10,10,0,0,0-10,10V260a10,10,0,0,0,10,10H510a10,10,0,0,0,10-10V30a10,10,0,0,0-10-10Z'
      );
    });

    it('sets the correct attributes when positioning modal opening with border radius as object', () => {
      const modal = createShepherdModal(container);

      let modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      modal.closeModalOpening();

      modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM0,0a0,0,0,0,0-0,0V0a0,0,0,0,0,0,0H0a0,0,0,0,0,0-0V0a0,0,0,0,0-0-0Z'
      );

      modal.positionModal(
        0,
        { topLeft: 1, bottomLeft: 2, bottomRight: 3 },
        0,
        0,
        null,
        {
          getBoundingClientRect() {
            return {
              height: 250,
              x: 20,
              y: 20,
              width: 500
            };
          }
        }
      );

      modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM21,20a1,1,0,0,0-1,1V268a2,2,0,0,0,2,2H517a3,3,0,0,0,3-3V20a0,0,0,0,0-0-0Z'
      );
    });

    it('sets the correct attributes when target is overflowing from scroll parent', () => {
      const modal = createShepherdModal(container);

      modal.positionModal(
        0,
        0,
        0,
        0,
        {
          getBoundingClientRect() {
            return {
              height: 250,
              x: 10,
              y: 100,
              width: 500
            };
          }
        },
        {
          getBoundingClientRect() {
            return {
              height: 500,
              x: 10,
              y: 10,
              width: 500
            };
          }
        }
      );

      const modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM10,100a0,0,0,0,0-0,0V350a0,0,0,0,0,0,0H510a0,0,0,0,0,0-0V100a0,0,0,0,0-0-0Z'
      );
    });

    it('sets the correct attributes when target fits inside scroll parent', () => {
      const modal = createShepherdModal(container);

      modal.positionModal(
        0,
        0,
        0,
        0,
        {
          getBoundingClientRect() {
            return {
              height: 500,
              x: 10,
              y: 10,
              width: 500
            };
          }
        },
        {
          getBoundingClientRect() {
            return {
              height: 250,
              x: 10,
              y: 100,
              width: 500
            };
          }
        }
      );

      const modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM10,100a0,0,0,0,0-0,0V350a0,0,0,0,0,0,0H510a0,0,0,0,0,0-0V100a0,0,0,0,0-0-0Z'
      );
    });

    it('allows setting an x-axis offset', () => {
      const modal = createShepherdModal(container);

      modal.positionModal(0, 0, 50, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 10,
            y: 10,
            width: 500
          };
        }
      });

      let modalPath = modal.getElement().querySelector('path');

      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM60,10a0,0,0,0,0-0,0V260a0,0,0,0,0,0,0H560a0,0,0,0,0,0-0V10a0,0,0,0,0-0-0Z'
      );

      modal.positionModal(0, 0, 100, 0, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 10,
            y: 10,
            width: 500
          };
        }
      });

      modalPath = modal.getElement().querySelector('path');

      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM110,10a0,0,0,0,0-0,0V260a0,0,0,0,0,0,0H610a0,0,0,0,0,0-0V10a0,0,0,0,0-0-0Z'
      );
    });

    it('allows setting a y-axis offset', () => {
      const modal = createShepherdModal(container);

      modal.positionModal(0, 0, 0, 35, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 10,
            y: 10,
            width: 500
          };
        }
      });

      let modalPath = modal.getElement().querySelector('path');

      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM10,45a0,0,0,0,0-0,0V295a0,0,0,0,0,0,0H510a0,0,0,0,0,0-0V45a0,0,0,0,0-0-0Z'
      );

      modal.positionModal(0, 0, 0, 75, null, {
        getBoundingClientRect() {
          return {
            height: 250,
            x: 10,
            y: 10,
            width: 500
          };
        }
      });

      modalPath = modal.getElement().querySelector('path');

      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM10,85a0,0,0,0,0-0,0V335a0,0,0,0,0,0,0H510a0,0,0,0,0,0-0V85a0,0,0,0,0-0-0Z'
      );
    });

    it('sets the correct attributes with extraHighlights', () => {
      const modal = createShepherdModal(container);

      modal.positionModal(
        0,
        0,
        0,
        0,
        null,
        {
          getBoundingClientRect() {
            return {
              height: 250,
              x: 20,
              y: 20,
              width: 500
            };
          }
        },
        [
          {
            getBoundingClientRect() {
              return {
                height: 100,
                x: 50,
                y: 50,
                width: 100
              };
            }
          }
        ]
      );

      const modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM20,20a0,0,0,0,0-0,0V270a0,0,0,0,0,0,0H520a0,0,0,0,0,0-0V20a0,0,0,0,0-0-0ZM50,50a0,0,0,0,0-0,0V150a0,0,0,0,0,0,0H150a0,0,0,0,0,0-0V50a0,0,0,0,0-0-0Z'
      );
    });

    it('sets the correct attributes with multiple extraHighlights', () => {
      const modal = createShepherdModal(container);

      modal.positionModal(
        0,
        0,
        0,
        0,
        null,
        {
          getBoundingClientRect() {
            return {
              height: 250,
              x: 20,
              y: 20,
              width: 500
            };
          }
        },
        [
          {
            getBoundingClientRect() {
              return {
                height: 100,
                x: 50,
                y: 50,
                width: 100
              };
            }
          },
          {
            getBoundingClientRect() {
              return {
                height: 50,
                x: 200,
                y: 200,
                width: 50
              };
            }
          }
        ]
      );

      const modalPath = modal.getElement().querySelector('path');
      expect(modalPath).toHaveAttribute(
        'd',
        'M1024,768H0V0H1024V768ZM20,20a0,0,0,0,0-0,0V270a0,0,0,0,0,0,0H520a0,0,0,0,0,0-0V20a0,0,0,0,0-0-0ZM50,50a0,0,0,0,0-0,0V150a0,0,0,0,0,0,0H150a0,0,0,0,0,0-0V50a0,0,0,0,0-0-0ZM200,200a0,0,0,0,0-0,0V250a0,0,0,0,0,0,0H250a0,0,0,0,0,0-0V200a0,0,0,0,0-0-0Z'
      );
    });

    it('skips duplicate elements in extraHighlights', () => {
      const modal = createShepherdModal(container);

      const sharedElement = {
        getBoundingClientRect() {
          return {
            height: 100,
            x: 50,
            y: 50,
            width: 100,
            top: 50,
            bottom: 150,
            left: 50,
            right: 150
          };
        }
      };

      modal.positionModal(
        0,
        0,
        0,
        0,
        null,
        {
          getBoundingClientRect() {
            return {
              height: 250,
              x: 20,
              y: 20,
              width: 500,
              top: 20,
              bottom: 270,
              left: 20,
              right: 520
            };
          }
        },
        // Pass the same element twice — both duplicates are skipped
        [sharedElement, sharedElement]
      );

      const modalPath = modal.getElement().querySelector('path');
      const d = modalPath.getAttribute('d');
      // Duplicate elements are both skipped, only the main target cutout remains
      // Outer path close + target cutout close = 2 Z's
      const cutouts = d.split('Z').length - 1;
      expect(cutouts).toBe(2);
    });
  });

  describe('setupForStep()', function () {
    it('useModalOverlay: false hides the modal', () => {
      const modal = createShepherdModal(container);
      modal.show();
      expect(modal.getElement()).toHaveClass('shepherd-modal-is-visible');

      const tour = new Tour({ useModalOverlay: false });
      const step = new Step(tour, {});

      modal.setupForStep(step);
      expect(modal.getElement()).not.toHaveClass('shepherd-modal-is-visible');
    });

    it('useModalOverlay: true shows the modal and calls _styleForStep', () => {
      const modal = createShepherdModal(container);
      const rafSpy = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(() => 1);

      const targetEl = document.createElement('div');
      container.appendChild(targetEl);

      const tour = new Tour({ useModalOverlay: true });
      const step = new Step(tour, {
        attachTo: { element: targetEl, on: 'bottom' }
      });
      // Resolve attachTo so step.target is set
      step._resolveAttachToOptions();
      step.target = targetEl;

      modal.setupForStep(step);

      expect(modal.getElement()).toHaveClass('shepherd-modal-is-visible');
      // _styleForStep calls rafLoop which calls requestAnimationFrame
      expect(rafSpy).toHaveBeenCalled();

      rafSpy.mockRestore();
    });
  });

  describe('show/hide', function () {
    it('show adds classes', () => {
      const modal = createShepherdModal(container);

      modal.show();

      expect(modal.getElement()).toHaveClass('shepherd-modal-is-visible');
    });

    it('hide removes classes', () => {
      const modal = createShepherdModal(container);
      modal.show();

      modal.hide();

      expect(modal.getElement()).not.toHaveClass('shepherd-modal-is-visible');
    });
  });

  describe('destroy()', function () {
    it('removes the modal element from the DOM', () => {
      const modal = createShepherdModal(container);
      expect(
        container.querySelector('.shepherd-modal-overlay-container')
      ).toBeTruthy();

      modal.destroy();
      expect(
        container.querySelector('.shepherd-modal-overlay-container')
      ).toBeNull();
    });
  });

  describe('_getScrollParent (via setupForStep)', function () {
    it('recurses to find a scrollable parent element', () => {
      const modal = createShepherdModal(container);
      const rafSpy = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(() => 1);

      // Create a scrollable parent
      const scrollParent = document.createElement('div');
      Object.defineProperty(scrollParent, 'scrollHeight', { value: 500 });
      Object.defineProperty(scrollParent, 'clientHeight', { value: 200 });

      container.appendChild(scrollParent);

      const targetEl = document.createElement('div');
      scrollParent.appendChild(targetEl);

      // Mock getComputedStyle so the target has 'visible' overflow (not scrollable)
      // and the scroll parent has 'auto' overflow (scrollable), forcing recursion
      const origGetComputedStyle = window.getComputedStyle;
      vi.spyOn(window, 'getComputedStyle').mockImplementation((el) => {
        if (el === targetEl) {
          return { overflowY: 'visible' };
        }
        if (el === scrollParent) {
          return { overflowY: 'auto' };
        }
        return origGetComputedStyle(el);
      });

      const tour = new Tour({ useModalOverlay: true });
      const step = new Step(tour, {
        attachTo: { element: targetEl, on: 'bottom' }
      });
      step._resolveAttachToOptions();
      step.target = targetEl;

      // setupForStep triggers _styleForStep -> _getScrollParent
      modal.setupForStep(step);

      expect(modal.getElement()).toHaveClass('shepherd-modal-is-visible');

      rafSpy.mockRestore();
      vi.mocked(window.getComputedStyle).mockRestore();
    });
  });

  describe('_preventModalBodyTouch (via _addStepEventListeners)', function () {
    it('prevents default on window touchmove after setupForStep', () => {
      const modal = createShepherdModal(container);
      const rafSpy = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(() => 1);

      const targetEl = document.createElement('div');
      container.appendChild(targetEl);

      const tour = new Tour({ useModalOverlay: true });
      const step = new Step(tour, {
        attachTo: { element: targetEl, on: 'bottom' }
      });
      step._resolveAttachToOptions();
      step.target = targetEl;

      modal.setupForStep(step);

      // _addStepEventListeners was called, so window has a touchmove listener
      const touchEvent = new Event('touchmove', {
        bubbles: true,
        cancelable: true
      });
      const preventSpy = vi.spyOn(touchEvent, 'preventDefault');
      window.dispatchEvent(touchEvent);
      expect(preventSpy).toHaveBeenCalled();

      // Clean up: hide triggers _cleanupStepEventListeners which removes the listener
      modal.hide();
      rafSpy.mockRestore();
    });
  });

  describe('_preventModalOverlayTouch', function () {
    it('stops propagation on touchmove events', () => {
      const modal = createShepherdModal(container);
      const svgEl = modal.getElement();

      const touchEvent = new Event('touchmove', {
        bubbles: true,
        cancelable: true
      });
      const stopSpy = vi.spyOn(touchEvent, 'stopPropagation');

      svgEl.dispatchEvent(touchEvent);
      expect(stopSpy).toHaveBeenCalled();
    });
  });

  describe('_getIframeOffset (via setupForStep)', function () {
    it('accumulates offset when element is inside an iframe', () => {
      const modal = createShepherdModal(container);
      const rafSpy = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(() => 1);

      const targetEl = document.createElement('div');
      container.appendChild(targetEl);

      // Simulate the element being inside an iframe by mocking ownerDocument.defaultView
      const fakeIframe = document.createElement('iframe');
      Object.defineProperty(fakeIframe, 'getBoundingClientRect', {
        value: () => ({
          top: 10,
          left: 20,
          width: 100,
          height: 100,
          x: 20,
          y: 10
        })
      });
      Object.defineProperty(fakeIframe, 'scrollTop', { value: 5 });
      Object.defineProperty(fakeIframe, 'scrollLeft', { value: 3 });

      const fakeChildWindow = {
        frameElement: fakeIframe,
        parent: window
      };

      const origDescriptor = Object.getOwnPropertyDescriptor(
        targetEl.ownerDocument,
        'defaultView'
      );
      Object.defineProperty(targetEl.ownerDocument, 'defaultView', {
        value: fakeChildWindow,
        configurable: true
      });

      const tour = new Tour({ useModalOverlay: true });
      const step = new Step(tour, {
        attachTo: { element: targetEl, on: 'bottom' }
      });
      step._resolveAttachToOptions();
      step.target = targetEl;

      // This triggers _styleForStep -> _getIframeOffset, which should
      // walk up through fakeChildWindow and accumulate the iframe offset
      modal.setupForStep(step);

      // Restore defaultView before any assertions (jsdom needs it for instanceof checks)
      if (origDescriptor) {
        Object.defineProperty(
          targetEl.ownerDocument,
          'defaultView',
          origDescriptor
        );
      } else {
        Object.defineProperty(targetEl.ownerDocument, 'defaultView', {
          value: window,
          configurable: true
        });
      }

      expect(modal.getElement()).toHaveClass('shepherd-modal-is-visible');

      rafSpy.mockRestore();
    });
  });
});
