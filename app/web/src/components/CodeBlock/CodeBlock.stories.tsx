// Pass props to your component by passing an `args` object to your story
//
// ```tsx
// export const Primary: Story = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import type { Meta, StoryObj } from '@storybook/react';

import CodeBlock from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Primary: Story = {};
