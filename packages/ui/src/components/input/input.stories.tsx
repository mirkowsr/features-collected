import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <label htmlFor="email" className="text-sm font-medium text-foreground">
        Email
      </label>
      <Input id="email" placeholder="you@example.com" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const File: Story = {
  args: {
    type: 'file',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Password',
  },
}
