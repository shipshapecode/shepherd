import { h } from '../utils/dom.ts';
import { isFunction } from '../utils/type-check.ts';
import type { StringOrStringFunction } from '../step.ts';
import './shepherd-title.css';

export function createShepherdTitle(
  labelId: string,
  title: StringOrStringFunction
): HTMLHeadingElement {
  const el = h('h3', {
    id: labelId,
    class: 'shepherd-title'
  }) as HTMLHeadingElement;

  const resolvedTitle = isFunction(title) ? title() : title;
  el.innerHTML = resolvedTitle;

  return el;
}
