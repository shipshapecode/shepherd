const svgNS = 'http://www.w3.org/2000/svg';

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

  _setAttributes(element, {
    height: '100%',
    id: elementIds.modalOverlayMask,
    width: '100%',
    x: '0',
    y: '0'
  });

  return element;
}

/**
 *  <rect id="modalOverlayMaskRect" x="0" y="0" width="100%" height="100%" fill="#FFFFFF"/>
 */
function _createMaskRect() {
  const element = document.createElementNS(svgNS, 'rect');

  _setAttributes(element, {
    fill: '#FFFFFF',
    height: '100%',
    id: elementIds.modalOverlayMaskRect,
    width: '100%',
    x: '0',
    y: '0'
  });

  return element;
}

/**
 * <rect id="shepherdModalMaskOpening" fill="#000000"/>
 */
function _createMaskOpening() {
  const element = document.createElementNS(svgNS, 'rect');

  _setAttributes(element, {
    fill: '#000000',
    id: elementIds.modalOverlayMaskOpening
  });

  return element;
}

/**
 * <rect x="0" y="0" width="100%" height="100%" mask="url(#shepherdModalMask)"/>
 */
function _createMaskConsumer() {
  const element = document.createElementNS(svgNS, 'rect');

  _setAttributes(element, {
    height: '100%',
    width: '100%',
    x: '0',
    y: '0'
  });
  element.setAttribute('mask', `url(#${elementIds.modalOverlayMask})`);

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

/**
 * Uses the bounds of the element we want the opening overtop of to set the dimensions of the opening and position it
 * @param {HTMLElement} targetElement The element the opening will expose
 * @param {SVGElement} openingElement The svg mask for the opening
 */
function positionModalOpening(targetElement, openingElement) {
  if (targetElement.getBoundingClientRect && openingElement instanceof SVGElement) {
    const { x, y, width, height, left, top } = targetElement.getBoundingClientRect();

    // getBoundingClientRect is not consistent. Some browsers use x and y, while others use left and top
    _setAttributes(openingElement, { x: x || left, y: y || top, width, height });
  }
}

function closeModalOpening(openingElement) {
  if (openingElement && openingElement instanceof SVGElement) {
    _setAttributes(openingElement, {
      height: '0',
      x: '0',
      y: '0',
      width: '0'
    });
  }
}

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

/**
 * Set multiple attributes on an element, via a hash
 * @param {HTMLElement|SVGElement} el The element to set the attributes on
 * @param {Object} attrs A hash of key value pairs for attributes to set
 * @private
 */
function _setAttributes(el, attrs) {
  Object.keys(attrs).forEach((key) => {
    el.setAttribute(key, attrs[key]);
  });
}

export {
  createModalOverlay,
  positionModalOpening,
  preventModalBodyTouch,
  preventModalOverlayTouch,
  closeModalOpening,
  getModalMaskOpening,
  elementIds,
  classNames,
  toggleShepherdModalClass
};
