import type { Meta, StoryObj } from '@storybook/react'

import BaseLayout from './BaseLayout'

const meta: Meta<typeof BaseLayout> = {
  component: BaseLayout,
}

export default meta

type Story = StoryObj<typeof BaseLayout>

export const Primary: Story = {}
