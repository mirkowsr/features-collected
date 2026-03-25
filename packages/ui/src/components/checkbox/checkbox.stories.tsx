import type { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from './checkbox'
import { Label } from '../label'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    defaultChecked: {
      control: 'boolean',
    },
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
}

export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    defaultChecked: true,
  },
}
