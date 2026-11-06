import { h } from '../utils/dom.ts';
import { createShepherdButton } from './shepherd-button.ts';
import type { Step } from '../step.ts';
import './shepherd-footer.css';

export function createShepherdFooter(step: Step): HTMLElement {
  return h(
    'footer',
    { class: 'shepherd-footer' },
    ...(step.options.buttons || []).map((config) =>
      createShepherdButton(config, step)
    )
  );
}
