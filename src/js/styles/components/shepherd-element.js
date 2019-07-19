export function shepherdElementCSS(variables) {
  const styles = {};

  if (variables.useDropShadow) {
    styles.filter = 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.2))';
  }

  return styles;
}
