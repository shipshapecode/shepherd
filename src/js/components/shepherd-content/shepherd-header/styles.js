import { lighten } from 'polished';

export default function headerStyles(classPrefix, variables) {
  return {
    'cancel-link': {
      color: lighten(0.7, variables.shepherdThemeTextHeader),
      fontSize: '2em',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'relative',
      textDecoration: 'none',
      transition: 'color 0.5s ease',
      verticalAlign: 'middle',
      '&:hover': {
        color: variables.shepherdThemeTextHeader,
        cursor: 'pointer'
      },
      '&:before': {
        content: '"\u00d7"'
      }
    },

    header: {
      alignItems: 'center',
      borderTopLeftRadius: variables.shepherdElementBorderRadius,
      borderTopRightRadius: variables.shepherdElementBorderRadius,
      display: 'flex',
      justifyContent: 'flex-end',
      lineHeight: '2em',
      padding: '0.75em 0.75em 0',
      [`.${classPrefix}shepherd-has-title .${classPrefix}shepherd-content &`]: {
        background: variables.shepherdHeaderBackground,
        padding: '1em'
      }
    },

    title: {
      color: variables.shepherdThemeTextHeader,
      display: 'flex',
      flex: '1 0 auto',
      fontSize: '1.1em',
      fontWeight: 'normal',
      margin: 0,
      padding: 0,
      position: 'relative',
      verticalAlign: 'middle'
    }
  };
}
