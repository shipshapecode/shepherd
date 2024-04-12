import { render } from '@redwoodjs/testing/web';

import CodeBlock from './CodeBlock';

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CodeBlock', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CodeBlock />);
    }).not.toThrow();
  });
});
