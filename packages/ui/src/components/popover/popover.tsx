import * as PopoverPrimitive from '@radix-ui/react-popover'

import { cn } from '../../utils'

const Popover = PopoverPrimitive.Root

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverPrimitive.Trigger>

function PopoverTrigger({
  className,
  ref,
  ...props
}: PopoverTriggerProps) {
  return (
    <PopoverPrimitive.Trigger
      ref={ref}
      data-slot="popover-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

type PopoverAnchorProps = React.ComponentPropsWithRef<typeof PopoverPrimitive.Anchor>

function PopoverAnchor({
  className,
  ref,
  ...props
}: PopoverAnchorProps) {
  return (
    <PopoverPrimitive.Anchor
      ref={ref}
      data-slot="popover-anchor"
      className={cn(className)}
      {...props}
    />
  )
}

type PopoverContentProps = React.ComponentPropsWithRef<typeof PopoverPrimitive.Content>

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ref,
  ...props
}: PopoverContentProps) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'z-50 w-72 rounded-md border border-border bg-surface p-4 text-surface-foreground shadow-md outline-none',
          'transition-opacity duration-200',
          'data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
          className,
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

export {
  Popover,
  PopoverTrigger,
  PopoverAnchor,
  PopoverContent,
  type PopoverTriggerProps,
  type PopoverAnchorProps,
  type PopoverContentProps,
}
