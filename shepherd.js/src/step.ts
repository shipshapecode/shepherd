import { Evented } from './evented.ts';
import autoBind from './utils/auto-bind.ts';
import {
  isElement,
  isHTMLElement,
  isFunction,
  isString
} from './utils/type-check.ts';
import { bindAdvance } from './utils/bind.ts';
import {
  parseAttachTo,
  normalizePrefix,
  uuid,
  parseExtraHighlights
} from './utils/general.ts';
import {
  setupTooltip,
  destroyTooltip,
  mergeTooltipConfig
} from './utils/floating-ui.ts';
import {
  createShepherdElement,
  type ShepherdElementResult
} from './components/shepherd-element.ts';
import { type Tour } from './tour.ts';
import type { ComputePositionConfig } from './utils/position.ts';

/**
 * The body of a step. Strings render as HTML, so escape untrusted input.
 */
export type StepText =
  | string
  | ReadonlyArray<string>
  | HTMLElement
  | (() => string | ReadonlyArray<string> | HTMLElement);

/**
 * A string, or a function returning one when the step is built.
 */
export type StringOrStringFunction = string | (() => string);

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
   * Whether to display the arrow for the tooltip or not, or options for the arrow.
   */
  arrow?: boolean | StepOptionsArrow;

  /**
   * A function that returns a promise.
   * When the promise resolves, the rest of the `show` code for the step will execute.
   * Pass the function, not a promise: a promise starts its work when the tour is
   * defined, and is ignored.
   *
   * @example
   * ```js
   * beforeShowPromise: () => openSettingsPanel()
   * ```
   */
  beforeShowPromise?: () => Promise<unknown>;

  /**
   * An array of buttons to add to the step. These will be rendered in a
   * footer below the main body text. A step's `buttons` replace the ones from
   * `defaultStepOptions`; they are not merged.
   */
  buttons?: ReadonlyArray<StepOptionsButton>;

  /**
   * Should a cancel “✕” be shown in the header of the step?
   *
   * @example
   * ```js
   * cancelIcon: { enabled: true }
   * ```
   */
  cancelIcon?: StepOptionsCancelIcon;

  /**
   * A boolean, that when set to false, will set `pointer-events: none` on the target.
   *
   * The blocking is delivered by `shepherd.css` (via the `shepherd-target-click-disabled`
   * class), so it has no effect if you have opted out of Shepherd's stylesheet without
   * providing an equivalent rule.
   */
  canClickTarget?: boolean;

  /**
   * A string of extra classes to add to the step's content element.
   */
  classes?: string;

  /**
   * Arbitrary, JSON-serializable data to associate with the step. Shepherd
   * does not use this value internally; it is a place to store your own
   * metadata (for example analytics ids, or context produced by a tour
   * generator) and read it back from `step.options.data` in event handlers
   * and button actions.
   */
  data?: Record<string, unknown>;

  /**
   * An array of extra element selectors to highlight when the overlay is shown
   * The tooltip won't be fixed to these elements, but they will be highlighted
   * just like the `attachTo` element.
   * ```js
   * const step = new Step(tour, {
   *   extraHighlights: [ '.pricing', '#docs' ],
   *   ...moreOptions
   * });
   * ```
   */
  extraHighlights?: ReadonlyArray<string>;

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
   * The `aria-label` for the step's dialog, used to give the step an
   * accessible name when it has no visible `title`. A step with neither gets
   * no naming attribute at all, so its dialog has no accessible name and
   * screen readers announce it without one.
   * ```
   * - string
   * - `Function` to be executed when the step is built. It must return a string.
   * ```
   * Ignored when `title` is set: the title already supplies the accessible
   * name via `aria-labelledby`, which outranks `aria-label` in the accessible
   * name computation. In that case a function-valued `label` is not invoked
   * at all.
   *
   * An empty or whitespace-only value omits the attribute rather than
   * emitting an accessible name that assistive technology treats as empty.
   */
  label?: StringOrStringFunction;

  /**
   * An amount of padding to add around the modal overlay opening
   */
  modalOverlayOpeningPadding?: number;

  /**
   * An amount of border radius to add around the modal overlay opening
   */
  modalOverlayOpeningRadius?:
    | number
    | {
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
   * Extra positioning options, in the shape of Floating UI's
   * [computePosition config]{@link https://floating-ui.com/docs/computePosition}.
   * Shepherd positions steps itself and does not depend on `@floating-ui/dom`,
   * but middleware from your own install of it, such as `offset()`, runs as is.
   *
   * This includes `strategy`, the CSS `position` used for the step element,
   * which defaults to `'absolute'`. Centered steps are always `position: fixed`
   * and ignore `strategy` -- a step counts as centered when it has no
   * `attachTo` at all, or when its `attachTo` is missing either `element` or
   * `on`.
   */
  floatingUIOptions?: ComputePositionConfig;

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
   * When `true`, a step whose `attachTo.element` selector (or function
   * locator) does not resolve to an element in the DOM is skipped, advancing
   * to the next step (or the previous step when navigating backwards) instead
   * of being shown centered. If all remaining steps are skipped, the tour
   * completes (going forward) or cancels (going backward), mirroring the
   * `showOn` semantics. Can be set on `defaultStepOptions` to apply to every
   * step. Combine with `waitForElement` to give the element time to appear
   * before skipping. Steps without an `attachTo` element are never skipped,
   * since they are intentionally centered.
   *
   * Note that the target is looked up before the step's own `beforeShowPromise`
   * and `before-show` handlers run, so an element that those handlers create is
   * not visible to this check. Use `beforeShowPromise` on its own for targets
   * the step itself renders.
   */
  skipMissingElement?: boolean;

  /**
   * The text in the body of the step. Strings render as HTML, so escape
   * untrusted input. It can be one of four types:
   * ```
   * - HTML string
   * - Array of HTML strings
   * - `HTMLElement` object
   * - `Function` to be executed when the step is built. It must return one of the three options above.
   * ```
   */
  text?: StepText;

  /**
   * The step's title. It becomes an `h3` at the top of the step. Strings render
   * as HTML, so escape untrusted input.
   * ```
   * - HTML string
   * - `Function` to be executed when the step is built. It must return HTML string.
   * ```
   */
  title?: StringOrStringFunction;

  /**
   * The maximum amount of time, in milliseconds, to wait for the
   * `attachTo.element` to appear in the DOM before showing the step. The DOM
   * is watched with a `MutationObserver`, so the step attaches as soon as the
   * element appears. If the timeout expires, the step falls back to its default
   * behavior: skipped when `skipMissingElement` is `true`, otherwise shown
   * centered.
   *
   * The wait starts before the step's own `beforeShowPromise` and `before-show`
   * handlers run, so it cannot observe a target that those handlers create, and
   * a function locator is re-evaluated on each DOM change until it resolves.
   */
  waitForElement?: number;

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

/**
 * Where a step sits relative to its target. Other values, such as `'below'` or
 * `'bottom-left'`, are invalid. `-start` and `-end` align the step to an edge.
 */
export type PopperPlacement =
  | 'auto'
  | 'auto-start'
  | 'auto-end'
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end';

/**
 * Options for the arrow pointing at the target.
 */
export interface StepOptionsArrow {
  /**
   * The padding from the edge for the arrow.
   * Not used if this is not a -start or -end placement.
   */
  padding?: number;
}

/**
 * What a step attaches to.
 *
 * @example
 * ```js
 * attachTo: { element: '#save', on: 'bottom' }
 * ```
 */
export interface StepOptionsAttachTo {
  /**
   * A selector, an element, or a function returning either. A selector or
   * function is resolved each time the step shows. A selector that matches
   * nothing logs an error and centers the step; see `waitForElement` and
   * `skipMissingElement`.
   */
  element?:
    | HTMLElement
    | string
    | null
    | (() => HTMLElement | string | null | undefined);
  /**
   * Where the step sits relative to the element. Without it the element is
   * highlighted, and the step is centered with no arrow.
   */
  on?: PopperPlacement;
}

/**
 * A page event that moves the tour to the next step.
 *
 * @example
 * ```js
 * advanceOn: { selector: '#menu', event: 'click' }
 * ```
 */
export interface StepOptionsAdvanceOn {
  /**
   * The DOM event name, such as `click`.
   */
  event: string;
  /**
   * The selector of the element to listen on. It must exist when the step shows.
   */
  selector: string;
}

/**
 * The tour methods a button can run by name.
 */
export type StepButtonAction = 'back' | 'cancel' | 'complete' | 'next';

/**
 * A button in the footer of a step.
 */
export interface StepOptionsButton {
  /**
   * What the button does when clicked. Either the name of a tour method, which
   * keeps a tour definition plain JSON and works before the tour exists, or a
   * function.
   *
   * A function is bound to the tour, so `this.next()` works inside a `function`
   * or method. An arrow function does not get that binding, so `() => this.next()`
   * fails; use `() => tour.next()` there.
   *
   * @example
   * ```js
   * buttons: [
   *   { text: 'Back', action: 'back', secondary: true },
   *   { text: 'Next', action: 'next' },
   *   {
   *     text: 'Skip to pricing',
   *     action() {
   *       return this.show('pricing');
   *     }
   *   }
   * ]
   * ```
   */
  action?: StepButtonAction | ((this: Tour) => void);

  /**
   * Additional HTML attributes to apply to the button element.
   *
   * This is useful for adding data attributes for testing or analytics,
   * or other custom attributes that don't have dedicated properties.
   *
   * Note: These attributes are applied before Shepherd's core attributes,
   * so they cannot override critical properties like `type`, `onclick`,
   * `class`, `disabled`, `aria-label`, or `tabindex`. Use the dedicated
   * properties (`classes`, `disabled`, `label`, `action`) to control those.
   *
   * @example
   * ```js
   * {
   *   text: 'Next',
   *   action: tour.next,
   *   attrs: {
   *     'data-test': 'next-button',
   *     'data-analytics-id': 'tour-next',
   *     'title': 'Proceed to the next step'
   *   }
   * }
   * ```
   */
  attrs?: Record<string, string | number | boolean>;

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
  label?: StringOrStringFunction;

  /**
   * A boolean, that when true, adds a `shepherd-button-secondary` class to the button.
   */
  secondary?: boolean;

  /**
   * The HTML text of the button
   */
  text?: StringOrStringFunction;
}

/**
 * A map of event names to handlers for a button.
 */
export interface StepOptionsButtonEvent {
  [key: string]: () => void;
}

/**
 * The close "×" in the header of a step. It is off unless `enabled` is `true`.
 */
export interface StepOptionsCancelIcon {
  /**
   * Additional HTML attributes to apply to the cancel icon button element.
   *
   * This is useful for adding data attributes for testing or analytics,
   * or other custom attributes that don't have dedicated properties.
   *
   * Note: These attributes are applied before Shepherd's core attributes,
   * so they cannot override critical properties like `type`, `onclick`,
   * `class`, or `aria-label`. Use the dedicated `label` property to
   * control the aria-label.
   *
   * @example
   * ```js
   * cancelIcon: {
   *   enabled: true,
   *   label: 'Close Tour',
   *   attrs: {
   *     'data-test': 'close-tour-button',
   *     'data-analytics-id': 'tour-close'
   *   }
   * }
   * ```
   */
  attrs?: Record<string, string | number | boolean>;
  /**
   * Should a cancel "✕" be shown in the header of the step?
   */
  enabled?: boolean;
  /**
   * The label to add for `aria-label`
   */
  label?: string;
}

/**
 * Step event handlers by event name: `before-show`, `show`, `before-hide`,
 * `hide`, `cancel`, `complete` or `destroy`. Each is called with `this` set to
 * the step.
 */
export interface StepOptionsWhen {
  [key: string]: (this: Step) => void;
}

let stylesheetChecked = false;

/**
 * A class representing steps to be added to a tour.
 * @extends {Evented}
 */
export class Step extends Evented {
  /** @internal */
  _advanceOnCleanup?: (() => void) | null;
  /** @internal */
  _resolvedAttachTo: StepOptionsAttachTo | null;
  /** @internal */
  _resolvedExtraHighlightElements?: HTMLElement[];
  /** @internal */
  _originalTabIndex?: string | null;
  /** @internal */
  _showRequest: number;
  /**
   * The tour's `classPrefix`, ending in `-`.
   */
  classPrefix?: string;
  /**
   * Stops keeping the step positioned. Set while the step is rendered.
   */
  declare cleanup: Function | null;
  /**
   * The step's element. Prefer `getElement()`.
   */
  el?: HTMLElement | null;
  /**
   * The step's `id` option, or a generated one.
   */
  declare id: string;
  /**
   * The step's options, merged with the tour's `defaultStepOptions`.
   */
  declare options: StepOptions;
  /**
   * The step's rendered element and its teardown.
   */
  shepherdElementComponent?: ShepherdElementResult;
  /**
   * The element the step attached to. Prefer `getTarget()`.
   */
  target?: HTMLElement | null;
  /**
   * The tour the step belongs to.
   */
  tour: Tour;

  constructor(tour: Tour, options: StepOptions = {}) {
    super();

    this._showRequest = 0;

    this.tour = tour;
    this.classPrefix = normalizePrefix(tour.options?.classPrefix);

    /**
     * Resolved attachTo options. Due to lazy evaluation, we only resolve the options during `before-show` phase.
     * Do not use this directly, use the _getResolvedAttachToOptions method instead.
     * @type {StepOptionsAttachTo | null}
     * @private
     */
    this._resolvedAttachTo = null;

    autoBind(this);

    this._setOptions(options);
  }

  /**
   * Cancel the tour
   * Triggers the `cancel` event
   */
  cancel() {
    this.tour.cancel();
    this.trigger('cancel');
  }

  /**
   * Complete the tour
   * Triggers the `complete` event
   */
  complete() {
    this.tour.complete();
    this.trigger('complete');
  }

  /**
   * Remove the step, delete the step's element, and stop repositioning it.
   * Triggers `destroy` event
   */
  destroy() {
    this._teardownElements();
    this.trigger('destroy');
  }

  /**
   * Internal cleanup that tears down the tooltip, component, and DOM element
   * without emitting the public "destroy" event.
   * @internal
   */
  _teardownElements() {
    this._advanceOnCleanup?.();
    this._advanceOnCleanup = null;

    destroyTooltip(this);

    this.shepherdElementComponent?.cleanup();
    this.shepherdElementComponent = undefined;

    if (isHTMLElement(this.el)) {
      this.el.remove();
      this.el = null;
    }

    this._updateStepTargetOnHide();
  }

  /**
   * Returns the tour for the step
   * @return The tour instance
   */
  getTour() {
    return this.tour;
  }

  /**
   * Hide the step
   */
  hide() {
    this.tour.modal?.hide();

    this.trigger('before-hide');

    if (this.el) {
      this.el.hidden = true;
    }

    destroyTooltip(this);

    this._updateStepTargetOnHide();

    this.trigger('hide');
  }

  /**
   * Resolves attachTo options.
   * @returns {{}|{element, on}}
   * @internal
   */
  _resolveExtraHiglightElements() {
    this._resolvedExtraHighlightElements = parseExtraHighlights(this);
    return this._resolvedExtraHighlightElements;
  }

  /**
   * Resolves attachTo options.
   * @returns {{}|{element, on}}
   * @internal
   */
  _resolveAttachToOptions() {
    this._resolvedAttachTo = parseAttachTo(this);
    return this._resolvedAttachTo;
  }

  /**
   * A selector for resolved attachTo options.
   * @returns {{}|{element, on}}
   * @internal
   */
  _getResolvedAttachToOptions() {
    return this._resolvedAttachTo || this._resolveAttachToOptions();
  }

  /**
   * Check if the step is open and visible
   * @return True if the step is open and visible
   */
  isOpen() {
    return Boolean(this.el && !this.el.hidden);
  }

  /**
   * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show.
   * The step is not shown if the tour moved on or ended while it was pending.
   */
  show() {
    if (isFunction(this.options.beforeShowPromise)) {
      // Read before calling `beforeShowPromise`, since a newer `tour.show()` or
      // the tour ending while it is pending must keep this show from rendering.
      const generation = this.tour._showGeneration;
      // Direct `step.show()` calls don't change the tour's generation.
      const request = ++this._showRequest;

      return Promise.resolve(this.options.beforeShowPromise()).then(() => {
        if (
          generation === this.tour._showGeneration &&
          request === this._showRequest
        ) {
          this._show();
        }
      });
    }
    return Promise.resolve(this._show());
  }

  /**
   * Updates the options of the step.
   *
   * @param {StepOptions} options The options for the step
   */
  updateStepOptions(options: StepOptions) {
    Object.assign(this.options, options);

    // A hidden step picks up its new options the next time it is shown.
    if (this.shepherdElementComponent && this.isOpen()) {
      this._teardownElements();
      this._setupElements();
    }
  }

  /**
   * Returns the element for the step
   * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if it has been destroyed
   */
  getElement() {
    return this.el;
  }

  /**
   * Returns the target for the step
   * @return {HTMLElement|null|undefined} The element instance. undefined if it has never been shown, null if query string has not been found
   */
  getTarget() {
    return this.target;
  }

  /**
   * Remembers the target's tabindex attribute before modifying it. The step
   * only ever has one target, set just after this runs.
   * @param {Element} element The element whose tabIndex will be stored
   * @internal
   */
  _storeOriginalTabIndex(element: Element): void {
    this._originalTabIndex = element.getAttribute('tabindex');
  }

  /**
   * Puts back the target's tabindex attribute, removing it if it had none.
   * @internal
   */
  _restoreOriginalTabIndex(): void {
    if (isString(this._originalTabIndex)) {
      this.target?.setAttribute('tabindex', this._originalTabIndex);
    } else {
      this.target?.removeAttribute('tabindex');
    }
  }

  /**
   * Creates Shepherd element for step based on options
   *
   * @return {HTMLElement} The DOM element for the step tooltip
   * @internal
   */
  _createTooltipContent() {
    this.shepherdElementComponent = createShepherdElement({
      classPrefix: this.classPrefix,
      descriptionId: `${this.id}-description`,
      labelId: `${this.id}-label`,
      step: this
    });

    const { element } = this.shepherdElementComponent;
    const target = this.tour.options.stepsContainer || document.body;
    target.append(element);

    return element;
  }

  /**
   * If a custom scrollToHandler is defined, call that, otherwise do the generic
   * scrollIntoView call.
   *
   * @param {boolean | ScrollIntoViewOptions} scrollToOptions - If true, uses the default `scrollIntoView`,
   * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
   * @internal
   */
  _scrollTo(scrollToOptions: boolean | ScrollIntoViewOptions) {
    const { element } = this._getResolvedAttachToOptions();

    if (isFunction(this.options.scrollToHandler)) {
      this.options.scrollToHandler(element as HTMLElement);
    } else if (
      isElement(element) &&
      typeof element.scrollIntoView === 'function'
    ) {
      element.scrollIntoView(scrollToOptions);
    }
  }

  /**
   * _getClassOptions gets all possible classes for the step
   * @param {StepOptions} stepOptions The step specific options
   * @returns {string} unique string from array of classes
   * @internal
   */
  _getClassOptions(stepOptions: StepOptions) {
    const defaultClasses = this.tour.options?.defaultStepOptions?.classes || '';
    const allClasses = `${stepOptions.classes || ''} ${defaultClasses}`;

    return [...new Set(allClasses.split(' '))].join(' ').trim();
  }

  /**
   * Sets the options for the step, maps `when` to events, sets up buttons
   * @param options - The options for the step
   * @internal
   */
  _setOptions(options: StepOptions = {}) {
    const tourOptions = this.tour.options?.defaultStepOptions || {};

    this.options = {
      arrow: true,
      ...tourOptions,
      ...options,
      ...mergeTooltipConfig(tourOptions, options)
    };

    this.options.classes = this._getClassOptions(options);

    this.id = this.options.id || `step-${uuid()}`;

    for (const [event, handler] of Object.entries(this.options.when || {})) {
      this.on(event, handler, this);
    }
  }

  /**
   * Create the element and start positioning it
   *
   * The element is recreated on every show, so any previously mounted element is
   * torn down first. That teardown is internal — it must not emit the public
   * `destroy` event, which means "this step is gone for good".
   * @internal
   */
  _setupElements() {
    if (isHTMLElement(this.el)) {
      this._teardownElements();
    }

    this.el = this._createTooltipContent();

    if (!stylesheetChecked) {
      stylesheetChecked = true;
      if (getComputedStyle(this.el).zIndex === 'auto') {
        console.warn(
          "Shepherd: stylesheet not found. Add import 'shepherd.js/dist/css/shepherd.css'."
        );
      }
    }

    if (this.options.advanceOn) {
      this._advanceOnCleanup = bindAdvance(this) ?? null;
    }

    // The tooltip implementation details are handled outside of the Step
    // object.
    setupTooltip(this);
  }

  /**
   * Triggers `before-show`, generates the tooltip DOM content,
   * starts positioning the tooltip, then triggers `show`.
   * @internal
   */
  _show() {
    this.trigger('before-show');

    // Force resolve to make sure the options are updated on subsequent shows.
    this._resolveAttachToOptions();
    this._resolveExtraHiglightElements();
    this._setupElements();

    if (!this.tour.modal) {
      this.tour.setupModal();
    }

    this.tour.modal?.setupForStep(this);

    this.el!.hidden = false;

    // start scrolling to target before showing the step
    if (this.options.scrollTo) {
      setTimeout(() => {
        this._scrollTo(
          this.options.scrollTo as boolean | ScrollIntoViewOptions
        );
      });
    }

    this.el!.classList.add('shepherd-enabled');

    const { highlightClass, canClickTarget } = this.options;

    for (const { classList } of this._highlightedElements()) {
      classList.add(
        `${this.classPrefix}shepherd-enabled`,
        `${this.classPrefix}shepherd-target`
      );

      if (this.target) {
        if (highlightClass) {
          classList.add(highlightClass);
        }

        classList.toggle(
          'shepherd-target-click-disabled',
          canClickTarget === false
        );
      }
    }

    this.trigger('show');
  }

  /**
   * The elements a showing step marks, which is `body` for a step without a target.
   * @internal
   */
  _highlightedElements() {
    return [
      this.target || document.body,
      ...(this._resolvedExtraHighlightElements || [])
    ];
  }

  /**
   * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
   * and 'shepherd-target' classes
   * @internal
   */
  _updateStepTargetOnHide() {
    const { highlightClass } = this.options;

    for (const { classList } of this._highlightedElements()) {
      if (highlightClass) {
        classList.remove(highlightClass);
      }

      classList.remove(
        'shepherd-target-click-disabled',
        `${this.classPrefix}shepherd-enabled`,
        `${this.classPrefix}shepherd-target`
      );
    }

    this._restoreOriginalTabIndex();
  }
}
