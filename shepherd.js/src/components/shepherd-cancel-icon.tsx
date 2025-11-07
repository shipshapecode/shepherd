import { h } from 'preact';

import type { Step } from '../step';

export interface ShepherdCancelIconProps {
  cancelIcon: {
    enabled?: boolean;
    label?: string;
  };
  step: Step;
}

export default function ShepherdCancelIcon({ cancelIcon, step }: ShepherdCancelIconProps) {
  const handleCancelClick = (e: Event) => {
    e.preventDefault();
    step.cancel();
  };

  return (
    <button
      aria-label={cancelIcon.label || 'Close Tour'}
      className="shepherd-cancel-icon"
      onClick={handleCancelClick}
      type="button"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
