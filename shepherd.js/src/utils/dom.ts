type Attrs = Record<string, unknown>;
type Child = Node | string | null | undefined | false;

/**
 * Create an HTML element with attributes and children.
 * Attributes starting with "on" are added as event listeners.
 * Null/undefined/false attribute values are skipped.
 */
export function h(
  tag: string,
  attrs?: Attrs | null,
  ...children: Child[]
): HTMLElement {
  const el = document.createElement(tag);
  applyAttrs(el, attrs);
  appendChildren(el, children);
  return el;
}

/**
 * Create an SVG element with attributes and children.
 */
export function svgEl(
  tag: string,
  attrs?: Attrs | null,
  ...children: Child[]
): SVGElement {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  applyAttrs(el, attrs);
  appendChildren(el, children);
  return el;
}

function applyAttrs(el: Element, attrs?: Attrs | null) {
  if (!attrs) return;

  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;

    if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(
        key.slice(2).toLowerCase(),
        value as EventListener
      );
    } else if (key === 'disabled' && value === true) {
      (el as HTMLButtonElement).disabled = true;
    } else {
      el.setAttribute(key, String(value));
    }
  }
}

function appendChildren(el: Element, children: Child[]) {
  for (const child of children) {
    if (child != null && child !== false) {
      el.append(
        typeof child === 'string' ? document.createTextNode(child) : child
      );
    }
  }
}
