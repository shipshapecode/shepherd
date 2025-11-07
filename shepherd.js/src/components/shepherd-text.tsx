import { h } from 'preact';

import { useEffect, useRef } from 'preact/hooks';
import { isHTMLElement, isFunction } from '../utils/type-check';
import type { Step } from '../step';

export interface ShepherdTextProps {
  descriptionId: string;
  step: Step;
}

export default function ShepherdText({ descriptionId, step }: ShepherdTextProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      let text = step.options.text;

      if (isFunction(text)) {
        text = text.call(step);
      }

      if (isHTMLElement(text)) {
        elementRef.current.innerHTML = '';
        elementRef.current.appendChild(text as HTMLElement);
      } else {
        elementRef.current.innerHTML = text as string;
      }
    }
  }, [step.options.text, step]);

  return <div ref={elementRef} className="shepherd-text" id={descriptionId} />;
}
