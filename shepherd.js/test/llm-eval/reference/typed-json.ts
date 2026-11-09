import Shepherd, { type StepOptionsButton, type Tour } from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

export interface ProductStep {
  id: string;
  selector: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  title: string;
  body: string;
}

export function buildTour(steps: ProductStep[]): Tour {
  const tour = new Shepherd.Tour();
  steps.forEach((step, index) => {
    const buttons: StepOptionsButton[] = [];
    if (index > 0) buttons.push({ text: 'Back', action: tour.back });
    buttons.push(
      index < steps.length - 1
        ? { text: 'Next', action: tour.next }
        : { text: 'Done', action: tour.complete }
    );
    tour.addStep({
      id: step.id,
      title: step.title,
      text: step.body,
      attachTo: { element: step.selector, on: step.placement },
      buttons
    });
  });
  return tour;
}
