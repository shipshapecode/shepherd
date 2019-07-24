import preact from 'preact';
import { addStepEventListeners } from '../utils/dom';
import { debounce } from '../utils/general';

const { Component } = preact;

export default class ShepherdModal extends Component {
  constructor(props) {
    super(props);

    this.closeModalOpening = this.closeModalOpening.bind(this);
    this.positionModalOpening = this.positionModalOpening.bind(this);
    this.setupForStep = this.setupForStep.bind(this);

    // Setup initial state
    this.closeModalOpening();
    this.setState({
      style: {
        display: 'none'
      }
    });
  }

  render(props, state) {
    return <svg
      id='shepherdModalOverlayContainer'
      style={state.style}
    >
      <defs>
        <mask height='100%' id='shepherdModalMask' width='100%' x='0' y='0'>
          <rect
            fill='#FFFFFF'
            height='100%'
            id='shepherdModalMaskRect'
            width='100%'
            x='0'
            y='0'
          />
          <rect
            fill='#000000'
            id='shepherdModalMaskOpening'
            height={state.openingProperties.height}
            x={state.openingProperties.x}
            y={state.openingProperties.y}
            width={state.openingProperties.width}
          />
        </mask>
      </defs>
      <rect height='100%' width='100%' x='0' y='0' mask='url(#shepherdModalMask)'/>
    </svg>;
  }

  closeModalOpening() {
    this.setState({
      openingProperties: {
        height: 0,
        x: 0,
        y: 0,
        width: 0
      }
    });
  }

  /**
   * Hide the modal overlay
   */
  hide() {
    document.body.classList.remove('shepherd-modal-is-visible');

    this.setState({
      style: {
        display: 'none'
      }
    });
  }

  /**
   * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
   * @param {HTMLElement} targetElement The element the opening will expose
   * @param {Number} modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
   */
  positionModalOpening(targetElement, modalOverlayOpeningPadding = 0) {
    if (targetElement.getBoundingClientRect) {
      const { x, y, width, height, left, top } = targetElement.getBoundingClientRect();

      // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
      this.setState({
        openingProperties: {
          x: (x || left) - modalOverlayOpeningPadding,
          y: (y || top) - modalOverlayOpeningPadding,
          width: (width + (modalOverlayOpeningPadding * 2)),
          height: (height + (modalOverlayOpeningPadding * 2))
        }
      });
    }
  }

  /**
   * If modal is enabled, setup the svg mask opening and modal overlay for the step
   * @param {Step} step The step instance
   */
  setupForStep(step) {
    if (step.tour.options.useModalOverlay) {
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
    document.body.classList.add('shepherd-modal-is-visible');

    this.setState({
      style: {
        display: 'block'
      }
    });
  }

  /**
   * Style the modal for the step
   * @param {Step} step The step to style the opening for
   * @private
   */
  _styleForStep(step) {
    const { modalOverlayOpeningPadding } = step.options;

    if (step.target && step.target !== document.body) {
      this.positionModalOpening(step.target, modalOverlayOpeningPadding);

      this._onScreenChange = debounce(
        this.positionModalOpening.bind(this, step.target, modalOverlayOpeningPadding),
        0
      );

      addStepEventListeners.call(this);
    } else {
      this.closeModalOpening();
    }
  }
}
