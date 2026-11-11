/* eslint-disable @typescript-eslint/no-explicit-any --
   This walks DOM nodes across realms and shadow roots, whose types are unions
   of elements and windows. */
type Side = 'top' | 'right' | 'bottom' | 'left';
type Axis = 'x' | 'y';
type Coords = Record<Axis, number>;
type Strategy = 'absolute' | 'fixed';

/** The side of its target a step sits on, optionally aligned along that side. */
export type Placement = Side | `${Side}-${Alignment}`;

/** Which edge of its target a step lines up with. */
export type Alignment = 'start' | 'end';

/** One positioning step, run in order and rerun from the start on a reset. */
export interface Middleware {
  /** Keys the data it shares with later ones. */
  name: string;
  fn(state: MiddlewareState): MiddlewareResult;
}

export interface PositionConfig {
  placement: Placement;
  strategy: Strategy;
  middleware: Middleware[];
}

interface Rect extends Coords {
  width: number;
  height: number;
}

interface ElementRects {
  reference: Rect;
  floating: Rect;
}

/** Floating UI's `MiddlewareState`, less what only consumer middleware read. */
interface MiddlewareState extends Coords, Measurements {
  initialPlacement: Placement;
  placement: Placement;
  strategy: Strategy;
  middlewareData: Record<string, any>;
}

