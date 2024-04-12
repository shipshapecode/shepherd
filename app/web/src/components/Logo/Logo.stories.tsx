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

import { Logo } from 'src/components/Logo/Logo';

const meta: Meta<typeof Logo> = {
  component: Logo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Primary: Story = {};
