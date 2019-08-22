export default function contentStyles(variables, includeStyles) {
  if (includeStyles) {
    return {
      content: {
        background: variables.shepherdTextBackground,
        borderRadius: variables.shepherdElementBorderRadius,
        fontSize: 'inherit',
        outline: 'none',
        padding: 0
      }
    };
  }

  return {
    content: {}
  };
}
