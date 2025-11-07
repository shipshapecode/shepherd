import { h, Component } from 'preact';
import { makeOverlayPath } from '../utils/overlay-path';
import type { Step } from '../step';

interface OpeningProperty {
  width: number;
  height: number;
  x: number;
  y: number;
  r: number | { topLeft: number; bottomLeft: number; bottomRight: number; topRight: number };
}

type ModalRadiusType = number | { topLeft?: number; bottomLeft?: number; bottomRight?: number; topRight?: number };

interface ShepherdModalState {
  modalIsVisible: boolean;
  openingProperties: OpeningProperty[];
}

export interface ShepherdModalProps {}

// Store instance for external access
let modalInstance: ShepherdModal | null = null;

export function getModalInstance() {
  return modalInstance;
}

export default class ShepherdModal extends Component<ShepherdModalProps, ShepherdModalState> {
  private element?: SVGSVGElement;
  private rafId?: number;

  constructor(props: ShepherdModalProps) {
    super(props);
    this.state = {
      modalIsVisible: false,
      openingProperties: [
        {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          r: 0
        }
      ]
    };
    
    // Store this instance globally for external access
    modalInstance = this;
  }

  getElement = () => this.element;

  closeModalOpening = () => {
    this.setState({
      openingProperties: [
        {
          width: 0,
          height: 0,
          x: 0,
          y: 0,
          r: 0
        }
      ]
    });
  };

  hide = () => {
    this.setState({ modalIsVisible: false });
    this._cleanupStepEventListeners();
  };

  positionModal = (
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

        const { y, height } = this._getVisibleHeight(element, scrollParent);
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
          x: (x || left) + modalOverlayOpeningXOffset - modalOverlayOpeningPadding,
          y: y + modalOverlayOpeningYOffset - modalOverlayOpeningPadding,
          r: normalizedRadius
        });
      }

      this.setState({ openingProperties: newOpenings });
    } else {
      this.closeModalOpening();
    }
  };

  setupForStep = (step: Step) => {
    // Ensure we move listeners from the previous step, before we setup new ones
    this._cleanupStepEventListeners();

    if (step.tour.options.useModalOverlay) {
      this._styleForStep(step);
      this.show();
    } else {
      this.hide();
    }
  };

  show = () => {
    this.setState({ modalIsVisible: true });
  };

  private _preventModalBodyTouch = (e: TouchEvent) => {
    e.preventDefault();
  };

  private _preventModalOverlayTouch = (e: TouchEvent) => {
    e.stopPropagation();
  };

  private _addStepEventListeners() {
    // Prevents window from moving on touch.
    window.addEventListener('touchmove', this._preventModalBodyTouch, {
      passive: false
    });
  }

  private _cleanupStepEventListeners() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = undefined;
    }

    window.removeEventListener('touchmove', this._preventModalBodyTouch, {
      passive: false
    } as any);
  }

  private _styleForStep(step: Step) {
    const {
      modalOverlayOpeningPadding,
      modalOverlayOpeningRadius,
      modalOverlayOpeningXOffset = 0,
      modalOverlayOpeningYOffset = 0
    } = step.options;

    const iframeOffset = this._getIframeOffset(step.target);
    const scrollParent = this._getScrollParent(step.target);

    // Setup recursive function to call requestAnimationFrame to update the modal opening position
    const rafLoop = () => {
      this.rafId = undefined;
      this.positionModal(
        modalOverlayOpeningPadding || 0,
        modalOverlayOpeningRadius || 0,
        modalOverlayOpeningXOffset + iframeOffset.left,
        modalOverlayOpeningYOffset + iframeOffset.top,
        scrollParent,
        step.target || null,
        step._resolvedExtraHighlightElements
      );
      this.rafId = requestAnimationFrame(rafLoop);
    };

    rafLoop();

    this._addStepEventListeners();
  }

  private _getScrollParent(element: HTMLElement | null | undefined): HTMLElement | null {
    if (!element) {
      return null;
    }

    const isHtmlElement = element instanceof HTMLElement;
    const overflowY = isHtmlElement && window.getComputedStyle(element).overflowY;
    const isScrollable = overflowY !== 'hidden' && overflowY !== 'visible';

    if (isScrollable && element.scrollHeight >= element.clientHeight) {
      return element;
    }

    return this._getScrollParent(element.parentElement);
  }

  private _getIframeOffset(element: HTMLElement | null | undefined) {
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
        offset.left += targetIframeRect.left + ((targetIframeRect as any).scrollLeft ?? 0);
      }

      targetWindow = targetWindow?.parent;
    }

    return offset;
  }

  private _getVisibleHeight(element: HTMLElement, scrollParent: HTMLElement | null) {
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

    const height = Math.max(bottom - top, 0);

    return { y: top, height };
  }

  render() {
    const { modalIsVisible, openingProperties } = this.state;
    const pathDefinition = makeOverlayPath(openingProperties);

    return (
      <svg
        ref={(el) => {
          if (el) this.element = el as SVGSVGElement;
        }}
        className={`${
          modalIsVisible ? 'shepherd-modal-is-visible' : ''
        } shepherd-modal-overlay-container`}
        onTouchMove={this._preventModalOverlayTouch}
      >
        <path d={pathDefinition} />
      </svg>
    );
  }
}
