import Evented from "./evented";
import Step from "./step";

declare namespace Tour {
    interface TourOptions {
        /**
         * Default options for Steps created through `addStep`
         */
        defaultStepOptions?: Step.StepOptions;

        /**
         * An array of Step instances to initialize the tour with
         */
        steps?: Step[];

        /**
         * An optional "name" for the tour. This will be appended to the the tour's
         * dynamically generated `id` property -- which is also set on the `body` element as the `data-shepherd-active-tour` attribute
         * whenever the tour becomes active.
         */
        tourName?: string;

        /**
         * Whether or not steps should be placed above a darkened
         * modal overlay. If true, the overlay will create an opening around the target element so that it
         * can remain interactive
         */
        useModalOverlay?: string | boolean;
    }
}

/**
 * Class representing the site tour
 * @extends {Evented}
 */
declare class Tour extends Evented {
    /**
     * @param options The options for the tour
     * @returns The newly created Tour instance
     */
    constructor(options?: Tour.TourOptions);//TODO superheri Note: Return on constructor is not possible in typescript. Could this be possible to make this the same for the constructor of the Step class?

    /**
     * Adds a new step to the tour
     * @param options An object containing step options or a Step instance
     * @return The newly added step
     */
    addStep(options: Step | Step.StepOptions): Step;

    /**
     * Go to the previous step in the tour
     */
    back(): void;

    /**
     * Calls done() triggering the 'cancel' event
     * If `confirmCancel` is true, will show a window.confirm before cancelling
     */
    cancel(): void;

    /**
     * Calls done() triggering the `complete` event
     */
    complete(): void;

    /**
     * Called whenever the tour is cancelled or completed, basically anytime we exit the tour
     * @param event The event name to trigger
     */
    done(event: string): void;

    /**
     * Gets the step from a given id
     * @param id The id of the step to retrieve
     * @return The step corresponding to the `id`
     */
    getById(id: number | string): Step;

    /**
     * Gets the current step
     * @returns {Step|null}
     */
    getCurrentStep(): Step | null;

    /**
     * Hide the current step
     */
    hide(): void;

    /**
     * Tells if the tour is active
     */
    isActive(): boolean;

    /**
     * Go to the next step in the tour
     * If we are at the end, call `complete`
     */
    next(): void;

    /**
     * Removes the step from the tour
     * @param name The id for the step to remove
     */
    removeStep(name: string): void;

    /**
     * Setup a new step object
     * @param stepOptions The object describing the options for the step
     * @param name The string or number to use as the `id` for the step
     * @return The step instance
     */
    setupStep(stepOptions: Step.StepOptions, name: string | number): Step;

    beforeShowStep(step: Step): void;

    /**
     * Show a specific step in the tour
     * @param key The key to look up the step by
     * @param forward True if we are going forward, false if backward
     */
    show(key?: number | string, forward?: boolean): void;

    /**
     * Start the tour
     */
    start(): void;
}

export default Tour;
