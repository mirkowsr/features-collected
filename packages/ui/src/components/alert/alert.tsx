import { cva } from 'class-variance-authority'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'

export const alertVariants = cva(
  [
    'relative w-full rounded-lg border p-4',
    '[&>svg+div]:translate-y-[-3px]',
    '[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
    '[&>svg~*]:pl-7',
  ],
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type AlertProps = React.ComponentPropsWithRef<'div'> &
  VariantProps<typeof alertVariants>

function Alert({
  className,
  variant,
  ref,
  ...props
}: AlertProps) {
  return (
    <div
      ref={ref}
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

type AlertTitleProps = React.ComponentPropsWithRef<'h5'>

function AlertTitle({
  className,
  ref,
  ...props
}: AlertTitleProps) {
  return (
    <h5
      ref={ref}
      data-slot="alert-title"
      className={cn('mb-1 font-medium leading-none tracking-tight', className)}
      {...props}
    />
  )
}

type AlertDescriptionProps = React.ComponentPropsWithRef<'div'>

function AlertDescription({
  className,
  ref,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, type AlertProps, type AlertTitleProps, type AlertDescriptionProps }
