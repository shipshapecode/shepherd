import type { Meta, StoryObj } from '@storybook/react';

import AppBaseLayout from './AppBaseLayout';

const meta: Meta<typeof AppBaseLayout> = {
  component: AppBaseLayout,
};

export default meta;

type Story = StoryObj<typeof AppBaseLayout>;

export const Primary: Story = {};
