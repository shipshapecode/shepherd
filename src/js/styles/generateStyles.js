import variables from './variables';
import { setupNano } from './nano';
import themes from './themes';
import shader from 'shader';

export function generateStyles(options) {
  if (options.theme) {
    Object.assign(variables, themes[options.theme]);
  }

  if (options.styleVariables) {
    Object.assign(variables, options.styleVariables);
  }

  const nano = setupNano(options.classPrefix);

  const styles = {
    active: {
      '&.shepherd-modal-is-visible': {
        ':not(.shepherd-target)': {
          pointerEvents: 'none'
        },

        '.shepherd-button, .shepherd-cancel-link, .shepherd-element, .shepherd-target': {
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
      color: variables.shepherdThemeTextColors.primary,
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
        color: variables.shepherdThemeTextColors.secondary,
        '&:hover': {
          background: shader(variables.shepherdThemeSecondary, -0.1),
          color: shader(variables.shepherdThemeTextColors.secondary, -0.1)
        }
      }
    },

    'cancel-link': {
      fontSize: '2em',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'relative',
      textDecoration: 'none',
      transition: 'color 0.5s ease',
      verticalAlign: 'middle',
      '&::before': {
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
      '.shepherd-button': {
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
      '.shepherd-has-title .shepherd-content &': {
        background: variables.shepherdHeaderBackground,
        padding: '1em'
      }
    },

    title: {
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
      lineHeight: variables.shepherdTextLineHeight,
      padding: '0.75em',
      p: {
        marginTop: 0,

        '&:last-child': {
          marginBottom: 0
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
      },

      '&.shepherd-has-title': {
        '.tippy-arrow': {
          borderTopColor: variables.shepherdHeaderBackground
        }
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
      },

      '&.shepherd-has-title': {
        '.tippy-arrow': {
          borderLeftColor: variables.shepherdHeaderBackground
        }
      }
    },

    '&[x-placement^="right"]': {
      marginLeft: arrowMargin,

      '.tippy-arrow': {
        borderRightColor: variables.shepherdTextBackground
      },

      '&.shepherd-has-title': {
        '.tippy-arrow': {
          borderRightColor: variables.shepherdHeaderBackground
        }
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
