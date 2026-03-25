import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { cn } from '../../utils'

const Dialog = DialogPrimitive.Root
const DialogPortal = DialogPrimitive.Portal

type DialogTriggerProps = React.ComponentPropsWithRef<typeof DialogPrimitive.Trigger>

function DialogTrigger({
  className,
  ref,
  ...props
}: DialogTriggerProps) {
  return (
    <DialogPrimitive.Trigger
      ref={ref}
      data-slot="dialog-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

type DialogCloseProps = React.ComponentPropsWithRef<typeof DialogPrimitive.Close>

function DialogClose({
  className,
  ref,
  ...props
}: DialogCloseProps) {
  return (
    <DialogPrimitive.Close
      ref={ref}
      data-slot="dialog-close"
      className={cn(className)}
      {...props}
    />
  )
}

type DialogOverlayProps = React.ComponentPropsWithRef<typeof DialogPrimitive.Overlay>

function DialogOverlay({ className, ref, ...props }: DialogOverlayProps) {
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      data-slot="dialog-overlay"
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

type DialogContentProps = React.ComponentPropsWithRef<typeof DialogPrimitive.Content>

function DialogContent({ className, children, ref, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        data-slot="dialog-content"
        className={cn(
          'fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2',
          'gap-4 border border-border bg-surface p-6 shadow-lg',
          'rounded-lg',
          'transition-all duration-200',
          'data-[state=open]:opacity-100 data-[state=open]:scale-100',
          'data-[state=closed]:opacity-0 data-[state=closed]:scale-95',
          className,
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close
          data-slot="dialog-content-close"
          className={cn(
            'absolute right-4 top-4 rounded-sm opacity-70',
            'transition-opacity hover:opacity-100',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:pointer-events-none',
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

type DialogHeaderProps = React.ComponentPropsWithRef<'div'>

function DialogHeader({ className, ref, ...props }: DialogHeaderProps) {
  return (
    <div
      ref={ref}
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

type DialogFooterProps = React.ComponentPropsWithRef<'div'>

function DialogFooter({ className, ref, ...props }: DialogFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2', className)}
      {...props}
    />
  )
}

type DialogTitleProps = React.ComponentPropsWithRef<typeof DialogPrimitive.Title>

function DialogTitle({ className, ref, ...props }: DialogTitleProps) {
  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="dialog-title"
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

type DialogDescriptionProps = React.ComponentPropsWithRef<typeof DialogPrimitive.Description>

function DialogDescription({ className, ref, ...props }: DialogDescriptionProps) {
  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  type DialogTriggerProps,
  type DialogCloseProps,
  type DialogOverlayProps,
  type DialogContentProps,
  type DialogHeaderProps,
  type DialogFooterProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
}
