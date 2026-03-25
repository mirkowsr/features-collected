import type { Meta, StoryObj } from '@storybook/react'
import { Bold, Italic } from 'lucide-react'

import { Toggle } from './toggle'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Toggle',
    defaultPressed: false,
  },
}

export const Outline: Story = {
  render: () => (
    <Toggle variant="outline">
      <Bold />
    </Toggle>
  ),
}

export const WithIcon: Story = {
  render: () => (
    <Toggle>
      <Italic />
    </Toggle>
  ),
}

export const Pressed: Story = {
  args: {
    defaultPressed: true,
    children: 'Pressed',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}
