export default function footerStyles(classPrefix, variables, includeStyles) {
  if (includeStyles) {
    return {
      footer: {
        borderBottomLeftRadius: variables.elementBorderRadius,
        borderBottomRightRadius: variables.elementBorderRadius,
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
