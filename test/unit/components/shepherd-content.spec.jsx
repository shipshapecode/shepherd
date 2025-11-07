import { cleanup, render } from 'solid-testing-library';
import ShepherdContent from '../../../shepherd.js/src/components/shepherd-content';

describe('components/ShepherdContent', () => {
  afterEach(cleanup);

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

      const { container } = render(() => (
        <ShepherdContent descriptionId="test-desc" labelId="test-label" step={step} />
      ));

      expect(container.querySelector('.shepherd-content .shepherd-header')).toBeInTheDocument();
    });

    it('is rendered when title is present', () => {
      const step = {
        options: {
          title: 'I am some test title.'
        }
      };

      const { container } = render(() => (
        <ShepherdContent descriptionId="test-desc" labelId="test-label" step={step} />
      ));

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

      const { container } = render(() => (
        <ShepherdContent descriptionId="test-desc" labelId="test-label" step={step} />
      ));

      expect(container.querySelector('.shepherd-content .shepherd-header')).toBeInTheDocument();
    });

    it('is not rendered when title is not present and cancelIcon is disabled', () => {
      const step = {
        options: {
          title: undefined
        }
      };

      const { container } = render(() => (
        <ShepherdContent descriptionId="test-desc" labelId="test-label" step={step} />
      ));

      expect(container.querySelector('.shepherd-header')).not.toBeInTheDocument();
    });
  });
});
