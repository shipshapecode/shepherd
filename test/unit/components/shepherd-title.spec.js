import { cleanup, render } from '@testing-library/svelte';
import ShepherdTitle from '../../../src/js/components/shepherd-title.svelte';

describe('components/ShepherdTitle', () => {
  beforeEach(cleanup);

  it('adds plain title to the content', () => {
    const step = {
      options: {
        title: 'I am some test title.'
      }
    };

    const { container } = render(ShepherdTitle, {
      props: {
        step
      }
    });

    expect(container.querySelector('.shepherd-title')).toHaveTextContent('I am some test title.');
  });

  it('applies the title from a function', () => {
    const step = {
      options: {
        title: () => 'I am some test title.'
      }
    };

    const { container } = render(ShepherdTitle, {
      props: {
        step
      }
    });

    expect(container.querySelector('.shepherd-title')).toHaveTextContent('I am some test title.');
  });
});
