/**
 * Takes a hex color and returns a text color that contrasts it
 * @param {string} hexcolor The hex value for the color
 * @return {string}
 */
export function getContrastingColor(hexcolor) {
  hexcolor = hexcolor.replace('#', '');
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'rgba(0, 0, 0, 0.75)' : 'rgba(255,255,255, 0.75)';
}
