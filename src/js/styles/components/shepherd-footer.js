export function shepherdFooterCSS(variables) {
  return {
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
  };
}
