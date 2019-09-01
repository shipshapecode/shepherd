export default function textStyles(variables, includeStyles) {
  if (includeStyles) {
    return {
      text: {
        color: variables.textColor,
        fontSize: variables.textFontSize,
        lineHeight: variables.textLineHeight,
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
