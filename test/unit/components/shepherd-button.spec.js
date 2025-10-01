import { cleanup, render } from '@testing-library/svelte';
import { tick } from 'svelte';
import ShepherdButton from '../../../shepherd.js/src/components/shepherd-button.svelte';

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

    it('label - funtion', async () => {
      let label = 'Test';
      const labelFunction = () => label;
      const config = {
        label: labelFunction
      };

      const { container, rerender } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('aria-label', 'Test');

      label = 'Test 2';

      rerender({
        config: { label: () => label }
      });

      await tick();

      const buttonUpdated = container.querySelector('.shepherd-button');
      expect(buttonUpdated).toHaveAttribute('aria-label', 'Test 2');
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

    it('text - string', () => {
      const config = {
        text: 'Test'
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveTextContent('Test');
    });

    it('text - function', async () => {
      let text = 'Test';
      const textFunction = () => text;
      const config = {
        text: textFunction
      };

      const { container, rerender } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveTextContent('Test');

      text = 'Test 2';

      rerender({
        config: { text: () => text }
      });

      await tick();

      const buttonUpdated = container.querySelector('.shepherd-button');
      expect(buttonUpdated).toHaveTextContent('Test 2');
    });
  });
});
