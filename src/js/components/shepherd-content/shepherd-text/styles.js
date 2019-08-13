export default function textStyles(variables) {
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
