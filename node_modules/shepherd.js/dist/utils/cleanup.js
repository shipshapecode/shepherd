/*! shepherd.js 12.0.0-alpha.3 */

import { isHTMLElement } from './type-check.js';

/**
 * Cleanup the steps and set pointerEvents back to 'auto'
 * @param tour The tour object
 */
function cleanupSteps(tour) {
    if (tour) {
        const { steps } = tour;
        steps.forEach((step) => {
            if (step.options &&
                step.options.canClickTarget === false &&
                step.options.attachTo) {
                if (isHTMLElement(step.target)) {
                    step.target.classList.remove('shepherd-target-click-disabled');
                }
            }
        });
    }
}

export { cleanupSteps };
//# sourceMappingURL=cleanup.js.map
