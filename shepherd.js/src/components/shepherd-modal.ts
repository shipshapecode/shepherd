import { svgEl } from '../utils/dom.ts';
import { makeOverlayPath } from '../utils/overlay-path.ts';
import type { Step } from '../step.ts';
import './shepherd-modal.css';

interface OpeningProperty {
  width: number;
  height: number;
  x: number;
  y: number;
  r:
    | number
    | {
        topLeft: number;
        bottomLeft: number;
        bottomRight: number;
        topRight: number;
      };
}

type ModalRadiusType =
  | number
  | {
      topLeft?: number;
      bottomLeft?: number;
      bottomRight?: number;
      topRight?: number;
    };

export interface ShepherdModalAPI {
  closeModalOpening: () => void;
  destroy: () => void;
  hide: () => void;
  positionModal: (
    modalOverlayOpeningPadding?: number,
    modalOverlayOpeningRadius?: ModalRadiusType,
    modalOverlayOpeningXOffset?: number,
    modalOverlayOpeningYOffset?: number,
    targetScrollParent?: HTMLElement | null,
    targetElement?: HTMLElement | null,
    extraHighlights?: HTMLElement[]
  ) => void;
  setupForStep: (step: Step) => void;
  show: () => void;
  getElement: () => SVGElement;
}

