import shader from 'shader';
import { getContrastingColor } from './utils';

const styles = {
  arrowSize: 2.1,
  shepherdButtonBorderRadius: '3px',
  shepherdElementBorderRadius: '5px',
  shepherdElementMaxHeight: '100%',
  shepherdElementMaxWidth: '100%',
  shepherdElementWidth: '400px',
  shepherdElementZIndex: 9999,
  shepherdTextBackground: '#ffffff',
  shepherdTextLineHeight: '1.3em',
  shepherdThemePrimary: '#3288e6'
};

styles.shepherdHeaderBackground = shader(styles.shepherdTextBackground, -0.1);
styles.shepherdThemeSecondary = shader(styles.shepherdThemePrimary, 0.4);

styles.shepherdThemeTextColors = {
  primary: getContrastingColor(styles.shepherdThemePrimary),
  secondary: getContrastingColor(styles.shepherdThemeSecondary),
  header: getContrastingColor(styles.shepherdHeaderBackground),
  text: getContrastingColor(styles.shepherdTextBackground)
};

export default styles;
