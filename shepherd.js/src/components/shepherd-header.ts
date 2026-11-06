import { h } from '../utils/dom.ts';
import { createShepherdCancelIcon } from './shepherd-cancel-icon.ts';
import { createShepherdTitle } from './shepherd-title.ts';
import type { Step } from '../step.ts';
import './shepherd-header.css';

export function createShepherdHeader(labelId: string, step: Step): HTMLElement {
  const { title, cancelIcon } = step.options;
  const header = h('header', { class: 'shepherd-header' });

  if (title) {
    header.append(createShepherdTitle(labelId, title));
  }

  if (cancelIcon?.enabled) {
    header.append(createShepherdCancelIcon(cancelIcon, step));
  }

  return header;
}
