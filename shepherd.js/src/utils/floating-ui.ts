import { deepmerge } from 'deepmerge-ts';
import { shouldCenterStep } from './general.ts';
import {
  autoUpdate,
  arrow,
  computePosition,
  flip,
  autoPlacement,
  limitShift,
  shift,
  type ComputePositionConfig,
  type Middleware,
  type MiddlewareData,
  type Placement,
  type Alignment,
  type Strategy
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
    const content = step.shepherdElementComponent?.element;
    content?.classList.add('shepherd-centered');
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
): { floatingUIOptions: ComputePositionConfig } {
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
          step.el.tabIndex = 0;
          step.el.focus({ preventScroll: true });
        }
      })
  );
}

function floatingUIposition(step: Step, shouldCenter: boolean) {
  return ({
    x,
    y,
    strategy,
    placement,
    middlewareData
  }: {
    x: number;
    y: number;
    strategy: Strategy;
    placement: Placement;
    middlewareData: MiddlewareData;
  }) => {
    if (!step.el) {
      return step;
    }

    if (shouldCenter) {
      // `position: fixed` is intentional here and must NOT follow `strategy`.
      // Centering relies on `left`/`top: 50%` plus a `translate(-50%, -50%)`,
      // and those percentages have to resolve against the viewport. Under the
      // default `absolute` strategy they would resolve against the document
      // instead, placing the step at 50% of the *page* height so it scrolls
      // off screen. A step centers when it has no `attachTo`, or when its
      // `attachTo` is missing either `element` or `on` (see `shouldCenterStep`);
      // all of those are modal dialogs, so viewport centering is the correct
      // behavior regardless of `strategy`.
      Object.assign(step.el.style, {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
      });
    } else {
      Object.assign(step.el.style, {
        position: strategy,
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

  const hasAutoPlacement = attachToOptions.on?.includes('auto');

  const hasEdgeAlignment =
    attachToOptions?.on?.includes('-start') ||
    attachToOptions?.on?.includes('-end');

  if (!shouldCenter) {
    if (hasAutoPlacement) {
      options.middleware.push(
        autoPlacement({
          crossAxis: true,
          alignment: hasEdgeAlignment
            ? (attachToOptions?.on?.split('-').pop() as Alignment)
            : null
        })
      );
    } else {
      options.middleware.push(flip());
    }

    options.middleware.push(
      // Replicate PopperJS default behavior.
      shift({
        limiter: limitShift(),
        crossAxis: true
      })
    );

    if (!hasAutoPlacement) options.placement = attachToOptions.on as Placement;
  }

  const mergedOptions: ComputePositionConfig = deepmerge(
    options,
    step.options.floatingUIOptions || {}
  );

  // `arrow()` has to be the *last* middleware to run. `Floating UI` executes
  // middleware sequentially, threading `x`/`y` from one to the next, and
  // `arrow()` computes its offset from the coordinates as they stand on its own
  // turn. Any middleware that runs after it (a user supplied `offset()`,
  // `shift()`, etc.) moves the tooltip again and silently invalidates
  // `middlewareData.arrow`, which `placeArrow()` writes straight to the DOM.
  // Since user options are merged in above -- and `deepmerge` concatenates
  // arrays -- Shepherd's arrow is appended afterwards rather than pushed in
  // before the merge.
  if (
    !shouldCenter &&
    arrowEl &&
    !hasArrowMiddleware(mergedOptions.middleware)
  ) {
    const arrowOptions =
      typeof step.options.arrow === 'object'
        ? step.options.arrow
        : { padding: 4 };

    mergedOptions.middleware = [
      ...(mergedOptions.middleware ?? []),
      arrow({
        element: arrowEl,
        padding: hasEdgeAlignment ? arrowOptions.padding : 0
      })
    ];
  }

  return mergedOptions;
}

/**
 * Type guard filtering out the falsy entries `Floating UI` allows in a
 * middleware array.
 *
 * @param middleware A single entry of a `middleware` array
 * @private
 */
function isMiddleware(
  middleware: Middleware | false | null | undefined
): middleware is Middleware {
  return Boolean(middleware);
}

/**
 * Determines whether a middleware array already contains an `arrow` middleware,
 * in which case the user's own arrow wins and Shepherd does not add its own.
 *
 * @param middleware The merged `middleware` array, which may contain falsy entries
 * @private
 */
function hasArrowMiddleware(middleware: ComputePositionConfig['middleware']) {
  return Boolean(
    middleware?.some((item) => isMiddleware(item) && item.name === 'arrow')
  );
}

function addArrow(step: Step) {
  if (step.options.arrow && step.el) {
    return step.el.querySelector('.shepherd-arrow');
  }

  return false;
}