interface MiddlewareResult extends Partial<Coords> {
  data?: Record<string, any>;
  reset?: boolean | { placement: Placement };
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
  webKit ??
  (webKit =
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
    // Apart, as a list fails whole. `:modal` shipped first in every browser.
    return element.matches(':modal') || element.matches(':popover-open');
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
 * the measured rects and overflow detection in the same coordinate space.
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

function viewportRect(node: any): Rect {
  const html = htmlOf(node);
  const { x, width: rootWidth } = html.getBoundingClientRect();
  const viewport = getWindow(node).visualViewport;
  // WebKit's client coordinates are relative to the visual viewport, others'
  // to the layout viewport.
  const offset = !isWebKit() && viewport;
  const left = x + html.scrollLeft;
  // With no scrollbar to show, `scrollbar-gutter: stable` narrows the root without
  // its `clientWidth` showing it. A root offset to the left has no such gutter.
  const gutter = left > 0 ? 0 : html.clientWidth - rootWidth;

  return {
    x: left + (offset ? offset.offsetLeft : 0),
    y: offset ? offset.offsetTop : 0,
    width:
      (viewport ? viewport.width : html.clientWidth) -
      (gutter > 0 && gutter < 26 ? gutter : 0),
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

function clipRect(clip: Element): Rect {
  const scale = getScale(clip);
  const { x, y } = clip.getBoundingClientRect();
  return {
    x: x + clip.clientLeft * scale.x,
    y: y + clip.clientTop * scale.y,
    width: clip.clientWidth * scale.x,
    height: clip.clientHeight * scale.y
  };
}

/** The area visible through every clipping ancestor and the viewport. */
function getClippingRect(element: Element): Rect {
  const rects = [
    ...(isTopLayer(element) ? [] : clippingAncestors(element).map(clipRect)),
    viewportRect(element)
  ];
  const x = max(...rects.map((rect) => rect.x));
  const y = max(...rects.map((rect) => rect.y));

  return {
    x,
    y,
    width: min(...rects.map((rect) => rect.x + rect.width)) - x,
    height: min(...rects.map((rect) => rect.y + rect.height)) - y
  };
}

/**
 * Everything positioning reads from the DOM, read once per position. Nothing
 * a middleware does moves the step's offset parent or clipping ancestors.
 */
export interface Measurements {
  rects: ElementRects;
  /** The visible area, in client coordinates. */
  clip: Rect;
  /** Where the offset parent's origin lands in client coordinates, and its scale. */
  origin: Coords & { scale: Coords };
  rtl: boolean;
  floating: HTMLElement;
}

export function measure(
  reference: Element,
  floating: HTMLElement,
  strategy: Strategy
): Measurements {
  const offsetParent = getOffsetParent(floating);
  const origin = originOf(offsetParent, strategy);
  const { x, y, scale } = origin;
  const rect = rectInWindow(reference, getWindow(offsetParent));
  const { width, height } = getDimensions(floating);

  return {
    rects: {
      reference: {
        x: (rect.x - x) / scale.x,
        y: (rect.y - y) / scale.y,
        width: rect.width / scale.x,
        height: rect.height / scale.y
      },
      floating: { x: 0, y: 0, width, height }
    },
    clip: getClippingRect(floating),
    origin,
    rtl: styleOf(floating).direction === 'rtl',
    floating
  };
}

function detectOverflow(
  { x, y, rects: { floating }, clip, origin }: MiddlewareState,
  padding = 0
): Record<Side, number> {
  const { scale } = origin;
  const left = x * scale.x + origin.x;
  const top = y * scale.y + origin.y;

  return {
    top: (clip.y - top + padding) / scale.y,
    bottom:
      (top + floating.height * scale.y - clip.y - clip.height + padding) /
      scale.y,
    left: (clip.x - left + padding) / scale.x,
    right:
      (left + floating.width * scale.x - clip.x - clip.width + padding) /
      scale.x
  };
}

/** Runs the middleware against measurements taken by `measure`. */
export function place(
  measurements: Measurements,
  { placement: initialPlacement, strategy, middleware }: PositionConfig
): ComputePositionResult {
  const { rects, rtl } = measurements;
  const middlewareData: Record<string, any> = {};
  let { x, y } = placementCoords(rects, initialPlacement, rtl);
  let placement = initialPlacement;
  let resets = 0;

  for (let i = 0; i < middleware.length; i++) {
    const current = middleware[i] as Middleware;
    const result = current.fn({
      ...measurements,
      x,
      y,
      initialPlacement,
      placement,
      strategy,
      middlewareData
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
        placement = reset.placement;
        ({ x, y } = placementCoords(rects, placement, rtl));
      }
      i = -1;
    }
  }

  return { x, y, placement, strategy, middlewareData };
}

export function computePosition(
  reference: Element,
  floating: HTMLElement,
  config: PositionConfig
): ComputePositionResult {
  return place(measure(reference, floating, config.strategy), config);
}

function minBy<T>(list: T[], key: (item: T) => number) {
  return list.reduce<T | undefined>(
    (best, item) => (best && key(best) <= key(item) ? best : item),
    undefined
  );
}

const fits = (overflow: number) => overflow <= 0;

/**
 * Moves the element away from its reference along the side it sits on, and
 * along that side by `crossAxis`. Floating UI's `offset()`, which `shift`'s
 * limit reads back from `middlewareData.offset`.
 */
export function offset(
  value: number | { mainAxis?: number; crossAxis?: number }
): Middleware {
  const { mainAxis = 0, crossAxis = 0 } =
    typeof value === 'number' ? { mainAxis: value } : value;

  return {
    name: 'offset',
    fn({ x, y, placement, middlewareData, rtl }) {
      // After the arrow's nudge resets, the offset is already in `x` and `y`.
      if (
        placement === middlewareData['offset']?.placement &&
        middlewareData['arrow']?.alignmentOffset
      ) {
        return {};
      }
      const axis = sideAxis(placement);
      const delta = {
        [axis]: /^[tl]/.test(placement) ? -mainAxis : mainAxis,
        [otherAxis(axis)]: rtl && axis === 'y' ? -crossAxis : crossAxis
      } as Coords;

      return {
        x: x + delta.x,
        y: y + delta.y,
        data: { ...delta, placement }
      };
    }
  };
}

/**
 * Tries candidate placements in order, one reset at a time, recording how each
 * overflows. `choose` picks among them once every candidate has been tried.
 * `flipping` stops at the first fit and defers to any placement another
 * middleware reset to, which is the only difference `autoPlacement` has.
 */
function placementSearch(
  name: string,
  padding: number | undefined,
  flipping: boolean,
  candidates: (initial: Placement) => Placement[],
  choose: (attempts: Attempt[]) => Attempt | undefined
): Middleware {
  return {
    name,
    fn(state) {
      const { placement, initialPlacement, middlewareData, rects, rtl } = state;
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

      const overflow = detectOverflow(state, padding);
      const [first, second] = alignmentSides(placement, rects, rtl);
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

export function flip(padding?: number): Middleware {
  return placementSearch(
    'flip',
    padding,
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

export function autoPlacement(
  alignment: Alignment | undefined,
  padding?: number
): Middleware {
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
    padding,
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
 * crossAxis: true, padding })`.
 */
export function shift(padding?: number): Middleware {
  return {
    name: 'shift',
    fn(state) {
      const { x, y, placement, rects, middlewareData } = state;
      const { reference, floating } = rects;
      const overflow = detectOverflow(state, padding);
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
        data: { x: limited.x - x, y: limited.y - y }
      };
    }
  };
}

export function arrow(element: Element, padding = 0): Middleware {
  return {
    name: 'arrow',
    fn(state) {
      const { placement, rects, floating, middlewareData } = state;
      const axis = otherAxis(sideAxis(placement));
      const length = lengthOf(axis);
      const start = state[axis];
      const arrowLength = getDimensions(element)[length];
      const free =
        (axis === 'y' ? floating.clientHeight : floating.clientWidth) -
        arrowLength;
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
 * Reports when `element` moves without any scroll or resize event, by watching
 * an intersection root shrunk to exactly its box.
 * https://samthor.au/2021/observing-dom/
 */
function observeMove(element: Element, onMove: () => void) {
  const doc = getDocument(element);
  // The viewport's size. In quirks mode that is <body>'s client size, not the
  // root's, which spans the whole document.
  const viewport = doc.scrollingElement || htmlOf(element);
  let observer: IntersectionObserver | undefined;
  let timer: ReturnType<typeof setTimeout>;
  let disposed = false;

  const stop = () => {
    clearTimeout(timer);
    observer?.disconnect();
    observer = undefined;
  };

  const refresh = (skip?: boolean, threshold = 1) => {
    // A notification queued before disposal must not reach `onMove`.
    if (disposed) return;
    stop();

    const { x, y, width, height } = element.getBoundingClientRect();
    if (!skip) onMove();
    // `onMove` can dispose of this tracker, and an observer made after that
    // would never be disconnected.
    if (disposed) return;
    // A zero-size box cannot be observed, such as a target at `scale(0)`.
    if (!width || !height) {
      timer = setTimeout(refresh, 1000);
      return;
    }

    let first = true;
    observer = new IntersectionObserver(
      (entries) => {
        const ratio = (entries[0] as IntersectionObserverEntry)
          .intersectionRatio;
        const now = element.getBoundingClientRect();
        // The entry is a snapshot, so a moved element makes it stale.
        if (
          now.x !== x ||
          now.y !== y ||
          now.width !== width ||
          now.height !== height
        ) {
          return refresh();
        }
        if (ratio !== threshold) {
          if (!first) return refresh();
          // Clipped in place reports 0; throttle or this loops forever.
          if (ratio) refresh(false, ratio);
          else timer = setTimeout(() => refresh(false, 1e-7), 1000);
        }
        first = false;
      },
      {
        root: doc,
        rootMargin: [
          y,
          viewport.clientWidth - x - width,
          viewport.clientHeight - y - height,
          x
        ]
          .map((inset) => `${-Math.floor(inset)}px`)
          .join(' '),
        threshold
      }
    );
    observer.observe(element);
  };

  const onResize = () => refresh(true);
  const win = getWindow(element);
  win.addEventListener('resize', onResize);
  // The observer watches the box the element had when it was made, so an element
  // that shrinks could then move within that old box without being noticed.
  // `autoUpdate` reports the resize itself.
  const resizes =
    typeof ResizeObserver === 'function'
      ? new ResizeObserver(onResize)
      : undefined;
  resizes?.observe(element, { box: 'border-box' });
  // An inline element has no box for a ResizeObserver, so new text or attributes
  // are the only sign that it changed size, and nothing else reports it.
  const mutations =
    typeof MutationObserver === 'function' &&
    styleOf(element).display === 'inline'
      ? new MutationObserver(() => refresh())
      : undefined;
  mutations?.observe(element, {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true
  });
  refresh(true);

  return () => {
    disposed = true;
    win.removeEventListener('resize', onResize);
    resizes?.disconnect();
    mutations?.disconnect();
    stop();
  };
}

/**
 * Repositions whenever what the placement depends on changes: a scroll or
 * resize in any document from the reference's up to the floating element's, a
 * resize of either element or of what clips the floating element, the
 * reference or a frame holding it moving with no event at all, which
 * `observeMove` reports, and every frame of a CSS animation or transition on
 * the reference, a frame holding it, or an ancestor of either. Each of those
 * reaches `check`, which updates only when something it compares really
 * changed.
 */
export function autoUpdate(
  reference: Element,
  floating: Element,
  update: () => void
) {
  const win = getWindow(floating);
  let last: string;
  let connected = false;
  let clips: Element[] = [];
  let frame = 0;
  let stopped = false;

  // The frames between the reference and the floating element's window. A
  // cross-origin frame hides its `frameElement`, which ends the chain.
  const frames: Element[] = [];
  for (
    let current = getWindow(reference), host: Element | null;
    current !== win && (host = current.frameElement);
    current = getWindow(host)
  ) {
    frames.push(host);
  }

  const resizes =
    typeof ResizeObserver === 'function'
      ? new ResizeObserver(() => check())
      : undefined;

  // Clipping ancestors are known once the floating element is on the page,
  // which a detached `stepsContainer` reaches only later.
  const attach = () => {
    connected = true;
    clips = clippingAncestors(floating);
    clips.forEach((clip) => resizes?.observe(clip));
  };

  const check = () => {
    // A tour abandoned by a route change has no other way to stop this.
    if (floating.isConnected) {
      if (!connected) attach();
    } else if (connected) {
      return stop();
    }

    const target = rectInWindow(reference, win);
    const own = floating.getBoundingClientRect();
    const viewport = win.visualViewport;
    const now = [
      target.x,
      target.y,
      target.width,
      target.height,
      own.left,
      own.top,
      own.width,
      own.height,
      win.innerWidth,
      win.innerHeight,
      viewport?.offsetLeft,
      viewport?.offsetTop,
      viewport?.width,
      viewport?.height,
      ...clips.flatMap((clip) => [clip.clientWidth, clip.clientHeight])
    ].join();

    if (now !== last) {
      last = now;
      update();
    }
  };

  // Scroll does not bubble but does capture, so this hears every scroller in
  // these documents. A scroller inside a shadow root is left to `observeMove`.
  const targets = [
    ...new Set([win, getWindow(reference), ...frames.map(getWindow)])
  ];
  if (win.visualViewport) targets.push(win.visualViewport as any);
  targets.forEach((target) => {
    target.addEventListener('scroll', check, true);
    target.addEventListener('resize', check);
  });

  // A transform moves the reference without any event or resize, so follow it
  // frame by frame while an animation or transition runs on anything whose
  // transform carries it: itself, a frame holding it, or an ancestor of either,
  // across shadow boundaries.
  const chain = [reference, ...frames];
  // `ancestorsOf` stops short of the root, which can animate too. A document
  // still parsing has no body yet.
  const carriers = new Set<Element>(
    chain
      .flatMap((element) => [
        element,
        ...ancestorsOf(element),
        getDocument(element).body,
        htmlOf(element)
      ])
      .filter(Boolean)
  );
  // Those events and `getAnimations()` stay within their own shadow root or
  // document, so both are read from every root a carrier lives in.
  const roots = [
    ...new Set(
      [...carriers].flatMap((element) => [
        (element.getRootNode?.() ?? getDocument(element)) as
          Document | ShadowRoot,
        getDocument(element)
      ])
    )
  ];
  // Keyframe bookkeeping and properties that only repaint cannot move the
  // reference, so an endless background or color animation on the page does
  // not keep tracking running. Anything unreadable counts as moving.
  const moves = ({ effect, transitionProperty }: Animation & CSSTransition) =>
    (transitionProperty
      ? [transitionProperty]
      : ((effect as KeyframeEffect | null)
          ?.getKeyframes?.()
          .flatMap(Object.keys) ?? [''])
    ).some(
      (property) =>
        !/^((computed)?offset|easing|composite)$|^(background|color|opacity|box-?shadow|outline|border-?color|filter)/i.test(
          property
        )
    );
  const animating = () =>
    roots.some((root) =>
      root
        .getAnimations?.()
        .some(
          (animation) =>
            animation.playState === 'running' &&
            carriers.has(
              (animation.effect as KeyframeEffect | null)?.target as Element
            ) &&
            moves(animation as Animation & CSSTransition)
        )
    );
  const follow = () => {
    check();
    frame = !stopped && animating() ? requestAnimationFrame(follow) : 0;
  };
  const onAnimate = (event: Event) => {
    if (!frame && carriers.has(event.target as Element)) follow();
  };
  const animationEvents = ['transitionrun', 'animationstart'];
  roots.forEach((root) =>
    animationEvents.forEach((type) =>
      root.addEventListener(type, onAnimate, true)
    )
  );

  // jsdom has neither observer. Removing the step from the page resizes it to
  // nothing, which is what tells an abandoned tour to stop.
  const stopWatching =
    typeof IntersectionObserver === 'function'
      ? chain.map((element) => observeMove(element, check))
      : [];
  // The border box, which is what `check` compares, so a border or padding change
  // on a fixed-size element counts.
  [reference, floating, ...frames].forEach((element) =>
    resizes?.observe(element, { box: 'border-box' })
  );

  const stop = () => {
    stopped = true;
    targets.forEach((target) => {
      target.removeEventListener('scroll', check, true);
      target.removeEventListener('resize', check);
    });
    roots.forEach((root) =>
      animationEvents.forEach((type) =>
        root.removeEventListener(type, onAnimate, true)
      )
    );
    if (frame) cancelAnimationFrame(frame);
    stopWatching.forEach((stopOne) => stopOne());
    resizes?.disconnect();
  };

  if (floating.isConnected) attach();
  update();
  // An animation that started before the step opened sent its event already.
  if (animating()) follow();

  return stop;
}
