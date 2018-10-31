
/**
 * Aligns the virtual target with the real target element.
 *
 * @param {Object} virtualTargetEl
 * @param {Object} attachToElement
 */
export function alignTargetElement(virtualTargetEl, attachToElement) {
  if (virtualTargetEl) {
    const rect = _getTargetBoundingClientRect(attachToElement);
    virtualTargetEl.style.width = `${rect.width}px`;
    virtualTargetEl.style.height = `${rect.height}px`;
    virtualTargetEl.style.left = `${rect.left}px`;
    virtualTargetEl.style.top = `${rect.top}px`;
  }
}

/**
 * Generates overlay elements to cover the non-target areas of the viewport from a set of base `attachTo` options
 *
 * @param {Object} attachToOptions The local `attachTo` options
 * @param {Object} virtualTargetEl Any virtual target element created to be used in place of the actual element.
 * @return {Object} Object representing overlay elements, contains an array of elements.
 */
export function setupOverlayElements(attachToOptions, virtualTargetEl) {
  const coveringDivs = [];
  const overlayElements = {  };
  overlayElements.elements = coveringDivs;
  overlayElements.hide = _hideOverlayElements.bind(overlayElements);
  overlayElements.show = _showOverlayElements.bind(overlayElements);
  overlayElements.remove = _removeOverlayElements.bind(overlayElements);

  if (this.options.overlay) {

    if (attachToOptions.element) {
      // area to the left of the target
      overlayElements.leftNonTargetDiv = document.createElement('div');
      coveringDivs.push(overlayElements.leftNonTargetDiv);

      // area to the top of the target
      overlayElements.topNonTargetDiv = document.createElement('div');
      coveringDivs.push(overlayElements.topNonTargetDiv);

      // area to the right of the target
      overlayElements.rightNonTargetDiv = document.createElement('div');
      coveringDivs.push(overlayElements.rightNonTargetDiv);

      // area below the target
      overlayElements.bottomNonTargetDiv = document.createElement('div');
      coveringDivs.push(overlayElements.bottomNonTargetDiv);
    } else {
      // one overlay for the whole viewport
      overlayElements.nonTargetDiv = document.createElement('div');
      coveringDivs.push(overlayElements.nonTargetDiv);
    }

    // Now adjust the covering divs with common properties and add them
    for (const element of coveringDivs) {
      _configureOverlayElement.call(this, element);
      document.body.appendChild(element);
    }

    overlayElements._positionOverlayElements = () => {
      _positionOverlayElements.call(overlayElements, attachToOptions.element, virtualTargetEl);
    };
    // listen for scroll events and re-position
    window.addEventListener('scroll', overlayElements._positionOverlayElements);
    // Track changes to the underlying target periodically (is there a better way?)
    overlayElements._repositionIntervalId = setInterval(overlayElements._positionOverlayElements, 350);

    _positionOverlayElements.call(overlayElements, attachToOptions.element, virtualTargetEl);
  }
  return overlayElements;
}

/**
 * Configures a overlay element with common attributes, etc.
 *
 * @param {Object} element
 * @private
 */
function _configureOverlayElement(element) {
  element.style.position = 'absolute';
  element.classList.add('shepherd-non-target');
  if (this.options.overlay.cancelTourOnClick) {
    element.addEventListener('click', () => {
      window.Shepherd.activeTour.cancel();
    });
  }
  if (this.options.overlay.styles) {
    for (const style in this.options.overlay.styles) {
      element.style[style] = this.options.overlay.styles[style];
    }
  }
  this.options.overlay.classes && element.classList.add(this.options.overlay.classes);
}

/**
 * Adjust the posiiton the non-target overlay elements on scrolling.
 *
 * @param {Object} attachToElement
 * @param {Object} virtualTargetEl
 * @private
 */
function _positionOverlayElements(attachToElement, virtualTargetEl) {
  alignTargetElement(virtualTargetEl, attachToElement);

  _positionTotalOverlay.call(this);

  const targetElement = virtualTargetEl ? virtualTargetEl : attachToElement;
  if (targetElement) {
    const targetRect = _getTargetBoundingClientRect(targetElement);

    _positionLeftOverlay.call(this, targetRect);
    _positionTopOverlay.call(this, targetRect);
    _positionRightOverlay.call(this, targetRect);
    _positionBottomOverlay.call(this, targetRect);
  }
}

