import { render } from '@redwoodjs/testing/web';

import AuthLayout from './AuthLayout';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AuthLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AuthLayout />);
    }).not.toThrow();
  });
});
