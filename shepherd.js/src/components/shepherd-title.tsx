/** @jsx h */
import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { isFunction } from '../utils/type-check';
import type { StringOrStringFunction } from '../step';

export interface ShepherdTitleProps {
  labelId: string;
  title: StringOrStringFunction;
}

export default function ShepherdTitle({ labelId, title }: ShepherdTitleProps) {
  const elementRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (elementRef.current) {
      let titleText = title;
      if (isFunction(titleText)) {
        titleText = titleText();
      }
      elementRef.current.innerHTML = titleText;
    }
  }, [title]);

  return <h3 ref={elementRef} id={labelId} className="shepherd-title" />;
}
