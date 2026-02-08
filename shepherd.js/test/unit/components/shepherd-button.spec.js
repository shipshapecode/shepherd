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
});
