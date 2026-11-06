import { h } from '../utils/dom.ts';
import { isFunction } from '../utils/type-check.ts';
import type { StringOrStringFunction } from '../step.ts';
import './shepherd-title.css';

export function createShepherdTitle(
  labelId: string,
  title: StringOrStringFunction
): HTMLElement {
  const el = h('h3', { id: labelId, class: 'shepherd-title' });

  el.innerHTML = isFunction(title) ? title() : title;

  return el;
}
