import { darken } from 'polished';

export default function buttonStyles(classPrefix, variables) {
  return {
    button: {
      background: variables.shepherdThemePrimary,
      borderRadius: variables.shepherdButtonBorderRadius,
      border: 0,
      color: variables.shepherdThemeTextPrimary,
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
        background: darken(0.1, variables.shepherdThemePrimary)
      },
      [`&.${classPrefix}shepherd-button-secondary`]: {
        background: variables.shepherdThemeSecondary,
        color: variables.shepherdThemeTextSecondary,
        '&:hover': {
          background: darken(0.1, variables.shepherdThemeSecondary),
          color: darken(0.1, variables.shepherdThemeTextSecondary)
        }
      }
    }
  };
}
