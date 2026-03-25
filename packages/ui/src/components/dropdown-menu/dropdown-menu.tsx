import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Check, ChevronRight, Circle } from 'lucide-react'

import { cn } from '../../utils'

const DropdownMenu = DropdownMenuPrimitive.Root
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub

type DropdownMenuTriggerProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Trigger>

function DropdownMenuTrigger({
  className,
  ref,
  ...props
}: DropdownMenuTriggerProps) {
  return (
    <DropdownMenuPrimitive.Trigger
      ref={ref}
      data-slot="dropdown-menu-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

type DropdownMenuGroupProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Group>

function DropdownMenuGroup({
  className,
  ref,
  ...props
}: DropdownMenuGroupProps) {
  return (
    <DropdownMenuPrimitive.Group
      ref={ref}
      data-slot="dropdown-menu-group"
      className={cn(className)}
      {...props}
    />
  )
}

type DropdownMenuRadioGroupProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.RadioGroup
>

function DropdownMenuRadioGroup({
  className,
  ref,
  ...props
}: DropdownMenuRadioGroupProps) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      ref={ref}
      data-slot="dropdown-menu-radio-group"
      className={cn(className)}
      {...props}
    />
  )
}

type DropdownMenuContentProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Content>

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ref,
  ...props
}: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface p-1 text-surface-foreground shadow-md',
          'transition-opacity duration-200',
          'data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

type DropdownMenuItemProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
}

function DropdownMenuItem({
  className,
  inset,
  ref,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      data-slot="dropdown-menu-item"
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'transition-colors duration-[var(--transition-fast)]',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

type DropdownMenuCheckboxItemProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.CheckboxItem>

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ref,
  ...props
}: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      ref={ref}
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'transition-colors duration-[var(--transition-fast)]',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

type DropdownMenuRadioItemProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.RadioItem>

function DropdownMenuRadioItem({
  className,
  children,
  ref,
  ...props
}: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      ref={ref}
      data-slot="dropdown-menu-radio-item"
      className={cn(
        'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
        'transition-colors duration-[var(--transition-fast)]',
        'focus:bg-accent focus:text-accent-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

type DropdownMenuLabelProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}

function DropdownMenuLabel({
  className,
  inset,
  ref,
  ...props
}: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      data-slot="dropdown-menu-label"
      className={cn(
        'px-2 py-1.5 text-sm font-semibold',
        inset && 'pl-8',
        className,
      )}
      {...props}
    />
  )
}

type DropdownMenuSeparatorProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.Separator>

function DropdownMenuSeparator({
  className,
  ref,
  ...props
}: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      data-slot="dropdown-menu-separator"
      className={cn('-mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  )
}

type DropdownMenuShortcutProps = React.ComponentPropsWithRef<'span'>

function DropdownMenuShortcut({
  className,
  ref,
  ...props
}: DropdownMenuShortcutProps) {
  return (
    <span
      ref={ref}
      data-slot="dropdown-menu-shortcut"
      className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)}
      {...props}
    />
  )
}

type DropdownMenuSubContentProps = React.ComponentPropsWithRef<typeof DropdownMenuPrimitive.SubContent>

function DropdownMenuSubContent({
  className,
  ref,
  ...props
}: DropdownMenuSubContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        ref={ref}
        data-slot="dropdown-menu-sub-content"
        className={cn(
          'z-50 min-w-[8rem] overflow-hidden rounded-md border border-border bg-surface p-1 text-surface-foreground shadow-lg',
          'transition-opacity duration-200',
          'data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
          className,
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

type DropdownMenuSubTriggerProps = React.ComponentPropsWithRef<
  typeof DropdownMenuPrimitive.SubTrigger
> & {
  inset?: boolean
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ref,
  ...props
}: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      data-slot="dropdown-menu-sub-trigger"
      className={cn(
        'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none',
        'transition-colors duration-[var(--transition-fast)]',
        'focus:bg-accent',
        'data-[state=open]:bg-accent',
        inset && 'pl-8',
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  type DropdownMenuTriggerProps,
  type DropdownMenuGroupProps,
  type DropdownMenuRadioGroupProps,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuCheckboxItemProps,
  type DropdownMenuRadioItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuShortcutProps,
  type DropdownMenuSubContentProps,
  type DropdownMenuSubTriggerProps,
}
