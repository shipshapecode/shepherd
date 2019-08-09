import getVariables from './variables';
import { rule, sheet } from './nano';
import { normalizePrefix } from '../utils/general';

import buttonStyles from '../components/shepherd-content/shepherd-footer/shepherd-button/styles';
import contentStyles from '../components/shepherd-content/styles';
import elementStyles from '../components/shepherd-element/styles';
import footerStyles from '../components/shepherd-content/shepherd-footer/styles';
import headerStyles from '../components/shepherd-content/shepherd-header/styles';
import modalStyles from '../components/shepherd-modal/styles';
import textStyles from '../components/shepherd-content/shepherd-text/styles';

export function generateStyles(options) {
  const variables = getVariables(options);
  const classPrefix = normalizePrefix(options.classPrefix);
  const tippyPrefix = normalizePrefix(options.tippyClassPrefix);

  const styles = {
    active: {
      [`&.${classPrefix}shepherd-modal-is-visible`]: {
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

    ...buttonStyles(classPrefix, variables),
    ...contentStyles(variables),
    ...elementStyles(),
    ...footerStyles(classPrefix, variables),
    ...headerStyles(classPrefix, variables),
    ...modalStyles(classPrefix),
    ...textStyles(variables)
  };

  if (variables.useDropShadow) {
    styles.element.filter = 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2))';
  }

  const classes = sheet(styles, `${classPrefix}shepherd`);

  const arrowMargin = `calc((${variables.arrowSize} / 2.1) * 16px)`;

  const popperThemeArrows = {
    '&[x-placement^="top"]': {
      marginBottom: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderTopColor: variables.shepherdTextBackground
      }
    },

    '&[x-placement^="bottom"]': {
      marginTop: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderBottomColor: variables.shepherdTextBackground
      },

      [`&.${classPrefix}shepherd-has-title`]: {
        [`.${tippyPrefix}tippy-arrow`]: {
          borderBottomColor: variables.shepherdHeaderBackground
        }
      }
    },

    '&[x-placement^="left"]': {
      marginRight: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderLeftColor: variables.shepherdTextBackground
      }
    },

    '&[x-placement^="right"]': {
      marginLeft: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderRightColor: variables.shepherdTextBackground
      }
    }
  };

  // We have to add the root shepherd class separately
  classes.shepherd = rule({
    [`&.${tippyPrefix}tippy-popper`]: {
      ...popperThemeArrows,
      zIndex: variables.shepherdElementZIndex,

      [`.${tippyPrefix}tippy-tooltip`]: {
        backgroundColor: variables.shepherdTextBackground,

        [`.${tippyPrefix}tippy-arrow`]: {
          transform: `scale(${variables.arrowSize})`,
          zIndex: variables.shepherdElementZIndex + 1
        },

        [`.${tippyPrefix}tippy-content`]: {
          maxHeight: variables.shepherdElementMaxHeight,
          maxWidth: variables.shepherdElementMaxWidth,
          padding: 0,
          textAlign: 'center'
        }
      }
    }
  }, `${classPrefix}shepherd`);

  return classes;
}
