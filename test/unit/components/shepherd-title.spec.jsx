import { cleanup, render } from 'solid-testing-library';
import ShepherdTitle from '../../../shepherd.js/src/components/shepherd-title';

describe('components/ShepherdTitle', () => {
  afterEach(cleanup);

  it('adds plain title to the content', () => {
    const { container } = render(() => (
      <ShepherdTitle labelId="test-label" title="I am some test title." />
    ));

    expect(container.querySelector('.shepherd-title')).toHaveTextContent('I am some test title.');
  });

  it('applies the title from a function', () => {
    const { container } = render(() => (
      <ShepherdTitle labelId="test-label" title={() => 'I am some test title.'} />
    ));

    expect(container.querySelector('.shepherd-title')).toHaveTextContent('I am some test title.');
  });
});
