import { onMount, onCleanup, createEffect } from 'solid-js';
import ShepherdContent from './shepherd-content';
import { isUndefined, isString } from '../utils/type-check';
import type { Step } from '../step';

const KEY_TAB = 9;
const KEY_ESC = 27;
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

export interface ShepherdElementProps {
  classPrefix?: string;
  descriptionId: string;
  labelId: string;
  step: Step;
}

export default function ShepherdElement(props: ShepherdElementProps) {
  let element: HTMLDialogElement | undefined;
  let attachToElement: HTMLElement | null | undefined;

  // Focusable attachTo elements
  let focusableAttachToElements: Element[] | undefined;
  let firstFocusableAttachToElement: Element | undefined;
  let lastFocusableAttachToElement: Element | undefined;

  // Focusable dialog elements
  let firstFocusableDialogElement: Element | undefined;
  let focusableDialogElements: Element[] | undefined;
  let lastFocusableDialogElement: Element | undefined;

  const hasCancelIcon = () => props.step.options?.cancelIcon?.enabled ?? false;
  const hasTitle = () => props.step.options?.title ?? false;

  const getElement = () => element;

  onMount(() => {
    if (!element) return;

    // Get all elements that are focusable
    focusableDialogElements = [
      ...element.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
      )
    ];
    firstFocusableDialogElement = focusableDialogElements[0];
    lastFocusableDialogElement =
      focusableDialogElements[focusableDialogElements.length - 1];

    const attachTo = props.step._getResolvedAttachToOptions();
    if (attachTo?.element) {
      attachToElement = attachTo.element as HTMLElement;
      attachToElement.tabIndex = 0;
      focusableAttachToElements = [
        attachToElement,
        ...attachToElement.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        )
      ];
      firstFocusableAttachToElement = focusableAttachToElements[0];
      lastFocusableAttachToElement =
        focusableAttachToElements[focusableAttachToElements.length - 1];
      // Add keydown listener to attachTo element
      attachToElement.addEventListener('keydown', handleKeyDown);
    }
  });

  onCleanup(() => {
    attachToElement?.removeEventListener('keydown', handleKeyDown);
  });

  createEffect(() => {
    const classes = props.step.options.classes;
    if (element && classes !== undefined) {
      updateDynamicClasses(classes);
    }
  });

  function updateDynamicClasses(classes: string | undefined) {
    if (!element) return;
    
    // Remove old classes
    const oldClasses = getClassesArray(classes);
    if (oldClasses.length) {
      element.classList.remove(...oldClasses);
    }

    // Add new classes
    if (isString(classes)) {
      const newClasses = getClassesArray(classes);
      if (newClasses.length) {
        element.classList.add(...newClasses);
      }
    }
  }

  function getClassesArray(classes: string | undefined) {
    if (!classes) return [];
    return classes.split(' ').filter((className) => !!className.length);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const { tour } = props.step;
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
          // If at the beginning of elements in the dialog, go to last element in attachTo
          // If attachToElement is undefined, circle around to the last element in the dialog.
          if (
            document.activeElement === firstFocusableDialogElement ||
            document.activeElement?.classList.contains('shepherd-element')
          ) {
            e.preventDefault();
            (
              (lastFocusableAttachToElement ??
                lastFocusableDialogElement) as HTMLElement
            )?.focus();
          }
          // If at the beginning of elements in attachTo
          else if (document.activeElement === firstFocusableAttachToElement) {
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
          }
          // If at the end of elements in attachTo
          else if (document.activeElement === lastFocusableAttachToElement) {
            e.preventDefault();
            (firstFocusableDialogElement as HTMLElement)?.focus();
          }
        }
        break;
      case KEY_ESC:
        if (tour.options.exitOnEsc) {
          e.preventDefault();
          e.stopPropagation();
          props.step.cancel();
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

  // Export the getElement function
  (getElement as any).getElement = getElement;

  return (
    <dialog
      ref={element}
      aria-describedby={
        !isUndefined(props.step.options.text) ? props.descriptionId : undefined
      }
      aria-labelledby={
        props.step.options.title ? props.labelId : undefined
      }
      classList={{
        'shepherd-has-cancel-icon': hasCancelIcon(),
        'shepherd-has-title': !!hasTitle(),
        'shepherd-element': true
      }}
      data-shepherd-step-id={props.step.id}
      onKeyDown={handleKeyDown}
      open
    >
      {props.step.options.arrow &&
        props.step.options.attachTo &&
        props.step.options.attachTo.element &&
        props.step.options.attachTo.on && (
          <div class="shepherd-arrow" data-popper-arrow />
        )}
      <ShepherdContent
        descriptionId={props.descriptionId}
        labelId={props.labelId}
        step={props.step}
      />
    </dialog>
  );
}
