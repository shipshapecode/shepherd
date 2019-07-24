import preact from 'preact';
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
   * Create the modal overlay, if it does not already exist
   */
  createModalOverlay() {
    if (!this._modalOverlayElem) {
      const existingModal = document.getElementById('shepherdModalOverlayContainer');
      this._modalOverlayElem = render(<ShepherdModal ref={(c) => this.modalComponent = c}/>, document.body, existingModal);
    }
  }
}
