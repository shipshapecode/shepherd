import getVariables from './variables';
import { setupNano } from './nano';
import shader from 'shader';

export function generateStyles(options) {
  const variables = getVariables(options);
  const nano = setupNano(options.classPrefix);
  const classPrefix = options.classPrefix || '';

  const styles = {
    active: {
      '&.shepherd-modal-is-visible': {
        [`:not(.${classPrefix}shepherd-target)`]: {
          pointerEvents: 'none'
        },

        [`.${classPrefix}shepherd-button, .${classPrefix}shepherd-cancel-link, .${classPrefix}shepherd-element, .${classPrefix}shepherd-target`]: {
          pointerEvents: 'auto',

          '*': {
            pointerEvents: 'auto'
          }
        }
      }
    },

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
        background: shader(variables.shepherdThemePrimary, -0.1)
      },
      '&.shepherd-button-secondary': {
        background: variables.shepherdThemeSecondary,
        color: variables.shepherdThemeTextSecondary,
        '&:hover': {
          background: shader(variables.shepherdThemeSecondary, -0.1),
          color: shader(variables.shepherdThemeTextSecondary, -0.1)
        }
      }
    },

    'cancel-link': {
      color: shader(variables.shepherdThemeTextHeader, 0.7),
      fontSize: '2em',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'relative',
      textDecoration: 'none',
      transition: 'color 0.5s ease',
      verticalAlign: 'middle',
      '&:hover': {
        color: variables.shepherdThemeTextHeader
      },
      '&:before': {
        content: '"\u00d7"'
      }
    },

    content: {
      background: variables.shepherdTextBackground,
      fontSize: 'inherit',
      outline: 'none',
      padding: 0
    },

    element: {
      'outline': 'none',
      // We need box-sizing: border-box on shepherd-element and everything under it
      '&, *': {
        '&, &:after, &:before': {
          boxSizing: 'border-box'
        }
      }
    },

    footer: {
      borderBottomLeftRadius: variables.shepherdElementBorderRadius,
      borderBottomRightRadius: variables.shepherdElementBorderRadius,
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '0 0.75em 0.75em',
      [`.${classPrefix}shepherd-button`]: {
        '&:last-child': {
          marginRight: 0
        }
      }
    },

    header: {
      alignItems: 'center',
      borderTopLeftRadius: variables.shepherdElementBorderRadius,
      borderTopRightRadius: variables.shepherdElementBorderRadius,
      display: 'flex',
      justifyContent: 'flex-end',
      lineHeight: '2em',
      padding: '0.75em 0.75em 0',
      [`.shepherd-has-title .${classPrefix}shepherd-content &`]: {
        background: variables.shepherdHeaderBackground,
        padding: '1em'
      }
    },

    title: {
      color: variables.shepherdThemeTextHeader,
      display: 'flex',
      flex: '1 0 auto',
      fontSize: '1.1em',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'relative',
      verticalAlign: 'middle'
    },

    text: {
      color: variables.shepherdThemeTextColor,
      fontSize: variables.shepherdTextFontSize,
      lineHeight: variables.shepherdTextLineHeight,
      padding: '0.75em',
      p: {
        marginTop: 0,

        '&:last-child': {
          marginBottom: 0
        }
      },
      'a, a:visited, a:active': {
        borderBottom: '1px dotted',
        borderBottomColor: variables.shepherdThemeTextColor,
        color: variables.shepherdThemeTextColor,
        textDecoration: 'none',

        '&:hover': {
          borderBottomStyle: 'solid'
        }
      }
    }
  };

  if (variables.useDropShadow) {
    styles.element.filter = 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2))';
  }

  const classes = nano.sheet(styles, 'shepherd');

  const arrowMargin = `calc((${variables.arrowSize} / 2.1) * 16px)`;

  const popperThemeArrows = {
    '&[x-placement^="top"]': {
      marginBottom: arrowMargin,

      '.tippy-arrow': {
        borderTopColor: variables.shepherdTextBackground
      }
    },

    '&[x-placement^="bottom"]': {
      marginTop: arrowMargin,

      '.tippy-arrow': {
        borderBottomColor: variables.shepherdTextBackground
      },

      '&.shepherd-has-title': {
        '.tippy-arrow': {
          borderBottomColor: variables.shepherdHeaderBackground
        }
      }
    },

    '&[x-placement^="left"]': {
      marginRight: arrowMargin,

      '.tippy-arrow': {
        borderLeftColor: variables.shepherdTextBackground
      }
    },

    '&[x-placement^="right"]': {
      marginLeft: arrowMargin,

      '.tippy-arrow': {
        borderRightColor: variables.shepherdTextBackground
      }
    }
  };

  // We have to add the root shepherd class separately
  classes.shepherd = nano.rule({
    '&.tippy-popper': {
      ...popperThemeArrows,
      zIndex: variables.shepherdElementZIndex,

      '.tippy-tooltip': {
        backgroundColor: variables.shepherdTextBackground,

        '.tippy-arrow': {
          transform: `scale(${variables.arrowSize})`,
          zIndex: variables.shepherdElementZIndex + 1
        },

        '.tippy-content': {
          maxHeight: variables.shepherdElementMaxHeight,
          maxWidth: variables.shepherdElementMaxWidth,
          padding: 0,
          textAlign: 'center',
          width: variables.shepherdElementWidth
        }
      }
    }
  }, 'shepherd');
  return classes;
}
