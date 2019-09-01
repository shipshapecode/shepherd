export default function elementStyles(variables) {
  return {
    element: {
      borderRadius: variables.elementBorderRadius,
      'outline': 'none',
      // We need box-sizing: border-box on shepherd-element and everything under it
      '&, *': {
        '&, &:after, &:before': {
          boxSizing: 'border-box'
        }
      }
    }
  };
}
