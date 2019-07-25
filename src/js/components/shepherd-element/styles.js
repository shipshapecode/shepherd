export default function elementStyles() {
  return {
    element: {
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
