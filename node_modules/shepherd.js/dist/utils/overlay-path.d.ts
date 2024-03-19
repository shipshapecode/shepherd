interface OverlayPathParams {
    height: number;
    r?: number | {
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
export declare function makeOverlayPath({ width, height, x, y, r }: OverlayPathParams): string;
export {};
//# sourceMappingURL=overlay-path.d.ts.map