export default function modalStyles() {
  return {
    'modal-overlay-container': {
      '-ms-filter': 'progid:dximagetransform.microsoft.gradient.alpha(Opacity=50)',
      filter: 'alpha(opacity=50)',
      height: '100vh',
      left: 0,
      opacity: 0.5,
      position: 'fixed',
      top: 0,
      transition: 'all 0.3s ease-out',
      width: '100vw',
      zIndex: 9997
    },
    'modal-mask-rect': {
      height: '100vh',
      width: '100vw'
    }
  };
}
