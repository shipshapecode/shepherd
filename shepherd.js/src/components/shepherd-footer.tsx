import { h } from 'preact';

import ShepherdButton from './shepherd-button';
import type { Step } from '../step';

export interface ShepherdFooterProps {
  step: Step;
}

export default function ShepherdFooter({ step }: ShepherdFooterProps) {
  if (!step.options.buttons || step.options.buttons.length === 0) {
    return null;
  }

  return (
    <footer className="shepherd-footer">
      {step.options.buttons.map((config, index) => (
        <ShepherdButton key={index} config={config} step={step} />
      ))}
    </footer>
  );
}
