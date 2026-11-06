import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createShepherdContent } from '../../../src/components/shepherd-content';

describe('components/ShepherdTitle', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('adds plain title to the content', () => {
    const el = createShepherdContent('test-desc', 'test-label', {
      options: { title: 'I am some test title.' }
    }).querySelector('.shepherd-title');
    container.appendChild(el);

    expect(container.querySelector('.shepherd-title')).toHaveTextContent(
      'I am some test title.'
    );
  });

  it('applies the title from a function', () => {
    const el = createShepherdContent('test-desc', 'test-label', {
      options: { title: () => 'I am some test title.' }
    }).querySelector('.shepherd-title');
    container.appendChild(el);

    expect(container.querySelector('.shepherd-title')).toHaveTextContent(
      'I am some test title.'
    );
  });
});
