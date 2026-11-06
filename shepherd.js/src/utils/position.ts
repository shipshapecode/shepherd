/* eslint-disable @typescript-eslint/no-explicit-any --
   This walks DOM nodes across realms and shadow roots, and implements Floating
   UI's platform contract, whose inputs are unions of elements and windows. */
type Side = 'top' | 'right' | 'bottom' | 'left';
type Axis = 'x' | 'y';
type Coords = Record<Axis, number>;
type Strategy = NonNullable<ComputePositionConfig['strategy']>;

/** The side of its target a step sits on, optionally aligned along that side. */
export type Placement = Side | `${Side}-${Alignment}`;

/** Which edge of its target a step lines up with. */
export type Alignment = 'start' | 'end';

/**
 * One positioning step. Middleware from your own install of `@floating-ui/dom`,
 * such as `offset()`, has this shape.
 */
export interface Middleware {
  /** Identifies the middleware, and keys the data it shares with later ones. */
  name: string;
  /** The options the middleware was created with. */
  options?: any;
  /** Receives Floating UI's `MiddlewareState` and returns its `MiddlewareReturn`. */
  fn(state: any): any;
}

/**
 * Positioning options, in the shape of Floating UI's `computePosition` config.
 * Shepherd sets these from `attachTo`, and these extend or override them.
 */
export interface ComputePositionConfig {
  /** Where the step sits relative to its target, overriding `attachTo.on`. */
  placement?: Placement;
  /** The CSS `position` of the step element. Defaults to `absolute`. */
  strategy?: 'absolute' | 'fixed';
  /** Runs in order after Shepherd's own middleware. Falsy entries are skipped. */
  middleware?: Array<Middleware | null | undefined | false>;
  /** Overrides how the DOM is measured, following Floating UI's `Platform`. */
  platform?: Record<string, any>;
}

interface Rect extends Coords {
  width: number;
  height: number;
}

interface ElementRects {
  reference: Rect;
  floating: Rect;
}

/**
 * The state every middleware receives. It is Floating UI's `MiddlewareState`,
 * so middleware from a consumer's own `@floating-ui/dom` runs unchanged.
 */
interface MiddlewareState extends Coords {
  initialPlacement: Placement;
  placement: Placement;
  strategy: Strategy;
  middlewareData: Record<string, any>;
  rects: ElementRects;
  elements: { reference: any; floating: HTMLElement };
  platform: any;
}

interface MiddlewareResult extends Partial<Coords> {
  data?: Record<string, any>;
  reset?: boolean | { placement?: Placement; rects?: boolean | ElementRects };
}

export interface ComputePositionResult extends Coords {
  placement: Placement;
  strategy: Strategy;
  middlewareData: Record<string, any>;
}

type Attempt = { placement: Placement; overflows: number[] };

const { min, max, round } = Math;

const ONE: Coords = { x: 1, y: 1 };
const SIDES: Side[] = ['top', 'right', 'bottom', 'left'];
const OPPOSITES: Record<string, string> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
  start: 'end',
  end: 'start'
};

const clamp = (low: number, value: number, high: number) =>
  max(low, min(value, high));
const sideOf = (placement: Placement) => placement.split('-')[0] as Side;
const alignmentOf = (placement: Placement) =>
  placement.split('-')[1] as Alignment | undefined;
const sideAxis = (placement: Placement): Axis =>
  /^[tb]/.test(placement) ? 'y' : 'x';
const otherAxis = (axis: Axis): Axis => (axis === 'x' ? 'y' : 'x');
const lengthOf = (axis: Axis) => (axis === 'y' ? 'height' : 'width');
const swap = (placement: string, part: RegExp) =>
  placement.replace(part, (word) => OPPOSITES[word] as string) as Placement;
const oppositeSide = (placement: string) => swap(placement, /^\w+/);
const oppositeAlignment = (placement: string) => swap(placement, /start|end/);

function placementCoords(
  { reference, floating }: ElementRects,
  placement: Placement,
  rtl?: boolean
) {
  const alignment = alignmentOf(placement);
  const axis = sideAxis(placement);
  const cross = otherAxis(axis);
  const center = (reference[lengthOf(cross)] - floating[lengthOf(cross)]) / 2;

  return {
    [axis]: /^[tl]/.test(placement)
      ? reference[axis] - floating[lengthOf(axis)]
      : reference[axis] + reference[lengthOf(axis)],
    [cross]:
      reference[cross] +
      center +
      (alignment
        ? center *
          (alignment === 'end' ? 1 : -1) *
          (rtl && axis === 'y' ? -1 : 1)
        : 0)
  } as Coords;
}

