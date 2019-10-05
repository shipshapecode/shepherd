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
  });
});
