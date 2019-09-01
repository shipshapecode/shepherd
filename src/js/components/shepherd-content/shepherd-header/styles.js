export default function headerStyles(classPrefix, variables, includeStyles) {
  const header = {
    alignItems: 'center',
    borderTopLeftRadius: variables.elementBorderRadius,
    borderTopRightRadius: variables.elementBorderRadius,
    display: 'flex',
    justifyContent: 'flex-end',
    lineHeight: '2em',
    padding: '0.75em 0.75em 0',
    [`.${classPrefix}shepherd-has-title .${classPrefix}shepherd-content &`]: {
      background: variables.headerBgColor,
      padding: '1em'
    }
  };

  const title = {
    color: variables.headerColor,
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
      color: variables.cancelIconColor,
      fontSize: '2em',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'relative',
      textDecoration: 'none',
      transition: 'color 0.5s ease',
      verticalAlign: 'middle',
      '&:hover': {
        color: variables.cancelIconHoverColor,
        cursor: 'pointer'
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
