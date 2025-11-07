import { h } from 'preact';

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

export default function ShepherdContent({ descriptionId, labelId, step }: ShepherdContentProps) {
  const showHeader =
    !isUndefined(step.options.title) ||
    (step.options.cancelIcon && step.options.cancelIcon.enabled);

  const showText = !isUndefined(step.options.text);

  const showFooter =
    Array.isArray(step.options.buttons) && step.options.buttons.length > 0;

  return (
    <div className="shepherd-content">
      {showHeader && <ShepherdHeader labelId={labelId} step={step} />}
      
      {showText && <ShepherdText descriptionId={descriptionId} step={step} />}
      
      {showFooter && <ShepherdFooter step={step} />}
    </div>
  );
}
