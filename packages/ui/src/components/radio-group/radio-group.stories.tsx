import type { Meta, StoryObj } from '@storybook/react'

import { RadioGroup, RadioGroupItem } from './radio-group'
import { Label } from '../label'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'option-1',
    disabled: false,
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  render: (args) => (
    <RadioGroup {...args}>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">Option Two</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">Option Three</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-1" id="disabled-option-1" />
        <Label htmlFor="disabled-option-1">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-2" id="disabled-option-2" />
        <Label htmlFor="disabled-option-2">Option Two</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="option-3" id="disabled-option-3" />
        <Label htmlFor="disabled-option-3">Option Three</Label>
      </div>
    </RadioGroup>
  ),
}
