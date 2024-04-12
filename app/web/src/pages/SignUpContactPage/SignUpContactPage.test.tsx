import { render } from '@redwoodjs/testing/web';

import SignUpContactPage from './SignUpContactPage';

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SignUpContactPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SignUpContactPage />);
    }).not.toThrow();
  });
});
