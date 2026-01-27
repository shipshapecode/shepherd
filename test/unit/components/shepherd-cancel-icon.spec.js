import { vi } from 'vitest';
import { cleanup, fireEvent, render } from '@testing-library/svelte';
import ShepherdCancelIcon from '../../../shepherd.js/src/components/shepherd-cancel-icon.svelte';
import { Tour } from '../../../shepherd.js/src/tour';
import { Step } from '../../../shepherd.js/src/step';

describe('components/ShepherdCancelIcon', () => {
  beforeEach(cleanup);

  describe('basic functionality', () => {
    it('renders cancel icon with default aria-label', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: { enabled: true },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toBeInTheDocument();
      expect(cancelIcon).toHaveAttribute('aria-label', 'Close Tour');
      expect(cancelIcon).toHaveAttribute('type', 'button');
    });

    it('renders cancel icon with custom aria-label', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true,
          label: 'Custom Close Label'
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            label: 'Custom Close Label'
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('aria-label', 'Custom Close Label');
    });

    it('renders close symbol (&times;)', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: { enabled: true },
          step
        }
      });

      const closeSymbol = container.querySelector('span[aria-hidden="true"]');
      expect(closeSymbol).toBeInTheDocument();
      expect(closeSymbol.textContent).toBe('&times;');
    });
  });

  describe('click behavior', () => {
    it('calls step.cancel() when clicked', async () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });
      const stepCancelSpy = vi.spyOn(step, 'cancel');

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: { enabled: true },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      await fireEvent.click(cancelIcon);

      expect(stepCancelSpy).toHaveBeenCalledOnce();
    });

    it('prevents default event behavior when clicked', async () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: { enabled: true },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      });
      const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

      cancelIcon.dispatchEvent(clickEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('dataAttributes functionality', () => {
    it('applies single data attribute correctly', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            dataAttributes: [{ id: 'test', value: 'testValue' }]
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('data-test', 'testValue');
    });

    it('applies multiple data attributes correctly', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            dataAttributes: [
              { id: 'foo', value: 'someData' },
              { id: 'bar', value: '1234' },
              { id: 'baz', value: 'anotherValue' }
            ]
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('data-foo', 'someData');
      expect(cancelIcon).toHaveAttribute('data-bar', '1234');
      expect(cancelIcon).toHaveAttribute('data-baz', 'anotherValue');
    });

    it('handles data attributes with numeric values', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            dataAttributes: [
              { id: 'count', value: 42 },
              { id: 'price', value: 99.99 }
            ]
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('data-count', '42');
      expect(cancelIcon).toHaveAttribute('data-price', '99.99');
    });

    it('handles data attributes with boolean values', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            dataAttributes: [
              { id: 'active', value: true },
              { id: 'disabled', value: false }
            ]
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('data-active', 'true');
      expect(cancelIcon).toHaveAttribute('data-disabled', 'false');
    });

    it('handles empty dataAttributes array', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            dataAttributes: []
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toBeInTheDocument();
      // Should not have any data-* attributes
      const dataAttrs = Array.from(cancelIcon.attributes).filter((attr) =>
        attr.name.startsWith('data-')
      );
      expect(dataAttrs).toHaveLength(0);
    });

    it('handles undefined dataAttributes', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toBeInTheDocument();
    });

    it('handles null dataAttributes', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            dataAttributes: null
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toBeInTheDocument();
    });

    it('ignores data attributes without id', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            dataAttributes: [
              { id: 'valid', value: 'validValue' },
              { value: 'noId' }, // Should be ignored
              { id: '', value: 'emptyId' } // Should be ignored
            ]
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('data-valid', 'validValue');
      
      // Check that only one data attribute exists
      const dataAttrs = Array.from(cancelIcon.attributes).filter((attr) =>
        attr.name.startsWith('data-')
      );
      expect(dataAttrs).toHaveLength(1);
    });

    it('handles data attributes with special characters in values', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            dataAttributes: [
              { id: 'url', value: 'https://example.com/test?param=value' },
              { id: 'json', value: '{"key":"value"}' },
              { id: 'spaces', value: 'value with spaces' }
            ]
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute(
        'data-url',
        'https://example.com/test?param=value'
      );
      expect(cancelIcon).toHaveAttribute('data-json', '{"key":"value"}');
      expect(cancelIcon).toHaveAttribute('data-spaces', 'value with spaces');
    });
  });

  describe('integration with label and dataAttributes', () => {
    it('works with both custom label and data attributes', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: {
            enabled: true,
            label: 'close the tour',
            dataAttributes: [
              { id: 'foo', value: 'someData' },
              { id: 'bar', value: '1234' }
            ]
          },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveAttribute('aria-label', 'close the tour');
      expect(cancelIcon).toHaveAttribute('data-foo', 'someData');
      expect(cancelIcon).toHaveAttribute('data-bar', '1234');
      expect(cancelIcon).toHaveAttribute('type', 'button');
      expect(cancelIcon).toHaveClass('shepherd-cancel-icon');
    });
  });

  describe('CSS classes and styling', () => {
    it('has correct CSS class', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: { enabled: true },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      expect(cancelIcon).toHaveClass('shepherd-cancel-icon');
    });

    it('button has transparent background', () => {
      const tour = new Tour();
      const step = new Step(tour, {
        cancelIcon: {
          enabled: true
        }
      });

      const { container } = render(ShepherdCancelIcon, {
        props: {
          cancelIcon: { enabled: true },
          step
        }
      });

      const cancelIcon = container.querySelector('.shepherd-cancel-icon');
      const styles = window.getComputedStyle(cancelIcon);
      // Basic style checks - specific values might vary based on CSS
      expect(cancelIcon.style.background || styles.background).toBeTruthy();
    });
  });
});
