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

  describe('dataAttributes', () => {
    it('applies single data attribute correctly', () => {
      const config = {
        text: 'Click me',
        dataAttributes: [{ id: 'test', value: 'testValue' }]
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('data-test', 'testValue');
    });

    it('applies multiple data attributes correctly', () => {
      const config = {
        text: 'Click me',
        dataAttributes: [
          { id: 'foo', value: 'someData' },
          { id: 'bar', value: '1234' },
          { id: 'baz', value: 'anotherValue' }
        ]
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('data-foo', 'someData');
      expect(button).toHaveAttribute('data-bar', '1234');
      expect(button).toHaveAttribute('data-baz', 'anotherValue');
    });

    it('handles data attributes with numeric values', () => {
      const config = {
        text: 'Click me',
        dataAttributes: [
          { id: 'count', value: 42 },
          { id: 'price', value: 99.99 }
        ]
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('data-count', '42');
      expect(button).toHaveAttribute('data-price', '99.99');
    });

    it('handles empty dataAttributes array', () => {
      const config = {
        text: 'Click me',
        dataAttributes: []
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      const dataAttrs = Array.from(button.attributes).filter((attr) =>
        attr.name.startsWith('data-')
      );
      expect(dataAttrs).toHaveLength(0);
    });

    it('handles undefined dataAttributes', () => {
      const config = {
        text: 'Click me'
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toBeInTheDocument();
    });

    it('ignores data attributes without id', () => {
      const config = {
        text: 'Click me',
        dataAttributes: [
          { id: 'valid', value: 'validValue' },
          { value: 'noId' },
          { id: '', value: 'emptyId' }
        ]
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('data-valid', 'validValue');
      
      const dataAttrs = Array.from(button.attributes).filter((attr) =>
        attr.name.startsWith('data-')
      );
      expect(dataAttrs).toHaveLength(1);
    });

    it('works with other button properties', () => {
      const config = {
        text: 'Next',
        label: 'Go to next step',
        classes: 'custom-class',
        secondary: true,
        dataAttributes: [
          { id: 'step', value: '2' },
          { id: 'action', value: 'next' }
        ]
      };

      const { container } = render(ShepherdButton, {
        props: {
          config
        }
      });

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('aria-label', 'Go to next step');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('shepherd-button-secondary');
      expect(button).toHaveAttribute('data-step', '2');
      expect(button).toHaveAttribute('data-action', 'next');
      expect(button).toHaveTextContent('Next');
    });
  });
});
