import type { Meta, StoryObj } from '@storybook/react';

import SignupLandingLayout from './SignupLandingLayout';

const meta: Meta<typeof SignupLandingLayout> = {
  component: SignupLandingLayout,
};

export default meta;

type Story = StoryObj<typeof SignupLandingLayout>;

export const Primary: Story = {};
