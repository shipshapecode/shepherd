import { h } from '../utils/dom.ts';
import { createShepherdButton } from './shepherd-button.ts';
import { isHTMLElement, isFunction, isUndefined } from '../utils/type-check.ts';
import type { Step } from '../step.ts';
import './shepherd-footer.css';
import './shepherd-cancel-icon.css';
import './shepherd-title.css';
import './shepherd-header.css';
import './shepherd-text.css';
import './shepherd-content.css';

export function createShepherdContent(
  descriptionId: string,
  labelId: string,
  step: Step
): HTMLElement {
  const { title, cancelIcon, text, buttons } = step.options;

  const fill = (el: HTMLElement, content: unknown) => {
    const resolved = isFunction(content) ? content.call(step) : content;

    if (isHTMLElement(resolved)) {
      el.append(resolved);
    } else {
      el.innerHTML = resolved as string;
    }

    return el;
  };

  return h(
    'div',
    { class: 'shepherd-content' },
    (!isUndefined(title) || cancelIcon?.enabled) &&
      h(
        'header',
        { class: 'shepherd-header' },
        title && fill(h('h3', { id: labelId, class: 'shepherd-title' }), title),
        cancelIcon?.enabled &&
          h(
            'button',
            {
              ...cancelIcon.attrs,
              'aria-label': cancelIcon.label || 'Close Tour',
              class: 'shepherd-cancel-icon',
              onclick: (e: Event) => {
                e.preventDefault();
                step.cancel();
              },
              type: 'button'
            },
            h('span', { 'aria-hidden': 'true' }, '×')
          )
      ),
    !isUndefined(text) &&
      fill(h('div', { class: 'shepherd-text', id: descriptionId }), text),
    Array.isArray(buttons) &&
      buttons.length > 0 &&
      h(
        'footer',
        { class: 'shepherd-footer' },
        ...buttons.map((config) => createShepherdButton(config, step))
      )
  );
}
