import { Evented } from './evented';
import { type Tour } from './tour';
/**
 * The options for the step
 */
export interface StepOptions {
    /**
     * The element the step should be attached to on the page.
     * An object with properties `element` and `on`.
     *
     * ```js
     * const step = new Step(tour, {
     *   attachTo: { element: '.some .selector-path', on: 'left' },
     *   ...moreOptions
     * });
     * ```
     *
     * If you don’t specify an attachTo the element will appear in the middle of the screen.
     * If you omit the `on` portion of `attachTo`, the element will still be highlighted, but the tooltip will appear
     * in the middle of the screen, without an arrow pointing to the target.
     */
    attachTo?: StepOptionsAttachTo;
    /**
     * An action on the page which should advance shepherd to the next step.
     * It should be an object with a string `selector` and an `event` name
     * ```js
     * const step = new Step(tour, {
     *   advanceOn: { selector: '.some .selector-path', event: 'click' },
     *   ...moreOptions
     * });
     * ```
     * `event` doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
     * You can also always manually advance the Tour by calling `myTour.next()`.
     */
    advanceOn?: StepOptionsAdvanceOn;
    /**
     * Whether to display the arrow for the tooltip or not
     */
    arrow?: boolean;
    /**
     * A function that returns a promise.
     * When the promise resolves, the rest of the `show` code for the step will execute.
     */
    beforeShowPromise?: () => Promise<any>;
    /**
     * An array of buttons to add to the step. These will be rendered in a
     * footer below the main body text.
     */
    buttons?: ReadonlyArray<StepOptionsButton>;
    /**
     * Should a cancel “✕” be shown in the header of the step?
     */
    cancelIcon?: StepOptionsCancelIcon;
    /**
     * A boolean, that when set to false, will set `pointer-events: none` on the target.
     */
    canClickTarget?: boolean;
    /**
     * A string of extra classes to add to the step's content element.
     */
    classes?: string;
    /**
     * An extra class to apply to the `attachTo` element when it is
     * highlighted (that is, when its step is active). You can then target that selector in your CSS.
     */
    highlightClass?: string;
    /**
     * The string to use as the `id` for the step.
     */
    id?: string;
    /**
     * An amount of padding to add around the modal overlay opening
     */
    modalOverlayOpeningPadding?: number;
    /**
     * An amount of border radius to add around the modal overlay opening
     */
    modalOverlayOpeningRadius?: number | {
        topLeft?: number;
        bottomLeft?: number;
        bottomRight?: number;
        topRight?: number;
    };
    /**
     * An amount to offset the modal overlay opening in the x-direction
     */
    modalOverlayOpeningXOffset?: number;
    /**
     * An amount to offset the modal overlay opening in the y-direction
     */
    modalOverlayOpeningYOffset?: number;
    /**
     * Extra [options to pass to FloatingUI]{@link https://floating-ui.com/docs/tutorial/}
     */
    floatingUIOptions?: object;
    /**
     * Should the element be scrolled to when this step is shown?
     */
    scrollTo?: boolean | ScrollIntoViewOptions;
    /**
     * A function that lets you override the default scrollTo behavior and
     * define a custom action to do the scrolling, and possibly other logic.
     */
    scrollToHandler?: (element: HTMLElement) => void;
    /**
     * A function that, when it returns `true`, will show the step.
     * If it returns `false`, the step will be skipped.
     */
    showOn?: () => boolean;
    /**
     * The text in the body of the step. It can be one of four types:
     * ```
     * - HTML string
     * - Array of HTML strings
     * - `HTMLElement` object
     * - `Function` to be executed when the step is built. It must return one of the three options above.
     * ```
     */
    text?: string | ReadonlyArray<string> | HTMLElement | (() => string | ReadonlyArray<string> | HTMLElement);
    /**
     * The step's title. It becomes an `h3` at the top of the step.
     * ```
     * - HTML string
     * - `Function` to be executed when the step is built. It must return HTML string.
     * ```
     */
    title?: string | (() => string);
    /**
     * You can define `show`, `hide`, etc events inside `when`. For example:
     * ```js
     * when: {
     *   show: function() {
     *     window.scrollTo(0, 0);
     *   }
     * }
     * ```
     */
    when?: StepOptionsWhen;
}
type PopperPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
export interface StepOptionsAttachTo {
    element?: HTMLElement | string | null | (() => HTMLElement | string | null | undefined);
    on?: PopperPlacement;
}
export interface StepOptionsAdvanceOn {
    event: string;
    selector: string;
}
export interface StepOptionsButton {
    /**
     * A function executed when the button is clicked on
     * It is automatically bound to the `tour` the step is associated with, so things like `this.next` will
     * work inside the action.
     * You can use action to skip steps or navigate to specific steps, with something like:
     * ```js
     * action() {
     *   return this.show('some_step_name');
     * }
     * ```
     */
    action?: (this: Tour) => void;
    /**
     * Extra classes to apply to the `<a>`
     */
    classes?: string;
    /**
     * Whether the button should be disabled
     * When the value is `true`, or the function returns `true` the button will be disabled
     */
    disabled?: boolean | (() => boolean);
    /**
     * The aria-label text of the button
     */
    label?: string | (() => string);
    /**
     * A boolean, that when true, adds a `shepherd-button-secondary` class to the button.
     */
    secondary?: boolean;
    /**
     * The HTML text of the button
     */
    text?: string | (() => string);
}
export interface StepOptionsButtonEvent {
    [key: string]: () => void;
}
export interface StepOptionsCancelIcon {
    enabled?: boolean;
    label?: string;
}
export interface StepOptionsWhen {
    [key: string]: (this: Step) => void;
}
/**
 * A class representing steps to be added to a tour.
 * @extends {Evented}
 */
