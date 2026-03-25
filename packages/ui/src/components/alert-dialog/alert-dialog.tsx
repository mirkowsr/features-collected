import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import { cn } from '../../utils'
import { buttonVariants } from '../button'

const AlertDialog = AlertDialogPrimitive.Root
const AlertDialogPortal = AlertDialogPrimitive.Portal

type AlertDialogTriggerProps = React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Trigger>

function AlertDialogTrigger({
  className,
  ref,
  ...props
}: AlertDialogTriggerProps) {
  return (
    <AlertDialogPrimitive.Trigger
      ref={ref}
      data-slot="alert-dialog-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

type AlertDialogOverlayProps = React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Overlay>

function AlertDialogOverlay({ className, ref, ...props }: AlertDialogOverlayProps) {
  return (
    <AlertDialogPrimitive.Overlay
      ref={ref}
      data-slot="alert-dialog-overlay"
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

type AlertDialogContentProps = React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Content>

function AlertDialogContent({ className, ref, ...props }: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        ref={ref}
        data-slot="alert-dialog-content"
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
      />
    </AlertDialogPortal>
  )
}

type AlertDialogHeaderProps = React.ComponentPropsWithRef<'div'>

function AlertDialogHeader({ className, ref, ...props }: AlertDialogHeaderProps) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

type AlertDialogFooterProps = React.ComponentPropsWithRef<'div'>

function AlertDialogFooter({ className, ref, ...props }: AlertDialogFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="alert-dialog-footer"
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-2', className)}
      {...props}
    />
  )
}

type AlertDialogTitleProps = React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Title>

function AlertDialogTitle({ className, ref, ...props }: AlertDialogTitleProps) {
  return (
    <AlertDialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

type AlertDialogDescriptionProps = React.ComponentPropsWithRef<
  typeof AlertDialogPrimitive.Description
>

function AlertDialogDescription({ className, ref, ...props }: AlertDialogDescriptionProps) {
  return (
    <AlertDialogPrimitive.Description
      ref={ref}
      data-slot="alert-dialog-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

type AlertDialogActionProps = React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Action>

function AlertDialogAction({ className, ref, ...props }: AlertDialogActionProps) {
  return (
    <AlertDialogPrimitive.Action
      ref={ref}
      data-slot="alert-dialog-action"
      className={cn(buttonVariants(), className)}
      {...props}
    />
  )
}

type AlertDialogCancelProps = React.ComponentPropsWithRef<typeof AlertDialogPrimitive.Cancel>

function AlertDialogCancel({ className, ref, ...props }: AlertDialogCancelProps) {
  return (
    <AlertDialogPrimitive.Cancel
      ref={ref}
      data-slot="alert-dialog-cancel"
      className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', className)}
      {...props}
    />
  )
}

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  type AlertDialogTriggerProps,
  type AlertDialogOverlayProps,
  type AlertDialogContentProps,
  type AlertDialogHeaderProps,
  type AlertDialogFooterProps,
  type AlertDialogTitleProps,
  type AlertDialogDescriptionProps,
  type AlertDialogActionProps,
  type AlertDialogCancelProps,
}
