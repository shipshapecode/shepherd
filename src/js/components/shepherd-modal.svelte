<script>
  import { uuid } from '../utils/general.js';

  export let element, openingProperties;
  const guid = uuid();
  let modalIsVisible = false;
  let rafId = undefined;

  closeModalOpening();

  export const getElement = () => element;

  export function closeModalOpening() {
    openingProperties = {
      height: 0,
      x: 0,
      y: 0,
      width: 0
    };
  }

  /**
   * Hide the modal overlay
   */
  export function hide() {
    modalIsVisible = false;

    // Ensure we cleanup all event listeners when we hide the modal
    _cleanupStepEventListeners();
  }

  /**
   * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
   * @param {HTMLElement} targetElement The element the opening will expose
   * @param {Number} modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
   */
  export function positionModalOpening(targetElement, modalOverlayOpeningPadding = 0) {
    if (targetElement.getBoundingClientRect) {
      const { x, y, width, height, left, top } = targetElement.getBoundingClientRect();

      // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
      openingProperties = {
        x: (x || left) - modalOverlayOpeningPadding,
        y: (y || top) - modalOverlayOpeningPadding,
        width: (width + (modalOverlayOpeningPadding * 2)),
        height: (height + (modalOverlayOpeningPadding * 2))
      };
    }
  }

  /**
   * If modal is enabled, setup the svg mask opening and modal overlay for the step
   * @param {Step} step The step instance
   */
  export function setupForStep(step) {
    // Ensure we move listeners from the previous step, before we setup new ones
    _cleanupStepEventListeners();
    
    if (step.tour.options.useModalOverlay) {
      _styleForStep(step);
      show();
    } else {
      hide();
    }
  }

  /**
   * Show the modal overlay
   */
  export function show() {
    modalIsVisible = true;
  }

  const _preventModalBodyTouch = (e) => {
    e.preventDefault();
  };

  const _preventModalOverlayTouch = (e) => {
    e.stopPropagation();
  };

  /**
   * Add touchmove event listener
   * @private
   */
  function _addStepEventListeners() {
    // Prevents window from moving on touch.
    window.addEventListener('touchmove', _preventModalBodyTouch, {
      passive: false
    });
  }

  /**
   * Cancel the requestAnimationFrame loop and remove touchmove event listeners
   * @private
   */
  function _cleanupStepEventListeners() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = undefined;
    }

    window.removeEventListener('touchmove', _preventModalBodyTouch, {
      passive: false
    });
  }

  /**
   * Style the modal for the step
   * @param {Step} step The step to style the opening for
   * @private
   */
  function _styleForStep(step) {
    const { modalOverlayOpeningPadding } = step.options;

    if (step.target) {
      // Setup recursive function to call requestAnimationFrame to update the modal opening position
      const rafLoop = () => {
        rafId = undefined;
        positionModalOpening(step.target, modalOverlayOpeningPadding);
        rafId = requestAnimationFrame(rafLoop);
      };

      rafLoop();

      _addStepEventListeners();
    } else {
      closeModalOpening();
    }
  }
</script>

<style global>
  .shepherd-modal-overlay-container {
    -ms-filter: progid:dximagetransform.microsoft.gradient.alpha(Opacity=50);
    filter: alpha(opacity=50);
    fill-rule: evenodd;
    height: 0;
    left: 0;
    opacity: 0;
    overflow: hidden;
    pointer-events: none;
    position: fixed;
    top: 0;
    transition: all 0.3s ease-out, height 0ms 0.3s, opacity 0.3s 0ms;
    width: 100vw;
    z-index: 9997;
  }

  .shepherd-modal-overlay-container.shepherd-modal-is-visible {
    height: 100vh;
    opacity: 0.5;
    transition: all 0.3s ease-out, height 0s 0s, opacity 0.3s 0s;
  }

  .shepherd-modal-overlay-container.shepherd-modal-is-visible path {
    pointer-events: all;
  }
</style>

<svg
  bind:this={element}
  class="{`${(modalIsVisible ? 'shepherd-modal-is-visible' : '')} shepherd-modal-overlay-container`}"
  on:touchmove={_preventModalOverlayTouch}
>
  <path
    d="{`M ${openingProperties.x} ${openingProperties.y} H ${openingProperties.width + openingProperties.x} V ${openingProperties.height + openingProperties.y} H ${openingProperties.x} L ${openingProperties.x} 0 Z M 0 0 H ${window.innerWidth} V ${window.innerHeight} H 0 L 0 0 Z`}">
  </path>
</svg>
