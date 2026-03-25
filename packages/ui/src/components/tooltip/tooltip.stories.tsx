import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'

const meta: Meta<typeof TooltipContent> = {
  title: 'Components/Tooltip',
  component: TooltipContent,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Add to library',
  },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="flex gap-8">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Tooltip on {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
