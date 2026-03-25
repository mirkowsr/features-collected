import type { Meta, StoryObj } from '@storybook/react'

import { Label } from '../label/label'
import { Switch } from './switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
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
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
      <Switch id="airplane-mode" />
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
