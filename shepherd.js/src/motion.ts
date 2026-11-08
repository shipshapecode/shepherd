import type { Step, Tour } from './shepherd.ts';

/**
 * Glides each step's dialog from where the previous one sat instead of cutting
 * to its new position, on the same curve as the modal overlay's opening.
 *
 * It animates the `translate` property, which composes with whatever positions
 * the dialog, and does nothing under `prefers-reduced-motion: reduce`.
 *
 * @param tour The tour to animate.
 * @param duration Length of the glide in milliseconds.
 * @returns A function that stops gliding.
 */
export function glideSteps(tour: Tour, duration = 420) {
  let from: DOMRect | undefined;
  // A step's `show` can land after the stop, once its `beforeShowPromise` settles.
  let stopped = false;

  const onShow = ({ step }: { step: Step }) => {
    step.once('show', () =>
      requestAnimationFrame(() => {
        const el = step.getElement();
        if (
          !stopped &&
          el &&
          from?.width &&
          !matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
          const to = el.getBoundingClientRect();
          const dx = from.left + from.width / 2 - to.left - to.width / 2;
          const dy = from.top + from.height / 2 - to.top - to.height / 2;
          // Holding opacity at 1 reads as one dialog moving, not a new one fading.
          el.animate(
            { translate: [`${dx}px ${dy}px`, '0 0'], opacity: [1, 1] },
            { duration, easing: 'cubic-bezier(0.33, 1, 0.68, 1)' }
          );
        }
      })
    );
    step.once('before-hide', () => {
      from = step.getElement()?.getBoundingClientRect();
    });
  };

  const onStart = () => {
    from = undefined;
  };

  tour.on('start', onStart);
  tour.on('show', onShow);
  return () => {
    stopped = true;
    tour.off('start', onStart);
    tour.off('show', onShow);
  };
}

/**
 * Exposes each step's position as the `--shepherd-step` and `--shepherd-steps`
 * custom properties on its dialog, which `shepherd.js/dist/css/theme.css` draws
 * as a counter and a progress bar.
 *
 * @param tour The tour to report progress for.
 * @returns A function that stops updating the properties.
 */
export function stepProgress(tour: Tour) {
  let stopped = false;

  const onShow = ({ step }: { step: Step }) => {
    step.once('show', () => {
      if (stopped) return;
      const style = step.getElement()?.style;
      style?.setProperty('--shepherd-step', `${tour.steps.indexOf(step) + 1}`);
      style?.setProperty('--shepherd-steps', `${tour.steps.length}`);
    });
  };

  tour.on('show', onShow);
  return () => {
    stopped = true;
    tour.off('show', onShow);
  };
}