function alignmentSides(
  placement: Placement,
  { reference, floating }: ElementRects,
  rtl?: boolean
) {
  const alignment = alignmentOf(placement);
  const axis = otherAxis(sideAxis(placement));
  const side =
    axis === 'x'
      ? alignment === (rtl ? 'end' : 'start')
        ? 'right'
        : 'left'
      : alignment === 'start'
        ? 'bottom'
        : 'top';
  const first =
    reference[lengthOf(axis)] > floating[lengthOf(axis)]
      ? oppositeSide(side)
      : side;

  return [first, oppositeSide(first)] as [Side, Side];
}

const getDocument = (node: any): Document =>
  node.ownerDocument || node.document || document;
const getWindow = (node: any) =>
  (getDocument(node).defaultView || window) as Window & typeof globalThis;
const styleOf = (element: Element) =>
  getWindow(element).getComputedStyle(element);
const htmlOf = (node: any) => getDocument(node).documentElement;
const isElement = (value: any): value is Element => value?.nodeType === 1;
const isHTMLElement = (value: any): value is HTMLElement =>
  isElement(value) && 'offsetTop' in value;
const isRoot = (node: Node) => /^(html|body|#document)$/i.test(node.nodeName);
const isStatic = (element: Element) => styleOf(element).position === 'static';

let webKit: boolean | undefined;
const isWebKit = () =>
  (webKit ??=
    typeof CSS !== 'undefined' &&
    CSS.supports?.('-webkit-backdrop-filter', 'none'));

function parentOf(node: any): any {
  const parent = node.assignedSlot || node.parentNode || htmlOf(node);
  return (parent.nodeType === 11 && parent.host) || parent;
}

function ancestorsOf(node: any) {
  const ancestors: Element[] = [];
  for (
    let parent = parentOf(node);
    isElement(parent) && !isRoot(parent);
    parent = parentOf(parent)
  ) {
    ancestors.push(parent);
  }
  return ancestors;
}

function clipsOverflow({ overflow, display }: CSSStyleDeclaration) {
  return (
    /auto|scroll|overlay|hidden|clip/.test(overflow) &&
    display !== 'inline' &&
    display !== 'contents'
  );
}

function isContainingBlock(style: CSSStyleDeclaration) {
  return (
    [
      style.transform,
      style.translate,
      style.scale,
      style.rotate,
      style.perspective,
      ...(isWebKit() ? [] : [style.backdropFilter, style.filter])
    ].some((value) => value && value !== 'none') ||
    /transform|translate|scale|rotate|perspective|filter/.test(
      style.willChange || ''
    ) ||
    /paint|layout|strict|content/.test(style.contain || '')
  );
}

function isTopLayer(element: Element) {
  try {
    return element.matches(':popover-open,:modal');
  } catch {
    return false;
  }
}

function getOffsetParent(element: Element): Element | Window {
  const win = getWindow(element);
  if (isTopLayer(element)) return win;

  let parent: any = element;
  do {
    parent = styleOf(parent).position === 'fixed' ? null : parent.offsetParent;
  } while (
    parent &&
    /^(table|td|th)$/i.test(parent.nodeName) &&
    isStatic(parent)
  );
  if (parent) {
    // Firefox reports a positioned <html>, while the math needs <body>.
    if (parent === htmlOf(element)) parent = getDocument(element).body;
    return isRoot(parent) &&
      isStatic(parent) &&
      !isContainingBlock(styleOf(parent))
      ? win
      : parent;
  }

  for (const ancestor of ancestorsOf(element)) {
    if (isContainingBlock(styleOf(ancestor))) return ancestor;
    if (isTopLayer(ancestor)) break;
  }
  return win;
}

function getDimensions(element: any) {
  const style = styleOf(element);
  const width = parseFloat(style.width) || 0;
  const height = parseFloat(style.height) || 0;
  const offsetWidth = element.offsetWidth ?? width;
  const offsetHeight = element.offsetHeight ?? height;
  const rounded =
    round(width) !== offsetWidth || round(height) !== offsetHeight;

  return rounded
    ? { width: offsetWidth, height: offsetHeight, rounded }
    : { width, height, rounded };
}

function getScale(element: any): Coords {
  if (!isHTMLElement(element)) return ONE;

  const rect = element.getBoundingClientRect();
  const { width, height, rounded } = getDimensions(element);
  const ratio = (size: number, cssSize: number) => {
    const scale = (rounded ? round(size) : size) / cssSize;
    return scale && Number.isFinite(scale) ? scale : 1;
  };

  return { x: ratio(rect.width, width), y: ratio(rect.height, height) };
}

/**
 * Where `left: 0; top: 0` lands in client coordinates for an element with this
 * offset parent. Mapping through one origin and scale in both directions keeps
 * `getElementRects` and overflow detection in the same coordinate space.
 */
function originOf(offsetParent: any, strategy: Strategy) {
  if (isHTMLElement(offsetParent)) {
    const scale = getScale(offsetParent);
    const { x, y } = offsetParent.getBoundingClientRect();
    // In quirks mode <body> reports the viewport's scroll, which is not its own.
    const scrolls =
      offsetParent !== getDocument(offsetParent).body ||
      clipsOverflow(styleOf(htmlOf(offsetParent)));
    return {
      x:
        x +
        (offsetParent.clientLeft - (scrolls ? offsetParent.scrollLeft : 0)) *
          scale.x,
      y:
        y +
        (offsetParent.clientTop - (scrolls ? offsetParent.scrollTop : 0)) *
          scale.y,
      scale
    };
  }

  const html = htmlOf(offsetParent);
  const { x, y } = html.getBoundingClientRect();
  if (strategy !== 'fixed') return { x, y, scale: ONE };

  // WebKit's client coordinates are relative to the visual viewport, while
  // `position: fixed` stays relative to the layout viewport.
  const viewport = isWebKit() && getWindow(offsetParent).visualViewport;
  return {
    x: x + html.scrollLeft - (viewport ? viewport.offsetLeft : 0),
    y: viewport ? -viewport.offsetTop : 0,
    scale: ONE
  };
}

/** The element's client rect, carried up through iframes into `targetWindow`. */
function rectInWindow(element: any, targetWindow: Window) {
  let { x, y, width, height } = element.getBoundingClientRect();

  for (
    let win = getWindow(element), frame: Element | null;
    win !== targetWindow && (frame = win.frameElement);
    win = getWindow(frame)
  ) {
    const scale = getScale(frame);
    const rect = frame.getBoundingClientRect();
    const style = styleOf(frame);
    x =
      rect.x + (x + frame.clientLeft + parseFloat(style.paddingLeft)) * scale.x;
    y = rect.y + (y + frame.clientTop + parseFloat(style.paddingTop)) * scale.y;
    width *= scale.x;
    height *= scale.y;
  }

  return { x, y, width, height };
}

function rootRect(node: any, rootBoundary: string): Rect {
  const html = htmlOf(node);
  const { x } = html.getBoundingClientRect();

  if (rootBoundary === 'document') {
    const { body } = getDocument(node);
    const width = max(
      html.scrollWidth,
      html.clientWidth,
      body.scrollWidth,
      body.clientWidth
    );
    return {
      x:
        x +
        (styleOf(body).direction === 'rtl'
          ? max(html.clientWidth, body.clientWidth) - width
          : 0),
      y: -html.scrollTop,
      width,
      height: max(
        html.scrollHeight,
        html.clientHeight,
        body.scrollHeight,
        body.clientHeight
      )
    };
  }

  const viewport = getWindow(node).visualViewport;
  // WebKit's client coordinates are relative to the visual viewport, others'
  // to the layout viewport.
  const offset = !isWebKit() && viewport;

  return {
    x: x + html.scrollLeft + (offset ? offset.offsetLeft : 0),
    y: offset ? offset.offsetTop : 0,
    width: viewport ? viewport.width : html.clientWidth,
    height: viewport ? viewport.height : html.clientHeight
  };
}

function clippingAncestors(element: Element) {
  let chain = styleOf(element).position;

  return ancestorsOf(element).filter((ancestor) => {
    const style = styleOf(ancestor);
    // A fixed chain escapes every ancestor up to the next containing block, an
    // absolute chain escapes static ancestors.
    if (
      !isContainingBlock(style) &&
      (chain === 'fixed' ||
        (chain === 'absolute' && style.position === 'static'))
    ) {
      return false;
    }
    chain = style.position;
    return isHTMLElement(ancestor) && clipsOverflow(style);
  });
}

function clipRect(element: Element, clip: any): Rect {
  if (typeof clip === 'string') return rootRect(element, clip);
  if (!isElement(clip)) return clip;

  const scale = getScale(clip);
  const { x, y } = clip.getBoundingClientRect();
  return {
    x: x + clip.clientLeft * scale.x,
    y: y + clip.clientTop * scale.y,
    width: clip.clientWidth * scale.x,
    height: clip.clientHeight * scale.y
  };
}

function getClippingRect({
  element,
  boundary,
  rootBoundary
}: {
  element: Element;
  boundary: any;
  rootBoundary: any;
}): Rect {
  const clips: any[] =
    boundary === 'clippingAncestors'
      ? isTopLayer(element)
        ? []
        : clippingAncestors(element)
      : [].concat(boundary);
  const rects = [...clips, rootBoundary].map((clip) => clipRect(element, clip));
  const x = max(...rects.map((rect) => rect.x));
  const y = max(...rects.map((rect) => rect.y));

  return {
    x,
    y,
    width: min(...rects.map((rect) => rect.x + rect.width)) - x,
    height: min(...rects.map((rect) => rect.y + rect.height)) - y
  };
}

function detectOverflow(
  state: MiddlewareState,
  {
    boundary = 'clippingAncestors',
    rootBoundary = 'viewport',
    elementContext = 'floating',
    altBoundary = false,
    padding = 0
  }: Record<string, any> = {}
): Record<Side, number> {
  const { x, y, platform, rects, elements, strategy } = state;
  const pad = (side: Side) =>
    (typeof padding === 'number' ? padding : padding[side]) || 0;
  const clip: Rect = platform.getClippingRect({
    element:
      elements[
        altBoundary
          ? elementContext === 'floating'
            ? 'reference'
            : 'floating'
          : (elementContext as 'floating')
      ],
    boundary,
    rootBoundary,
    strategy
  });
  const offsetParent = platform.getOffsetParent(elements.floating);
  const scale: Coords = platform.getScale(offsetParent);
  const box: Rect =
    platform.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect:
        elementContext === 'floating'
          ? { ...rects.floating, x, y }
          : rects.reference,
      offsetParent,
      strategy
    });

  return {
    top: (clip.y - box.y + pad('top')) / scale.y,
    bottom:
      (box.y + box.height - clip.y - clip.height + pad('bottom')) / scale.y,
    left: (clip.x - box.x + pad('left')) / scale.x,
    right: (box.x + box.width - clip.x - clip.width + pad('right')) / scale.x
  };
}

