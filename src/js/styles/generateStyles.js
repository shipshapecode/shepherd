import getVariables from './variables';
import { rule, sheet } from './nano';
import { normalizePrefix } from '../utils/general';

export function generateStyles(options) {
  const variables = getVariables(options);
  const { classPrefix } = options;
  const tippyPrefix = normalizePrefix(options.tippyClassPrefix);

  const styles = {
    active: {
      [`&.${classPrefix}.shepherd-modal-is-visible`]: {
        [`:not(.${classPrefix}.shepherd-target)`]: {
          pointerEvents: 'none'
        },

        [`.${classPrefix}.shepherd-button, .${classPrefix}.shepherd-cancel-icon, .${classPrefix}.shepherd-element, .${classPrefix}.shepherd-target`]: {
          pointerEvents: 'auto',

          '*': {
            pointerEvents: 'auto'
          }
        }
      }
    }
  };

  const classes = sheet(styles, 'shepherd');

  const arrowMargin = `calc((${variables.arrowSize} / 2.1) * 16px)`;

  const popperThemeArrows = {
    '&[x-placement^="top"]': {
      marginBottom: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderTopColor: '#ffffff'
      }
    },

    '&[x-placement^="bottom"]': {
      marginTop: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderBottomColor: '#ffffff'
      },

      [`&.${classPrefix} shepherd-has-title`]: {
        [`.${tippyPrefix}tippy-arrow`]: {
          borderBottomColor: '#e6e6e6'
        }
      }
    },

    '&[x-placement^="left"]': {
      marginRight: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderLeftColor: '#ffffff'
      }
    },

    '&[x-placement^="right"]': {
      marginLeft: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderRightColor: '#ffffff'
      }
    }
  };

  // We have to add the root shepherd class separately
  classes.shepherd = rule({
    [`&.${tippyPrefix}tippy-popper`]: {
      ...popperThemeArrows,
      zIndex: variables.zIndex,

      [`.${tippyPrefix}tippy-tooltip`]: {
        backgroundColor: '#ffffff',
        borderRadius: '5px',

        [`.${tippyPrefix}tippy-arrow`]: {
          transform: `scale(${variables.arrowSize})`,
          zIndex: variables.zIndex + 1
        },

        [`.${tippyPrefix}tippy-content`]: {
          borderRadius: '5px',
          padding: 0,
          textAlign: 'center'
        }
      }
    }
  }, 'shepherd');

  return classes;
}
