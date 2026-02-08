import { h } from '../utils/dom.ts';
import { createShepherdCancelIcon } from './shepherd-cancel-icon.ts';
import { createShepherdTitle } from './shepherd-title.ts';
import type { Step } from '../step.ts';
import './shepherd-header.css';

export function createShepherdHeader(labelId: string, step: Step): HTMLElement {
  const header = h('header', { class: 'shepherd-header' });

  if (step.options.title) {
    header.append(createShepherdTitle(labelId, step.options.title));
  }

  if (step.options.cancelIcon && step.options.cancelIcon.enabled) {
    header.append(createShepherdCancelIcon(step.options.cancelIcon, step));
  }

  return header;
}
