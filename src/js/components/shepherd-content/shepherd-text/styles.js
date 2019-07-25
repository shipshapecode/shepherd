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
      },
      'a, a:visited, a:active': {
        borderBottom: '1px dotted',
        borderBottomColor: variables.shepherdThemeTextColor,
        color: variables.shepherdThemeTextColor,
        textDecoration: 'none',

        '&:hover': {
          borderBottomStyle: 'solid'
        }
      }
    }
  };
}
