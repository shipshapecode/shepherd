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
): HTMLElement {
  const { title, cancelIcon, text, buttons } = step.options;
  const content = h('div', { class: 'shepherd-content' });

  if (!isUndefined(title) || cancelIcon?.enabled) {
    content.append(createShepherdHeader(labelId, step));
  }

  if (!isUndefined(text)) {
    content.append(createShepherdText(descriptionId, step));
  }

  if (Array.isArray(buttons) && buttons.length) {
    content.append(createShepherdFooter(step));
  }

  return content;
}
