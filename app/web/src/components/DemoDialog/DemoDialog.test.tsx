import { render } from '@redwoodjs/testing/web';

import DemoDialog from './DemoDialog';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DemoDialog', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DemoDialog />);
    }).not.toThrow();
  });
});
