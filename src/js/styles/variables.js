import shader from 'shader';

const styles = {
  shepherdButtonBorderRadius: '3px',
  shepherdElementBorderRadius: '5px',
  shepherdTextBackground: '#ffffff',
  shepherdTextLineHeight: '1.3em',
  shepherdThemePrimary: '#3288e6'
};

styles.shepherdHeaderBackground = shader(styles.shepherdTextBackground, -0.1);
styles.shepherdThemeSecondary = shader(styles.shepherdThemePrimary, 0.4);

function getContrastingColor(hexcolor) {
  hexcolor = hexcolor.replace('#', '');
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255,255,255, 0.75)';
}

styles.shepherdThemeTextColors = {
  primary: getContrastingColor(styles.shepherdThemePrimary),
  secondary: getContrastingColor(styles.shepherdThemeSecondary),
  header: getContrastingColor(styles.shepherdHeaderBackground),
  text: getContrastingColor(styles.shepherdTextBackground)
};

export default styles;
