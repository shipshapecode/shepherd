import { deepmerge } from 'deepmerge-ts';
import { 
  setupAnchorTooltip, 
  destroyAnchorTooltip,
  type AnchorPositionConfig 
} from './anchor-positioning.ts';
import type { Step, StepOptions, StepOptionsAttachTo } from '../step.ts';

/**
 * Determines options for the tooltip and initializes positioning using CSS Anchor API.
 *
 * @param step The step instance
 */
export function setupTooltip(step: Step): AnchorPositionConfig {
  return setupAnchorTooltip(step);
}

/**
 * Merge tooltip options handling nested keys.
 *
 * @param tourOptions - The default tour options.
 * @param options - Step specific options.
 *
 * @return {anchorOptions: AnchorPositionConfig}
 */
export function mergeTooltipConfig(
  tourOptions: StepOptions,
  options: StepOptions
): { anchorOptions: AnchorPositionConfig } {
  // For CSS Anchor API, we mainly need to merge placement and arrow options
  const mergedOptions = deepmerge(tourOptions || {}, options || {});
  
  // Extract anchor-relevant options
  const attachToOptions = options.attachTo || tourOptions.attachTo;
  const placement = attachToOptions?.on || 'bottom';
  const arrow = mergedOptions.arrow || false;
  
  return {
    anchorOptions: {
      placement: placement as any,
      offset: 8,
      arrow
    }
  };
}

/**
 * Cleanup function called when the step is closed/destroyed.
 *
 * @param step
 */
export function destroyTooltip(step: Step) {
  destroyAnchorTooltip(step);
}

// Legacy compatibility - these functions are no longer needed with CSS Anchor API
// but we keep them for API compatibility during transition

/**
 * Gets the anchor position options from a set of base `attachTo` options
 * @param attachToOptions
 * @param step The step instance
 * @private
 */
export function getAnchorOptions(
  attachToOptions: StepOptionsAttachTo,
  step: Step
): AnchorPositionConfig {
  const placement = attachToOptions.on || 'bottom';
  
  return {
    placement: placement as any,
    offset: 8,
    arrow: step.options.arrow || false
  };
}

// Legacy alias for backwards compatibility
export const getFloatingUIOptions = getAnchorOptions;