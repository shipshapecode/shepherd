import { h } from '../utils/dom.ts';
import type { Step, StepOptionsCancelIcon } from '../step.ts';
import './shepherd-cancel-icon.css';

export function createShepherdCancelIcon(
  cancelIcon: StepOptionsCancelIcon,
  step: Step
): HTMLElement {
  return h(
    'button',
    {
      ...cancelIcon.attrs,
      'aria-label': cancelIcon.label || 'Close Tour',
      class: 'shepherd-cancel-icon',
      onclick: (e: Event) => {
        e.preventDefault();
        step.cancel();
      },
      type: 'button'
    },
    h('span', { 'aria-hidden': 'true' }, '×')
  );
}
