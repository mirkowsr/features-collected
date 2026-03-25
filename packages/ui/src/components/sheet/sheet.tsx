import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'

import { cn } from '../../utils'

const Sheet = SheetPrimitive.Root
const SheetPortal = SheetPrimitive.Portal

type SheetTriggerProps = React.ComponentPropsWithRef<typeof SheetPrimitive.Trigger>

function SheetTrigger({
  className,
  ref,
  ...props
}: SheetTriggerProps) {
  return (
    <SheetPrimitive.Trigger
      ref={ref}
      data-slot="sheet-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

type SheetCloseProps = React.ComponentPropsWithRef<typeof SheetPrimitive.Close>

function SheetClose({
  className,
  ref,
  ...props
}: SheetCloseProps) {
  return (
    <SheetPrimitive.Close
      ref={ref}
      data-slot="sheet-close"
      className={cn(className)}
      {...props}
    />
  )
}

type SheetOverlayProps = React.ComponentPropsWithRef<typeof SheetPrimitive.Overlay>

function SheetOverlay({ className, ref, ...props }: SheetOverlayProps) {
  return (
    <SheetPrimitive.Overlay
      ref={ref}
      data-slot="sheet-overlay"
      className={cn(
        'fixed inset-0 z-50 bg-overlay',
        'data-[state=open]:opacity-100 data-[state=closed]:opacity-0',
        'transition-opacity duration-200',
        className,
      )}
      {...props}
    />
  )
}

const sheetVariants = cva(
  cn(
    'fixed z-50 gap-4 bg-surface p-6 shadow-lg',
    'transition-transform duration-300 ease-out',
  ),
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b border-border',
        bottom: 'inset-x-0 bottom-0 border-t border-border',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r border-border sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l border-border sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
)

type SheetContentProps = React.ComponentPropsWithRef<typeof SheetPrimitive.Content> &
  VariantProps<typeof sheetVariants>

function SheetContent({
  side = 'right',
  className,
  children,
  ref,
  ...props
}: SheetContentProps) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        ref={ref}
        data-slot="sheet-content"
        className={cn(
          sheetVariants({ side }),
          'data-[state=closed]:opacity-0 data-[state=open]:opacity-100',
          className,
        )}
        {...props}
      >
        <SheetPrimitive.Close
          data-slot="sheet-content-close"
          className={cn(
            'absolute right-4 top-4 rounded-sm opacity-70',
            'transition-opacity hover:opacity-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:pointer-events-none',
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}

type SheetHeaderProps = React.ComponentPropsWithRef<'div'>

function SheetHeader({ className, ref, ...props }: SheetHeaderProps) {
  return (
    <div
      ref={ref}
      data-slot="sheet-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

type SheetFooterProps = React.ComponentPropsWithRef<'div'>

function SheetFooter({ className, ref, ...props }: SheetFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="sheet-footer"
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2', className)}
      {...props}
    />
  )
}

type SheetTitleProps = React.ComponentPropsWithRef<typeof SheetPrimitive.Title>

function SheetTitle({ className, ref, ...props }: SheetTitleProps) {
  return (
    <SheetPrimitive.Title
      ref={ref}
      data-slot="sheet-title"
      className={cn('text-lg font-semibold text-foreground', className)}
      {...props}
    />
  )
}

type SheetDescriptionProps = React.ComponentPropsWithRef<typeof SheetPrimitive.Description>

function SheetDescription({ className, ref, ...props }: SheetDescriptionProps) {
  return (
    <SheetPrimitive.Description
      ref={ref}
      data-slot="sheet-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
  type SheetTriggerProps,
  type SheetCloseProps,
  type SheetOverlayProps,
  type SheetContentProps,
  type SheetHeaderProps,
  type SheetFooterProps,
  type SheetTitleProps,
  type SheetDescriptionProps,
}
