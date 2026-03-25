import { cva } from 'class-variance-authority'

import type { VariantProps } from 'class-variance-authority'

import { cn } from '../../utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-border bg-secondary text-secondary-foreground',
        outline: 'border-border-strong text-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

type BadgeProps = React.ComponentPropsWithRef<'span'> & VariantProps<typeof badgeVariants>

function Badge({ className, variant, ref, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      ref={ref}
      className={cn(badgeVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Badge, badgeVariants, type BadgeProps }
