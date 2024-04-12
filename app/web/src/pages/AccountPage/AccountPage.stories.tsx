import type { Meta, StoryObj } from '@storybook/react';

import AccountPage from './AccountPage';

const meta: Meta<typeof AccountPage> = {
  component: AccountPage,
};

export default meta;

type Story = StoryObj<typeof AccountPage>;

export const Primary: Story = {};
