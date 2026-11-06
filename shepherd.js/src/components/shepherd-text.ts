import { h } from '../utils/dom.ts';
import { isHTMLElement, isFunction } from '../utils/type-check.ts';
import type { Step } from '../step.ts';
import './shepherd-text.css';

export function createShepherdText(
  descriptionId: string,
  step: Step
): HTMLElement {
  const el = h('div', { class: 'shepherd-text', id: descriptionId });
  const { text } = step.options;
  const content = isFunction(text) ? text.call(step) : text;

  if (isHTMLElement(content)) {
    el.append(content);
  } else {
    el.innerHTML = content as string;
  }

  return el;
}
