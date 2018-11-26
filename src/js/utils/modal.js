const svgNS = 'http://www.w3.org/2000/svg';

const elementIds = {
  modalOverlay: 'shepherdModalOverlayContainer',
  modalOverlayMask: 'shepherdModalMask',
  modalOverlayMaskOpening: 'shepherdModalMaskOpening'
};

const classNames = {
  isVisible: 'shepherd-modal-is-visible',
  modalTarget: 'shepherd-modal-target'
};

/**
 * <svg id="shepherdModalOverlayContainer" xmlns="http://www.w3.org/2000/svg">
 */
function _createModalContainer() {
  const element = document.createElementNS(svgNS, 'svg');

  element.setAttributeNS(null, 'id', elementIds.modalOverlay);

  return element;
}

/**
 * <mask id="shepherdModalMask" x="0" y="0" width="100%" height="100%">
 */
function _createMaskContainer() {
  const element = document.createElementNS(svgNS, 'mask');

  element.setAttributeNS(null, 'id', elementIds.modalOverlayMask);
  element.setAttributeNS(null, 'x', '0');
  element.setAttributeNS(null, 'y', '0');
  element.setAttributeNS(null, 'width', '100%');
  element.setAttributeNS(null, 'height', '100%');

  return element;
}

/**
 *  <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF"/>
 */
function _createMaskRect() {
  const element = document.createElementNS(svgNS, 'rect');

  element.setAttributeNS(null, 'x', '0');
  element.setAttributeNS(null, 'y', '0');
  element.setAttributeNS(null, 'width', '100%');
  element.setAttributeNS(null, 'height', '100%');
  element.setAttributeNS(null, 'fill', '#FFFFFF');

  return element;
}

/**
 * <rect id="shepherdModalMaskOpening" fill="#000000"/>
 */
function _createMaskOpening() {
  const element = document.createElementNS(svgNS, 'rect');

  element.setAttributeNS(null, 'id', elementIds.modalOverlayMaskOpening);
  element.setAttributeNS(null, 'fill', '#000000');

  return element;
}

/**
 * <rect x="0" y="0" width="100%" height="100%" mask="url(#shepherdModalMask)"/>
 */
function _createMaskConsumer() {
  const element = document.createElementNS(svgNS, 'rect');

  element.setAttributeNS(null, 'x', '0');
  element.setAttributeNS(null, 'y', '0');
  element.setAttributeNS(null, 'width', '100%');
  element.setAttributeNS(null, 'height', '100%');
  element.setAttributeNS(null, 'mask', `url(#${elementIds.modalOverlayMask})`);

  return element;
}

/**
 * Generates an SVG with the following structure:
 * ```html
 *  <svg id="shepherdModalOverlayContainer" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <mask id="shepherdModalMask" x="0" y="0" width="100%" height="100%" >
          <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF"/>
          <!-- This element will "punch a hole" through the mask by preventing it from rendering within the perimeter -->
          <rect id="shepherdModalMaskOpening"/>
        </mask>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" mask="url(#shepherdModalMask)"/>
    </svg>
 * ```
 */
function createModalOverlay() {
  const containerElement = _createModalContainer();
  const defsElement = document.createElementNS(svgNS, 'defs');
  const maskContainer = _createMaskContainer();
  const maskRect = _createMaskRect();
  const maskOpening = _createMaskOpening();
  const maskConsumer = _createMaskConsumer();

  maskContainer.appendChild(maskRect);
  maskContainer.appendChild(maskOpening);

  defsElement.appendChild(maskContainer);

  containerElement.appendChild(defsElement);
  containerElement.appendChild(maskConsumer);

  return containerElement;
}

function positionModalOpening(targetElement, openingElement) {
  if (targetElement.getBoundingClientRect && openingElement instanceof SVGElement) {
    const { x, y, width, height } = targetElement.getBoundingClientRect();

    openingElement.setAttributeNS(null, 'x', x);
    openingElement.setAttributeNS(null, 'y', y);
    openingElement.setAttributeNS(null, 'width', width);
    openingElement.setAttributeNS(null, 'height', height);
  }
}

function closeModalOpening(openingElement) {
  if (openingElement && openingElement instanceof SVGElement) {
    openingElement.setAttributeNS(null, 'x', '0');
    openingElement.setAttributeNS(null, 'y', '0');
    openingElement.setAttributeNS(null, 'width', '0');
    openingElement.setAttributeNS(null, 'height', '0');
  }
}

function getModalMaskOpening(modalElement) {
  return modalElement.querySelector(`#${elementIds.modalOverlayMaskOpening}`);
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
  createModalOverlay,
  positionModalOpening,
  closeModalOpening,
  getModalMaskOpening,
  elementIds,
  classNames,
  toggleShepherdModalClass
};
