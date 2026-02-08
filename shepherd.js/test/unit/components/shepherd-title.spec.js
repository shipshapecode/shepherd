import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createShepherdTitle } from '../../../src/components/shepherd-title.ts';

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
    const el = createShepherdTitle('test-label', 'I am some test title.');
    container.appendChild(el);

    expect(container.querySelector('.shepherd-title')).toHaveTextContent(
      'I am some test title.'
    );
  });

  it('applies the title from a function', () => {
    const el = createShepherdTitle('test-label', () => 'I am some test title.');
    container.appendChild(el);

    expect(container.querySelector('.shepherd-title')).toHaveTextContent(
      'I am some test title.'
    );
  });
});
