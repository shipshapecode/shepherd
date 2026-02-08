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

  it('appends an HTMLElement when text is a DOM node', () => {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'I am a DOM node.';

    const step = {
      options: {
        text: paragraph
      }
    };

    const el = createShepherdText('test-desc', step);
    container.appendChild(el);

    const textEl = container.querySelector('.shepherd-text');
    expect(textEl.contains(paragraph)).toBe(true);
    expect(textEl).toHaveTextContent('I am a DOM node.');
  });
});
