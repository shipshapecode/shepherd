<script>
  import { onMount } from 'svelte';
  import ShepherdContent from '../shepherd-content';
  import { isUndefined } from '../../utils/type-check';

  const KEY_TAB = 9;
  const KEY_ESC = 27;
  const LEFT_ARROW = 37;
  const RIGHT_ARROW = 39;

  export let classes, classPrefix, descriptionId, labelId, step, styles;
  const dataStepId = { [`data-${classPrefix}shepherd-step-id`]: step.id };
  let element, firstFocusableElement, focusableElements, lastFocusableElement;

  onMount(() => {
    // Get all elements that are focusable
    focusableElements = element.querySelectorAll('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]');
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];
  });

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
        if (tour.options.exitOnEsc) {
          step.cancel();
        }
        break;
      case LEFT_ARROW:
        if (tour.options.keyboardNavigation) {
          tour.back();
        }
        break;
      case RIGHT_ARROW:
        if (tour.options.keyboardNavigation) {
          tour.next();
        }
        break;
      default:
        break;
    }
  };
</script>

<div
  aria-describedby={!isUndefined(step.options.text) ? descriptionId : null}
  aria-labeledby={step.options.title ? labelId : null}
  bind:this={element}
  className={classes + styles.element}
  {...dataStepId}
  on:keydown={handleKeyDown}
  role="dialog"
  tabindex="0"
>
  <ShepherdContent
    {classPrefix}
    {descriptionId}
    {labelId}
    {step}
    {styles}
  />
</div>
