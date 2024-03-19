import { type ComputePositionConfig } from '@floating-ui/dom';
import type { Step, StepOptions, StepOptionsAttachTo } from '../step';
/**
 * Determines options for the tooltip and initializes event listeners.
 *
 * @param step The step instance
 */
export declare function setupTooltip(step: Step): ComputePositionConfig;
/**
 * Merge tooltip options handling nested keys.
 *
 * @param tourOptions - The default tour options.
 * @param options - Step specific options.
 *
 * @return {floatingUIOptions: FloatingUIOptions}
 */
export declare function mergeTooltipConfig(tourOptions: StepOptions, options: StepOptions): {
    floatingUIOptions: object;
};
/**
 * Cleanup function called when the step is closed/destroyed.
 *
 * @param step
 */
export declare function destroyTooltip(step: Step): void;
/**
 * Gets the `Floating UI` options from a set of base `attachTo` options
 * @param attachToOptions
 * @param step The step instance
 * @private
 */
export declare function getFloatingUIOptions(attachToOptions: StepOptionsAttachTo, step: Step): ComputePositionConfig;
//# sourceMappingURL=floating-ui.d.ts.map