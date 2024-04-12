import { render } from '@redwoodjs/testing/web';

import SubscriptionFeature from './SubscriptionFeature';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SubscriptionFeature', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubscriptionFeature />);
    }).not.toThrow();
  });
});
