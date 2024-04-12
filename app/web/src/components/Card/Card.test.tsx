import { render } from '@redwoodjs/testing/web';

import { Card } from './Card';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Card', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Card />);
    }).not.toThrow();
  });
});
