import { h } from '../utils/dom.ts';
import { isFunction } from '../utils/type-check.ts';
import type { Step, StepOptionsButton } from '../step.ts';
import './shepherd-button.css';

export function createShepherdButton(
  config: StepOptionsButton,
  step: Step
): HTMLButtonElement {
  const resolve = (option: unknown) =>
    isFunction(option) ? option.call(step) : option;
  const text = resolve(config.text);

  const btn = h('button', {
    ...config.attrs,
    'aria-label': resolve(config.label) || null,
    class: `${config.classes || ''} shepherd-button ${
      config.secondary ? 'shepherd-button-secondary' : ''
    }`,
    disabled: resolve(config.disabled) || null,
    onclick: config.action ? config.action.bind(step.tour) : null,
    tabindex: '0',
    type: 'button'
  }) as HTMLButtonElement;

  if (text) {
    btn.innerHTML = text;
  }

  return btn;
}
