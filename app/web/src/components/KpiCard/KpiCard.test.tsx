import { render } from '@redwoodjs/testing/web';

import KpiCard from './KpiCard';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe.skip('KpiCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<KpiCard />);
    }).not.toThrow();
  });
});