export declare class Step extends Evented {
    _resolvedAttachTo: StepOptionsAttachTo | null;
    classPrefix?: string;
    cleanup: Function | null;
    el?: HTMLElement | null;
    id: string;
    options: StepOptions;
    target?: HTMLElement | null;
    tour: Tour;
    constructor(tour: Tour, options?: StepOptions);
    /**
     * Cancel the tour
     * Triggers the `cancel` event
     */
    cancel(): void;
    /**
     * Complete the tour
     * Triggers the `complete` event
     */
    complete(): void;
    /**
     * Remove the step, delete the step's element, and destroy the FloatingUI instance for the step.
     * Triggers `destroy` event
     */
    destroy(): void;
    /**
     * Returns the tour for the step
     * @return The tour instance
     */
    getTour(): Tour;
    /**
     * Hide the step
     */
    hide(): void;
    /**
     * Resolves attachTo options.
     * @returns {{}|{element, on}}
     */
    _resolveAttachToOptions(): StepOptionsAttachTo;
    /**
     * A selector for resolved attachTo options.
     * @returns {{}|{element, on}}
     * @private
     */
    _getResolvedAttachToOptions(): StepOptionsAttachTo;
    /**
     * Check if the step is open and visible
     * @return True if the step is open and visible
     */
    isOpen(): boolean;
    /**
     * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
     */
    show(): Promise<void>;
    /**
     * Updates the options of the step.
     *
     * @param options The options for the step
     */
    updateStepOptions(options: StepOptions): void;
    /**
     * Returns the element for the step
     * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if it has been destroyed
     */
    getElement(): HTMLElement | null | undefined;
    /**
     * Returns the target for the step
     * @return The element instance. undefined if it has never been shown, null if query string has not been found
     */
    getTarget(): HTMLElement | null | undefined;
    /**
     * Creates Shepherd element for step based on options
     *
     * @return {Element} The DOM element for the step tooltip
     * @private
     */
    _createTooltipContent(): any;
    /**
     * If a custom scrollToHandler is defined, call that, otherwise do the generic
     * scrollIntoView call.
     *
     * @param scrollToOptions - If true, uses the default `scrollIntoView`,
     * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
     * @private
     */
    _scrollTo(scrollToOptions: boolean | ScrollIntoViewOptions): void;
    /**
     * _getClassOptions gets all possible classes for the step
     * @param stepOptions The step specific options
     * @returns unique string from array of classes
     */
    _getClassOptions(stepOptions: StepOptions): string;
    /**
     * Sets the options for the step, maps `when` to events, sets up buttons
     * @param options - The options for the step
     */
    _setOptions(options?: StepOptions): void;
    /**
     * Create the element and set up the FloatingUI instance
     * @private
     */
    _setupElements(): void;
    /**
     * Triggers `before-show`, generates the tooltip DOM content,
     * sets up a FloatingUI instance for the tooltip, then triggers `show`.
     * @private
     */
    _show(): void;
    /**
     * Modulates the styles of the passed step's target element, based on the step's options and
     * the tour's `modal` option, to visually emphasize the element
     *
     * @param step The step object that attaches to the element
     * @private
     */
    _styleTargetElementForStep(step: Step): void;
    /**
     * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
     * and 'shepherd-target' classes
     * @private
     */
    _updateStepTargetOnHide(): void;
}
export {};
//# sourceMappingURL=step.d.ts.map