import type { Meta, StoryObj } from '@storybook/react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: 'account',
    className: 'w-[400px]',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <p className="text-sm text-muted-foreground">Make changes to your account here.</p>
      </TabsContent>
      <TabsContent value="password">
        <p className="text-sm text-muted-foreground">Change your password here.</p>
      </TabsContent>
    </Tabs>
  ),
}

export const ThreeTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-muted-foreground">
          Get a high-level summary of your project here.
        </p>
      </TabsContent>
      <TabsContent value="analytics">
        <p className="text-sm text-muted-foreground">
          View detailed analytics and usage metrics.
        </p>
      </TabsContent>
      <TabsContent value="reports">
        <p className="text-sm text-muted-foreground">
          Generate and download reports for your data.
        </p>
      </TabsContent>
    </Tabs>
  ),
}
