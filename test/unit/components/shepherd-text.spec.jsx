import { cleanup, render } from 'solid-testing-library';
import ShepherdText from '../../../shepherd.js/src/components/shepherd-text';

describe('components/ShepherdText', () => {
  afterEach(cleanup);

  it('adds plain text to the content', () => {
    const step = {
      options: {
        text: 'I am some test text.'
      }
    };

    const { container } = render(() => (
      <ShepherdText descriptionId="test-desc" step={step} />
    ));

    expect(container.querySelector('.shepherd-text')).toHaveTextContent('I am some test text.');
  });

  it('applies HTML element directly to content', () => {
    const step = {
      options: {
        text: '<p>I am some test text.</p>'
      }
    };

    const { container } = render(() => (
      <ShepherdText descriptionId="test-desc" step={step} />
    ));

    expect(container.querySelector('.shepherd-text')).toContainHTML('<p>I am some test text.</p>');
  });

  it('applies the text from a function', () => {
    const step = {
      options: {
        text: () => 'I am some test text.'
      }
    };

    const { container } = render(() => (
      <ShepherdText descriptionId="test-desc" step={step} />
    ));

    expect(container.querySelector('.shepherd-text')).toHaveTextContent('I am some test text.');
  });
});
