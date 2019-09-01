export default function modalStyles(classPrefix, variables) {
  return {
    'modal-overlay-container': {
      '-ms-filter': 'progid:dximagetransform.microsoft.gradient.alpha(Opacity=50)',
      filter: 'alpha(opacity=50)',
      height: 0,
      left: 0,
      opacity: 0,
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      transition: 'all 0.3s ease-out, height 0ms 0.3s, opacity 0.3s 0ms',
      width: '100vw',
      zIndex: variables.zIndex - 2,
      [`.${classPrefix}shepherd-modal-is-visible &`]: {
        height: '100vh',
        opacity: variables.overlayOpacity,
        transition: 'all 0.3s ease-out, height 0s 0s, opacity 0.3s 0s'
      }
    },
    'modal-mask-rect': {
      height: '100vh',
      width: '100vw'
    }
  };
}
