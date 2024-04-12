import { render } from '@redwoodjs/testing/web'

import BaseLayout from './BaseLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('BaseLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BaseLayout />)
    }).not.toThrow()
  })
})
