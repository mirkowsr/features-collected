import type { Meta, StoryObj } from '@storybook/react'

import { ScrollArea } from './scroll-area'

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'h-72 w-48 rounded-md border border-border',
  },
  render: (args) => (
    <ScrollArea {...args}>
      <div className="p-4">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="py-1 text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-72 w-48 rounded-md border border-border">
      <div className="p-4">
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i} className="py-1 text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border border-border">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="w-32 shrink-0 rounded-md border border-border p-4 text-sm">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
}