const platform = {
  detectOverflow,
  getClippingRect,
  getOffsetParent,
  getDimensions,
  getScale,
  isElement,
  isRTL: (element: Element) => styleOf(element).direction === 'rtl',
  getClientRects: (element: Element) => element.getClientRects(),
  convertOffsetParentRelativeRectToViewportRelativeRect({
    rect,
    offsetParent,
    strategy
  }: {
    rect: Rect;
    offsetParent: Element | Window;
    strategy: Strategy;
  }): Rect {
    const { x, y, scale } = originOf(offsetParent, strategy);
    return {
      x: rect.x * scale.x + x,
      y: rect.y * scale.y + y,
      width: rect.width * scale.x,
      height: rect.height * scale.y
    };
  },
  async getElementRects(
    this: any,
    {
      reference,
      floating,
      strategy
    }: { reference: any; floating: HTMLElement; strategy: Strategy }
  ): Promise<ElementRects> {
    const offsetParent = await this.getOffsetParent(floating);
    const { x, y, scale } = originOf(offsetParent, strategy);
    const rect = rectInWindow(reference, getWindow(offsetParent));
    const { width, height } = await this.getDimensions(floating);
    return {
      reference: {
        x: (rect.x - x) / scale.x,
        y: (rect.y - y) / scale.y,
        width: rect.width / scale.x,
        height: rect.height / scale.y
      },
      floating: { x: 0, y: 0, width, height }
    };
  }
};

