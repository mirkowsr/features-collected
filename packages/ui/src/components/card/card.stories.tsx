import type { Meta, StoryObj } from '@storybook/react'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    className: 'w-[350px]',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Your content goes here. This is an example of a fully composed card with header, content,
          and footer sections working together.
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Card footer</p>
      </CardFooter>
    </Card>
  ),
}

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>A simple card with only content inside.</p>
      </CardContent>
    </Card>
  ),
}
