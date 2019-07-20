/**
 * Block clicks except for those that would occur
 * on Shepherd elements or on the target element.
 */
export function shepherdActiveCSS() {
  return {
    '&.shepherd-modal-is-visible': {
      ':not(.shepherd-target)': {
        pointerEvents: 'none'
      },

      '.shepherd-button, .shepherd-cancel-link, .shepherd-element, .shepherd-target': {
        pointerEvents: 'auto',

        '*': {
          pointerEvents: 'auto'
        }
      }
    }
  };
}
