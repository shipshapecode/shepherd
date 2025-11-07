import { createEffect } from 'solid-js';
import { isHTMLElement, isFunction } from '../utils/type-check';
import type { Step } from '../step';

export interface ShepherdTextProps {
  descriptionId: string;
  step: Step;
}

export default function ShepherdText(props: ShepherdTextProps) {
  let element: HTMLDivElement | undefined;

  createEffect(() => {
    if (element) {
      let text = props.step.options.text;

      if (isFunction(text)) {
        text = text.call(props.step);
      }

      if (isHTMLElement(text)) {
        element.innerHTML = '';
        element.appendChild(text as HTMLElement);
      } else {
        element.innerHTML = text as string;
      }
    }
  });

  return <div ref={element} class="shepherd-text" id={props.descriptionId} />;
}
