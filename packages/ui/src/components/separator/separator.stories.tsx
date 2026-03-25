import type { Meta, StoryObj } from '@storybook/react'

import { Separator } from './separator'

const meta: Meta<typeof Separator> = {
  title: 'Components/Separator',
  component: Separator,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    decorative: true,
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    decorative: {
      control: 'boolean',
    },
  },
  render: (args) => (
    <div className="w-full max-w-xs">
      <div className="text-sm font-medium">Content above</div>
      <Separator {...args} className="my-4" />
      <div className="text-sm text-muted-foreground">Content below</div>
    </div>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-xs">
      <div className="text-sm font-medium">Content above</div>
      <Separator className="my-4" />
      <div className="text-sm text-muted-foreground">Content below</div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-4 text-sm">
      <div>Left</div>
      <Separator orientation="vertical" />
      <div>Right</div>
    </div>
  ),
}
