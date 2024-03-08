import { cleanup, render } from '@testing-library/svelte';
import ShepherdTitle from '../../../shepherd.js/src/components/shepherd-title.svelte';

describe('components/ShepherdTitle', () => {
  beforeEach(cleanup);

  it('adds plain title to the content', () => {
    const { container } = render(ShepherdTitle, {
      props: {
        title: 'I am some test title.'
      }
    });

    expect(container.querySelector('.shepherd-title')).toHaveTextContent('I am some test title.');
  });

  it('applies the title from a function', () => {
    const { container } = render(ShepherdTitle, {
      props: {
        title: () => 'I am some test title.'
      }
    });

    expect(container.querySelector('.shepherd-title')).toHaveTextContent('I am some test title.');
  });
});
