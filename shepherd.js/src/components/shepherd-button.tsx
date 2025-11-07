import { h } from 'preact';

import { isFunction } from '../utils/type-check';
import type { Step, StepOptionsButton } from '../step';

export interface ShepherdButtonProps {
  config: StepOptionsButton;
  step: Step;
}

export default function ShepherdButton({ config, step }: ShepherdButtonProps) {
  const getConfigOption = (option: any) => {
    if (isFunction(option)) {
      return option.call(step);
    }
    return option;
  };

  const action = config.action ? config.action.bind(step.tour) : null;
  const disabled = config.disabled ? getConfigOption(config.disabled) : false;
  const label = config.label ? getConfigOption(config.label) : null;
  const text = config.text ? getConfigOption(config.text) : null;

  return (
    <button
      aria-label={label || undefined}
      className={`${config.classes || ''} shepherd-button ${
        config.secondary ? 'shepherd-button-secondary' : ''
      }`}
      disabled={disabled}
      onClick={() => action?.()}
      tabIndex={0}
      type="button"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}
