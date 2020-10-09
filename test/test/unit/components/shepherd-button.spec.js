import { cleanup, render } from '@testing-library/svelte';
import ShepherdButton from '../../../src/js/components/shepherd-button.svelte';

describe('component/ShepherdButton', () => {
  beforeEach(cleanup);

  describe('disabled', () => {
    it('should be enabled by default', () => {
      const config = {};

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button.disabled).toBeFalsy();
    });

    it('is enabled when false', () => {
      const config = {
        disabled: false
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button.disabled).toBeFalsy();
    });

    it('can be disabled with boolean', () => {
      const config = {
        disabled: true
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button.disabled).toBeTruthy();
    });

    it('can be disabled with function', () => {
      const config = {
        disabled: () => true
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button.disabled).toBeTruthy();
    });

    it('label - string', () => {
      const config = {
        label: 'Test'
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('aria-label', 'Test');
    });

    it('label - number', () => {
      const config = {
        label: 5
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('aria-label', '5');
    });

    it('label - null', () => {
      const config = {
        label: null
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).not.toHaveAttribute('aria-label');
    });

    it('label - undefined', () => {
      const config = {};

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).not.toHaveAttribute('aria-label');
    });
  });
});
