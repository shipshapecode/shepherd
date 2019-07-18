import {
  getModalMaskOpening,
  createModalOverlay,
  positionModalOpening,
  closeModalOpening,
  classNames as modalClassNames
} from './utils/modal';
import autoBind from './utils/auto-bind';
import { addStepEventListeners, getElementForStep } from './utils/dom';
import { debounce } from './utils/general';

export class Modal {
  constructor(options) {
    this.createModalOverlay();
    this.options = options;

    autoBind(this);

    return this;
  }

  /**
   * Removes svg mask from modal overlay and removes classes for modal being visible
   */
  cleanup() {
    const element = this._modalOverlayElem;

    if (element && element instanceof SVGElement) {
      element.parentNode.removeChild(element);
    }

    this._modalOverlayElem = null;
    document.body.classList.remove(modalClassNames.isVisible);
  }

  /**
   * Create the modal overlay, if it does not already exist
   */
  createModalOverlay() {
    if (!this._modalOverlayElem) {
      const existingModal = document.getElementById('shepherdModalOverlayContainer');
      this._modalOverlayElem = existingModal || createModalOverlay();
      this._modalOverlayOpening = getModalMaskOpening(this._modalOverlayElem);

      // don't show yet -- each step will control that
      this.hide();

      // Only add to the DOM if this is a new modal, not reusing another one
      if (!existingModal) {
        document.body.appendChild(this._modalOverlayElem);
      }
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
   * @param {Step} step The step instance
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
    const { modalOverlayOpeningPadding } = step.options;

    if (targetElement) {
      positionModalOpening(targetElement, modalOverlayOpening, modalOverlayOpeningPadding);

      this._onScreenChange = debounce(
        positionModalOpening.bind(this, targetElement, modalOverlayOpening, modalOverlayOpeningPadding),
        0
      );

      addStepEventListeners.call(this);

    } else {
      closeModalOpening(this._modalOverlayOpening);
    }
  }
}
