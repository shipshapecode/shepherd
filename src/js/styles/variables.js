const styles = {
  arrowSize: 2.1,

  // Header
  headerColor: 'rgba(0, 0, 0, 0.75)',

  // Tooltip
  tippyBackground: '#ffffff',
  zIndex: 9999
};

export default function getVariables(options) {
  if (options.styleVariables) {
    Object.assign(styles, options.styleVariables);
  }

  return styles;
}
