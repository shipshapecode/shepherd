import shader from 'shader';

export function shepherdButtonCSS(variables) {
  return {
    background: variables.shepherdThemePrimary,
    borderRadius: variables.shepherdButtonBorderRadius,
    border: 0,
    cursor: 'pointer',
    display: 'inline-block',
    fontFamily: 'inherit',
    fontSize: '0.8em',
    letterSpacing: '0.1em',
    lineHeight: '1em',
    marginRight: '0.5em',
    padding: '0.75em 2em',
    textTransform: 'uppercase',
    transition: 'all 0.5s ease',
    verticalAlign: 'middle',
    '&:hover': {
      background: shader(variables.shepherdThemePrimary, -0.1)
    },
    '&.shepherd-button-secondary': {
      background: variables.shepherdThemeSecondary,
      '&:hover': {
        background: shader(variables.shepherdThemeSecondary, -0.1)
      }
    }
  };
}
