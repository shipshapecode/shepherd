import { cleanup, render } from '@testing-library/svelte';
import ShepherdText from '../../../shepherd.js/src/components/shepherd-text.svelte';

describe('components/ShepherdText', () => {
  beforeEach(cleanup);

  it('adds plain text to the content', () => {
    const step = {
      options: {
        text: 'I am some test text.'
      }
    };

    const { container } = render(ShepherdText, {
      props: {
        step
      }
    });

    expect(container.querySelector('.shepherd-text')).toHaveTextContent('I am some test text.');
  });

  it('applies HTML element directly to content', () => {
    const step = {
      options: {
        text: '<p>I am some test text.</p>'
      }
    };

    const { container } = render(ShepherdText, {
      props: {
        step
      }
    });

    expect(container.querySelector('.shepherd-text')).toContainHTML('<p>I am some test text.</p>');
  });

  it('applies the text from a function', () => {
    const step = {
      options: {
        text: () => 'I am some test text.'
      }
    };

    const { container } = render(ShepherdText, {
      props: {
        step
      }
    });

    expect(container.querySelector('.shepherd-text')).toHaveTextContent('I am some test text.');
  });
});
