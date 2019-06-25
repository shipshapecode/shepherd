import isElement from 'lodash.iselement';
import { isFunction, isString, isUndefined } from './utils/type-check';
import { Evented } from './evented.js';
import { bindAdvance, bindButtonEvents, bindCancelLink, bindMethods } from './utils/bind.js';
import { createFromHTML, setupTooltip, parseAttachTo } from './utils/general.js';

// Polyfills
import 'element-matches';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

/**
 * Creates incremented ID for each newly created step
 *
 * @private
 * @return {Number} The unique id for the step
 */
const uniqueId = (function() {
  let id = 0;
  return function() {
    return ++id;
  };
})();

/**
 * A class representing steps to be added to a tour.
 * @extends {Evented}
 */
export class Step extends Evented {
  /**
   * Create a step
   * @param {Tour} tour The tour for the step
   * @param {Object} options The options for the step
   * @param {Object|string} options.attachTo What element the step should be attached to on the page.
   * It can either be a string of the form `[element] [on]` (where [element] is an element selector path):
   * ```js
   * const new Step(tour, {
   *   attachTo: '.some .selector-path left',
   *   ...moreOptions,
   * })'
   * ```
   * Or an object with those properties:
   * ```js
   * const new Step(tour, {
   *   attachTo: { element: '.some .selector-path', on: 'left' },
   *   ...moreOptions
   * })'
   * ```
   * If you use the object syntax, element can also be a DOM element. If you don’t specify an attachTo the
   * element will appear in the middle of the screen.
   * @param {HTMLElement|string} options.attachTo.element
   * @param {string} options.attachTo.on
   * @param {Object|string} options.advanceOn An action on the page which should advance shepherd to the next step.
   * It can be of the form `"selector event"`:
   * ```js
   * const new Step(tour, {
   *   advanceOn: '.some .selector-path click',
   *   ...moreOptions
   * })'
   * ```
   * ...or an object with those properties:
   * ```js
   * const new Step(tour, {
   *   advanceOn: { selector: '.some .selector-path', event: 'click' },
   *   ...moreOptions
   * })'
   * ```
   * `event` doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
   * You can also always manually advance the Tour by calling `myTour.next()`.
   * @param {function} options.beforeShowPromise A function that returns a promise.
   * When the promise resolves, the rest of the `show` code for the step will execute.
   * @param {Object[]} options.buttons An array of buttons to add to the step. These will be rendered in a
   * footer below the main body text.
   * @param {function} options.buttons.button.action A function executed when the button is clicked on
   * @param {string} options.buttons.button.classes Extra classes to apply to the `<a>`
   * @param {Object} options.buttons.button.events A hash of events to bind onto the button, for example
   * `{'mouseover': function(){}}`. Adding a `click` event to events when you already have an `action` specified is not supported.
   * You can use events to skip steps or navigate to specific steps, with something like:
   * ```js
   * events: {
   *   click: function() {
   *     return Shepherd.activeTour.show('some_step_name');
   *   }
   * }
   * ```
   * @param {string} options.buttons.button.text The HTML text of the button
   * @param {string} options.classes A string of extra classes to add to the step's content element.
   * @param {string} options.highlightClass An extra class to apply to the `attachTo` element when it is
   * highlighted (that is, when its step is active). You can then target that selector in your CSS.
   * @param {Object} options.tippyOptions Extra [options to pass to tippy.js]{@link https://atomiks.github.io/tippyjs/#all-options}
   * @param {boolean|Object} options.scrollTo Should the element be scrolled to when this step is shown? If true, uses the default `scrollIntoView`,
   * if an object, passes that object as the params to `scrollIntoView` i.e. `{behavior: 'smooth', block: 'center'}`
   * @param {function} options.scrollToHandler A function that lets you override the default scrollTo behavior and
   * define a custom action to do the scrolling, and possibly other logic.
   * @param {boolean} options.showCancelLink Should a cancel “✕” be shown in the header of the step?
   * @param {function} options.showOn A function that, when it returns `true`, will show the step.
   * If it returns false, the step will be skipped.
   * @param {string} options.text The text in the body of the step. It can be one of four types:
   * ```
   * - HTML string
   * - Array of HTML strings
   * - `HTMLElement` object
   * - `Function` to be executed when the step is built. It must return one of the three options above.
   * ```
   * @param {string} options.title The step's title. It becomes an `h3` at the top of the step.
   * @param {Object} options.when You can define `show`, `hide`, etc events inside `when`. For example:
   * ```js
   * when: {
   *   show: function() {
   *     window.scrollTo(0, 0);
   *   }
   * }
   * ```
   * @param {Number} options.modalOverlayOpeningPadding An amount of padding to add around the modal overlay opening
   * @return {Step} The newly created Step instance
   */
  constructor(tour, options) {
    super(tour, options);
    this.tour = tour;
    bindMethods.call(this, [
      '_show',
      'cancel',
      'complete',
      'destroy',
      'hide',
      'isOpen',
      'scrollTo',
      'setupElements',
      'show'
    ]);
    this.setOptions(options);
    this.bindAdvance = bindAdvance.bind(this);
    this.bindButtonEvents = bindButtonEvents.bind(this);
    this.bindCancelLink = bindCancelLink.bind(this);
    this.setupTooltip = setupTooltip.bind(this);
    this.parseAttachTo = parseAttachTo.bind(this);

    return this;
  }