export async function computePosition(
  reference: Element,
  floating: HTMLElement,
  config: ComputePositionConfig
): Promise<ComputePositionResult> {
  const {
    placement: initialPlacement = 'bottom',
    strategy = 'absolute',
    middleware = []
  } = config;
  // `_c` is the per-call cache of a `platform` spread from `@floating-ui/dom`.
  const merged: any = { ...platform, ...config.platform, _c: new Map() };
  const elements = { reference, floating };
  const middlewareData: Record<string, any> = {};
  const rtl = await merged.isRTL(floating);
  let rects: ElementRects = await merged.getElementRects({
    reference,
    floating,
    strategy
  });
  let { x, y } = placementCoords(rects, initialPlacement, rtl);
  let placement = initialPlacement;
  let resets = 0;

  for (let i = 0; i < middleware.length; i++) {
    const current = middleware[i];
    if (!current) continue;

    const result: MiddlewareResult = await current.fn({
      x,
      y,
      initialPlacement,
      placement,
      strategy,
      middlewareData,
      rects,
      platform: merged,
      elements
    });
    x = result.x ?? x;
    y = result.y ?? y;
    middlewareData[current.name] = {
      ...middlewareData[current.name],
      ...result.data
    };

    const { reset } = result;
    if (reset && resets < 50) {
      resets++;
      if (typeof reset === 'object') {
        placement = reset.placement || placement;
        if (reset.rects) {
          rects =
            reset.rects === true
              ? await merged.getElementRects({ reference, floating, strategy })
              : reset.rects;
        }
        ({ x, y } = placementCoords(rects, placement, rtl));
      }
      i = -1;
    }
  }

  return { x, y, placement, strategy, middlewareData };
}

