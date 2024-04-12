import type { Meta, StoryObj } from '@storybook/react';

import SignUpContactPage from './SignUpContactPage';

const meta: Meta<typeof SignUpContactPage> = {
  component: SignUpContactPage,
};

export default meta;

type Story = StoryObj<typeof SignUpContactPage>;

export const Primary: Story = {};
