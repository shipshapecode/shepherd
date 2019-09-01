export default function footerStyles(classPrefix, variables, includeStyles) {
  if (includeStyles) {
    return {
      footer: {
        borderBottomLeftRadius: variables.elementBorderRadius,
        borderBottomRightRadius: variables.elementBorderRadius,
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 0.75em 0.75em',
        [`.${classPrefix}shepherd-button`]: {
          '&:last-child': {
            marginRight: 0
          }
        }
      }
    };
  }

  return {
    footer: {}
  };
}
