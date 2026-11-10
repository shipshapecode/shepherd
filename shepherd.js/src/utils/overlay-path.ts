interface OverlayPathParams {
  height: number;
  r?:
    | number
    | {
        bottomLeft: number;
        bottomRight: number;
        topLeft: number;
        topRight: number;
      };
  x?: number;
  y?: number;
  width: number;
}
/**
 * Generates the svg path data for a rounded rectangle overlay
 * @param dimension - Dimensions of rectangle.
 * @param dimension.width - Width.
 * @param dimension.height - Height.
 * @param dimension.x - Offset from top left corner in x axis. default 0.
 * @param dimension.y - Offset from top left corner in y axis. default 0.
 * @param dimension.r - Corner Radius. Keep this smaller than half of width or height.
 * @returns Rounded rectangle overlay path data.
 */
export function makeOverlayPath(overlayPaths: OverlayPathParams[]) {
  let openings = '';

  // The overlay is `position: fixed`, so it spans the layout viewport. Pinch
  // zoom shrinks `innerWidth`/`innerHeight` to the visual viewport in some
  // browsers, which would leave part of the page undimmed (#2495).
  const { clientWidth, clientHeight } = document.documentElement;
  const w = Math.max(window.innerWidth, clientWidth);
  const h = Math.max(window.innerHeight, clientHeight);

  overlayPaths.forEach((overlayPath) => {
    const { width, height, x = 0, y = 0, r = 0 } = overlayPath;
    const {
      topLeft = 0,
      topRight = 0,
      bottomRight = 0,
      bottomLeft = 0
    } = typeof r === 'number'
      ? { topLeft: r, topRight: r, bottomRight: r, bottomLeft: r }
      : r;

    openings +=
      `M${x + topLeft},${y}` +
      `a${topLeft},${topLeft},0,0,0,-${topLeft},${topLeft}` +
      `V${height + y - bottomLeft}` +
      `a${bottomLeft},${bottomLeft},0,0,0,${bottomLeft},${bottomLeft}` +
      `H${width + x - bottomRight}` +
      `a${bottomRight},${bottomRight},0,0,0,${bottomRight},-${bottomRight}` +
      `V${y + topRight}` +
      `a${topRight},${topRight},0,0,0,-${topRight},-${topRight}` +
      `Z`;
  });

  return `M${w},${h}H0V0H${w}V${h}Z${openings}`;
}
