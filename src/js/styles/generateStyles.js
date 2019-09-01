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
  const { includeStyles } = options;

  const styles = {
    active: {
      [`&.${classPrefix}shepherd-modal-is-visible`]: {
        [`:not(.${classPrefix}shepherd-target)`]: {
          pointerEvents: 'none'
        },

        [`.${classPrefix}shepherd-button, .${classPrefix}shepherd-cancel-icon, .${classPrefix}shepherd-element, .${classPrefix}shepherd-target`]: {
          pointerEvents: 'auto',

          '*': {
            pointerEvents: 'auto'
          }
        }
      }
    },

    ...buttonStyles(classPrefix, variables, includeStyles),
    ...contentStyles(variables),
    ...elementStyles(variables),
    ...footerStyles(classPrefix, variables, includeStyles),
    ...headerStyles(classPrefix, variables, includeStyles),
    ...modalStyles(classPrefix, variables),
    ...textStyles(variables, includeStyles)
  };

  if (variables.useDropShadow) {
    styles.element.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.2)';
  }

  const classes = sheet(styles, `${classPrefix}shepherd`);

  const arrowMargin = `calc((${variables.arrowSize} / 2.1) * 16px)`;

  const popperThemeArrows = {
    '&[x-placement^="top"]': {
      marginBottom: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderTopColor: variables.tippyBackground
      }
    },

    '&[x-placement^="bottom"]': {
      marginTop: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderBottomColor: variables.tippyBackground
      },

      [`&.${classPrefix}shepherd-has-title`]: {
        [`.${tippyPrefix}tippy-arrow`]: {
          borderBottomColor: variables.headerBackground
        }
      }
    },

    '&[x-placement^="left"]': {
      marginRight: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderLeftColor: variables.tippyBackground
      }
    },

    '&[x-placement^="right"]': {
      marginLeft: arrowMargin,

      [`.${tippyPrefix}tippy-arrow`]: {
        borderRightColor: variables.tippyBackground
      }
    }
  };

  // We have to add the root shepherd class separately
  classes.shepherd = rule({
    [`&.${tippyPrefix}tippy-popper`]: {
      ...popperThemeArrows,
      zIndex: variables.zIndex,

      [`.${tippyPrefix}tippy-tooltip`]: {
        backgroundColor: variables.tippyBackground,
        borderRadius: variables.elementBorderRadius,

        [`.${tippyPrefix}tippy-arrow`]: {
          transform: `scale(${variables.arrowSize})`,
          zIndex: variables.zIndex + 1
        },

        [`.${tippyPrefix}tippy-content`]: {
          borderRadius: variables.elementBorderRadius,
          padding: 0,
          textAlign: 'center'
        }
      }
    }
  }, `${classPrefix}shepherd`);

  return classes;
}
