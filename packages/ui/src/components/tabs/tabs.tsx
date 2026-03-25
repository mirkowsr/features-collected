import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '../../utils'

type TabsProps = React.ComponentPropsWithRef<typeof TabsPrimitive.Root>

function Tabs({
  className,
  ref,
  ...props
}: TabsProps) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs"
      className={cn('w-full', className)}
      {...props}
    />
  )
}

type TabsListProps = React.ComponentPropsWithRef<typeof TabsPrimitive.List>

function TabsList({
  className,
  ref,
  ...props
}: TabsListProps) {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

type TabsTriggerProps = React.ComponentPropsWithRef<typeof TabsPrimitive.Trigger>

function TabsTrigger({
  className,
  ref,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1',
        'text-sm font-medium ring-offset-background',
        'transition-all duration-[var(--transition-fast)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

type TabsContentProps = React.ComponentPropsWithRef<typeof TabsPrimitive.Content>

function TabsContent({
  className,
  ref,
  ...props
}: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn(
        'mt-2 ring-offset-background',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
      {...props}
    />
  )
}

export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
}
