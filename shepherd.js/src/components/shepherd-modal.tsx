import { createSignal, createMemo } from 'solid-js';
import { makeOverlayPath } from '../utils/overlay-path';
import type { Step } from '../step';

export interface ShepherdModalProps {
  // No props needed as we control this externally
}

interface OpeningProperty {
  width: number;
  height: number;
  x: number;
  y: number;
  r: number | { topLeft: number; bottomLeft: number; bottomRight: number; topRight: number };
}

type ModalRadiusType = number | { topLeft?: number; bottomLeft?: number; bottomRight?: number; topRight?: number };

export interface ShepherdModalRef {
  closeModalOpening: () => void;
  hide: () => void;
  positionModal: (
    modalOverlayOpeningPadding: number,
    modalOverlayOpeningRadius: ModalRadiusType,
    modalOverlayOpeningXOffset: number,
    modalOverlayOpeningYOffset: number,
    scrollParent: HTMLElement | null,
    targetElement: HTMLElement | null,
    extraHighlights?: HTMLElement[]
  ) => void;
  setupForStep: (step: Step) => void;
  show: () => void;
  getElement: () => SVGSVGElement | undefined;
}

export default function ShepherdModal(): [() => any, ShepherdModalRef] {
  let element: SVGSVGElement | undefined;
  const [modalIsVisible, setModalIsVisible] = createSignal(false);
  const [openingProperties, setOpeningProperties] = createSignal<OpeningProperty[]>([
    {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      r: 0
    }
  ]);
  let rafId: number | undefined;

  const pathDefinition = createMemo(() => makeOverlayPath(openingProperties()));

  const getElement = () => element;

  const closeModalOpening = () => {
    setOpeningProperties([
      {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        r: 0
      }
    ]);
  };

  const hide = () => {
    setModalIsVisible(false);
    _cleanupStepEventListeners();
  };

  const positionModal = (
    modalOverlayOpeningPadding = 0,
    modalOverlayOpeningRadius: ModalRadiusType = 0,
    modalOverlayOpeningXOffset = 0,
    modalOverlayOpeningYOffset = 0,
    scrollParent: HTMLElement | null,
    targetElement: HTMLElement | null,
    extraHighlights?: HTMLElement[]
  ) => {
    if (targetElement) {
      const elementsToHighlight = [targetElement, ...(extraHighlights || [])];
      const newOpenings: OpeningProperty[] = [];

      for (const element of elementsToHighlight) {
        if (!element) continue;

        // Skip duplicate elements
        if (
          elementsToHighlight.indexOf(element) !==
          elementsToHighlight.lastIndexOf(element)
        ) {
          continue;
        }

        const { y, height } = _getVisibleHeight(element, scrollParent);
        const { x, width, left } = element.getBoundingClientRect();

        // Check if the element is contained by another element
        const isContained = elementsToHighlight.some((otherElement) => {
          if (otherElement === element) return false;
          const otherRect = otherElement.getBoundingClientRect();
          return (
            x >= otherRect.left &&
            x + width <= otherRect.right &&
            y >= otherRect.top &&
            y + height <= otherRect.bottom
          );
        });

        if (isContained) continue;

        // Normalize radius to full object if partial
        let normalizedRadius: number | { topLeft: number; bottomLeft: number; bottomRight: number; topRight: number };
        if (typeof modalOverlayOpeningRadius === 'number') {
          normalizedRadius = modalOverlayOpeningRadius;
        } else {
          normalizedRadius = {
            topLeft: modalOverlayOpeningRadius.topLeft ?? 0,
            bottomLeft: modalOverlayOpeningRadius.bottomLeft ?? 0,
            bottomRight: modalOverlayOpeningRadius.bottomRight ?? 0,
            topRight: modalOverlayOpeningRadius.topRight ?? 0
          };
        }

        // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
        newOpenings.push({
          width: width + modalOverlayOpeningPadding * 2,
          height: height + modalOverlayOpeningPadding * 2,
          x:
            (x || left) +
            modalOverlayOpeningXOffset -
            modalOverlayOpeningPadding,
          y: y + modalOverlayOpeningYOffset - modalOverlayOpeningPadding,
          r: normalizedRadius
        });
      }

      setOpeningProperties(newOpenings);
    } else {
      closeModalOpening();
    }
  };

  const setupForStep = (step: Step) => {
    // Ensure we move listeners from the previous step, before we setup new ones
    _cleanupStepEventListeners();

    if (step.tour.options.useModalOverlay) {
      _styleForStep(step);
      show();
    } else {
      hide();
    }
  };

  const show = () => {
    setModalIsVisible(true);
  };

  const _preventModalBodyTouch = (e: TouchEvent) => {
    e.preventDefault();
  };

  const _preventModalOverlayTouch = (e: TouchEvent) => {
    e.stopPropagation();
  };

  function _addStepEventListeners() {
    // Prevents window from moving on touch.
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
    } as any);
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

    // Setup recursive function to call requestAnimationFrame to update the modal opening position
    const rafLoop = () => {
      rafId = undefined;
      positionModal(
        modalOverlayOpeningPadding || 0,
        modalOverlayOpeningRadius || 0,
        modalOverlayOpeningXOffset + iframeOffset.left,
        modalOverlayOpeningYOffset + iframeOffset.top,
        scrollParent,
        step.target || null,
        step._resolvedExtraHighlightElements
      );
      rafId = requestAnimationFrame(rafLoop);
    };

    rafLoop();

    _addStepEventListeners();
  }

  function _getScrollParent(element: HTMLElement | null | undefined): HTMLElement | null {
    if (!element) {
      return null;
    }

    const isHtmlElement = element instanceof HTMLElement;
    const overflowY =
      isHtmlElement && window.getComputedStyle(element).overflowY;
    const isScrollable = overflowY !== 'hidden' && overflowY !== 'visible';

    if (isScrollable && element.scrollHeight >= element.clientHeight) {
      return element;
    }

    return _getScrollParent(element.parentElement);
  }

  function _getIframeOffset(element: HTMLElement | null | undefined) {
    let offset = {
      top: 0,
      left: 0
    };

    if (!element) {
      return offset;
    }

    let targetWindow: Window | null = element.ownerDocument.defaultView;

    while (targetWindow && targetWindow !== window.top) {
      const targetIframe = targetWindow?.frameElement;

      if (targetIframe) {
        const targetIframeRect = targetIframe.getBoundingClientRect();

        offset.top += targetIframeRect.top + ((targetIframeRect as any).scrollTop ?? 0);
        offset.left +=
          targetIframeRect.left + ((targetIframeRect as any).scrollLeft ?? 0);
      }

      targetWindow = targetWindow?.parent;
    }

    return offset;
  }

  function _getVisibleHeight(element: HTMLElement, scrollParent: HTMLElement | null) {
    const elementRect = element.getBoundingClientRect();
    let top = elementRect.y || elementRect.top;
    let bottom = elementRect.bottom || top + elementRect.height;

    if (scrollParent) {
      const scrollRect = scrollParent.getBoundingClientRect();
      const scrollTop = scrollRect.y || scrollRect.top;
      const scrollBottom = scrollRect.bottom || scrollTop + scrollRect.height;

      top = Math.max(top, scrollTop);
      bottom = Math.min(bottom, scrollBottom);
    }

    const height = Math.max(bottom - top, 0); // Default to 0 if height is negative

    return { y: top, height };
  }

  const Component = () => (
    <svg
      ref={element}
      class={`${
        modalIsVisible() ? 'shepherd-modal-is-visible' : ''
      } shepherd-modal-overlay-container`}
      onTouchMove={_preventModalOverlayTouch}
    >
      <path d={pathDefinition()} />
    </svg>
  );

  const ref: ShepherdModalRef = {
    closeModalOpening,
    hide,
    positionModal,
    setupForStep,
    show,
    getElement
  };

  return [Component, ref];
}
