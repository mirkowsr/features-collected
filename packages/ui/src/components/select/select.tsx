import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

import { cn } from '../../utils'

const Select = SelectPrimitive.Root

type SelectGroupProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Group>

function SelectGroup({
  className,
  ref,
  ...props
}: SelectGroupProps) {
  return (
    <SelectPrimitive.Group
      ref={ref}
      data-slot="select-group"
      className={cn(className)}
      {...props}
    />
  )
}

type SelectValueProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Value>

function SelectValue({
  className,
  ref,
  ...props
}: SelectValueProps) {
  return (
    <SelectPrimitive.Value
      ref={ref}
      data-slot="select-value"
      className={cn(className)}
      {...props}
    />
  )
}

type SelectTriggerProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>

function SelectTrigger({
  className,
  children,
  ref,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      data-slot="select-trigger"
      className={cn(
        'flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm',
        'placeholder:text-muted-foreground',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        '[&>span]:line-clamp-1',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

type SelectScrollUpButtonProps = React.ComponentPropsWithRef<typeof SelectPrimitive.ScrollUpButton>

function SelectScrollUpButton({
  className,
  ref,
  ...props
}: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

type SelectScrollDownButtonProps = React.ComponentPropsWithRef<
  typeof SelectPrimitive.ScrollDownButton
>

function SelectScrollDownButton({
  className,
  ref,
  ...props
}: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

type SelectContentProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Content>

function SelectContent({
  className,
  children,
  position = 'popper',
  ref,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        data-slot="select-content"
        className={cn(
          'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface text-surface-foreground shadow-md',
          'transition-opacity duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-slot="select-viewport"
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

type SelectLabelProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Label>

function SelectLabel({
  className,
  ref,
  ...props
}: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      data-slot="select-label"
      className={cn('px-2 py-1.5 text-sm font-semibold', className)}
      {...props}
    />
  )
}

type SelectItemProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Item>

function SelectItem({
  className,
  children,
  ref,
  ...props
}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      data-slot="select-item"
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

type SelectSeparatorProps = React.ComponentPropsWithRef<typeof SelectPrimitive.Separator>

function SelectSeparator({
  className,
  ref,
  ...props
}: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      data-slot="select-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  type SelectGroupProps,
  type SelectValueProps,
  type SelectTriggerProps,
  type SelectScrollUpButtonProps,
  type SelectScrollDownButtonProps,
  type SelectContentProps,
  type SelectLabelProps,
  type SelectItemProps,
  type SelectSeparatorProps,
}
