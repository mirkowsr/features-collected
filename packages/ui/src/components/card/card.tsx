import { cn } from '../../utils'

type CardProps = React.ComponentPropsWithRef<'div'>

function Card({
  className,
  ref,
  ...props
}: CardProps) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        'bg-surface text-surface-foreground',
        'border border-border rounded-lg shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

type CardHeaderProps = React.ComponentPropsWithRef<'div'>

function CardHeader({
  className,
  ref,
  ...props
}: CardHeaderProps) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  )
}

type CardTitleProps = React.ComponentPropsWithRef<'h3'>

function CardTitle({
  className,
  ref,
  ...props
}: CardTitleProps) {
  return (
    <h3
      ref={ref}
      data-slot="card-title"
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
}

type CardDescriptionProps = React.ComponentPropsWithRef<'p'>

function CardDescription({
  className,
  ref,
  ...props
}: CardDescriptionProps) {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

type CardContentProps = React.ComponentPropsWithRef<'div'>

function CardContent({
  className,
  ref,
  ...props
}: CardContentProps) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  )
}

type CardFooterProps = React.ComponentPropsWithRef<'div'>

function CardFooter({
  className,
  ref,
  ...props
}: CardFooterProps) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
}