  /**
   * Adds buttons to the step as passed into options
   *
   * @private
   * @param {HTMLElement} content The element for the step, to append the footer with buttons to
   */
  _addButtons(content) {
    if (Array.isArray(this.options.buttons) && this.options.buttons.length) {
      const footer = document.createElement('footer');

      footer.classList.add('shepherd-footer');

      this.options.buttons.map((cfg) => {
        const button = createFromHTML(
          `<button class="shepherd-button ${cfg.classes || ''}" tabindex="0">${cfg.text}</button>`
        );
        footer.appendChild(button);
        this.bindButtonEvents(cfg, button);
      });

      content.appendChild(footer);
    }
  }

  /**
   * Adds the "x" button to cancel the tour
   * @param {HTMLElement} element The step element
   * @param {HTMLElement} header The header element for the step
   * @private
   */
  _addCancelLink(element, header) {
    if (this.options.showCancelLink) {
      const link = createFromHTML('<a href class="shepherd-cancel-link"></a>');
      header.appendChild(link);

      element.classList.add('shepherd-has-cancel-link');
      this.bindCancelLink(link);
    }
  }

  /**
   * Adds text passed in as options
   *
   * @private
   * @param {HTMLElement} content The content to append the text to
   * @param {string} descriptionId The id to set on the shepherd-text element
   * for the parent element to use for aria-describedby
   */
  _addContent(content, descriptionId) {
    const text = createFromHTML(
      `<div class="shepherd-text"
       id="${descriptionId}"
       ></div>`
    );
    let paragraphs = this.options.text;

    if (isFunction(paragraphs)) {
      paragraphs = paragraphs.call(this, text);
    }

    if (paragraphs instanceof HTMLElement) {
      text.appendChild(paragraphs);
    } else {
      if (isString(paragraphs)) {
        paragraphs = [paragraphs];
      }

      paragraphs.map((paragraph) => {
        text.innerHTML += `<p>${paragraph}</p>`;
      });
    }

    content.appendChild(text);
  }

