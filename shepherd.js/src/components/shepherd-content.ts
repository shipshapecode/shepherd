import { h } from '../utils/dom.ts';
import { createShepherdFooter } from './shepherd-footer.ts';
import { createShepherdHeader } from './shepherd-header.ts';
import { createShepherdText } from './shepherd-text.ts';
import { isUndefined } from '../utils/type-check.ts';
import type { Step } from '../step.ts';
import './shepherd-content.css';

export function createShepherdContent(
  descriptionId: string,
  labelId: string,
  step: Step
): HTMLDivElement {
  const content = h('div', { class: 'shepherd-content' }) as HTMLDivElement;

  if (
    !isUndefined(step.options.title) ||
    (step.options.cancelIcon && step.options.cancelIcon.enabled)
  ) {
    content.append(createShepherdHeader(labelId, step));
  }

  if (!isUndefined(step.options.text)) {
    content.append(createShepherdText(descriptionId, step));
  }

  if (Array.isArray(step.options.buttons) && step.options.buttons.length) {
    content.append(createShepherdFooter(step));
  }

  return content;
}
