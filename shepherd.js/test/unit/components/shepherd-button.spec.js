import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createShepherdButton } from '../../../src/components/shepherd-button.ts';

describe('component/ShepherdButton', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  describe('disabled', () => {
    it('should be enabled by default', () => {
      const button = createShepherdButton({}, undefined);
      container.appendChild(button);

      expect(button.disabled).toBeFalsy();
    });

    it('is enabled when false', () => {
      const button = createShepherdButton({ disabled: false }, undefined);
      container.appendChild(button);

      expect(button.disabled).toBeFalsy();
    });

    it('can be disabled with boolean', () => {
      const button = createShepherdButton({ disabled: true }, undefined);
      container.appendChild(button);

      expect(button.disabled).toBeTruthy();
    });

    it('can be disabled with function', () => {
      const button = createShepherdButton({ disabled: () => true }, undefined);
      container.appendChild(button);

      expect(button.disabled).toBeTruthy();
    });
  });

  describe('label', () => {
    it('string', () => {
      const button = createShepherdButton({ label: 'Test' }, undefined);
      container.appendChild(button);

      expect(button).toHaveAttribute('aria-label', 'Test');
    });

    it('number', () => {
      const button = createShepherdButton({ label: 5 }, undefined);
      container.appendChild(button);

      expect(button).toHaveAttribute('aria-label', '5');
    });

    it('function', () => {
      const button = createShepherdButton({ label: () => 'Test' }, undefined);
      container.appendChild(button);

      expect(button).toHaveAttribute('aria-label', 'Test');
    });

    it('function re-creation uses updated value', () => {
      let label = 'Test';
      const button = createShepherdButton({ label: () => label }, undefined);
      container.appendChild(button);
      expect(button).toHaveAttribute('aria-label', 'Test');

      label = 'Test 2';
      const buttonUpdated = createShepherdButton(
        { label: () => label },
        undefined
      );
      container.appendChild(buttonUpdated);
      expect(buttonUpdated).toHaveAttribute('aria-label', 'Test 2');
    });

    it('null', () => {
      const button = createShepherdButton({ label: null }, undefined);
      container.appendChild(button);

      expect(button).not.toHaveAttribute('aria-label');
    });

    it('undefined', () => {
      const button = createShepherdButton({}, undefined);
      container.appendChild(button);

      expect(button).not.toHaveAttribute('aria-label');
    });
  });

  describe('text', () => {
    it('string', () => {
      const button = createShepherdButton({ text: 'Test' }, undefined);
      container.appendChild(button);

      expect(button).toHaveTextContent('Test');
    });

    it('function', () => {
      const button = createShepherdButton({ text: () => 'Test' }, undefined);
      container.appendChild(button);

      expect(button).toHaveTextContent('Test');
    });

    it('function re-creation uses updated value', () => {
      let text = 'Test';
      const button = createShepherdButton({ text: () => text }, undefined);
      container.appendChild(button);
      expect(button).toHaveTextContent('Test');

      text = 'Test 2';
      const buttonUpdated = createShepherdButton(
        { text: () => text },
        undefined
      );
      container.appendChild(buttonUpdated);
      expect(buttonUpdated).toHaveTextContent('Test 2');
    });
  });

  describe('attrs', () => {
    it('applies single data attribute', () => {
      const button = createShepherdButton(
        {
          attrs: { 'data-test': 'my-button' }
        },
        undefined
      );
      container.appendChild(button);

      expect(button).toHaveAttribute('data-test', 'my-button');
    });

    it('applies multiple custom attributes', () => {
      const button = createShepherdButton(
        {
          attrs: {
            'data-test': 'my-button',
            'data-step': '1',
            'data-analytics': 'click-event',
            title: 'Click me'
          }
        },
        undefined
      );
      container.appendChild(button);

      expect(button).toHaveAttribute('data-test', 'my-button');
      expect(button).toHaveAttribute('data-step', '1');
      expect(button).toHaveAttribute('data-analytics', 'click-event');
      expect(button).toHaveAttribute('title', 'Click me');
    });

    it('converts number and boolean values to strings', () => {
      const button = createShepherdButton(
        {
          attrs: {
            'data-count': 42,
            'data-enabled': true,
            'data-rate': 3.14
          }
        },
        undefined
      );
      container.appendChild(button);

      expect(button).toHaveAttribute('data-count', '42');
      expect(button).toHaveAttribute('data-enabled', 'true');
      expect(button).toHaveAttribute('data-rate', '3.14');
    });

    it('does not override core button attributes', () => {
      const mockAction = () => {};
      const mockStep = { tour: {} };
      const button = createShepherdButton(
        {
          text: 'Next',
          classes: 'my-class',
          disabled: true,
          label: 'Next Step',
          action: mockAction,
          attrs: {
            type: 'submit', // Should NOT override
            class: 'wrong-class', // Should NOT override
            disabled: false, // Should NOT override
            'aria-label': 'Wrong Label', // Should NOT override
            tabindex: '5', // Should NOT override
            'data-test': 'next-btn' // SHOULD apply
          }
        },
        mockStep
      );
      container.appendChild(button);

      // Core attributes should be protected
      expect(button).toHaveAttribute('type', 'button');
      expect(button.className).toContain('shepherd-button');
      expect(button.className).toContain('my-class');
      expect(button.disabled).toBeTruthy();
      expect(button).toHaveAttribute('aria-label', 'Next Step');
      expect(button).toHaveAttribute('tabindex', '0');

      // Non-conflicting custom attribute should work
      expect(button).toHaveAttribute('data-test', 'next-btn');
    });

    it('works with empty attrs object', () => {
      const button = createShepherdButton({ attrs: {} }, undefined);
      container.appendChild(button);

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
      expect(button.className).toContain('shepherd-button');
    });

    it('works with undefined attrs', () => {
      const button = createShepherdButton({}, undefined);
      container.appendChild(button);

      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'button');
    });

    it('works alongside all other button properties', () => {
      const mockAction = () => {};
      const mockStep = { tour: {} };
      const button = createShepherdButton(
        {
          text: 'Next Step',
          label: 'Proceed forward',
          classes: 'custom-class',
          secondary: true,
          disabled: false,
          action: mockAction,
          attrs: {
            'data-test': 'next-btn',
            'data-step-id': '5',
            id: 'my-button-id'
          }
        },
        mockStep
      );
      container.appendChild(button);

      expect(button).toHaveTextContent('Next Step');
      expect(button).toHaveAttribute('aria-label', 'Proceed forward');
      expect(button.className).toContain('custom-class');
      expect(button.className).toContain('shepherd-button-secondary');
      expect(button.disabled).toBeFalsy();
      expect(button).toHaveAttribute('data-test', 'next-btn');
      expect(button).toHaveAttribute('data-step-id', '5');
      expect(button).toHaveAttribute('id', 'my-button-id');
    });

    it('handles special characters in attribute values', () => {
      const button = createShepherdButton(
        {
          attrs: {
            'data-text': 'Hello "World"',
            'data-path': '/api/v1/test',
            'data-symbol': '<>&'
          }
        },
        undefined
      );
      container.appendChild(button);

      expect(button).toHaveAttribute('data-text', 'Hello "World"');
      expect(button).toHaveAttribute('data-path', '/api/v1/test');
      expect(button).toHaveAttribute('data-symbol', '<>&');
    });
  });
});
