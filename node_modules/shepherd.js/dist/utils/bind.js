/*! shepherd.js 12.0.0-alpha.3 */

import { isUndefined } from './type-check.js';

/**
 * Sets up the handler to determine if we should advance the tour
 * @param step The step instance
 * @param selector
 * @private
 */
function _setupAdvanceOnHandler(step, selector) {
    return (event) => {
        if (step.isOpen()) {
            const targetIsEl = step.el && event.currentTarget === step.el;
            const targetIsSelector = !isUndefined(selector) &&
                event.currentTarget.matches(selector);
            if (targetIsSelector || targetIsEl) {
                step.tour.next();
            }
        }
    };
}
/**
 * Bind the event handler for advanceOn
 * @param step The step instance
 */
function bindAdvance(step) {
    // An empty selector matches the step element
    const { event, selector } = step.options.advanceOn || {};
    if (event) {
        const handler = _setupAdvanceOnHandler(step, selector);
        // TODO: this should also bind/unbind on show/hide
        let el = null;
        if (!isUndefined(selector)) {
            el = document.querySelector(selector);
            if (!el) {
                return console.error(`No element was found for the selector supplied to advanceOn: ${selector}`);
            }
        }
        if (el) {
            el.addEventListener(event, handler);
            step.on('destroy', () => {
                return el.removeEventListener(event, handler);
            });
        }
        else {
            document.body.addEventListener(event, handler, true);
            step.on('destroy', () => {
                return document.body.removeEventListener(event, handler, true);
            });
        }
    }
    else {
        return console.error('advanceOn was defined, but no event name was passed.');
    }
}

export { bindAdvance };
//# sourceMappingURL=bind.js.map