export function createShepherdModal(container: HTMLElement): ShepherdModalAPI {
  let rafId: number | undefined;
  // Memoizes the chain of scroll parents of a highlighted element for the
  // lifetime of a single step. Reset in `_cleanupStepEventListeners`.
  let _stepScrollParents = new WeakMap<HTMLElement, HTMLElement[]>();
  let openingProperties: OpeningProperty[] = [
    { width: 0, height: 0, x: 0, y: 0, r: 0 }
  ];

  // Build SVG elements
  const pathEl = svgEl('path');
  const element = svgEl(
    'svg',
    { class: 'shepherd-modal-overlay-container' },
    pathEl
  );

  element.addEventListener('touchmove', _preventModalOverlayTouch);

  // Initial render
  _updatePath();

  container.append(element);

  function _updatePath() {
    pathEl.setAttribute('d', makeOverlayPath(openingProperties));
  }

  function closeModalOpening() {
    openingProperties = [{ width: 0, height: 0, x: 0, y: 0, r: 0 }];
    _updatePath();
  }

  function hide() {
    element.classList.remove('shepherd-modal-is-visible');
    _cleanupStepEventListeners();
  }

  function show() {
    element.classList.add('shepherd-modal-is-visible');
  }

  /**
   * @param targetScrollParent The nearest scroll parent of `targetElement`
   *   only. Extra highlights can live in entirely different scroll containers,
   *   so each one resolves its own chain via `_cachedScrollParents`. Any scroll
   *   containers above `targetScrollParent` are resolved here too.
   */
  function positionModal(
    modalOverlayOpeningPadding = 0,
    modalOverlayOpeningRadius: ModalRadiusType = 0,
    modalOverlayOpeningXOffset = 0,
    modalOverlayOpeningYOffset = 0,
    targetScrollParent?: HTMLElement | null,
    targetElement?: HTMLElement | null,
    extraHighlights?: HTMLElement[]
  ) {
    if (targetElement) {
      const elementsToHighlight = [targetElement, ...(extraHighlights || [])];
      const newOpenings: OpeningProperty[] = [];

      // The target's nearest scroll parent is supplied by the caller; the rest
      // of its chain is resolved the same way as for any other highlight.
      const targetScrollParents = targetScrollParent
        ? [
            targetScrollParent,
            ..._cachedScrollParents(targetScrollParent.parentElement)
          ]
        : [];

      const scrollParentsFor = (el: HTMLElement) =>
        el === targetElement ? targetScrollParents : _cachedScrollParents(el);

      for (const el of elementsToHighlight) {
        if (!el) continue;

        // Skip duplicate elements
        if (
          elementsToHighlight.indexOf(el) !==
          elementsToHighlight.lastIndexOf(el)
        ) {
          continue;
        }

        const { y, height } = _getVisibleHeight(el, scrollParentsFor(el));
        const { x, width, left } = el.getBoundingClientRect();

        // Check if the element is contained by another element.
        // Use _getVisibleHeight for otherElement too so both sides compare
        // scroll-clipped geometry on the y-axis, each element being clipped
        // by its own scroll parents.
        const isContained = elementsToHighlight.some((otherElement) => {
          if (otherElement === el) return false;
          const otherRect = otherElement.getBoundingClientRect();
          const { y: otherY, height: otherHeight } = _getVisibleHeight(
            otherElement,
            scrollParentsFor(otherElement)
          );
          return (
            x >= otherRect.left &&
            x + width <= otherRect.left + otherRect.width &&
            y >= otherY &&
            y + height <= otherY + otherHeight
          );
        });

        if (isContained) continue;

        newOpenings.push({
          width: width + modalOverlayOpeningPadding * 2,
          height: height + modalOverlayOpeningPadding * 2,
          x:
            (x || left) +
            modalOverlayOpeningXOffset -
            modalOverlayOpeningPadding,
          y: y + modalOverlayOpeningYOffset - modalOverlayOpeningPadding,
          r: modalOverlayOpeningRadius as OpeningProperty['r']
        });
      }

      openingProperties = newOpenings;
    } else {
      closeModalOpening();
      return;
    }

    _updatePath();
  }

  function setupForStep(step: Step) {
    _cleanupStepEventListeners();

    if (step.tour.options.useModalOverlay) {
      _styleForStep(step);
      show();
    } else {
      hide();
    }
  }

  function destroy() {
    _cleanupStepEventListeners();
    element.removeEventListener('touchmove', _preventModalOverlayTouch);
    element.remove();
  }

  function getElement() {
    return element;
  }

  // --- Private helpers ---

  function _preventModalOverlayTouch(e: Event) {
    e.stopPropagation();
  }

  const _preventModalBodyTouch = (e: Event) => {
    e.preventDefault();
  };

  function _addStepEventListeners() {
    window.addEventListener('touchmove', _preventModalBodyTouch, {
      passive: false
    });
  }

  function _cleanupStepEventListeners() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = undefined;
    }

    // Scroll parents are only memoized for the duration of a single step.
    _stepScrollParents = new WeakMap();

    window.removeEventListener('touchmove', _preventModalBodyTouch, {
      passive: false
    } as EventListenerOptions);
  }

  function _styleForStep(step: Step) {
    const {
      modalOverlayOpeningPadding,
      modalOverlayOpeningRadius,
      modalOverlayOpeningXOffset = 0,
      modalOverlayOpeningYOffset = 0
    } = step.options;

    const iframeOffset = _getIframeOffset(step.target);
    const targetScrollParent = _getScrollParent(step.target);

    const rafLoop = () => {
      rafId = undefined;
      positionModal(
        modalOverlayOpeningPadding,
        modalOverlayOpeningRadius,
        modalOverlayOpeningXOffset + iframeOffset.left,
        modalOverlayOpeningYOffset + iframeOffset.top,
        targetScrollParent,
        step.target,
        step._resolvedExtraHighlightElements
      );
      rafId = requestAnimationFrame(rafLoop);
    };

    rafLoop();
    _addStepEventListeners();
  }

  /**
   * Whether `el` crops overflowing descendants on the y-axis.
   *
   * @param el The candidate scroll container
   * @param style `el`'s computed style, already resolved by the caller
   */
  function _isScrollable(el: HTMLElement, style: CSSStyleDeclaration) {
    const { overflowY } = style;

    return (
      overflowY !== 'hidden' &&
      overflowY !== 'visible' &&
      el.scrollHeight >= el.clientHeight
    );
  }

  /**
   * Every scroll container that clips `el`, nearest first, including `el`
   * itself when it is one.
   *
   * Clipping against the nearest alone is wrong as soon as scroll containers
   * nest: an element sitting inside an inner container that has itself been
   * scrolled out of an outer one measures as fully visible against the inner
   * container, and the overlay would cut a hole where nothing is on screen.
   *
   * DOM ancestry is not the clipping chain either. A `fixed` element is laid
   * out against the viewport, and an `absolute` element is cropped only from
   * its containing block upwards -- scrollable ancestors below that block paint
   * it without cropping it. Walking `parentElement` unconditionally would size
   * the opening for an absolutely positioned dropdown to whichever panel it
   * happens to be nested in rather than to where it is painted, and would drop
   * the opening entirely once that panel is scrolled away.
   *
   * The containing block is derived from each ancestor's computed `position`
   * rather than from `offsetParent`, which happy-dom does not implement and the
   * unit tests therefore cannot exercise.
   */
  function _getScrollParents(el?: HTMLElement | null): HTMLElement[] {
    if (!(el instanceof HTMLElement)) return [];

    const { position } = window.getComputedStyle(el);

    // Laid out against the viewport, so no ancestor crops it.
    if (position === 'fixed') return [];

    const scrollParents: HTMLElement[] = [];
    let crops = position !== 'absolute';

    for (
      let current: HTMLElement | null = el;
      current;
      current = current.parentElement
    ) {
      const style = window.getComputedStyle(current);

      // The nearest positioned ancestor is an absolutely positioned element's
      // containing block; from there upwards the usual overflow rules apply.
      if (!crops && current !== el && style.position !== 'static') {
        crops = true;
      }

      if (crops && _isScrollable(current, style)) {
        scrollParents.push(current);
      }
    }

    return scrollParents;
  }

  function _getScrollParent(el?: HTMLElement | null): HTMLElement | null {
    return _getScrollParents(el)[0] ?? null;
  }

  /**
   * Memoized `_getScrollParents`, scoped to the current step.
   *
   * Resolving inline would be prohibitively expensive: the containment check in
   * `positionModal` is O(n^2) over the highlighted elements and runs on every
   * animation frame, while each walk costs one `window.getComputedStyle` call
   * per ancestor. The answer cannot change between frames of a step, so it is
   * resolved once per element instead — matching the once-per-step contract the
   * target already has in `_styleForStep`.
   */
  function _cachedScrollParents(el?: HTMLElement | null): HTMLElement[] {
    if (!el) return [];

    const cached = _stepScrollParents.get(el);
    if (cached) return cached;

    const scrollParents = _getScrollParents(el);
    _stepScrollParents.set(el, scrollParents);
    return scrollParents;
  }

  function _getIframeOffset(el?: HTMLElement | null) {
    const offset = { top: 0, left: 0 };

    if (!el) return offset;

    let targetWindow: Window | null = el.ownerDocument.defaultView;

    try {
      while (targetWindow && targetWindow !== window.top) {
        const targetIframe = targetWindow?.frameElement;

        if (targetIframe) {
          const rect = targetIframe.getBoundingClientRect();
          offset.top += rect.top + targetIframe.scrollTop;
          offset.left += rect.left + targetIframe.scrollLeft;
        }

        targetWindow = targetWindow.parent;
      }
    } catch {
      // Cross-origin iframe — stop traversal and use the offset accumulated so far.
    }

    return offset;
  }

  function _getVisibleHeight(el: HTMLElement, scrollParents: HTMLElement[]) {
    const elementRect = el.getBoundingClientRect();
    let top = elementRect.y || elementRect.top;
    let bottom = elementRect.bottom || top + elementRect.height;

    for (const scrollParent of scrollParents) {
      const scrollRect = scrollParent.getBoundingClientRect();
      const scrollTop = scrollRect.y || scrollRect.top;
      const scrollBottom = scrollRect.bottom || scrollTop + scrollRect.height;

      top = Math.max(top, scrollTop);
      bottom = Math.min(bottom, scrollBottom);
    }

    const height = Math.max(bottom - top, 0);
    return { y: top, height };
  }

  return {
    closeModalOpening,
    destroy,
    hide,
    positionModal,
    setupForStep,
    show,
    getElement
  };
}
