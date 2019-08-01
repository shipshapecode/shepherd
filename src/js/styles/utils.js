import { lighten, darken, getLuminance } from 'polished';

/**
 * Check the luminance of the color and lighten or darken accordingly
 * @param {string} color The color to check
 * @return {string} The lightened or darkened color
 */
export function getLighterOrDarker(color) {
  const l = getLuminance(color);
  if (l > 0.6) {
    return darken(l / 2, color);
  }
  return lighten((1 - l) / 2, color);
}
