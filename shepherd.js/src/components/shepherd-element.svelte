<script>
  import { effect } from 'svelte';
  import ShepherdContent from './shepherd-content.svelte';
  import { isUndefined, isString } from '../utils/type-check.ts';

  const KEY_TAB = 9;
  const KEY_ESC = 27;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  let {
    classPrefix,
    element,
    descriptionId,
    firstFocusableElement,
    focusableElements,
    labelId,
    lastFocusableElement,
    step,
    dataStepId
  } = $props();

  let classes;
  const hasCancelIcon = $derived(step.options?.cancelIcon?.enabled ?? false);
  const hasTitle = $derived(step.options?.title ?? false);

  export const getElement = () => element;

  $effect(() => {
    // Get all elements that are focusable
    dataStepId = { [`data-${classPrefix}shepherd-step-id`]: step.id };
    focusableElements = element.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
    );
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
  });

  $effect(() => {
    if (classes !== step.options.classes) {
      updateDynamicClasses();
    }
  });

  function updateDynamicClasses() {
    removeClasses(classes);
    classes = step.options.classes;
    addClasses(classes);
  }

  function removeClasses(classes) {
    if (isString(classes)) {
      const oldClasses = getClassesArray(classes);
      if (oldClasses.length) {
        element.classList.remove(...oldClasses);
      }
    }
  }

  function addClasses(classes) {
    if (isString(classes)) {
      const newClasses = getClassesArray(classes);
      if (newClasses.length) {
        element.classList.add(...newClasses);
      }
    }
  }

  function getClassesArray(classes) {
    return classes.split(' ').filter((className) => !!className.length);
  }

  /**
   * Setup keydown events to allow closing the modal with ESC
   *
   * Borrowed from this great post! https://bitsofco.de/accessible-modal-dialog/
   *
   * @private
   */
  const handleKeyDown = (e) => {
    const { tour } = step;
    switch (e.keyCode) {
      case KEY_TAB:
        if (focusableElements.length === 0) {
          e.preventDefault();
          break;
        }
        // Backward tab
        if (e.shiftKey) {
          if (
            document.activeElement === firstFocusableElement ||
            document.activeElement.classList.contains('shepherd-element')
          ) {
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
</script>

<dialog
  aria-describedby={!isUndefined(step.options.text) ? descriptionId : null}
  aria-labelledby={step.options.title ? labelId : null}
  bind:this={element}
  class:shepherd-has-cancel-icon={hasCancelIcon}
  class:shepherd-has-title={hasTitle}
  class:shepherd-element={true}
  {...dataStepId}
  onkeydown={handleKeyDown}
  open="true"
>
  {#if step.options.arrow && step.options.attachTo && step.options.attachTo.element && step.options.attachTo.on}
    <div class="shepherd-arrow" data-popper-arrow></div>
  {/if}
  <ShepherdContent {descriptionId} {labelId} {step} />
</dialog>

