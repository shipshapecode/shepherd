export default function footerStyles(classPrefix, variables) {
  return {
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
    }
  };
}
