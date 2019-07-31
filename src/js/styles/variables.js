import { darken, desaturate, lighten, readableColor, transparentize } from 'polished';

const styles = {
  arrowSize: 2.1,
  shepherdButtonBorderRadius: '3px',
  shepherdElementBorderRadius: '5px',
  shepherdElementMaxHeight: '100%',
  shepherdElementMaxWidth: '100%',
  shepherdElementZIndex: 9999,
  shepherdTextBackground: '#ffffff',
  shepherdTextLineHeight: '1.3em',
  shepherdTextFontSize: '1rem',
  shepherdThemePrimary: '#3288e6'
};

export default function getVariables(options) {
  if (options.styleVariables) {
    Object.assign(styles, options.styleVariables);
  }

  if (!styles.shepherdHeaderBackground) {
    styles.shepherdHeaderBackground = darken(0.1, styles.shepherdTextBackground);
  }

  if (!styles.shepherdThemeSecondary) {
    styles.shepherdThemeSecondary = desaturate(0.7, lighten(0.4, styles.shepherdThemePrimary));
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
    styles.shepherdThemeTextPrimary = transparentize(0.25, readableColor(styles.shepherdThemePrimary));
  }

  if (!styles.shepherdThemeTextSecondary) {
    styles.shepherdThemeTextSecondary = transparentize(0.25, readableColor(styles.shepherdThemeSecondary));
  }

  if (!styles.shepherdThemeTextHeader) {
    styles.shepherdThemeTextHeader = transparentize(0.25, readableColor(styles.shepherdHeaderBackground));
  }

  if (!styles.shepherdThemeTextColor) {
    styles.shepherdThemeTextColor = transparentize(0.25, readableColor(styles.shepherdTextBackground));
  }
}
