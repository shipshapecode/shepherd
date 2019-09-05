export default function buttonStyles(classPrefix, variables, includeStyles) {
  if (includeStyles) {
    return {
      button: {
        background: variables.primaryButtonBgColor,
        borderRadius: variables.buttonBorderRadius,
        color: variables.primaryButtonColor,

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
