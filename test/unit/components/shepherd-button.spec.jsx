import { cleanup, render } from 'solid-testing-library';
import ShepherdButton from '../../../shepherd.js/src/components/shepherd-button';

describe('component/ShepherdButton', () => {
  afterEach(cleanup);

  // Create a mock step object
  const createMockStep = () => ({
    tour: {
      next: vi.fn()
    }
  });

  describe('disabled', () => {
    it('should be enabled by default', () => {
      const config = {};
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button.disabled).toBeFalsy();
    });

    it('is enabled when false', () => {
      const config = {
        disabled: false
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button.disabled).toBeFalsy();
    });

    it('can be disabled with boolean', () => {
      const config = {
        disabled: true
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button.disabled).toBeTruthy();
    });

    it('can be disabled with function', () => {
      const config = {
        disabled: () => true
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button.disabled).toBeTruthy();
    });

    it('label - string', () => {
      const config = {
        label: 'Test'
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('aria-label', 'Test');
    });

    it('label - number', () => {
      const config = {
        label: 5
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('aria-label', '5');
    });

    it('label - function', () => {
      const label = 'Test';
      const labelFunction = () => label;
      const config = {
        label: labelFunction
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveAttribute('aria-label', 'Test');
    });

    it('label - null', () => {
      const config = {
        label: null
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button).not.toHaveAttribute('aria-label');
    });

    it('label - undefined', () => {
      const config = {};
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button).not.toHaveAttribute('aria-label');
    });

    it('text - string', () => {
      const config = {
        text: 'Test'
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveTextContent('Test');
    });

    it('text - function', () => {
      const text = 'Test';
      const textFunction = () => text;
      const config = {
        text: textFunction
      };
      const step = createMockStep();

      const { container } = render(() => (
        <ShepherdButton config={config} step={step} />
      ));

      const button = container.querySelector('.shepherd-button');
      expect(button).toHaveTextContent('Test');
    });
  });
});
