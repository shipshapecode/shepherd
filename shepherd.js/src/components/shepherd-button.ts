import { h } from '../utils/dom.ts';
import { isFunction } from '../utils/type-check.ts';
import type { Step, StepOptionsButton } from '../step.ts';
import './shepherd-button.css';

function getConfigOption(option: unknown, step: Step): unknown {
  if (isFunction(option)) {
    return option.call(step);
  }
  return option;
}

export function createShepherdButton(
  config: StepOptionsButton,
  step: Step
): HTMLButtonElement {
  const action = config.action ? config.action.bind(step.tour) : null;
  const disabled = config.disabled
    ? getConfigOption(config.disabled, step)
    : false;
  const label = config.label ? getConfigOption(config.label, step) : null;
  const text = config.text ? getConfigOption(config.text, step) : null;

  const btn = h('button', {
    ...(config.attrs || {}),
    'aria-label': label || null,
    class: `${config.classes || ''} shepherd-button ${
      config.secondary ? 'shepherd-button-secondary' : ''
    }`,
    disabled: disabled || null,
    onclick: action,
    tabindex: '0',
    type: 'button'
  }) as HTMLButtonElement;

  if (text) {
    btn.innerHTML = text as string;
  }

  return btn;
}
