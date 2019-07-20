import shader from 'shader';

const styles = {
  shepherdButtonBorderRadius: '3px',
  shepherdElementBorderRadius: '5px',
  shepherdTextBackground: '#ffffff',
  shepherdThemePrimary: '#3288e6'
};

styles.shepherdHeaderBackground = shader(styles.shepherdTextBackground, -0.1);
styles.shepherdThemeSecondary = shader(styles.shepherdThemePrimary, 0.4);

export default styles;
