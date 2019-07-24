import preact from 'preact';
import {
  classNames as modalClassNames
} from './utils/modal.jsx';
import autoBind from './utils/auto-bind';
import { addStepEventListeners, getElementForStep } from './utils/dom';
import { debounce } from './utils/general';
import { setupNano } from './styles/nano';
import ShepherdModal from './components/shepherd-modal.jsx';

const { render } = preact;

export class Modal {
  constructor(options = {}) {
    this.createModalOverlay();
    this.options = options;

    const nano = setupNano(options.classPrefix);

    nano.put('#shepherdModalOverlayContainer', {
      '-ms-filter': 'progid:dximagetransform.microsoft.gradient.alpha(Opacity=50)',
      filter: 'alpha(opacity=50)',
      height: '100vh',
      left: 0,
      opacity: 0.5,
      position: 'fixed',
      top: 0,
      transition: 'all 0.3s ease-out',
      width: '100vw',
      zIndex: 9997,
      '#shepherdModalMask': {
        '#shepherdModalMaskRect': {
          height: '100vh',
          width: '100vw'
        }
      }
    });

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
      this._modalOverlayElem = render(<ShepherdModal ref={(c) => this.modalComponent = c}/>, document.body, existingModal);

      // don't show yet -- each step will control that
      this.hide();
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
    const targetElement = getElementForStep(step);
    const { modalOverlayOpeningPadding } = step.options;

    if (targetElement) {
      this.modalComponent.positionModalOpening(targetElement, modalOverlayOpeningPadding);

      this._onScreenChange = debounce(
        this.modalComponent.positionModalOpening.bind(this, targetElement, modalOverlayOpeningPadding),
        0
      );

      addStepEventListeners.call(this);

    } else {
      this.modalComponent.closeModalOpening();
    }
  }
}
