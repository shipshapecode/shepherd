/**
 * Remove any leftover modal target classes and add the modal target class to the currentElement
 * @param {HTMLElement} currentElement The element for the current step
 */
function toggleShepherdModalClass(currentElement) {
  const shepherdModal = document.querySelector('shepherd-modal-target');

  if (shepherdModal) {
    shepherdModal.classList.remove('shepherd-modal-target');
  }

  currentElement.classList.add('shepherd-modal-target');
}

export {
  toggleShepherdModalClass
};
