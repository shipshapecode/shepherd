import type { Meta, StoryObj } from '@storybook/react';

import PricingPage from './PricingPage';

const meta: Meta<typeof PricingPage> = {
  component: PricingPage,
};

export default meta;

type Story = StoryObj<typeof PricingPage>;

export const Primary: Story = {};
