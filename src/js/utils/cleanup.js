/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */
export function cleanupSteps(tour) {
  if (tour) {
    const { steps } = tour;

    steps.forEach((step) => {
      if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
        const stepElement = step.target;

        if (stepElement instanceof HTMLElement) {
          stepElement.style.pointerEvents = 'auto';
        }
      }
    });
  }
}
