import { render } from '@redwoodjs/testing/web';

import PricingPage from './PricingPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PricingPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PricingPage />);
    }).not.toThrow();
  });
});
