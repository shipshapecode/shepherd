import { h } from '../utils/dom.ts';
import { createShepherdContent } from './shepherd-content.ts';
import { isUndefined, isString, isFunction } from '../utils/type-check.ts';
import type { Step } from '../step.ts';
import './shepherd-element.css';

const KEY_TAB = 9;
const KEY_ESC = 27;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export interface ShepherdElementOptions {
  classPrefix?: string;
  descriptionId: string;
  labelId: string;
  step: Step;
}

/**
 * A step's rendered element, with its teardown.
 */
export interface ShepherdElementResult {
  /**
   * The step's `<dialog>` element.
   */
  element: HTMLDialogElement;
  /**
   * Removes the listeners added to the element.
   */
  cleanup: () => void;
}

export function createShepherdElement(
  options: ShepherdElementOptions
): ShepherdElementResult {
  const { classPrefix, descriptionId, labelId, step } = options;

  const { attachTo, arrow, cancelIcon, title, text, label, classes } =
    step.options;

  // A step with no title has no naming attribute at all, so its dialog has no
  // accessible name. `label` supplies one via `aria-label`.
  // `title` wins when both are set, because `aria-labelledby` outranks
  // `aria-label` in the accessible name computation, and because the
  // accessible name should match the visible title (WCAG 2.5.3). The gate
  // comes first so a function-valued `label` is never invoked when it would
  // be discarded — a throwing or side-effecting one must not break a titled
  // step.
  const resolvedLabel = title
    ? undefined
    : isFunction(label)
      ? (label.call(step) as string)
      : label;
  // Gate on the trimmed value so `''`, `() => ''` and whitespace-only names
  // omit the attribute instead of emitting an accessible name that assistive
  // technology treats as empty. The untrimmed value is what gets written.
  const ariaLabel =
    isString(resolvedLabel) && resolvedLabel.trim() ? resolvedLabel : null;

  let focusableDialogElements: Element[] = [];
  let focusableAttachToElements: Element[] = [];

  /**
   * Keeps tab focus cycling through the dialog and its target
   *
   * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
   */
  const trapTab = (e: KeyboardEvent) => {
    const firstDialog = focusableDialogElements[0];
    const lastDialog =
      focusableDialogElements[focusableDialogElements.length - 1];
    const firstAttachTo = focusableAttachToElements[0];
    const lastAttachTo =
      focusableAttachToElements[focusableAttachToElements.length - 1];
    const active = document.activeElement;
    const moveFocus = (el?: Element) => {
      e.preventDefault();
      (el as HTMLElement | undefined)?.focus();
    };

    // Nothing to cycle through, so Tab stays put.
    if (!firstAttachTo && firstDialog === element) {
      moveFocus();
    } else if (e.shiftKey) {
      if (
        active === firstDialog ||
        active?.classList.contains('shepherd-element')
      ) {
        moveFocus(lastAttachTo ?? lastDialog);
      } else if (active === firstAttachTo) {
        moveFocus(lastDialog);
      }
    } else if (active === lastDialog) {
      moveFocus(firstAttachTo ?? firstDialog);
    } else if (active === lastAttachTo) {
      moveFocus(firstDialog);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const { tour } = step;
    const { exitOnEsc, keyboardNavigation } = tour.options;
    const action = {
      [KEY_ESC]: exitOnEsc && (() => step.cancel()),
      [LEFT_ARROW]: keyboardNavigation && (() => tour.back()),
      [RIGHT_ARROW]: keyboardNavigation && (() => tour.next())
    }[e.keyCode];

    if (action) {
      e.preventDefault();
      e.stopPropagation();
      action();
    } else if (e.keyCode === KEY_TAB) {
      trapTab(e);
    }
  };

  const element = h(
    'dialog',
    {
      'aria-describedby': !isUndefined(text) ? descriptionId : null,
      'aria-label': ariaLabel,
      'aria-labelledby': title ? labelId : null,
      class: [
        'shepherd-element',
        cancelIcon?.enabled && 'shepherd-has-cancel-icon',
        title && 'shepherd-has-title',
        isString(classes) && classes
      ]
        .filter(Boolean)
        .join(' '),
      [`data-${classPrefix}shepherd-step-id`]: step.id,
      onkeydown: handleKeyDown,
      open: 'true'
    },
    arrow &&
      attachTo?.element &&
      attachTo.on &&
      h('div', { class: 'shepherd-arrow', 'data-popper-arrow': '' }),
    createShepherdContent(descriptionId, labelId, step)
  ) as HTMLDialogElement;

  const focusableSelector =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

  const dialogControls = [...element.querySelectorAll(focusableSelector)];
  // With nothing to focus inside, the dialog itself is the stop in the cycle.
  focusableDialogElements = dialogControls.length ? dialogControls : [element];

  const attachToElement = step._getResolvedAttachToOptions().element as
    HTMLElement | null | undefined;

  if (attachToElement) {
    step._storeOriginalTabIndex(attachToElement);
    attachToElement.tabIndex = 0;
    focusableAttachToElements = [
      attachToElement,
      ...attachToElement.querySelectorAll(focusableSelector)
    ];
    attachToElement.addEventListener('keydown', handleKeyDown);
  }

  const cleanup = () => {
    attachToElement?.removeEventListener('keydown', handleKeyDown);
  };

  return { element, cleanup };
}
