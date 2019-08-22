import { getLighterOrDarker } from '../../../styles/utils';

export default function headerStyles(classPrefix, variables, includeStyles) {
  const header = {
    alignItems: 'center',
    borderTopLeftRadius: variables.shepherdElementBorderRadius,
    borderTopRightRadius: variables.shepherdElementBorderRadius,
    display: 'flex',
    justifyContent: 'flex-end',
    lineHeight: '2em',
    padding: '0.75em 0.75em 0',
    [`.${classPrefix}shepherd-has-title .${classPrefix}shepherd-content &`]: {
      background: variables.shepherdHeaderBackground,
      padding: '1em'
    }
  };

  const title = {
    color: variables.shepherdThemeTextHeader,
    display: 'flex',
    flex: '1 0 auto',
    fontSize: '1.1em',
    fontWeight: 'normal',
    margin: 0,
    padding: 0,
    position: 'relative',
    verticalAlign: 'middle'
  };

  let styles = {
    'cancel-icon': {
      background: 'transparent',
      border: 'none',
      color: getLighterOrDarker(variables.shepherdThemeTextColor),
      fontSize: '2em',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'relative',
      textDecoration: 'none',
      transition: 'color 0.5s ease',
      verticalAlign: 'middle',
      '&:hover': {
        color: variables.shepherdThemeTextColor,
        cursor: 'pointer'
      },
      [`.${classPrefix}shepherd-has-title .${classPrefix}shepherd-content &`]: {
        color: getLighterOrDarker(variables.shepherdThemeTextHeader),
        '&:hover': {
          color: variables.shepherdThemeTextHeader
        }
      }
    }
  };

  if (includeStyles) {
    styles = {
      ...styles,
      header,
      title
    };
  } else {
    styles = {
      ...styles,
      header: {},
      title: {}
    };
  }

  return styles;
}
