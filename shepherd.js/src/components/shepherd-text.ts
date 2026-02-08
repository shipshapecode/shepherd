import { h } from '../utils/dom.ts';
import { isHTMLElement, isFunction } from '../utils/type-check.ts';
import type { Step } from '../step.ts';
import './shepherd-text.css';

export function createShepherdText(
  descriptionId: string,
  step: Step
): HTMLDivElement {
  const el = h('div', {
    class: 'shepherd-text',
    id: descriptionId
  }) as HTMLDivElement;

  let text = step.options.text;

  if (isFunction(text)) {
    text = text.call(step);
  }

  if (isHTMLElement(text)) {
    el.appendChild(text);
  } else {
    el.innerHTML = text as string;
  }

  return el;
}
