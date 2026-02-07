import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createShepherdText } from '../../../src/components/shepherd-text.ts';

describe('components/ShepherdText', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('adds plain text to the content', () => {
    const step = {
      options: {
        text: 'I am some test text.'
      }
    };

    const el = createShepherdText('test-desc', step);
    container.appendChild(el);

    expect(container.querySelector('.shepherd-text')).toHaveTextContent(
      'I am some test text.'
    );
  });

  it('applies HTML element directly to content', () => {
    const step = {
      options: {
        text: '<p>I am some test text.</p>'
      }
    };

    const el = createShepherdText('test-desc', step);
    container.appendChild(el);

    expect(container.querySelector('.shepherd-text')).toContainHTML(
      '<p>I am some test text.</p>'
    );
  });

  it('applies the text from a function', () => {
    const step = {
      options: {
        text: () => 'I am some test text.'
      }
    };

    const el = createShepherdText('test-desc', step);
    container.appendChild(el);

    expect(container.querySelector('.shepherd-text')).toHaveTextContent(
      'I am some test text.'
    );
  });
});
