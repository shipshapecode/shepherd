import { createEffect, onMount } from 'solid-js';
import { isFunction } from '../utils/type-check';
import type { StringOrStringFunction } from '../step';

export interface ShepherdTitleProps {
  labelId: string;
  title: StringOrStringFunction;
}

export default function ShepherdTitle(props: ShepherdTitleProps) {
  let element: HTMLHeadingElement | undefined;

  createEffect(() => {
    if (element) {
      let title = props.title;
      if (isFunction(title)) {
        title = title();
      }
      element.innerHTML = title;
    }
  });

  return <h3 ref={element} id={props.labelId} class="shepherd-title" />;
}
