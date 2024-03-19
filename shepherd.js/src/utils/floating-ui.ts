import { deepmerge } from 'deepmerge-ts';
import { shouldCenterStep } from './general.ts';
import {
  autoUpdate,
  arrow,
  computePosition,
  flip,
  limitShift,
  shift,
  type ComputePositionConfig,
  type MiddlewareData,
  type Placement
} from '@floating-ui/dom';
import type { Step, StepOptions, StepOptionsAttachTo } from '../step.ts';
import { isHTMLElement } from './type-check.ts';

/**
 * Determines options for the tooltip and initializes event listeners.
 *
 * @param step The step instance
 */
export function setupTooltip(step: Step): ComputePositionConfig {
  if (step.cleanup) {
    step.cleanup();
  }

  const attachToOptions = step._getResolvedAttachToOptions();

  let target = attachToOptions.element as HTMLElement;
  const floatingUIOptions = getFloatingUIOptions(attachToOptions, step);
  const shouldCenter = shouldCenterStep(attachToOptions);

  if (shouldCenter) {
    target = document.body;
    // @ts-expect-error TODO: fix this type error when we type Svelte
    const content = step.shepherdElementComponent.getElement();
    content.classList.add('shepherd-centered');
  }

  step.cleanup = autoUpdate(target, step.el as HTMLElement, () => {
    // The element might have already been removed by the end of the tour.
    if (!step.el) {
      step.cleanup?.();
      return;
    }

    setPosition(target, step, floatingUIOptions, shouldCenter);
  });

  step.target = attachToOptions.element as HTMLElement;

  return floatingUIOptions;
}

/**
 * Merge tooltip options handling nested keys.
 *
 * @param tourOptions - The default tour options.
 * @param options - Step specific options.
 *
 * @return {floatingUIOptions: FloatingUIOptions}
 */
export function mergeTooltipConfig(
  tourOptions: StepOptions,
  options: StepOptions
) {
  return {
    floatingUIOptions: deepmerge(
      tourOptions.floatingUIOptions || {},
      options.floatingUIOptions || {}
    )
  };
}

/**
 * Cleanup function called when the step is closed/destroyed.
 *
 * @param step
 */
export function destroyTooltip(step: Step) {
  if (step.cleanup) {
    step.cleanup();
  }

  step.cleanup = null;
}

function setPosition(
  target: HTMLElement,
  step: Step,
  floatingUIOptions: ComputePositionConfig,
  shouldCenter: boolean
) {
  return (
    computePosition(target, step.el as HTMLElement, floatingUIOptions)
      .then(floatingUIposition(step, shouldCenter))
      // Wait before forcing focus.
      .then(
        (step: Step) =>
          new Promise<Step>((resolve) => {
            setTimeout(() => resolve(step), 300);
          })
      )
      // Replaces focusAfterRender modifier.
      .then((step: Step) => {
        if (step?.el) {
          step.el.focus({ preventScroll: true });
        }
      })
  );
}

function floatingUIposition(step: Step, shouldCenter: boolean) {
  return ({
    x,
    y,
    placement,
    middlewareData
  }: {
    x: number;
    y: number;
    placement: Placement;
    middlewareData: MiddlewareData;
  }) => {
    if (!step.el) {
      return step;
    }

    if (shouldCenter) {
      Object.assign(step.el.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      });
    } else {
      Object.assign(step.el.style, {
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`
      });
    }

    step.el.dataset['popperPlacement'] = placement;

    placeArrow(step.el, middlewareData);

    return step;
  };
}

function placeArrow(el: HTMLElement, middlewareData: MiddlewareData) {
  const arrowEl = el.querySelector('.shepherd-arrow');
  if (isHTMLElement(arrowEl) && middlewareData.arrow) {
    const { x: arrowX, y: arrowY } = middlewareData.arrow;
    Object.assign(arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : ''
    });
  }
}

/**
 * Gets the `Floating UI` options from a set of base `attachTo` options
 * @param attachToOptions
 * @param step The step instance
 * @private
 */
export function getFloatingUIOptions(
  attachToOptions: StepOptionsAttachTo,
  step: Step
): ComputePositionConfig {
  const options: ComputePositionConfig = {
    strategy: 'absolute'
  };

  options.middleware = [];

  const arrowEl = addArrow(step);

  const shouldCenter = shouldCenterStep(attachToOptions);

  if (!shouldCenter) {
    options.middleware.push(
      flip(),
      // Replicate PopperJS default behavior.
      shift({
        limiter: limitShift(),
        crossAxis: true
      })
    );

    if (arrowEl) {
      options.middleware.push(arrow({ element: arrowEl }));
    }

    options.placement = attachToOptions.on;
  }

  return deepmerge(step.options.floatingUIOptions || {}, options);
}

function addArrow(step: Step) {
  if (step.options.arrow && step.el) {
    return step.el.querySelector('.shepherd-arrow');
  }

  return false;
}
