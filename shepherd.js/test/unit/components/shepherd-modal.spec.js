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

    describe('across scroll parents', function () {
      // Regression coverage for https://github.com/shipshapecode/shepherd/issues/3344
      // Every highlighted element must be clipped by its OWN chain of scroll
      // containers, not by the scroll parent of the `attachTo` target.
      let restoreComputedStyle;
      let restoreRaf;

      function stubRect(el, { x, y, width, height }) {
        Object.defineProperty(el, 'getBoundingClientRect', {
          configurable: true,
          value: () => ({
            x,
            y,
            width,
            height,
            top: y,
            bottom: y + height,
            left: x,
            right: x + width
          })
        });
      }

      function makeScrollContainer(rect, parent = container) {
        const el = document.createElement('div');
        Object.defineProperty(el, 'scrollHeight', { value: 500 });
        Object.defineProperty(el, 'clientHeight', { value: rect.height });
        parent.appendChild(el);
        stubRect(el, rect);
        return el;
      }

      function makeChild(parent, rect) {
        const el = document.createElement('div');
        parent.appendChild(el);
        stubRect(el, rect);
        return el;
      }

      // `overflows` maps an element to the `overflowY` it should report.
      // Everything else reports 'visible', which is what a real browser returns
      // for an ordinary element. happy-dom returns '' instead, and
      // `_getScrollParent` reads '' as scrollable, so without this every
      // unstyled ancestor up to <html> would count as a scroll container.
      // `positions` maps an element to the `position` it should report, which
      // decides whether a scrollable ancestor actually crops it. Anything not
      // listed reports 'static', matching an ordinary element.
      function mockOverflow(overflows, positions = new Map()) {
        const spy = vi
          .spyOn(window, 'getComputedStyle')
          .mockImplementation((el) => ({
            overflowY: overflows.get(el) ?? 'visible',
            position: positions.get(el) ?? 'static'
          }));
        restoreComputedStyle = () => spy.mockRestore();
        return spy;
      }

      function mockRaf() {
        const spy = vi
          .spyOn(window, 'requestAnimationFrame')
          .mockImplementation(() => 1);
        restoreRaf = () => spy.mockRestore();
        return spy;
      }

      afterEach(() => {
        restoreComputedStyle?.();
        restoreComputedStyle = undefined;
        restoreRaf?.();
        restoreRaf = undefined;
      });

      it('cuts out an extra highlight living in a different scroll parent', () => {
        const modal = createShepherdModal(container);

        // Scroll container A holds the attachTo target, high on the page.
        const containerA = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 100
        });
        const targetEl = makeChild(containerA, {
          x: 10,
          y: 10,
          width: 100,
          height: 50
        });

        // Scroll container B is a sibling further down, holding the extra.
        const containerB = makeScrollContainer({
          x: 0,
          y: 200,
          width: 500,
          height: 100
        });
        const extraEl = makeChild(containerB, {
          x: 200,
          y: 210,
          width: 100,
          height: 40
        });

        mockOverflow(
          new Map([
            [containerA, 'auto'],
            [containerB, 'auto']
          ])
        );

        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);

        const d = modal.getElement().querySelector('path').getAttribute('d');

        // Outer path + target cutout + extra cutout
        expect(d.split('Z').length - 1).toBe(3);
        // The extra is fully visible inside container B: y 210, height 40.
        // Before the fix it was clipped by container A (y 0-100) down to a
        // degenerate zero-height rect ending at V210.
        expect(d).toContain('M200,210');
        expect(d).toContain('V250');
      });

      it('still clips an extra highlight by its own scroll parent', () => {
        const modal = createShepherdModal(container);

        const containerA = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 100
        });
        const targetEl = makeChild(containerA, {
          x: 10,
          y: 10,
          width: 100,
          height: 50
        });

        // Extra lives in the SAME container, but scrolled below its bottom edge.
        const extraEl = makeChild(containerA, {
          x: 200,
          y: 210,
          width: 100,
          height: 40
        });

        mockOverflow(new Map([[containerA, 'auto']]));

        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);

        const d = modal.getElement().querySelector('path').getAttribute('d');

        // Clipped to zero height — starts and ends at y 210.
        expect(d).toContain('M200,210');
        expect(d).toContain('V210');
        expect(d).not.toContain('V250');
      });

      it('clips a highlight by every scroll container above it, not just the nearest', () => {
        const modal = createShepherdModal(container);

        // Outer scroll container, on screen, holding the target.
        const outer = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 300
        });
        const targetEl = makeChild(outer, {
          x: 10,
          y: 10,
          width: 100,
          height: 50
        });

        // Inner scroll container nested inside `outer` and scrolled out of it.
        const inner = makeScrollContainer(
          { x: 0, y: 400, width: 500, height: 200 },
          outer
        );
        const extraEl = makeChild(inner, {
          x: 200,
          y: 420,
          width: 100,
          height: 40
        });

        mockOverflow(
          new Map([
            [outer, 'auto'],
            [inner, 'auto']
          ])
        );

        modal.positionModal(0, 0, 0, 0, outer, targetEl, [extraEl]);

        const d = modal.getElement().querySelector('path').getAttribute('d');

        // The target is on screen and still cut out.
        expect(d).toContain('M10,10');
        // The extra is fully visible within `inner`, but `inner` is scrolled
        // out of `outer`, so none of it is on screen. Clipping against the
        // nearest scroll container alone would punch a 100x40 hole here.
        expect(d).toContain('M200,420');
        expect(d).not.toContain('V460');
      });

      it('uses each element own scroll parents in the containment check', () => {
        const modal = createShepherdModal(container);

        // Container A is tall enough that it clips nothing.
        const containerA = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 1000
        });
        const targetEl = makeChild(containerA, {
          x: 10,
          y: 10,
          width: 100,
          height: 50
        });

        // `big` overflows its own short container and is not on screen at all...
        const containerB = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 50
        });
        const big = makeChild(containerB, {
          x: 150,
          y: 100,
          width: 200,
          height: 300
        });

        // ...but its unclipped rect encloses `small`, which is fully visible.
        const containerC = makeScrollContainer({
          x: 0,
          y: 200,
          width: 500,
          height: 100
        });
        const small = makeChild(containerC, {
          x: 200,
          y: 210,
          width: 100,
          height: 40
        });

        mockOverflow(
          new Map([
            [containerA, 'auto'],
            [containerB, 'auto'],
            [containerC, 'auto']
          ])
        );

        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [big, small]);

        const d = modal.getElement().querySelector('path').getAttribute('d');

        // Measured against container A — the target's scroll parent — `big`
        // would be y 100 height 300, which contains `small` and suppresses it.
        // Measured against its own container B it has zero height, so `small`
        // still gets a cutout.
        expect(d).toContain('M200,210');
        expect(d).toContain('V250');
        // Outer path + target + big + small
        expect(d.split('Z').length - 1).toBe(4);
      });

      it('clips the target by the scroll parent it is handed, not by its own', () => {
        const modal = createShepherdModal(container);

        // Nothing in the target's ancestry is scrollable, so resolving its
        // scroll parent from the DOM would find none. `_styleForStep` hands the
        // scroll parent in, and that is the one the target must be clipped by.
        const targetEl = makeChild(container, {
          x: 10,
          y: 10,
          width: 100,
          height: 500
        });
        const suppliedScrollParent = {
          getBoundingClientRect: () => ({
            x: 10,
            y: 100,
            width: 500,
            height: 250,
            top: 100,
            bottom: 350,
            left: 10,
            right: 510
          })
        };

        mockOverflow(new Map());

        modal.positionModal(0, 0, 0, 0, suppliedScrollParent, targetEl);

        const d = modal.getElement().querySelector('path').getAttribute('d');

        expect(d).toContain('M10,100');
        expect(d).toContain('V350');
      });

      it('clips every highlight by the shared scroll parent when they share one', () => {
        const modal = createShepherdModal(container);

        const containerA = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 200
        });
        const targetEl = makeChild(containerA, {
          x: 10,
          y: 10,
          width: 100,
          height: 50
        });
        // Hangs over the bottom edge of A, so the clip actually bites: the
        // bottom 50px are cut off and the cutout is 50 tall, not 100.
        const extraEl = makeChild(containerA, {
          x: 200,
          y: 150,
          width: 100,
          height: 100
        });

        mockOverflow(new Map([[containerA, 'auto']]));

        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);

        expect(modal.getElement().querySelector('path')).toHaveAttribute(
          'd',
          'M1024,768H0V0H1024V768ZM10,10a0,0,0,0,0-0,0V60a0,0,0,0,0,0,0H110a0,0,0,0,0,0-0V10a0,0,0,0,0-0-0ZM200,150a0,0,0,0,0-0,0V200a0,0,0,0,0,0,0H300a0,0,0,0,0,0-0V150a0,0,0,0,0-0-0Z'
        );
      });

      it('resolves each scroll parent once per step rather than once per frame', () => {
        const modal = createShepherdModal(container);

        const containerA = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 100
        });
        const targetEl = makeChild(containerA, {
          x: 10,
          y: 10,
          width: 100,
          height: 50
        });

        const containerB = makeScrollContainer({
          x: 0,
          y: 200,
          width: 500,
          height: 100
        });
        const extraEl = makeChild(containerB, {
          x: 200,
          y: 210,
          width: 100,
          height: 40
        });

        const spy = mockOverflow(
          new Map([
            [containerA, 'auto'],
            [containerB, 'auto']
          ])
        );

        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);
        const afterFirstFrame = spy.mock.calls.length;
        expect(afterFirstFrame).toBeGreaterThan(0);

        // A second frame of the same step must not re-walk the ancestor chain.
        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);
        expect(spy.mock.calls.length).toBe(afterFirstFrame);

        // ...but the memo must not survive the step, or it could go stale.
        modal.hide();
        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);
        expect(spy.mock.calls.length).toBeGreaterThan(afterFirstFrame);
      });

      it('memoizes a highlight that resolves to no scroll parent at all', () => {
        const modal = createShepherdModal(container);

        const containerA = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 100
        });
        const targetEl = makeChild(containerA, {
          x: 10,
          y: 10,
          width: 100,
          height: 50
        });

        // The extra sits in no scroll container at all, so its resolved chain
        // is empty. That answer costs a full ancestor walk to reach and has to
        // be memoized just like a non-empty one.
        const extraEl = makeChild(container, {
          x: 200,
          y: 210,
          width: 100,
          height: 40
        });

        const spy = mockOverflow(new Map([[containerA, 'auto']]));

        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);
        const afterFirstFrame = spy.mock.calls.length;
        expect(afterFirstFrame).toBeGreaterThan(0);

        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);
        expect(spy.mock.calls.length).toBe(afterFirstFrame);

        modal.hide();
        modal.positionModal(0, 0, 0, 0, containerA, targetEl, [extraEl]);
        expect(spy.mock.calls.length).toBeGreaterThan(afterFirstFrame);
      });

      it('resolves extraHighlights scroll parents through setupForStep', () => {
        const modal = createShepherdModal(container);

        const containerA = makeScrollContainer({
          x: 0,
          y: 0,
          width: 500,
          height: 100
        });
        const targetEl = makeChild(containerA, {
          x: 10,
          y: 10,
          width: 100,
          height: 50
        });

        const containerB = makeScrollContainer({
          x: 0,
          y: 200,
          width: 500,
          height: 100
        });
        const extraEl = makeChild(containerB, {
          x: 200,
          y: 210,
          width: 100,
          height: 40
        });
        extraEl.classList.add('extra-highlight-3344');

        const tour = new Tour({ useModalOverlay: true });
        const step = new Step(tour, {
          attachTo: { element: targetEl, on: 'bottom' },
          extraHighlights: ['.extra-highlight-3344']
        });
        step._resolveAttachToOptions();
        step.target = targetEl;
        step._resolveExtraHiglightElements();

        mockRaf();
        mockOverflow(
          new Map([
            [containerA, 'auto'],
            [containerB, 'auto']
          ])
        );

        // Goes through _styleForStep, which is what resolves the target's own
        // scroll parent and passes it in as `targetScrollParent`.
        modal.setupForStep(step);

        const d = modal.getElement().querySelector('path').getAttribute('d');

        expect(d.split('Z').length - 1).toBe(3);
        expect(d).toContain('M200,210');
        expect(d).toContain('V250');

        modal.hide();
      });

      // A scrollable DOM ancestor only crops a descendant when it is in that
      // descendant's containing block chain. Resolving a scroll parent per
      // element made this matter: without the containing block check, an
      // absolutely positioned dropdown painted outside the panel it is nested
      // in loses its opening entirely.
      describe('elements whose position escapes a scrollable ancestor', () => {
        // Panel occupies y 400-500; the extra is a DOM child of it but is
        // painted up at y 80-120, the way an absolutely positioned dropdown is.
        function buildEscapingCase(extraPosition, panelPosition = 'static') {
          const panel = makeScrollContainer({
            x: 0,
            y: 400,
            width: 500,
            height: 100
          });
          const targetEl = makeChild(container, {
            x: 10,
            y: 10,
            width: 100,
            height: 50
          });
          const extraEl = makeChild(panel, {
            x: 300,
            y: 80,
            width: 120,
            height: 40
          });

          mockOverflow(
            new Map([[panel, 'auto']]),
            new Map([
              [panel, panelPosition],
              [extraEl, extraPosition]
            ])
          );

          return { panel, targetEl, extraEl };
        }

        it('keeps the full opening for an absolutely positioned extra highlight', () => {
          const modal = createShepherdModal(container);
          const { targetEl, extraEl } = buildEscapingCase('absolute');

          // The target has no scroll parent of its own, so the caller passes null.
          modal.positionModal(0, 0, 0, 0, null, targetEl, [extraEl]);

          const d = modal.getElement().querySelector('path').getAttribute('d');

          expect(d.split('Z').length - 1).toBe(3);
          // Painted at y 80-120 and cut out there, not collapsed against the
          // panel's y 400-500.
          expect(d).toContain('M300,80');
          expect(d).toContain('V120');
        });

        it('keeps the full opening for a fixed position extra highlight', () => {
          const modal = createShepherdModal(container);
          const { targetEl, extraEl } = buildEscapingCase('fixed');

          modal.positionModal(0, 0, 0, 0, null, targetEl, [extraEl]);

          const d = modal.getElement().querySelector('path').getAttribute('d');

          expect(d.split('Z').length - 1).toBe(3);
          expect(d).toContain('M300,80');
          expect(d).toContain('V120');
        });

        // The discriminator: absolute positioning does not exempt an element
        // from cropping, it only moves which ancestor does the cropping. When
        // the scrollable panel IS the containing block, it crops as usual.
        it('still clips an absolutely positioned extra to its containing block', () => {
          const modal = createShepherdModal(container);
          const { targetEl, extraEl } = buildEscapingCase(
            'absolute',
            'relative'
          );

          modal.positionModal(0, 0, 0, 0, null, targetEl, [extraEl]);

          const d = modal.getElement().querySelector('path').getAttribute('d');

          // Scrolled out of its own containing block, so it collapses to zero
          // height rather than cutting a hole where nothing is painted.
          expect(d).toContain('M300,400');
          expect(d).toContain('V400');
          expect(d).not.toContain('V120');
        });

        it('still clips an in-flow extra scrolled out of its own container', () => {
          const modal = createShepherdModal(container);

          const panel = makeScrollContainer({
            x: 0,
            y: 400,
            width: 500,
            height: 100
          });
          const targetEl = makeChild(container, {
            x: 10,
            y: 10,
            width: 100,
            height: 50
          });
          const extraEl = makeChild(panel, {
            x: 300,
            y: 600,
            width: 120,
            height: 40
          });

          mockOverflow(new Map([[panel, 'auto']]));

          modal.positionModal(0, 0, 0, 0, null, targetEl, [extraEl]);

          const d = modal.getElement().querySelector('path').getAttribute('d');

          expect(d).toContain('M300,600');
          expect(d).toContain('V600');
        });
      });
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

    it('handles cross-origin iframe SecurityError gracefully', () => {
      // Regression test for https://github.com/shipshapecode/shepherd/issues/3087
      // When Shepherd is loaded in a nested cross-origin iframe, accessing
      // window.frameElement throws a SecurityError due to Same-Origin Policy.
      // This test ensures the error is caught and handled gracefully.
      const modal = createShepherdModal(container);
      const rafSpy = vi
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation(() => 1);

      const targetEl = document.createElement('div');
      container.appendChild(targetEl);

      // Simulate a cross-origin iframe by making frameElement access throw SecurityError
      const fakeChildWindow = {
        get frameElement() {
          // Simulate browser's SecurityError when accessing cross-origin frameElement
          const error = new Error(
            'Blocked a frame with origin "https://example.com" from accessing a cross-origin frame.'
          );
          error.name = 'SecurityError';
          throw error;
        },
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

      // This should NOT throw an error, even though frameElement access throws SecurityError
      expect(() => {
        modal.setupForStep(step);
      }).not.toThrow();

      // Restore defaultView before any assertions
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
