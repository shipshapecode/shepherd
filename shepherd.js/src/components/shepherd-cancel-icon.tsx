import type { Step } from '../step';

export interface ShepherdCancelIconProps {
  cancelIcon: {
    enabled?: boolean;
    label?: string;
  };
  step: Step;
}

export default function ShepherdCancelIcon(props: ShepherdCancelIconProps) {
  const handleCancelClick = (e: MouseEvent) => {
    e.preventDefault();
    props.step.cancel();
  };

  return (
    <button
      aria-label={props.cancelIcon.label || 'Close Tour'}
      class="shepherd-cancel-icon"
      onClick={handleCancelClick}
      type="button"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  );
}
