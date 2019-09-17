/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */
export function cleanupSteps(tour) {
  if (tour) {
    const { steps } = tour;

    steps.forEach((step) => {
      if (step.options && step.options.canClickTarget === false && step.options.attachTo) {
        if (step.target instanceof HTMLElement) {
          step.target.style.pointerEvents = '';
        }
      }
    });
  }
}
