import { h } from 'preact';

import ShepherdCancelIcon from './shepherd-cancel-icon';
import ShepherdTitle from './shepherd-title';
import type { Step } from '../step';

export interface ShepherdHeaderProps {
  labelId: string;
  step: Step;
}

export default function ShepherdHeader({ labelId, step }: ShepherdHeaderProps) {
  return (
    <header className="shepherd-header">
      {step.options.title && <ShepherdTitle labelId={labelId} title={step.options.title} />}
      
      {step.options.cancelIcon && step.options.cancelIcon.enabled && (
        <ShepherdCancelIcon cancelIcon={step.options.cancelIcon} step={step} />
      )}
    </header>
  );
}
