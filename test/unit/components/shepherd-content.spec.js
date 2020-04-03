import { cleanup, render } from '@testing-library/svelte';
import ShepherdContent from '../../../src/js/components/shepherd-content.svelte';

describe('components/ShepherdContent', () => {
  beforeEach(cleanup);

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

      const { container } = render(ShepherdContent, { props: { step } });

      expect(container.querySelector('.shepherd-content .shepherd-header')).toBeInTheDocument();
    });

    it('is rendered when title is present', () => {
      const step = {
        options: {
          title: 'I am some test title.'
        }
      };

      const { container } = render(ShepherdContent, { props: { step } });

      expect(container.querySelector('.shepherd-content .shepherd-header')).toBeInTheDocument();
    });

    it('is rendered when cancelIcon is enabled', () => {
      const step = {
        options: {
          cancelIcon: {
            enabled: true
          }
        }
      };

      const { container } = render(ShepherdContent, { props: { step } });

      expect(container.querySelector('.shepherd-content .shepherd-header')).toBeInTheDocument();
    });

    it('is not rendered when title is not present and cancelIcon is disabled', () => {
      const step = {
        options: {
          title: undefined
        }
      };

      const { container } = render(ShepherdContent, { props: { step } });

      expect(container.querySelector('.shepherd-header')).not.toBeInTheDocument();
    });
  });
});
