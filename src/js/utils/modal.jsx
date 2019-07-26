/**
 * Remove any leftover modal target classes and add the modal target class to the currentElement
 * @param {HTMLElement} currentElement The element for the current step
 * @param {string} classPrefix The prefix to add to the class name
 */
function toggleShepherdModalClass(currentElement, classPrefix) {
  const shepherdModalTarget = document.querySelector(`.${classPrefix}shepherd-modal-target`);

  if (shepherdModalTarget) {
    shepherdModalTarget.classList.remove(`${classPrefix}shepherd-modal-target`);
  }

  currentElement.classList.add(`${classPrefix}shepherd-modal-target`);
}

export {
  toggleShepherdModalClass
};
