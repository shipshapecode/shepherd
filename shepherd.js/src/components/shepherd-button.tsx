import { createMemo } from 'solid-js';
import { isFunction } from '../utils/type-check';
import type { Step, StepOptionsButton } from '../step';

export interface ShepherdButtonProps {
  config: StepOptionsButton;
  step: Step;
}

export default function ShepherdButton(props: ShepherdButtonProps) {
  const getConfigOption = (option: any) => {
    if (isFunction(option)) {
      return option.call(props.step);
    }
    return option;
  };

  const action = createMemo(() =>
    props.config.action ? props.config.action.bind(props.step.tour) : null
  );

  const disabled = createMemo(() =>
    props.config.disabled ? getConfigOption(props.config.disabled) : false
  );

  const label = createMemo(() =>
    props.config.label ? getConfigOption(props.config.label) : null
  );

  const text = createMemo(() =>
    props.config.text ? getConfigOption(props.config.text) : null
  );

  return (
    <button
      aria-label={label() || undefined}
      class={`${props.config.classes || ''} shepherd-button ${
        props.config.secondary ? 'shepherd-button-secondary' : ''
      }`}
      disabled={disabled()}
      onClick={() => action()?.()}
      tabindex="0"
      type="button"
      innerHTML={text()}
    />
  );
}