function _positionTotalOverlay() {
  // This one is the special - the whole viewport if there is no attachto target
  if (this.nonTargetDiv) {
    this.nonTargetDiv.style.top = `${window.pageYOffset}px`;
    this.nonTargetDiv.style.left = `${window.pageXOffset}px`;
    this.nonTargetDiv.style.width = '100%';
    this.nonTargetDiv.style.height = '100%';
  }
}
function _positionLeftOverlay(targetRect) {
  // area to the left (only if there is an attachTo target)
  if (this.leftNonTargetDiv) {
    this.leftNonTargetDiv.style.top = `${window.pageYOffset}px`;
    this.leftNonTargetDiv.style.left = `${window.pageXOffset}px`;
    this.leftNonTargetDiv.style.width = `${((targetRect.left - window.pageXOffset > 0) ? (targetRect.left - window.pageXOffset) : 0)}px`;
    this.leftNonTargetDiv.style.height = '100%';
  }
}
function _positionTopOverlay(targetRect) {
  // area to the top (only if there is an attachTo target)
  if (this.topNonTargetDiv) {
    this.topNonTargetDiv.style.left = `${window.pageXOffset > targetRect.left ? window.pageXOffset : targetRect.left}px`;
    this.topNonTargetDiv.style.top = '0px';
    if (window.pageXOffset > targetRect.left) {
      this.topNonTargetDiv.style.width = '100%';
    } else {
      this.topNonTargetDiv.style.width = `calc(100% - ${targetRect.left - window.pageXOffset}px)`;
    }
    this.topNonTargetDiv.style.height = `${targetRect.top}px`;
  }
}
function _positionRightOverlay(targetRect) {
  let leftAdjust, topAdjust;
  // area to the right (only if there is an attachTo target)
  if (this.rightNonTargetDiv) {
    leftAdjust =  (window.pageXOffset > (targetRect.left + targetRect.width) ? window.pageXOffset : (targetRect.left + targetRect.width));
    topAdjust =  (window.pageYOffset > targetRect.top ? window.pageYOffset : targetRect.top);
    this.rightNonTargetDiv.style.left = `${leftAdjust}px`;
    this.rightNonTargetDiv.style.top = `${topAdjust}px`;
    _setRightOverlayWidthAndHeight.call(this, targetRect);
  }
}
function _setRightOverlayWidthAndHeight(targetRect) {
  let h;
  // area to the right (only if there is an attachTo target)
  if (this.rightNonTargetDiv) {
    if (window.pageXOffset > (targetRect.left + targetRect.width)) {
      this.rightNonTargetDiv.style.width = '100%';
    } else {
      this.rightNonTargetDiv.style.width = `calc(100% - ${(targetRect.left + targetRect.width) - window.pageXOffset}px)`;
    }
    h = (window.pageYOffset > targetRect.top) ? (targetRect.top + targetRect.height) - window.pageYOffset : targetRect.height;
    this.rightNonTargetDiv.style.height = `${h > 0 ? h : 0}px`;
  }
}
function _positionBottomOverlay(targetRect) {
  let w, h, leftAdjust, topAdjust;
  // area below (only if there is an attachTo target)
  if (this.bottomNonTargetDiv) {
    leftAdjust =  (window.pageXOffset > targetRect.left ? window.pageXOffset : targetRect.left);
    topAdjust =  (window.pageYOffset > (targetRect.top + targetRect.height) ? window.pageYOffset : (targetRect.top + targetRect.height));
    this.bottomNonTargetDiv.style.left = `${leftAdjust}px`;
    this.bottomNonTargetDiv.style.top = `${topAdjust}px`;
    w = (window.pageXOffset > targetRect.left) ? 0 : (targetRect.left - window.pageXOffset);
    this.bottomNonTargetDiv.style.width = `calc(100% - ${w}px)`;
    h = (window.pageYOffset > targetRect.top) ? 0 : ((targetRect.top + targetRect.height) - window.pageYOffset);
    this.bottomNonTargetDiv.style.height = `calc(100% - ${h}px)`;
  }
}

/**
 * Hides the non-target covering elements.
 *
 * @private
 */
function _hideOverlayElements() {
  if (this.elements) {
    for (const nonTarget of this.elements) {
      nonTarget.style.display = 'none';
    }
  }
}
/**
 * Shows the non-target covering elements.
 *
 * @private
 */
function _showOverlayElements() {
  if (this.elements) {
    for (const nonTarget of this.elements) {
      nonTarget.style.display = 'block';
    }
  }
}
/**
 * Removes the non-target covering elements.
 *
 * @private
 */
function _removeOverlayElements() {
  if (this.elements) {
    for (const nonTarget of this.elements) {
      nonTarget.parentNode.removeChild(nonTarget);
    }
    window.removeEventListener('scroll', this._positionOverlayElements);
  }
  if (this._repositionIntervalId) {
    clearInterval(this._repositionIntervalId);
    this._repositionIntervalId = null;
  }

}

/**
 * Gets the bounding rect of the target (when scrolled into viewport);
 *
 * @return {Object} The rect with width, height, top, bottom, left and right sub-properties.
 * @private
 */
function _getTargetBoundingClientRect(attachToElement) {
  // Need to get in its visible position before creating the virtual element from it
  // if (this.options.scrollTo) {
  //   this.scrollTo();
  // }

  const rect = attachToElement.getBoundingClientRect();
  const _rect = {};
  _rect.width = (rect.width || rect.width === 0) ? rect.width : attachToElement.offsetWidth;
  _rect.height = (rect.height || rect.height === 0) ? rect.height : attachToElement.offsetHeight;
  // adjust for scroll (is there a better way??)
  _rect.top = rect.top + window.pageYOffset;
  _rect.bottom = rect.bottom + window.pageYOffset;
  _rect.left = rect.left + window.pageXOffset;
  _rect.right = rect.right + window.pageXOffset;
  return _rect;
}
