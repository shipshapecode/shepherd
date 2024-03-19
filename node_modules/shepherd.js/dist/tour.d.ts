import { Evented } from './evented';
import { Step, type StepOptions } from './step';
import DataRequest from './utils/datarequest';
import ShepherdModal from './components/shepherd-modal.svelte';
import type { NoOp } from './utils/general';
/**
 * The options for the tour
 */
export interface TourOptions {
    /**
     * If true, will issue a `window.confirm` before cancelling.
     * If it is a function(support Async Function), it will be called and wait for the return value,
     * and will only be cancelled if the value returned is true.
     */
    confirmCancel?: boolean | (() => boolean) | Promise<boolean> | (() => Promise<boolean>);
    /**
     * The message to display in the `window.confirm` dialog.
     */
    confirmCancelMessage?: string;
    /**
     * The prefix to add to the `shepherd-enabled` and `shepherd-target` class names as well as the `data-shepherd-step-id`.
     */
    classPrefix?: string;
    /**
     * Default options for Steps ({@link Step#constructor}), created through `addStep`.
     */
    defaultStepOptions?: StepOptions;
    /**
     * Exiting the tour with the escape key will be enabled unless this is explicitly
     * set to false.
     */
    exitOnEsc?: boolean;
    /**
     * Navigating the tour via left and right arrow keys will be enabled
     * unless this is explicitly set to false.
     */
    keyboardNavigation?: boolean;
    /**
     * An optional container element for the modal.
     * If not set, the modal will be appended to `document.body`.
     */
    modalContainer?: HTMLElement;
    /**
     * An optional container element for the steps.
     * If not set, the steps will be appended to `document.body`.
     */
    stepsContainer?: HTMLElement;
    /**
     * An array of step options objects or Step instances to initialize the tour with.
     */
    steps?: Array<StepOptions> | Array<Step>;
    /**
     * An optional "name" for the tour. This will be appended to the the tour's
     * dynamically generated `id` property.
     */
    tourName?: string;
    /**
     * Whether or not steps should be placed above a darkened
     * modal overlay. If true, the overlay will create an opening around the target element so that it
     * can remain interactive
     */
    useModalOverlay?: boolean;
}
export declare class ShepherdPro extends Evented {
    activeTour?: Tour | null;
    apiKey?: string;
    apiPath?: string;
    dataRequester?: DataRequest;
    Step: NoOp | Step;
    Tour: NoOp | Tour;
    init(apiKey?: string, apiPath?: string): void;
    createNewActor(): Promise<void>;
}
/**
 * Class representing the site tour
 * @extends {Evented}
 */
export declare class Tour extends Evented {
    dataRequester: DataRequest | undefined;
    trackedEvents: string[];
    private currentUserId;
    classPrefix: string;
    currentStep?: Step | null;
    focusedElBeforeOpen?: HTMLElement | null;
    id?: string;
    modal?: ShepherdModal;
    options: TourOptions;
    steps: Array<Step>;
    constructor(options?: TourOptions);
    /**
     * Adds a new step to the tour
     * @param options - An object containing step options or a Step instance
     * @param index - The optional index to insert the step at. If undefined, the step
     * is added to the end of the array.
     * @return The newly added step
     */
    addStep(options: StepOptions | Step, index?: number): Step | StepOptions;
    /**
     * Add multiple steps to the tour
     * @param steps - The steps to add to the tour
     */
    addSteps(steps?: Array<StepOptions> | Array<Step>): this;
    /**
     * Go to the previous step in the tour
     */
    back(): void;
    /**
     * Calls _done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     * If `confirmCancel` is a function, will call it and wait for the return value,
     * and only cancel when the value returned is true
     */
    cancel(): Promise<void>;
    /**
     * Calls _done() triggering the `complete` event
     */
    complete(): void;
    /**
     * Gets the step from a given id
     * @param id - The id of the step to retrieve
     * @return The step corresponding to the `id`
     */
    getById(id: number | string): Step | undefined;
    /**
     * Gets the current step
     */
    getCurrentStep(): Step | null | undefined;
    /**
     * Hide the current step
     */
    hide(): void;
    /**
     * Check if the tour is active
     */
    isActive(): boolean;
    /**
     * Go to the next step in the tour
     * If we are at the end, call `complete`
     */
    next(): void;
    /**
     * Removes the step from the tour
     * @param name - The id for the step to remove
     */
    removeStep(name: string): void;
    /**
     * Show a specific step in the tour
     * @param key - The key to look up the step by
     * @param forward - True if we are going forward, false if backward
     */
    show(key?: number | string, forward?: boolean): void;
    /**
     * Start the tour
     */
    start(): void;
    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param event The event name to trigger
     * @private
     */
    _done(event: string): void;
    /**
     * Make this tour "active"
     */
    _setupActiveTour(): void;
    /**
     * setupModal create the modal container and instance
     */
    setupModal(): void;
    /**
     * Called when `showOn` evaluates to false, to skip the step or complete the tour if it's the last step
     * @param step - The step to skip
     * @param forward - True if we are going forward, false if backward
     * @private
     */
    _skipStep(step: Step, forward: boolean): void;
    /**
     * Before showing, hide the current step and if the tour is not
     * already active, call `this._setupActiveTour`.
     * @private
     */
    _updateStateBeforeShow(): void;
    /**
     * Sets this.id to `${tourName}--${uuid}`
     * @private
     */
    _setTourID(): void;
}
declare const Shepherd: ShepherdPro;
export { Shepherd };
//# sourceMappingURL=tour.d.ts.map