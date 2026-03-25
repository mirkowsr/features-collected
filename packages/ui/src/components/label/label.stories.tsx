import type { Meta, StoryObj } from '@storybook/react'

import { Label } from './label'
import { Input } from '../input'

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Email address',
  },
}

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  ),
}
