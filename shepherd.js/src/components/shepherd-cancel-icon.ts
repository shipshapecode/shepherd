import { h } from '../utils/dom.ts';
import type { Step, StepOptionsCancelIcon } from '../step.ts';
import './shepherd-cancel-icon.css';

export function createShepherdCancelIcon(
  cancelIcon: StepOptionsCancelIcon,
  step: Step
): HTMLButtonElement {
  const handleCancelClick = (e: Event) => {
    e.preventDefault();
    step.cancel();
  };

  const btn = h(
    'button',
    {
      ...(cancelIcon.attrs || {}),
      'aria-label': cancelIcon.label ? cancelIcon.label : 'Close Tour',
      class: 'shepherd-cancel-icon',
      onclick: handleCancelClick,
      type: 'button'
    },
    h('span', { 'aria-hidden': 'true' }, '\u00D7')
  ) as HTMLButtonElement;

  return btn;
}
