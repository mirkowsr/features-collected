import type { Meta, StoryObj } from '@storybook/react'

import { Textarea } from './textarea'
import { Label } from '../label'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: {
    placeholder: 'Type your message here...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="message">Your message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
}
