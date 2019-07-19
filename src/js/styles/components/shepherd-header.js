export function shepherdHeaderCSS(variables) {
  return {
    alignItems: 'center',
    borderTopLeftRadius: variables.shepherdElementBorderRadius,
    borderTopRightRadius: variables.shepherdElementBorderRadius,
    display: 'flex',
    justifyContent: 'flex-end',
    lineHeight: '2em',
    padding: '0.75em 0.75em 0',
    '.shepherd-has-title .shepherd-content &': {
      background: variables.shepherdHeaderBackground,
      padding: '1em'
    }
  };
}
