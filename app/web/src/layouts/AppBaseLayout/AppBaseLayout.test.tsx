import { render } from '@redwoodjs/testing/web';

import AppBaseLayout from './AppBaseLayout';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AppBaseLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppBaseLayout />);
    }).not.toThrow();
  });
});
