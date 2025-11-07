import { h } from 'preact';

import { useEffect, useRef, useState } from 'preact/hooks';
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

export default function ShepherdElement({
  classPrefix,
  descriptionId,
  labelId,
  step
}: ShepherdElementProps) {
  const elementRef = useRef<HTMLDialogElement>(null);
  const [attachToElement, setAttachToElement] = useState<HTMLElement | null>(null);

  // Focusable attachTo elements
  const focusableAttachToElementsRef = useRef<Element[]>([]);
  const firstFocusableAttachToElementRef = useRef<Element | null | undefined>(null);
  const lastFocusableAttachToElementRef = useRef<Element | null | undefined>(null);

  // Focusable dialog elements
  const firstFocusableDialogElementRef = useRef<Element | null | undefined>(null);
  const focusableDialogElementsRef = useRef<Element[]>([]);
  const lastFocusableDialogElementRef = useRef<Element | null | undefined>(null);

  const hasCancelIcon = step.options?.cancelIcon?.enabled ?? false;
  const hasTitle = !!step.options?.title;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Get all elements that are focusable
    const focusableElements = [
      ...element.querySelectorAll(
        'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
      )
    ];
    focusableDialogElementsRef.current = focusableElements;
    firstFocusableDialogElementRef.current = focusableElements[0];
    lastFocusableDialogElementRef.current = focusableElements[focusableElements.length - 1];

    const attachTo = step._getResolvedAttachToOptions();
    if (attachTo?.element) {
      const attachEl = attachTo.element as HTMLElement;
      setAttachToElement(attachEl);
      attachEl.tabIndex = 0;
      
      const focusableAttachToElements = [
        attachEl,
        ...attachEl.querySelectorAll(
          'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        )
      ];
      focusableAttachToElementsRef.current = focusableAttachToElements;
      firstFocusableAttachToElementRef.current = focusableAttachToElements[0];
      lastFocusableAttachToElementRef.current =
        focusableAttachToElements[focusableAttachToElements.length - 1];
      
      // Add keydown listener to attachTo element
      attachEl.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      attachToElement?.removeEventListener('keydown', handleKeyDown);
    };
  }, [step]);

  // Handle dynamic class changes
  useEffect(() => {
    if (elementRef.current && step.options.classes !== undefined) {
      updateDynamicClasses(step.options.classes);
    }
  }, [step.options.classes]);

  function updateDynamicClasses(newClasses: string | undefined) {
    if (!elementRef.current) return;
    
    // Remove old classes and add new ones
    if (isString(newClasses)) {
      const classArray = getClassesArray(newClasses);
      if (classArray.length) {
        elementRef.current.classList.add(...classArray);
      }
    }
  }

  function getClassesArray(classes: string | undefined) {
    if (!classes) return [];
    return classes.split(' ').filter((className) => !!className.length);
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    const { tour } = step;
    const focusableDialogElements = focusableDialogElementsRef.current;
    const focusableAttachToElements = focusableAttachToElementsRef.current;
    const firstFocusableDialogElement = firstFocusableDialogElementRef.current;
    const lastFocusableDialogElement = lastFocusableDialogElementRef.current;
    const firstFocusableAttachToElement = firstFocusableAttachToElementRef.current;
    const lastFocusableAttachToElement = lastFocusableAttachToElementRef.current;

    switch (e.keyCode) {
      case KEY_TAB:
        if (
          (!focusableAttachToElements || focusableAttachToElements.length === 0) &&
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
              (lastFocusableAttachToElement ?? lastFocusableDialogElement) as HTMLElement
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
              (firstFocusableAttachToElement ?? firstFocusableDialogElement) as HTMLElement
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

  const dataStepId = { [`data-${classPrefix}shepherd-step-id`]: step.id };

  return (
    <dialog
      ref={elementRef}
      aria-describedby={!isUndefined(step.options.text) ? descriptionId : undefined}
      aria-labelledby={step.options.title ? labelId : undefined}
      className={`shepherd-element${hasCancelIcon ? ' shepherd-has-cancel-icon' : ''}${
        hasTitle ? ' shepherd-has-title' : ''
      }`}
      {...dataStepId}
      onKeyDown={handleKeyDown}
      open
    >
      {step.options.arrow &&
        step.options.attachTo &&
        step.options.attachTo.element &&
        step.options.attachTo.on && <div className="shepherd-arrow" data-popper-arrow />}
      <ShepherdContent descriptionId={descriptionId} labelId={labelId} step={step} />
    </dialog>
  );
}

// Export getElement function for external access
export function getElementFromRef(ref: { current: HTMLDialogElement | null }) {
  return ref.current;
}
