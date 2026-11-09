import { shouldCenterStep } from './general.ts';
import {
  autoUpdate,
  arrow,
  computePosition,
  flip,
  autoPlacement,
  offset,
  shift,
  type ComputePositionResult,
  type Middleware,
  type PositionConfig,
  type Placement,
  type Alignment
} from './position.ts';
import type { Step, StepOptionsAttachTo } from '../step.ts';
import { isHTMLElement } from './type-check.ts';

/**
 * Determines options for the tooltip and initializes event listeners.
 *
 * @param step The step instance
 */
export function setupTooltip(step: Step): PositionConfig {
  if (step.cleanup) {
    step.cleanup();
  }

  const attachToOptions = step._getResolvedAttachToOptions();

  let target = attachToOptions.element as HTMLElement;
  const config = getPositionConfig(attachToOptions, step);
  const shouldCenter = shouldCenterStep(attachToOptions);
  // Keep this function-local so every fresh step render gets one focus attempt.
  let shouldFocusAfterRender = true;

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

    setPosition(target, step, config, shouldCenter, {
      shouldFocusAfterRender
    });
    shouldFocusAfterRender = false;
  });

  step.target = attachToOptions.element as HTMLElement;

  return config;
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
  config: PositionConfig,
  shouldCenter: boolean,
  { shouldFocusAfterRender }: { shouldFocusAfterRender: boolean }
) {
  try {
    // Measured against the offset parent it will have once written.
    if (!shouldCenter && step.el) step.el.style.position = config.strategy;
    writePosition(
      step,
      shouldCenter,
      computePosition(target, step.el as HTMLElement, config)
    );
  } catch (error) {
    console.error('Shepherd: could not position a step.', error);
  }

  if (shouldFocusAfterRender) {
    // Focusing flushes layout, which the next frame does anyway. jsdom only has
    // frames when asked to.
    (window.requestAnimationFrame || setTimeout)(() => {
      if (step.el) {
        step.el.tabIndex = 0;
        step.el.focus({ preventScroll: true });
      }
    });
  }
}

function writePosition(
  step: Step,
  shouldCenter: boolean,
  { x, y, strategy, placement, middlewareData }: ComputePositionResult
) {
  const el = step.el as HTMLElement;
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
    Object.assign(el.style, {
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
    });
  } else {
    Object.assign(el.style, {
      position: strategy,
      left: `${x}px`,
      top: `${y}px`
    });
  }

  el.dataset['popperPlacement'] = placement;

  placeArrow(el, middlewareData);
}

function placeArrow(
  el: HTMLElement,
  middlewareData: ComputePositionResult['middlewareData']
) {
  const arrowEl = el.querySelector('.shepherd-arrow');
  if (isHTMLElement(arrowEl) && middlewareData['arrow']) {
    const { x: arrowX, y: arrowY } = middlewareData['arrow'];
    Object.assign(arrowEl.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : ''
    });
  }
}

/**
 * Builds the positioning config for a step from its `attachTo` and
 * `positionOptions`.
 *
 * @param attachToOptions The step's resolved `attachTo`
 * @param step The step instance
 * @private
 */
export function getPositionConfig(
  attachToOptions: StepOptionsAttachTo,
  step: Step
): PositionConfig {
  const {
    offset: gap,
    padding,
    strategy = 'absolute',
    flip: flips = true
  } = step.options.positionOptions || {};
  const on = attachToOptions.on || '';
  const hasAutoPlacement = on.includes('auto');
  const middleware: Middleware[] = [];
  const config: PositionConfig = {
    placement: on && !hasAutoPlacement ? (on as Placement) : 'bottom',
    strategy,
    middleware
  };

  if (shouldCenterStep(attachToOptions)) return config;

  const alignment = on.split('-')[1] as Alignment | undefined;
  if (gap) middleware.push(offset(gap));
  if (hasAutoPlacement) middleware.push(autoPlacement(alignment, padding));
  else if (flips) middleware.push(flip(padding));
  middleware.push(shift(padding));

  const arrowEl =
    step.options.arrow && step.el?.querySelector('.shepherd-arrow');
  if (arrowEl) {
    const arrowPadding =
      typeof step.options.arrow === 'object' ? step.options.arrow.padding : 4;
    middleware.push(arrow(arrowEl, alignment ? arrowPadding : 0));
  }

  return config;
}
