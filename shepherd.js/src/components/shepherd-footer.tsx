import { For, Show } from 'solid-js';
import ShepherdButton from './shepherd-button';
import type { Step } from '../step';

export interface ShepherdFooterProps {
  step: Step;
}

export default function ShepherdFooter(props: ShepherdFooterProps) {
  return (
    <footer class="shepherd-footer">
      <Show when={props.step.options.buttons}>
        <For each={props.step.options.buttons}>
          {(config) => <ShepherdButton config={config} step={props.step} />}
        </For>
      </Show>
    </footer>
  );
}