function minBy<T>(list: T[], key: (item: T) => number) {
  return list.reduce<T | undefined>(
    (best, item) => (best && key(best) <= key(item) ? best : item),
    undefined
  );
}

const fits = (overflow: number) => overflow <= 0;

/**
 * Tries candidate placements in order, one reset at a time, recording how each
 * overflows. `choose` picks among them once every candidate has been tried.
 * `flipping` stops at the first fit and defers to any placement another
 * middleware reset to, which is the only difference `autoPlacement` has.
 */
function placementSearch(
  name: string,
  options: unknown,
  flipping: boolean,
  candidates: (initial: Placement) => Placement[],
  choose: (attempts: Attempt[]) => Attempt | undefined
): Middleware {
  return {
    name,
    options,
    fn(state: MiddlewareState): MiddlewareResult {
      const { placement, initialPlacement, middlewareData } = state;
      const { platform, rects, elements } = state;
      const { index = 0, overflows: previous = [] } =
        middlewareData[name] || {};
      const placements = candidates(initialPlacement);
      const current = placements[index];

      if (flipping ? middlewareData['arrow']?.alignmentOffset : !current) {
        return {};
      }
      if (!flipping && placement !== current) {
        return { reset: { placement: placements[0] as Placement } };
      }

      const overflow = platform.detectOverflow(state);
      const [first, second] = alignmentSides(
        placement,
        rects,
        platform.isRTL(elements.floating)
      );
      const overflows: number[] = [
        overflow[sideOf(placement)],
        overflow[first],
        overflow[second]
      ];

      if (flipping && overflows.every(fits)) return {};

      const attempts: Attempt[] = [...previous, { placement, overflows }];
      const next =
        placements[index + 1] || (choose(attempts) as Attempt).placement;

      return next === placement
        ? {}
        : {
            data: { index: index + 1, overflows: attempts },
            reset: { placement: next }
          };
    }
  };
}

export function flip(): Middleware {
  return placementSearch(
    'flip',
    undefined,
    true,
    (initial) => {
      const opposite = oppositeSide(initial);
      return alignmentOf(initial)
        ? [
            initial,
            oppositeAlignment(initial),
            opposite,
            oppositeAlignment(opposite)
          ]
        : [initial, opposite];
    },
    (attempts) =>
      minBy(
        attempts.filter(({ overflows }) => fits(overflows[0] as number)),
        ({ overflows }) => overflows[1] as number
      ) ||
      minBy(attempts, ({ overflows }) =>
        overflows.reduce((sum, overflow) => sum + max(overflow, 0), 0)
      )
  );
}

export function autoPlacement(options: {
  alignment: Alignment | null;
}): Middleware {
  const { alignment } = options;
  const placements = (
    alignment
      ? [alignment, OPPOSITES[alignment]].flatMap((align) =>
          SIDES.map((side) => `${side}-${align}`)
        )
      : SIDES
  ) as Placement[];
  const score = ({ placement, overflows }: Attempt) =>
    (overflows[0] as number) +
    (alignmentOf(placement) ? (overflows[1] as number) : 0);

  return placementSearch(
    'autoPlacement',
    options,
    false,
    () => placements,
    (attempts) =>
      minBy(
        attempts.filter(({ placement, overflows }) =>
          // Aligned placements do not check their opposite cross-axis side.
          (alignmentOf(placement) ? overflows.slice(0, 2) : overflows).every(
            fits
          )
        ),
        score
      ) || minBy(attempts, score)
  );
}

