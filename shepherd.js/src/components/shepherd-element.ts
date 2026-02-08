import { h } from '../utils/dom.ts';
import { createShepherdContent } from './shepherd-content.ts';
import { isUndefined, isString } from '../utils/type-check.ts';
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

export interface ShepherdElementResult {
  element: HTMLDialogElement;
  cleanup: () => void;
}

export function createShepherdElement(
  options: ShepherdElementOptions
): ShepherdElementResult {
  const { classPrefix, descriptionId, labelId, step } = options;

  let attachToElement: HTMLElement | null | undefined;

  // Focusable attachTo elements
  let focusableAttachToElements: Element[] | undefined;
  let firstFocusableAttachToElement: Element | undefined;
  let lastFocusableAttachToElement: Element | undefined;

  // Focusable dialog elements
  let firstFocusableDialogElement: Element | undefined;
  let focusableDialogElements: Element[] | undefined;
  let lastFocusableDialogElement: Element | undefined;

  const hasCancelIcon = step.options?.cancelIcon?.enabled ?? false;
  const hasTitle = step.options?.title ?? false;

  /**
   * Setup keydown events to allow closing the modal with ESC
   *
   * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    const { tour } = step;
    switch (e.keyCode) {
      case KEY_TAB:
        if (
          (!focusableAttachToElements ||
            focusableAttachToElements.length === 0) &&
          focusableDialogElements &&
          focusableDialogElements.length === 0
        ) {
          e.preventDefault();
          break;
        }
        // Backward tab
        if (e.shiftKey) {
          if (
            document.activeElement === firstFocusableDialogElement ||
            document.activeElement?.classList.contains('shepherd-element')
          ) {
            e.preventDefault();
            (
              (lastFocusableAttachToElement ??
                lastFocusableDialogElement) as HTMLElement
            )?.focus();
          } else if (document.activeElement === firstFocusableAttachToElement) {
            e.preventDefault();
            (lastFocusableDialogElement as HTMLElement)?.focus();
          }
        } else {
          if (document.activeElement === lastFocusableDialogElement) {
            e.preventDefault();
            (
              (firstFocusableAttachToElement ??
                firstFocusableDialogElement) as HTMLElement
            )?.focus();
          } else if (document.activeElement === lastFocusableAttachToElement) {
            e.preventDefault();
            (firstFocusableDialogElement as HTMLElement)?.focus();
          }
        }
        break;
      case KEY_ESC:
        if (tour.options.exitOnEsc) {
          e.preventDefault();
          e.stopPropagation();
          step.cancel();
        }
        break;
      case LEFT_ARROW:
        if (tour.options.keyboardNavigation) {
          e.preventDefault();
          e.stopPropagation();
          tour.back();
        }
        break;
      case RIGHT_ARROW:
        if (tour.options.keyboardNavigation) {
          e.preventDefault();
          e.stopPropagation();
          tour.next();
        }
        break;
      default:
        break;
    }
  };

  // Build the dialog element
  const element = h('dialog', {
    'aria-describedby': !isUndefined(step.options.text) ? descriptionId : null,
    'aria-labelledby': step.options.title ? labelId : null,
    class: [
      'shepherd-element',
      hasCancelIcon ? 'shepherd-has-cancel-icon' : '',
      hasTitle ? 'shepherd-has-title' : ''
    ]
      .filter(Boolean)
      .join(' '),
    [`data-${classPrefix}shepherd-step-id`]: step.id,
    onkeydown: handleKeyDown,
    open: 'true'
  }) as HTMLDialogElement;

  // Add arrow if needed
  if (
    step.options.arrow &&
    step.options.attachTo &&
    step.options.attachTo.element &&
    step.options.attachTo.on
  ) {
    element.append(
      h('div', { class: 'shepherd-arrow', 'data-popper-arrow': '' })
    );
  }

  // Add content
  element.append(createShepherdContent(descriptionId, labelId, step));

  // Dynamic class management
  if (isString(step.options.classes)) {
    const classes = step.options.classes.split(' ').filter((c) => !!c.length);
    if (classes.length) {
      element.classList.add(...classes);
    }
  }

  // Setup focusable element tracking (equivalent of onMount)
  const focusableSelector =
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

  focusableDialogElements = [...element.querySelectorAll(focusableSelector)];
  firstFocusableDialogElement = focusableDialogElements[0];
  lastFocusableDialogElement =
    focusableDialogElements[focusableDialogElements.length - 1];

  const attachTo = step._getResolvedAttachToOptions();
  if (attachTo?.element) {
    attachToElement = attachTo.element as HTMLElement;
    step._storeOriginalTabIndex(attachToElement);
    attachToElement.tabIndex = 0;
    focusableAttachToElements = [
      attachToElement,
      ...attachToElement.querySelectorAll(focusableSelector)
    ];
    firstFocusableAttachToElement = focusableAttachToElements[0];
    lastFocusableAttachToElement =
      focusableAttachToElements[focusableAttachToElements.length - 1];
    attachToElement.addEventListener('keydown', handleKeyDown);
  }

  const cleanup = () => {
    attachToElement?.removeEventListener('keydown', handleKeyDown);
  };

  return { element, cleanup };
}
