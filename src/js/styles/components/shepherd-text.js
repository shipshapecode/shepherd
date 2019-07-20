export function shepherdTextCSS(variables) {
  return {
    lineHeight: variables.shepherdTextLineHeight,
    padding: '0.75em',
    p: {
      marginTop: 0,

      '&:last-child': {
        marginBottom: 0
      }
    }
  };
}
