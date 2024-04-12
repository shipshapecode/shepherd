import { render } from '@redwoodjs/testing/web';

import { Logo } from './Logo';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Logo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Logo />);
    }).not.toThrow();
  });
});
