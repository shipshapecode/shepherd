import type { Meta, StoryObj } from '@storybook/react';

import DashboardLayout from './DashboardLayout';

const meta: Meta<typeof DashboardLayout> = {
  component: DashboardLayout,
};

export default meta;

type Story = StoryObj<typeof DashboardLayout>;

export const Primary: Story = {};
