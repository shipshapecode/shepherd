import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createShepherdContent } from '../../../src/components/shepherd-content.ts';

describe('components/ShepherdContent', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('header', () => {
    it('is rendered when title is present and cancelIcon is enabled', () => {
      const step = {
        options: {
          title: 'I am some test title.',
          cancelIcon: {
            enabled: true
          }
        }
      };

      const el = createShepherdContent('test-desc', 'test-label', step);
      container.appendChild(el);

      expect(
        container.querySelector('.shepherd-content .shepherd-header')
      ).toBeInTheDocument();
    });

    it('is rendered when title is present', () => {
      const step = {
        options: {
          title: 'I am some test title.'
        }
      };

      const el = createShepherdContent('test-desc', 'test-label', step);
      container.appendChild(el);

      expect(
        container.querySelector('.shepherd-content .shepherd-header')
      ).toBeInTheDocument();
    });

    it('is rendered when cancelIcon is enabled', () => {
      const step = {
        options: {
          cancelIcon: {
            enabled: true
          }
        }
      };

      const el = createShepherdContent('test-desc', 'test-label', step);
      container.appendChild(el);

      expect(
        container.querySelector('.shepherd-content .shepherd-header')
      ).toBeInTheDocument();
    });

    it('is not rendered when title is not present and cancelIcon is disabled', () => {
      const step = {
        options: {
          title: undefined
        }
      };

      const el = createShepherdContent('test-desc', 'test-label', step);
      container.appendChild(el);

      expect(
        container.querySelector('.shepherd-header')
      ).not.toBeInTheDocument();
    });
  });
});
