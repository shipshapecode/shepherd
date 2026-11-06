/**
 * Create an HTML element with attributes and children.
 * Attributes starting with "on" are added as event listeners.
 * Null/undefined/false attribute values are skipped.
 */
export function h(
  tag: string,
  attrs: Record<string, unknown>,
  ...children: Array<Node | string>
): HTMLElement {
  const el = document.createElement(tag);

  for (const [key, value] of Object.entries(attrs)) {
    if (value === null || value === undefined || value === false) continue;

    if (key.startsWith('on') && typeof value === 'function') {
      el.addEventListener(key.slice(2).toLowerCase(), value as EventListener);
    } else if (key === 'disabled' && value === true) {
      (el as HTMLButtonElement).disabled = true;
    } else {
      el.setAttribute(key, String(value));
    }
  }

  el.append(...children);

  return el;
}
