const elementIds = {
  modalOverlay: 'shepherdModalOverlayContainer',
  modalOverlayMask: 'shepherdModalMask',
  modalOverlayMaskRect: 'shepherdModalMaskRect',
  modalOverlayMaskOpening: 'shepherdModalMaskOpening'
};

const classNames = {
  isVisible: 'shepherd-modal-is-visible',
  modalTarget: 'shepherd-modal-target'
};

function getModalMaskOpening(modalElement) {
  return modalElement.querySelector(`#${elementIds.modalOverlayMaskOpening}`);
}

function preventModalBodyTouch(event) {
  event.preventDefault();
}

function preventModalOverlayTouch(event) {
  event.stopPropagation();
}

/**
 * Remove any leftover modal target classes and add the modal target class to the currentElement
 * @param {HTMLElement} currentElement The element for the current step
 */
function toggleShepherdModalClass(currentElement) {
  const shepherdModal = document.querySelector(`${classNames.modalTarget}`);

  if (shepherdModal) {
    shepherdModal.classList.remove(classNames.modalTarget);
  }

  currentElement.classList.add(classNames.modalTarget);
}

export {
  preventModalBodyTouch,
  preventModalOverlayTouch,
  getModalMaskOpening,
  elementIds,
  classNames,
  toggleShepherdModalClass
};
