import { render } from '@redwoodjs/testing/web';

import SignupLandingLayout from './SignupLandingLayout';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignupLandingLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignupLandingLayout />);
    }).not.toThrow();
  });
});
