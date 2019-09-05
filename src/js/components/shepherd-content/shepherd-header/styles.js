export default function headerStyles(classPrefix, variables, includeStyles) {
  const header = {
    borderTopLeftRadius: variables.elementBorderRadius,
    borderTopRightRadius: variables.elementBorderRadius,
    lineHeight: '2em',

    [`.${classPrefix}shepherd-has-title .${classPrefix}shepherd-content &`]: {
      background: variables.headerBgColor,
      padding: '1em'
    }
  };

  const title = {
    color: variables.headerColor
  };

  let styles = {
    'cancel-icon': {
      color: variables.cancelIconColor,
      fontSize: '2em',
      '&:hover': {
        color: variables.cancelIconHoverColor
      },
      [`.${classPrefix}shepherd-has-title .${classPrefix}shepherd-content &`]: {
        color: variables.cancelIconHasTitleColor,
        '&:hover': {
          color: variables.cancelIconHasTitleHoverColor
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
