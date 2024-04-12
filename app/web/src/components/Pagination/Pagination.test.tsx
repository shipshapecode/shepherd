import { render } from '@redwoodjs/testing/web';

import Pagination from './Pagination';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Pagination', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Pagination />);
    }).not.toThrow();
  });
});
