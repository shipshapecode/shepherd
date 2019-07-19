const dark = {
  shepherdHeaderBackground: '#303030',
  shepherdTextBackground: '#232323',
  shepherdThemePrimary: '#3288e6',
  useDropShadow: true
};

const light = {
  shepherdHeaderBackground: '#e6e6e6',
  shepherdTextBackground: '#f6f6f6',
  useDropShadow: true
};

const baseSquare = {
  shepherdButtonBorderRadius: 0,
  shepherdElementBorderRadius: 0
};

const squareDark = {
  ...dark,
  ...baseSquare
};

const squareLight = {
  ...light,
  ...baseSquare
};

export default {
  dark,
  light,
  squareDark,
  squareLight
};
