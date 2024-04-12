import type { Meta, StoryObj } from '@storybook/react';

import SigninPage from './SigninPage';

const meta: Meta<typeof SigninPage> = {
  component: SigninPage,
};

export default meta;

type Story = StoryObj<typeof SigninPage>;

export const Primary: Story = {};
