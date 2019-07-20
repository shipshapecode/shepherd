export function shepherdElementCSS(variables) {
  const styles = {
    'outline': 'none',
    // We need box-sizing: border-box on shepherd-element and everything under it
    '&, *': {
      '&, &:after, &:before': {
        boxSizing: 'border-box'
      }
    }
  };

  if (variables.useDropShadow) {
    styles.filter = 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2))';
  }

  return styles;
}
