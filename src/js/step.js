import forOwn from 'lodash-es/forOwn';
import isElement from 'lodash-es/isElement';
import isEmpty from 'lodash-es/isEmpty';
import isFunction from 'lodash-es/isFunction';
import isString from 'lodash-es/isString';
import isUndefined from 'lodash-es/isUndefined';
import { Evented } from './evented.js';
import 'element-matches';
import { bindAdvance, bindButtonEvents, bindCancelLink, bindMethods } from './bind.js';
import { createFromHTML, setupTooltip, parseAttachTo } from './utils.js';

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
 * Class representing steps to be added to a tour
 * @extends {Evented}
 */
export class Step extends Evented {
  /**
   * Create a step
   * @param {Tour} tour The tour for the step
   * @param {Object} options The options for the step
   * @param {Object|string} options.attachTo What element the step should be attached to on the page.
   * It can either be a string of the form "element on", or an object with those properties.
   * For example: ".some #element left", or {element: '.some #element', on: 'left'}.
   * If you use the object syntax, element can also be a DOM element. If you don’t specify an attachTo the
   * element will appear in the middle of the screen.
   * @param {HTMLElement|string} options.attachTo.element
   * @param {string} options.attachTo.on
   * @param {Object|string} options.advanceOn An action on the page which should advance shepherd to the next step.
   * It can be of the form `"selector event"`, or an object with those properties.
   * For example: `".some-element click"`, or `{selector: '.some-element', event: 'click'}`.
   * It doesn’t have to be an event inside the tour, it can be any event fired on any element on the page.
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
   * @param {boolean} options.scrollTo Should the element be scrolled to when this step is shown?
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
    if (!isEmpty(this.options.buttons)) {
      const footer = document.createElement('footer');
      const buttons = createFromHTML('<ul class="shepherd-buttons"></ul>');

      footer.classList.add('shepherd-footer');

      this.options.buttons.map((cfg) => {
        const button = createFromHTML(`<li><a class="shepherd-button ${cfg.classes || ''}" tabindex="0">${cfg.text}</a>`);
        buttons.appendChild(button);
        this.bindButtonEvents(cfg, button.querySelector('a'));
      });

      footer.appendChild(buttons);
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
   */
  _addContent(content) {
    const text = createFromHTML('<div class="shepherd-text"></div>');
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
   * Creates Shepherd element for step based on options
   *
   * @private
   * @return {HTMLElement} The DOM element for the step tooltip
   */
  _createTooltipContent() {
    const content = document.createElement('div');
    const classes = this.options.classes || '';
    const element = createFromHTML(`<div class="${classes}" data-shepherd-step-id="${this.id}">`);
    const header = document.createElement('header');

    if (this.options.title) {
      const title = document.createElement('h3');
      title.classList.add('shepherd-title');
      title.innerHTML = `${this.options.title}`;
      header.appendChild(title);
      element.classList.add('shepherd-has-title');
    }

    content.classList.add('shepherd-content');
    header.classList.add('shepherd-header');
    element.appendChild(content);
    content.appendChild(header);

    if (!isUndefined(this.options.text)) {
      this._addContent(content);
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
   */
  scrollTo() {
    const { element } = this.parseAttachTo();

    if (isFunction(this.options.scrollToHandler)) {
      this.options.scrollToHandler(element);
    } else if (isElement(element)) {
      element.scrollIntoView();
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

    forOwn(when, (handler, event) => {
      this.on(event, handler, this);
    });
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
        this.scrollTo();
      });
    }

    this.tooltip.show();
    this.trigger('show');
  }

  _updateStepTargetOnHide() {
    if (this.options.highlightClass) {
      this.target.classList.remove(this.options.highlightClass);
    }

    this.target.classList.remove('shepherd-enabled', 'shepherd-target');
  }
}