  /**
   * Setup keydown events to allow closing the modal with ESC
   *
   * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
   *
   * @param {HTMLElement} element The element for the tooltip
   * @private
   */
  _addKeyDownHandler(element) {
    const KEY_TAB = 9;
    const KEY_ESC = 27;
    const LEFT_ARROW = 37;
    const RIGHT_ARROW = 39;

    // Get all elements that are focusable
    const focusableElements = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    const [firstFocusableElement] = focusableElements;
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case KEY_TAB:
          if (focusableElements.length === 1) {
            e.preventDefault();
            break;
          }
          // Backward tab
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              e.preventDefault();
              lastFocusableElement.focus();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              e.preventDefault();
              firstFocusableElement.focus();
            }
          }
          break;
        case KEY_ESC:
          this.cancel();
          break;
        case LEFT_ARROW:
          this.tour.back();
          break;
        case RIGHT_ARROW:
          this.tour.next();
          break;
        default:
          break;
      }
    });
  }

  /**
   * Creates Shepherd element for step based on options
   *
   * @private
   * @return {HTMLElement} The DOM element for the step tooltip
   */
  _createTooltipContent() {
    const content = document.createElement('div');
    const classes = this.options.classes || '';
    const descriptionId = `${this.id}-description`;
    const labelId = `${this.id}-label`;
    const element = createFromHTML(
      `<div class="${classes}"
       data-shepherd-step-id="${this.id}"
       role="dialog"
       tabindex="0">`
    );
    const header = document.createElement('header');

    if (this.options.title) {
      const title = document.createElement('h3');
      title.classList.add('shepherd-title');
      title.innerHTML = `${this.options.title}`;
      title.id = labelId;
      element.setAttribute('aria-labeledby', labelId);
      header.appendChild(title);
      element.classList.add('shepherd-has-title');
    }

    content.classList.add('shepherd-content');
    header.classList.add('shepherd-header');
    element.appendChild(content);
    content.appendChild(header);

    if (!isUndefined(this.options.text)) {
      this._addContent(content, descriptionId);
      element.setAttribute('aria-describedby', descriptionId);
    }

    this._addButtons(content);
    this._addCancelLink(element, header);

    return element;
  }

  /**
   * Returns the tour for the step
   * @return {Tour} The tour instance
   */
  getTour() {
    return this.tour;
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
   * Remove the step, delete the step's element, and destroy the tippy instance for the step
   * Triggers `destroy` event
   */
  destroy() {
    if (this.tooltip) {
      this.tooltip.destroy();
      this.tooltip = null;
    }

    if (isElement(this.el) && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
      this.el = null;
    }

    if (this.target) {
      this._updateStepTargetOnHide();
    }

    this.trigger('destroy');
  }

  /**
   * Hide the step and destroy the tippy instance
   */
  hide() {
    this.tour.modal.hide();

    this.trigger('before-hide');

    document.body.removeAttribute('data-shepherd-step');

    if (this.target) {
      this._updateStepTargetOnHide();
    }

    if (this.tooltip) {
      this.tooltip.hide();
    }

    this.trigger('hide');
  }

  /**
   * Check if the step is open and visible
   * @return {boolean} True if the step is open and visible
   */
  isOpen() {
    return Boolean(
      this.tooltip &&
      this.tooltip.state &&
      this.tooltip.state.isVisible
    );
  }

  /**
   * Create the element and set up the tippy instance
   */
  setupElements() {
    if (!isUndefined(this.el)) {
      this.destroy();
    }

    this.el = this._createTooltipContent();

    if (this.options.advanceOn) {
      this.bindAdvance();
    }

    this.setupTooltip();
  }

  /**
   * If a custom scrollToHandler is defined, call that, otherwise do the generic
   * scrollIntoView call.
   *
   * @param {boolean|Object} scrollToOptions If true, uses the default `scrollIntoView`,
   * if an object, passes that object as the params to `scrollIntoView` i.e. `{ behavior: 'smooth', block: 'center' }`
   */
  scrollTo(scrollToOptions) {
    const { element } = this.parseAttachTo();

    if (isFunction(this.options.scrollToHandler)) {
      this.options.scrollToHandler(element);
    } else if (isElement(element)) {
      element.scrollIntoView(scrollToOptions);
    }
  }

  /**
   * Sets the options for the step, maps `when` to events, sets up buttons
   * @param {Object} options The options for the step
   */
  setOptions(options = {}) {
    this.options = options;
    const { when } = this.options;

    this.destroy();
    this.id = this.options.id || `step-${uniqueId()}`;

    if (when) {
      Object.entries(when).forEach(([event, handler]) => {
        this.on(event, handler, this);
      });
    }
  }

  /**
   * Wraps `_show` and ensures `beforeShowPromise` resolves before calling show
   * @return {*|Promise}
   */
  show() {
    if (isFunction(this.options.beforeShowPromise)) {
      const beforeShowPromise = this.options.beforeShowPromise();
      if (!isUndefined(beforeShowPromise)) {
        return beforeShowPromise.then(() => this._show());
      }
    }
    this._show();
  }

  /**
   * Triggers `before-show`, generates the tooltip DOM content,
   * sets up a tippy instance for the tooltip, then triggers `show`.
   * @private
   */
  _show() {
    this.tour.beforeShowStep(this);
    this.trigger('before-show');

    if (!this.el) {
      this.setupElements();
    }

    this.target.classList.add('shepherd-enabled', 'shepherd-target');

    document.body.setAttribute('data-shepherd-step', this.id);

    if (this.options.scrollTo) {
      setTimeout(() => {
        this.scrollTo(this.options.scrollTo);
      });
    }

    this.tooltip.show();
    this.trigger('show');

    this._addKeyDownHandler(this.el);
    this.el.focus();
  }

  /**
   * When a step is hidden, remove the highlightClass and 'shepherd-enabled'
   * and 'shepherd-target' classes
   * @private
   */
  _updateStepTargetOnHide() {
    if (this.options.highlightClass) {
      this.target.classList.remove(this.options.highlightClass);
    }

    this.target.classList.remove('shepherd-enabled', 'shepherd-target');
  }
}
