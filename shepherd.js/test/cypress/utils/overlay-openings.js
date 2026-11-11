/**
 * Reads the cutouts of the modal overlay back out of its svg path.
 *
 * The path is the full-viewport rect followed by one sub-path per opening,
 * each starting `M{x + radius},{y}`, reaching its bottom edge with the first
 * `V{y + height}` and its right edge with the next `H{x + width}`. Only valid
 * for openings without a corner radius.
 *
 * @param {Document} doc The document the overlay is rendered in
 * @returns {{ x: number, y: number, width: number, height: number }[]}
 */
export default function overlayOpenings(doc) {
  const d = doc
    .querySelector('.shepherd-modal-overlay-container path')
    .getAttribute('d');

  return d
    .split('Z')
    .slice(1)
    .filter(Boolean)
    .map((subPath) => {
      const [, x, y, bottom, right] = subPath.match(
        /^M([-\d.e]+),([-\d.e]+).*?V([-\d.e]+).*?H([-\d.e]+)/
      );
      return {
        x: Number(x),
        y: Number(y),
        width: Number(right) - Number(x),
        height: Number(bottom) - Number(y)
      };
    });
}
