import {
  getModalMaskOpening,
  createModalOverlay,
  positionModalOpening,
  closeModalOpening,
  classNames as modalClassNames
} from './utils/modal';
import { addStepEventListeners, getElementForStep } from './utils/dom';
import debounce from 'lodash-es/debounce';
import defer from 'lodash-es/defer';

export class Modal {
  constructor(options) {
    this.createModalOverlay();
    this.options = options;

    return this;
  }

  /**
   * Removes svg mask from modal overlay and removes classes for modal being visible
   */
  cleanup() {
    defer(() => {
      const element = this._modalOverlayElem;

      if (element && element instanceof SVGElement) {
        element.parentNode.removeChild(element);
      }

      this._modalOverlayElem = null;
      document.body.classList.remove(modalClassNames.isVisible);
    });
  }

  /**
   * Create the modal overlay, if it does not already exist
   */
  createModalOverlay() {
    if (!this._modalOverlayElem) {
      this._modalOverlayElem = createModalOverlay();
      this._modalOverlayOpening = getModalMaskOpening(this._modalOverlayElem);

      // don't show yet -- each step will control that
      this.hide();

      document.body.appendChild(this._modalOverlayElem);
    }
  }

  /**
   * Hide the modal overlay
   */
  hide() {
    document.body.classList.remove(modalClassNames.isVisible);

    if (this._modalOverlayElem) {
      this._modalOverlayElem.style.display = 'none';
    }
  }

  /**
   * If modal is enabled, setup the svg mask opening and modal overlay for the step
   * @param step
   */
  setupForStep(step) {
    if (this.options.useModalOverlay) {
      this._styleForStep(step);
      this.show();

    } else {
      this.hide();
    }
  }

  /**
   * Show the modal overlay
   */
  show() {
    document.body.classList.add(modalClassNames.isVisible);

    if (this._modalOverlayElem) {
      this._modalOverlayElem.style.display = 'block';
    }
  }

  /**
   * Style the modal for the step
   * @param {Step} step The step to style the opening for
   * @private
   */
  _styleForStep(step) {
    const modalOverlayOpening = this._modalOverlayOpening;
    const targetElement = getElementForStep(step);

    if (targetElement) {
      positionModalOpening(targetElement, modalOverlayOpening);

      this._onScreenChange = debounce(
        positionModalOpening.bind(this, targetElement, modalOverlayOpening),
        0,
        { leading: false, trailing: true } // see https://lodash.com/docs/#debounce
      );

      addStepEventListeners.call(this);

    } else {
      closeModalOpening(this._modalOverlayOpening);
    }
  }
}
