import { h } from '../utils/dom.ts';
import { createShepherdButton } from './shepherd-button.ts';
import type { Step } from '../step.ts';

export function createShepherdFooter(step: Step): HTMLElement {
  const footer = h('footer', { class: 'shepherd-footer' });

  if (step.options.buttons) {
    for (const config of step.options.buttons) {
      footer.append(createShepherdButton(config, step));
    }
  }

  return footer;
}
