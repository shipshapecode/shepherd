import type { Meta, StoryObj } from '@storybook/react';

import AuthLayout from './AuthLayout';

const meta: Meta<typeof AuthLayout> = {
  component: AuthLayout,
};

export default meta;

type Story = StoryObj<typeof AuthLayout>;

export const Primary: Story = {};
