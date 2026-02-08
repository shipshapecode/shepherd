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
    scrollParent?: HTMLElement | null,
    targetElement?: HTMLElement | null,
    extraHighlights?: HTMLElement[]
  ) => void;
  setupForStep: (step: Step) => void;
  show: () => void;
  getElement: () => SVGElement;
}

export function createShepherdModal(container: HTMLElement): ShepherdModalAPI {
  let rafId: number | undefined;
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

  function positionModal(
    modalOverlayOpeningPadding = 0,
    modalOverlayOpeningRadius: ModalRadiusType = 0,
    modalOverlayOpeningXOffset = 0,
    modalOverlayOpeningYOffset = 0,
    scrollParent?: HTMLElement | null,
    targetElement?: HTMLElement | null,
    extraHighlights?: HTMLElement[]
  ) {
    if (targetElement) {
      const elementsToHighlight = [targetElement, ...(extraHighlights || [])];
      const newOpenings: OpeningProperty[] = [];

      for (const el of elementsToHighlight) {
        if (!el) continue;

        // Skip duplicate elements
        if (
          elementsToHighlight.indexOf(el) !==
          elementsToHighlight.lastIndexOf(el)
        ) {
          continue;
        }

        const { y, height } = _getVisibleHeight(el, scrollParent);
        const { x, width, left } = el.getBoundingClientRect();

        // Check if the element is contained by another element.
        // Use _getVisibleHeight for otherElement too so both sides
        // compare scroll-clipped geometry on the y-axis.
        const isContained = elementsToHighlight.some((otherElement) => {
          if (otherElement === el) return false;
          const otherRect = otherElement.getBoundingClientRect();
          const { y: otherY, height: otherHeight } = _getVisibleHeight(
            otherElement,
            scrollParent
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
    const scrollParent = _getScrollParent(step.target);

    const rafLoop = () => {
      rafId = undefined;
      positionModal(
        modalOverlayOpeningPadding,
        modalOverlayOpeningRadius,
        modalOverlayOpeningXOffset + iframeOffset.left,
        modalOverlayOpeningYOffset + iframeOffset.top,
        scrollParent,
        step.target,
        step._resolvedExtraHighlightElements
      );
      rafId = requestAnimationFrame(rafLoop);
    };

    rafLoop();
    _addStepEventListeners();
  }

  function _getScrollParent(el?: HTMLElement | null): HTMLElement | null {
    if (!el) return null;

    const isHtmlElement = el instanceof HTMLElement;
    const overflowY = isHtmlElement && window.getComputedStyle(el).overflowY;
    const isScrollable = overflowY !== 'hidden' && overflowY !== 'visible';

    if (isScrollable && el.scrollHeight >= el.clientHeight) {
      return el;
    }

    return _getScrollParent(el.parentElement);
  }

  function _getIframeOffset(el?: HTMLElement | null) {
    const offset = { top: 0, left: 0 };

    if (!el) return offset;

    let targetWindow: Window | null = el.ownerDocument.defaultView;

    while (targetWindow && targetWindow !== window.top) {
      const targetIframe = targetWindow?.frameElement;

      if (targetIframe) {
        const rect = targetIframe.getBoundingClientRect();
        offset.top += rect.top + targetIframe.scrollTop;
        offset.left += rect.left + targetIframe.scrollLeft;
      }

      targetWindow = targetWindow.parent;
    }

    return offset;
  }

  function _getVisibleHeight(
    el: HTMLElement,
    scrollParent?: HTMLElement | null
  ) {
    const elementRect = el.getBoundingClientRect();
    let top = elementRect.y || elementRect.top;
    let bottom = elementRect.bottom || top + elementRect.height;

    if (scrollParent) {
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
