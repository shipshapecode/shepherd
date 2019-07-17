
const prefix = '__SH_NAMESPACE_PREFIX__';

/* eslint camelcase: ["error", {properties: "never"}] */

export const SHEPHERD_CLASSES = {
  SHEPHERD: 'shepherd',
  SHEPHERD_HAS_TITLE: 'shepherd-has-title',
  SHEPHERD_ELEMENT: 'shepherd-element',
  SHEPHERD_FOOTER: 'shepherd-footer',
  SHEPHERD_BUTTON: 'shepherd-button',
  SHEPHERD_CANCEL_LINK: 'shepherd-cancel-link',
  SHEPHERD_HAS_CANCEL_LINK: 'shepherd-has-cancel-link',
  SHEPHERD_TEXT: 'shepherd-text',
  SHEPHERD_TITLE: 'shepherd-title',
  SHEPHERD_CONTENT: 'shepherd-content',
  SHEPHERD_HEADER: 'shepherd-header',
  SHEPHERD_ENABLED: 'shepherd-enabled',
  SHEPHERD_TARGET: 'shepherd-target',
  SHEPHERD_ACTIVE: 'shepherd-active',
  SHEPHERD_MODAL_TARGET: 'shepherd-modal-target',
  SHEPHERD_MODAL_iS_VISIBLE: 'shepherd-modal-is-visible',
  prefixesSet: false
};

export const SHEPHERD_ATTRIBUTES = {
  DATA_SHEPHERD_STEP: 'data-shepherd-step',
  DATA_SHEPHERD_STEP_ID: 'data-shepherd-step-id',
  DATA_SHEPHERD_ACTIVE_TOUR: 'data-shepherd-active-tour',
  prefixesSet: false
};

function addPrefixes(obj) {
  if (obj.prefixesSet || typeof prefix !== 'string' || prefix === '') {
    return;
  }
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace('shepherd', `${prefix}-shepherd`);
    }
  }
  obj.prefixesSet = true;
}

addPrefixes(SHEPHERD_CLASSES);
addPrefixes(SHEPHERD_ATTRIBUTES);
