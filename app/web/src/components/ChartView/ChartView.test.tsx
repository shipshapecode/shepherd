import { render } from '@redwoodjs/testing/web';

import ChartView from './ChartView';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ChartView', () => {
  it.skip('renders successfully', () => {
    expect(() => {
      render(<ChartView />);
    }).not.toThrow();
  });
});
