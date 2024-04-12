import { render } from '@redwoodjs/testing/web';

import AccountPage from './AccountPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AccountPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountPage />);
    }).not.toThrow();
  });
});
