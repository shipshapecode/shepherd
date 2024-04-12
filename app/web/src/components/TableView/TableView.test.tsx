import { render } from '@redwoodjs/testing/web';

import TableView from './TableView';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('TableView', () => {
  it.skip('renders successfully', () => {
    expect(() => {
      render(<TableView records={[]} />);
    }).not.toThrow();
  });
});
