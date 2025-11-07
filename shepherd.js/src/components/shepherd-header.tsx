import { createMemo, Show } from 'solid-js';
import ShepherdCancelIcon from './shepherd-cancel-icon';
import ShepherdTitle from './shepherd-title';
import type { Step } from '../step';

export interface ShepherdHeaderProps {
  labelId: string;
  step: Step;
}

export default function ShepherdHeader(props: ShepherdHeaderProps) {
  const title = createMemo(() => props.step.options.title);
  const cancelIcon = createMemo(() => props.step.options.cancelIcon);

  return (
    <header class="shepherd-header">
      <Show when={title()}>
        <ShepherdTitle labelId={props.labelId} title={title()!} />
      </Show>

      <Show when={cancelIcon() && cancelIcon()?.enabled}>
        <ShepherdCancelIcon cancelIcon={cancelIcon()!} step={props.step} />
      </Show>
    </header>
  );
}
