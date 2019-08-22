export default function textStyles(variables, includeStyles) {
  if (includeStyles) {
    return {
      text: {
        color: variables.shepherdThemeTextColor,
        fontSize: variables.shepherdTextFontSize,
        lineHeight: variables.shepherdTextLineHeight,
        padding: '0.75em',
        p: {
          marginTop: 0,

          '&:last-child': {
            marginBottom: 0
          }
        }
      }
    };
  }

  return {
    text: {}
  };
}
