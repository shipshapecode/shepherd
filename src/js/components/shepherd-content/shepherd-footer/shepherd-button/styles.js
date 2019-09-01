export default function buttonStyles(classPrefix, variables, includeStyles) {
  if (includeStyles) {
    return {
      button: {
        background: variables.primaryButtonBgColor,
        borderRadius: variables.buttonBorderRadius,
        border: 0,
        color: variables.primaryButtonColor,
        cursor: 'pointer',
        display: 'inline-block',
        fontFamily: 'inherit',
        fontSize: '0.8em',
        letterSpacing: '0.1em',
        lineHeight: '1em',
        marginRight: '0.5em',
        padding: '0.75em 2em',
        textTransform: 'uppercase',
        transition: 'all 0.5s ease',
        verticalAlign: 'middle',
        '&:hover': {
          background: variables.primaryButtonHoverBgColor,
          color: variables.primaryButtonHoverColor
        },
        [`&.${classPrefix}shepherd-button-secondary`]: {
          background: variables.secondaryButtonBgColor,
          color: variables.secondaryButtonColor,
          '&:hover': {
            background: variables.secondaryButtonHoverBgColor,
            color: variables.secondaryButtonHoverColor
          }
        }
      }
    };
  }

  return {
    button: {}
  };
}