/**
 * Keeps the element in view on both axes, stopping once it would detach from
 * the reference. Floating UI spells this `shift({ limiter: limitShift(),
 * crossAxis: true })`.
 */
export function shift(): Middleware {
  return {
    name: 'shift',
    fn(state: MiddlewareState): MiddlewareResult {
      const { x, y, placement, rects, middlewareData, platform } = state;
      const { reference, floating } = rects;
      const overflow = platform.detectOverflow(state);
      const cross = sideAxis(placement);
      const main = otherAxis(cross);
      const fromOrigin = /^[tl]/.test(placement);
      const limit = (axis: Axis, offset: number) =>
        clamp(
          reference[axis] -
            floating[lengthOf(axis)] +
            (fromOrigin ? offset : 0),
          clamp(
            state[axis] + overflow[axis === 'y' ? 'top' : 'left'],
            state[axis],
            state[axis] - overflow[axis === 'y' ? 'bottom' : 'right']
          ),
          reference[axis] +
            reference[lengthOf(axis)] +
            (fromOrigin ? 0 : offset)
        );
      const limited = {
        [main]: limit(main, 0),
        [cross]: limit(cross, middlewareData['offset']?.[cross] || 0)
      } as Coords;

      return {
        ...limited,
        data: {
          x: limited.x - x,
          y: limited.y - y,
          enabled: { x: true, y: true }
        }
      };
    }
  };
}

export function arrow(options: {
  element: Element;
  padding?: number;
}): Middleware {
  return {
    name: 'arrow',
    options,
    fn(state: MiddlewareState): MiddlewareResult {
      const { placement, rects, platform, elements, middlewareData } = state;
      const { element, padding = 0 } = options;
      const axis = otherAxis(sideAxis(placement));
      const length = lengthOf(axis);
      const start = state[axis];
      const arrowLength = platform.getDimensions(element)[length];
      const free =
        (axis === 'y'
          ? elements.floating.clientHeight
          : elements.floating.clientWidth) - arrowLength;
      // Padding large enough to push the arrow off center gets capped.
      const edge = min(padding, free / 2 - 1);
      const end = free - edge;
      const center =
        free / 2 +
        (rects.reference[length] - rects.floating[length]) / 2 +
        rects.reference[axis] -
        start;
      const offset = clamp(edge, center, end);
      // A reference too small for the padded arrow to reach gets the floating
      // element nudged toward it, with one reset so `shift` still runs.
      const nudge =
        !middlewareData['arrow'] &&
        alignmentOf(placement) != null &&
        center !== offset &&
        rects.reference[length] / 2 - edge - arrowLength / 2 < 0;
      const alignmentOffset = nudge
        ? center < edge
          ? center - edge
          : center - end
        : 0;

      return {
        [axis]: start + alignmentOffset,
        data: {
          [axis]: offset,
          ...(nudge && { alignmentOffset })
        },
        reset: nudge
      };
    }
  };
}

/**
 * Repositions whenever what the placement depends on changes. Comparing rects
 * covers every scroller, shadow root and frame, layout shifts and transforms in
 * one code path. It runs every frame while anything moves and on a slow
 * heartbeat once settled, with scrolling waking it straight away.
 */
export function autoUpdate(
  reference: Element,
  floating: HTMLElement,
  update: () => void
) {
  const win = getWindow(floating);
  let last: string;
  let quietFrames = 0;
  let stopped = false;

  const check = () => {
    const viewport = win.visualViewport;
    const now = JSON.stringify([
      rectInWindow(reference, win),
      floating.getBoundingClientRect(),
      viewport?.offsetLeft,
      viewport?.offsetTop,
      viewport?.width,
      viewport?.height
    ]);

    if (now !== last) {
      last = now;
      quietFrames = 0;
      update();
    }
  };

  // jsdom only defines this when asked to, and consumers' tests run in jsdom.
  const nextFrame = () => win.requestAnimationFrame?.(loop);
  const loop = () => {
    if (stopped) return;
    check();
    // A timer is the cheap heartbeat, since scheduling a frame makes one happen.
    if (++quietFrames < 30) nextFrame();
    else setTimeout(loop, 100);
  };

  // Scroll events capture, so this hears every scroller in these documents. The
  // same listener added twice is one listener when both are the same window.
  const windows = [win, getWindow(reference)];
  windows.forEach((target) => target.addEventListener('scroll', check, true));
  update();
  nextFrame();

  return () => {
    stopped = true;
    windows.forEach((target) =>
      target.removeEventListener('scroll', check, true)
    );
  };
}
