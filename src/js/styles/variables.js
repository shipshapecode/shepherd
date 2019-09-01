const styles = {
  arrowSize: 2.1,
  buttonBorderRadius: '3px',

  // Cancel icon
  cancelIconColor: 'rgba(128, 128, 128, 0.75)',
  cancelIconHoverColor: 'rgba(0, 0, 0, 0.75)',
  cancelIconHasTitleColor: 'rgba(128, 128, 128, 0.75)',
  cancelIconHasTitleHoverColor: 'rgba(0, 0, 0, 0.75)',

  // .shepherd-element
  elementBorderRadius: '5px',

  // Header
  headerBgColor: '#e6e6e6',
  headerColor: 'rgba(0, 0, 0, 0.75)',

  overlayOpacity: 0.5,

  // Primary button
  primaryButtonBgColor: 'rgb(50, 136, 230)',
  primaryButtonColor: 'rgba(255, 255, 255, 0.75)',
  primaryButtonHoverBgColor: 'rgb(25, 111, 204)',
  primaryButtonHoverColor: 'rgba(255, 255, 255, 0.75)',

  // Secondary button
  secondaryButtonBgColor: 'rgb(241, 242, 243)',
  secondaryButtonColor: 'rgba(0, 0, 0, 0.75)',
  secondaryButtonHoverBgColor: 'rgb(214, 217, 219)',
  secondaryButtonHoverColor: 'rgba(0, 0, 0, 0.75)',

  // .shepherd-text
  textColor: 'rgba(0, 0, 0, 0.75)',
  textFontSize: '1rem',
  textLineHeight: '1.3em',

  // Tooltip
  tippyBackground: '#ffffff',
  useDropShadow: true,
  zIndex: 9999
};

export default function getVariables(options) {
  if (options.styleVariables) {
    Object.assign(styles, options.styleVariables);
  }

  return styles;
}
