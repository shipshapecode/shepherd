import shader from 'shader';
import { getContrastingColor } from './utils';
import themes from './themes';

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
  shepherdTextFontSize: '1rem',
  shepherdThemePrimary: '#3288e6'
};

export default function getVariables(options) {
  if (options.theme) {
    Object.assign(styles, themes[options.theme]);
  }

  if (options.styleVariables) {
    Object.assign(styles, options.styleVariables);
  }

  if (!styles.shepherdHeaderBackground) {
    styles.shepherdHeaderBackground = shader(styles.shepherdTextBackground, -0.1);
  }

  if (!styles.shepherdThemeSecondary) {
    styles.shepherdThemeSecondary = shader(styles.shepherdThemePrimary, 0.4);
  }

  _setTextColors();

  return styles;
}

/**
 * Set all the text colors to contrasting ones, for readability, if not already defined.
 * @private
 */
function _setTextColors() {
  if (!styles.shepherdThemeTextPrimary) {
    styles.shepherdThemeTextPrimary = getContrastingColor(styles.shepherdThemePrimary);
  }

  if (!styles.shepherdThemeTextSecondary) {
    styles.shepherdThemeTextSecondary = getContrastingColor(styles.shepherdThemeSecondary);
  }

  if (!styles.shepherdThemeTextHeader) {
    styles.shepherdThemeTextHeader = getContrastingColor(styles.shepherdHeaderBackground);
  }

  if (!styles.shepherdThemeTextColor) {
    styles.shepherdThemeTextColor = getContrastingColor(styles.shepherdTextBackground);
  }
}
