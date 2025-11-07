import { Show } from 'solid-js';
import ShepherdFooter from './shepherd-footer';
import ShepherdHeader from './shepherd-header';
import ShepherdText from './shepherd-text';
import { isUndefined } from '../utils/type-check';
import type { Step } from '../step';

export interface ShepherdContentProps {
  descriptionId: string;
  labelId: string;
  step: Step;
}

export default function ShepherdContent(props: ShepherdContentProps) {
  return (
    <div class="shepherd-content">
      <Show
        when={
          !isUndefined(props.step.options.title) ||
          (props.step.options.cancelIcon &&
            props.step.options.cancelIcon.enabled)
        }
      >
        <ShepherdHeader labelId={props.labelId} step={props.step} />
      </Show>

      <Show when={!isUndefined(props.step.options.text)}>
        <ShepherdText descriptionId={props.descriptionId} step={props.step} />
      </Show>

      <Show
        when={
          Array.isArray(props.step.options.buttons) &&
          props.step.options.buttons.length
        }
      >
        <ShepherdFooter step={props.step} />
      </Show>
    </div>
  );
}
